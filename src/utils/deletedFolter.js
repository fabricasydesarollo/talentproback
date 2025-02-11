import { fileURLToPath } from "url";
import path from 'path';
import fs from 'fs';
import cron from 'node-cron'

export function initTask() {
    cron.schedule('*/1 * * * *',() => {
        limpiarCarpeta(ruta)
    })
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function limpiarCarpeta(rutaCarpeta) {
    if (fs.existsSync(rutaCarpeta)) {
        fs.readdir(rutaCarpeta, (err, archivos) => {
            if (err) {
                return console.error(`Error al leer la carpeta ${rutaCarpeta}:`, err);
            }

            archivos.forEach((archivo) => {
                const archivoPath = path.join(rutaCarpeta, archivo);
                fs.rm(archivoPath, { recursive: true, force: true }, (err) => {
                    if (err) {
                        console.error(`Error al eliminar ${archivoPath}:`, err);
                    }
                });
            });
        });
    } else {
        console.log(`La carpeta ${rutaCarpeta} no existe.`);
    }
}

const ruta = path.join(__dirname, '../../pdfs');
