import archiver from 'archiver';
import { fileURLToPath } from "url";
import path from 'path';
import puppeteer from 'puppeteer';
import fs from 'fs';
import fetch from 'node-fetch';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const generateDynamicPdfs = async (dataArray, idUsuario) => {
    try {
        // Iniciar Puppeteer
        const browser = await puppeteer.launch({
            executablePath: '/usr/bin/chromium-browser',
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
          });

        const paths = [];
        // Recorrer cada usuario
        for (const data of dataArray) {
            const page = await browser.newPage();

            // Leer el template HTML
            const templatePath = path.join(__dirname, 'template.html');
            let html = fs.readFileSync(templatePath, 'utf8');

            // Convertir imagen a Base64 (si existe)
            const imageSrc = data.imageUrl ? await imageToBase64(data.imageUrl) : '';

            // Reemplazar marcadores en el HTML
            html = html
                .replace('{{image_base64}}', imageSrc)
                .replace('{{version}}', data.version)
                .replace('{{evaluado_nombre}}', data.evaluado_nombre)
                .replace('{{evaluado_cc}}', `${data.evaluado_nombre} - ${data.evaluado_cc}`)
                .replace('{{cargo}}', data.cargo)
                .replace('{{fecha_ingreso}}', data.fecha_ingreso)
                .replace('{{evaluador_nombre}}', data.evaluadornombre.map(evaluador => `${evaluador.name}.  `).join(''))
                .replace('{{evaluadores}}', data.evaluadornombre.map(evaluador => `${evaluador.name} - ${evaluador.documento} `).join(''))
                .replace('{{promedio_evaluacion}}', data.promedio_evaluacion)
                .replace('{{promedio_autoevaluacion}}', data.promedio_autoevaluacion)
                .replace('{{fecha_registro}}', data.fecha_registro)
                .replace('{{fecha_impresion}}', data.fecha_impresion)
                .replace('{{escala_calificacion}}', data.escalacalificacion.map(escala => {
                    return `<td>${escala.descripcion}</td><td>${escala.valor}</td>`;
                }).join(''))
                .replace('{{competencias}}', data.competencias.map(competencia => {
                    return `<td>${competencia.nombre}</td><td>${competencia.puntaje}</td>`;
                }).join(''));

            // Configurar contenido en Puppeteer
            await page.setContent(html, { waitUntil: 'networkidle0' });

            // Nombre del archivo PDF basado en el evaluado
            const userDir = path.join('pdfs', idUsuario.toString());
            if (!fs.existsSync(userDir)) {
                fs.mkdirSync(userDir, { recursive: true });
            }
            const pdfFileName = path.join(userDir, `${data.evaluado_nombre.replace(/\s+/g, '_')}_${data.evaluado_cc}.pdf`);

            // Crear carpeta "pdfs" si no existe
            if (!fs.existsSync('pdfs')) {
                fs.mkdirSync('pdfs');
            }

            // Generar el PDF
            await page.pdf({
                path: pdfFileName,
                format: 'A4',
                printBackground: true,
            });

            fs.appendFileSync('pdf_generation.log', `✅ ${new Date().toISOString()}: PDF generado: ${pdfFileName}\n`);
            paths.push(pdfFileName);
            await page.close();
        }

        await browser.close();
        return paths
    } catch (error) {
        console.error('Error al generar PDFs:', error);
        fs.appendFileSync('pdf_generation.log', `❌ ${new Date().toISOString()}: Error al generar PDFs: ${error.message}\n`);
        return ({ error: 'Error al generar PDFs' });
    }
}

export const downloadPdfs = async (paths, res) => {
    if (paths.length === 0) {
        res.status(400).json({ message: "Evaluación no encontrada" });
        return;
    }

    try {
        const tempDir = path.join(__dirname, '../../pdfs');
        const timestamp = new Date().toLocaleString('en-CA', { timeZone: 'America/Bogota' })
            .replace(/[:\s]/g, '-'); // Evita problemas con nombres de archivo

        const zipPath = path.join(tempDir, `documents_${timestamp}.zip`);

        // Crear el directorio si no existe
        if (!fs.existsSync(tempDir)) {
            fs.mkdirSync(tempDir, { recursive: true });
        }

        // ⬇️ ***ELIMINAR ZIP ANTERIOR*** (Si existe)
        if (fs.existsSync(zipPath)) {
            fs.unlinkSync(zipPath);
        }

        const output = fs.createWriteStream(zipPath);
        const archive = archiver('zip', { zlib: { level: 9 } });

        output.on('close', () => {
            res.download(zipPath, `documents_${timestamp}.zip`, (err) => {
                if (err) {
                    res.status(500).json({ error: 'Error al descargar el archivo ZIP' });
                }

                // ⬇️ ***ELIMINAR ZIP DESPUÉS DE LA DESCARGA***
                fs.unlink(zipPath, (unlinkErr) => {
                    if (unlinkErr) {
                        console.error('Error al eliminar el archivo ZIP:', unlinkErr);
                    }
                });
            });
        });

        archive.pipe(output);

        // ⬇️ ***AGREGAR SOLO LOS ARCHIVOS DE LA PETICIÓN ACTUAL***
        paths.forEach(file => {
            if (fs.existsSync(file)) { // Verifica que el archivo exista antes de agregarlo
                archive.file(file, { name: path.basename(file) });
            } else {
                console.warn(`Archivo no encontrado: ${file}`);
            }
        });

        archive.finalize();

    } catch (error) {
        console.error('Error en la generación del ZIP:', error);
        res.status(500).json({ error: 'Error al descargar el archivo ZIP' });
    }
};

const imageToBase64 = async (imageUrl) => {
    const response = await fetch(imageUrl);
    const buffer = await response.arrayBuffer();
    const base64 = Buffer.from(buffer).toString('base64');
    return `data:${response.headers.get('content-type')};base64,${base64}`;
};