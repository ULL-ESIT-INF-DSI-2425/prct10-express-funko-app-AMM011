/**
 * @file notes.ts
 * Funciones utilitarias para acceder a las notas almacenadas en el sistema
 * de ficheros. 
 */

import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { Note, ResponseType } from './types.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const NOTES_FILE = path.resolve(__dirname, '../pe102/notes.json');

/**
 * Carga y parsea el fichero **JSON** con todas las notas disponibles.
 *
 * @returns Promesa que resuelve con un array de objetos.
 * @throws {Error} Si el fichero no se encuentra, no es legible o su contenido
 *         no es JSON válido.
 */
export function loadNotes(): Promise<Note[]> {
    // NOTES_FILE: Contiene el nombre del archivo
    // UTF-8: Asegura que el contenido del archivo se lea como texto en lugar de un buffer.
    return fs.readFile(NOTES_FILE, { encoding: 'utf-8' })
        // Si lectura sale bien, el contenido (raw) se procesa con JSON.parse
        .then((raw) => JSON.parse(raw) as Note[])
        .catch((err) => {
            throw new Error(`Error reading notes file: ${(err as Error).message}`);
        });
}

/**
 * Busca una nota por título.
 * 
 * @param title - Título completo
 * @return Devuelve ResponseType con los respectivos datos
 */
export function readNote(title: string): Promise<ResponseType> {
    return loadNotes().then((notes) => {
        const found = notes.find((n) => n.title === title);

        return {
            type: 'read',
            success: Boolean(found),
            notes: found ? [found] : undefined,
        } satisfies ResponseType

    });
}