/**
 * @file types.ts
 * Tipos comunes utilizados en la aplicación.
 */

export type Color = 'green' | 'yellow' | 'blue' | 'red' | 'magenta';

export interface Note {
  title: string;
  body: string;
  color: Color;
}

export interface ResponseType {
  type: 'add' | 'remove' | 'read' | 'list';
  success: boolean;
  notes?: Note[];
}