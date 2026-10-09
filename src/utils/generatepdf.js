import archiver from 'archiver';
import { fileURLToPath } from "url";
import path from 'path';
import PDFDocument from 'pdfkit';

import fs from 'fs';
import fetch from 'node-fetch';
import axios from 'axios';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generatePDF(data) {
  const doc = new PDFDocument();

  const widthPage = doc.page.width
  const heightPage = doc.page.height
  const margin = 50
  const marginH = 20
  const hc = 60
  const wu = widthPage - (margin * 2)

  const colums = wu / 3
  const columHeaderOne = colums - 30
  const columHeaderCenter = colums + 60

  doc.lineWidth(0.5)
  doc.font('Helvetica-Bold')
  doc.rect(margin, marginH, wu, hc).stroke()
  doc.rect(margin, marginH, columHeaderOne, hc).stroke()

  const imageBuffer = await downloadImage(data?.imageUrl);
  
  if (imageBuffer) {
    doc.image(imageBuffer, margin + 5, marginH + 5, { width: columHeaderOne - marginH, height: hc - 10 });
  }

  doc.rect(margin + columHeaderOne, marginH, columHeaderCenter, hc).stroke()

  doc.text('EVALUACIÓN DE DESEMPEÑO', margin + columHeaderOne, hc - marginH, {
    width: columHeaderCenter,
    align: 'center'
  }).stroke()
  doc.text('PROCESO: GESTIÓN HUMANA', margin + columHeaderOne, hc, {
    width: columHeaderCenter,
    align: 'center'
  }).stroke()
  doc.rect(margin + columHeaderOne + columHeaderCenter, marginH, columHeaderOne, hc).stroke()
  doc.text(`Versión: ${data?.version}`, margin + columHeaderOne + columHeaderCenter, hc / 2 + marginH, {
    width: columHeaderOne,
    align: 'center'
  })

  const hInfo = hc + marginH + 5
  const columsInfo = wu / 4
  const hcInfo = 35
  const columsLeft = columsInfo + 70
  const columsRigth = columsInfo - 70

  doc.fontSize(10)
  doc.rect(margin, hInfo, columsLeft, hcInfo - 10 ).stroke()
  doc.text('Nombre del evaluado', margin + 5, hInfo + 5, {
    width: columsLeft,
    align: 'left'
  })
  doc.rect(margin + columsLeft, hInfo, columsLeft, hcInfo - 10).stroke()
  doc.text('Cargo', margin + columsLeft + 5, hInfo + 5, {
    width: columsLeft,
    align: 'left'
  }) + 50
  doc.rect(margin + (columsLeft * 2), hInfo, columsRigth, hcInfo - 10).stroke()
  doc.text('Fecha de Ingreso', margin + (columsLeft * 2) + 5, hInfo + 5, {
    width: columsRigth,
    align: 'left',
    lineBreak: false
  })
  doc.rect(margin + columsRigth + (columsLeft * 2), hInfo, columsRigth, hcInfo - 10).stroke()
  doc.text('Periodo', margin + columsRigth + (columsLeft * 2) + 5, hInfo + 5, {
    width: columsRigth,
    align: 'left'
  })

  const hDetails = hInfo + hcInfo - 10
  const cargo = data?.cargo
  const nombre = data?.evaluado_nombre
  let size = 10
  if (nombre.length > 40) {
    size = 9
  }
  doc.fontSize(size)
  doc.font('Helvetica')
  doc.rect(margin, hDetails, columsLeft, hcInfo).stroke()
  doc.text(nombre, margin + 5, hDetails + 5, {
    width: columsLeft,
    align: 'left'
  })
  if (cargo.length > 40) {
    size = 9
  }
  doc.fontSize(size)
  doc.rect(margin + columsLeft, hDetails, columsLeft, hcInfo).stroke()
  doc.text(cargo, margin + columsLeft + 5, hDetails + 5, {
    width: columsLeft,
    align: 'left'
  })
  doc.fontSize(10)
  doc.rect(margin + (columsLeft * 2), hDetails, columsRigth, hcInfo).stroke()
  doc.text(data?.fecha_ingreso, margin + (columsLeft * 2) + 5, hDetails + 10, {
    width: columsRigth,
    align: 'left'
  })
  doc.rect(margin + columsRigth + (columsLeft * 2), hDetails, columsRigth, hcInfo).stroke()
  doc.text(`Año ${data?.evaluacion_year}`, margin + columsRigth + (columsLeft * 2) + 5, hDetails + 10, {
    width: columsRigth,
    align: 'left'
  })

  doc.font('Helvetica-Bold')
  doc.fontSize(11)
  doc.rect(margin, hDetails + 35, columsInfo, hcInfo).stroke()
  doc.text('Nombre del evaluador', margin + 5, hDetails + 45, {
    width: columsInfo,
    align: 'left'
  })
  doc.font('Helvetica')
  doc.fontSize(10)
  doc.rect(margin + columsInfo, hDetails + 35, columsInfo * 3, hcInfo).stroke()
  doc.text(data?.evaluadornombre?.map(u => u.name).join(', '), margin + columsInfo + 5, hDetails + 45,{
    width: columsInfo * 3,
    align: 'left'
  })
  doc.fontSize(12)
  doc.font('Helvetica-Bold')
  doc.rect(margin, hDetails + 77.5, wu, hcInfo / 2).stroke()
  doc.text('Objetivo', margin + 5, hDetails + 82.5)

  doc.font('Helvetica')
  doc.rect(margin, hDetails + 95, wu, hcInfo).stroke()
  doc.text('El objetivo de esta evaluación es valorar las competencias para identificar las fortalezas y puntosde mejora en cuanto al desempeño esperado.', margin + 5, hDetails + 100)

  doc.font('Helvetica-Bold')
  doc.rect(margin, hDetails + 140, wu, hcInfo/2).stroke()
  doc.text('Escala de calificación', margin + 5, hDetails + 145)

  doc.font('Helvetica')

  const escalacalificacion = data?.escalacalificacion.sort((a,b) => b.valor - a.valor)

  let pb = 140
  let bScale = 17.5
  let y = 0
  for (let i = 0; i < escalacalificacion.length; i++) {
      y += bScale
      doc.rect(margin, hDetails + pb + y, columsInfo * 3, bScale).stroke()
      doc.text(escalacalificacion[i].descripcion, margin + 5, hDetails + (pb + y + 5))
      doc.rect(margin + (columsInfo * 3), hDetails + pb + y, columsInfo, bScale).stroke()
      doc.text(escalacalificacion[i].valor, margin + 5 + columsInfo * 3, hDetails + (pb + y + 5), {
        width: columsInfo,
        align: 'center'
      })
  }

  doc.font('Helvetica-Bold')
  doc.rect(margin, hDetails + 250, columsInfo * 3, bScale).stroke()
  doc.text('Competencia', margin + 5, hDetails + 255)
  doc.rect(margin + (columsInfo * 3), hDetails + 250, columsInfo, bScale).stroke()
  doc.text('Promedio', margin + 5 + columsInfo * 3, hDetails + 255, {
    width: columsInfo,
    align: 'center'
  })


  doc.font('Helvetica')
  
  let pbc = 250
  let yc = 0
  for (let i = 0; i < data?.competencias.length; i++) {
      yc += bScale
      let rowY = hDetails + pbc + yc
      doc.rect(margin, rowY , columsInfo * 3, bScale).stroke()
      doc.text(data?.competencias[i]?.nombre, margin + 5, rowY + 5)
      doc.rect(margin + (columsInfo * 3), rowY, columsInfo, bScale).stroke()
      const puntaje = data?.competencias[i]?.puntaje ? Number(data?.competencias[i]?.puntaje).toFixed(1) : '0.0';
      doc.text(puntaje, margin + 5 + columsInfo * 3, rowY + 5, {
        width: columsInfo,
        align: 'center'
      })
  }

  let fBase = hDetails + pbc + yc
  doc.font('Helvetica-Bold')
  doc.rect(margin, fBase + bScale, columsInfo * 3, bScale).stroke()
  doc.text('PROMEDIO EVALUACIÓN', margin + 5, fBase + bScale + 5, {
    width: columsInfo * 3,
    align: 'center'
  })

  doc.rect(margin + (columsInfo * 3), fBase + bScale, columsInfo, bScale).stroke()
  doc.text(Number(data?.promedio_evaluacion).toFixed(1), margin + 5 + columsInfo * 3, fBase + bScale + 5, {
    width: columsInfo,
    align: 'center'
  })
  
  doc.rect(margin, fBase + (bScale * 2), columsInfo * 3, bScale).stroke()
  doc.text('PROMEDIO AUTOEVALUACIÓN', margin + 5, fBase + (bScale * 2) + 5, {
    width: columsInfo * 3,
    align: 'center'
  })

  doc.rect(margin + (columsInfo * 3), fBase + (bScale * 2), columsInfo, bScale).stroke()
  doc.text(Number(data?.promedio_autoevaluacion ? data?.promedio_autoevaluacion : 0).toFixed(1), margin + 5 + columsInfo * 3, fBase + (bScale * 2) + 5, {
    width: columsInfo,
    align: 'center'
  })
  
  const footerHeight = 15;
  const yFooter = heightPage - 110;

  doc.fontSize(9)
  doc.text(`${data?.evaluado_nombre} - ${data?.evaluado_cc}`, margin, yFooter,{
    width: (wu / 2) - marginH,
    align: 'center'
  })
  doc.moveTo(margin, yFooter + marginH).lineTo(margin + (wu / 2) - footerHeight, yFooter + marginH).stroke()

  doc.fontSize(8)
  doc.text('Firma Colaborador', margin, yFooter + marginH + 3,{
    width: marginH + (wu / 2) - footerHeight,
    align: 'center'
  })

  doc.fontSize(9)
  doc.text(data?.evaluadornombre.map(evaluador => `${evaluador.name} - ${evaluador.documento}`).join(', '), margin + (wu / 2), yFooter,{
    width: (wu / 2),
    align: 'center',
    lineBreak: false
  })
  doc.moveTo(margin + (wu / 2) + footerHeight, yFooter + marginH).lineTo(margin + wu, yFooter + marginH).stroke()
  
  doc.fontSize(8)
  doc.text('Firma Evaluador(es)', margin + (wu / 2) + footerHeight, yFooter + marginH + 3,{
    width: (wu / 2) - marginH,
    align: 'center'
  })

  doc.page.margins.bottom = 40
  // doc.rect(margin * 3, yFooter + 50, (wu / 3) - marginH, bScale).stroke()
  doc.text(`Fecha de Registro: ${data?.fecha_registro}`, margin * 3 - 5, yFooter + 55, {
    width: (wu / 3) - marginH,
    align: 'center',
    lineBreak: false
  })

  // doc.rect((wu / 2) + 45, yFooter + 50, (wu / 3) - marginH, bScale).stroke()
  doc.text(`Fecha de Impresión: ${data?.fecha_impresion}`, (wu / 2) + margin  ,yFooter + 55, {
    width: (wu / 3) - marginH,
    align: 'center',
    lineBreak: false
  })

  return doc;
}

