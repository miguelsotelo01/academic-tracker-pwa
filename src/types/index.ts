export type EstadoMateria = "aprobada" | "regular" | "cursando" | "pendiente";

export interface Materia {
  id: string;
  nombre: string;
  anio: number; // 1, 2, 3...
  estado: EstadoMateria;
  nota?: number; // El signo de pregunta significa que es opcional (si no rendiste final, no hay nota)
  cuatrimestre?: 1 | 2 | "anual";
}