export const generateDynamicPdfs = async (dataArray, idUsuario) => {
    try {
        if (!dataArray || dataArray.length === 0) {
            console.warn('No hay datos para generar PDFs');
            return [];
        }

        const paths = [];

        // Crear directorio para los PDFs del usuario
        const pdfDir = path.join(__dirname, '../../pdfs', idUsuario.toString());
        if (!fs.existsSync(pdfDir)) {
            fs.mkdirSync(pdfDir, { recursive: true });
        }

        // Generar un PDF por cada usuario en la lista
        for (const data of dataArray) {
            try {
                const doc = await generatePDF(data);

                // Crear nombre del archivo basado en el nombre del evaluado
                const fileName = `${data?.evaluado_nombre?.replace(/\s+/g, '_')}_${Date.now()}.pdf`;
                const filePath = path.join(pdfDir, fileName);

                // Guardar el PDF en el directorio
                await new Promise((resolve, reject) => {
                    doc.pipe(fs.createWriteStream(filePath));
                    doc.on('error', reject);
                    doc.on('end', resolve);
                    doc.end();
                });

                paths.push(filePath);
                console.log(`✅ PDF generado: ${filePath}`);
                fs.appendFileSync('pdf_generation.log', `✅ ${new Date().toISOString()}: PDF generado: ${filePath}\n`);

            } catch (error) {
                console.error(`Error generando PDF para ${data?.evaluado_nombre}:`, error.message);
                fs.appendFileSync('pdf_generation.log', `❌ ${new Date().toISOString()}: Error generando PDF para ${data?.evaluado_nombre}: ${error.message}\n`);
            }
        }

        return paths;

    } catch (error) {
        console.error('Error en generateDynamicPdfs:', error.message);
        fs.appendFileSync('pdf_generation.log', `❌ ${new Date().toISOString()}: Error en generateDynamicPdfs: ${error.message}\n`);
        return [];
    }
};
export const downloadPdfs = async (paths, res) => {
    if (!paths || paths.length === 0) {
        res.status(400).json({ message: "No hay PDFs para descargar" });
        return;
    }

    try {
        const tempDir = path.join(__dirname, '../../pdfs');
        const timestamp = new Date().toLocaleString('en-CA', { timeZone: 'America/Bogota' })
            .replace(/[:\s]/g, '-').replace(/\//g, '-'); // Evita problemas con nombres de archivo

        const zipFileName = `evaluaciones_${timestamp}.zip`;
        const zipPath = path.join(tempDir, zipFileName);

        // Crear el directorio si no existe
        if (!fs.existsSync(tempDir)) {
            fs.mkdirSync(tempDir, { recursive: true });
        }

        // Eliminar ZIP anterior si existe
        if (fs.existsSync(zipPath)) {
            fs.unlinkSync(zipPath);
        }

        const output = fs.createWriteStream(zipPath);
        const archive = archiver('zip', { zlib: { level: 9 } });

        output.on('close', () => {
            console.log(`✅ ZIP creado: ${zipPath} (${archive.pointer()} bytes)`);
            
            res.download(zipPath, zipFileName, (err) => {
                if (err) {
                    console.error('Error al descargar el archivo ZIP:', err);
                    res.status(500).json({ error: 'Error al descargar el archivo ZIP' });
                } else {
                    console.log('✅ ZIP descargado exitosamente');
                }

                // Eliminar el ZIP después de la descarga
                fs.unlink(zipPath, (unlinkErr) => {
                    if (unlinkErr) {
                        console.error('Error al eliminar el archivo ZIP temporal:', unlinkErr);
                    } else {
                        console.log('✅ Archivo ZIP temporal eliminado');
                    }
                });
            });
        });

        output.on('error', (err) => {
            console.error('Error en el stream de salida:', err);
            res.status(500).json({ error: 'Error al crear el archivo ZIP' });
        });

        archive.on('error', (err) => {
            console.error('Error en el archive:', err);
            res.status(500).json({ error: 'Error al comprimir los archivos' });
        });

        archive.pipe(output);

        // Agregar los archivos válidos al ZIP
        let filesAdded = 0;
        paths.forEach(file => {
            if (fs.existsSync(file)) {
                // Usar solo el nombre del archivo para una estructura más limpia
                archive.file(file, { name: path.basename(file) });
                filesAdded++;
            } else {
                console.warn(`⚠️ Archivo no encontrado: ${file}`);
            }
        });

        if (filesAdded === 0) {
            res.status(400).json({ message: "Ninguno de los archivos PDF existen" });
            return;
        }

        console.log(`📦 Agregando ${filesAdded} archivos al ZIP...`);
        archive.finalize();

    } catch (error) {
        console.error('Error en downloadPdfs:', error);
        res.status(500).json({ error: 'Error al descargar el archivo ZIP' });
    }
};

const imageToBase64 = async (imageUrl) => {
    const response = await fetch(imageUrl);
    const buffer = await response.arrayBuffer();
    const base64 = Buffer.from(buffer).toString('base64');
    return `data:${response.headers.get('content-type')};base64,${base64}`;
};

async function downloadImage(imageUrl) {
  try {
    const response = await axios.get(imageUrl, {
      responseType: 'arraybuffer',
      httpsAgent: new (await import('https')).Agent({ rejectUnauthorized: false })
    });
    return Buffer.from(response.data, 'binary');
  } catch (error) {
    console.error('Error descargando imagen:', error.message);
    return null;
  }
}

/**
 * Limpia los PDFs de un usuario después de la descarga
 * @param {string} idUsuario - ID del usuario
 */
export const cleanupUserPdfs = async (idUsuario) => {
    try {
        const userPdfDir = path.join(__dirname, '../../pdfs', idUsuario.toString());
        if (fs.existsSync(userPdfDir)) {
            fs.rmSync(userPdfDir, { recursive: true, force: true });
            console.log(`✅ Carpeta de PDFs del usuario ${idUsuario} eliminada`);
        }
    } catch (error) {
        console.error(`Error al limpiar PDFs del usuario ${idUsuario}:`, error.message);
    }
};