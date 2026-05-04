import { EstadoMateria } from "../components/MateriaCard";

export interface Materia {
  id: string;
  nombre: string;
  anio: 1 | 2 | 3 | 4 | 5; // Nuevo campo para el filtro
  estado: EstadoMateria;
  nota?: number;
  correlativas?: string; // Texto simple por ahora (ej: "Física I, Análisis I")
}

export const MIS_MATERIAS: Materia[] = [
  // --- 1ER AÑO ---
  {
    id: "1",
    nombre: "Análisis Matemático I",
    anio: 1,
    estado: "aprobada",
    nota: 9,
    correlativas: "-",
  },
  {
    id: "2",
    nombre: "Álgebra y Geometría Analítica",
    anio: 1,
    estado: "regular",
    correlativas: "-",
  },
  {
    id: "3",
    nombre: "Física I",
    anio: 1,
    estado: "pendiente",
    correlativas: "-",
  },
  {
    id: "4",
    nombre: "Inglés I",
    anio: 1,
    estado: "cursando",
    correlativas: "-",
  },
  {
    id: "5",
    nombre: "Lógica y Estructuras Discretas",
    anio: 1,
    estado: "aprobada",
    nota: 8,
    correlativas: "-",
  },
  {
    id: "6",
    nombre: "Algoritmos y Estructuras de Datos",
    anio: 1,
    estado: "aprobada",
    nota: 9,
    correlativas: "-",
  },
  {
    id: "7",
    nombre: "Arquitectura de Computadoras",
    anio: 1,
    estado: "pendiente",
    correlativas: "-",
  },
  {
    id: "8",
    nombre: "Sistemas y Procesos de Negocio",
    anio: 1,
    estado: "aprobada",
    nota: 10,
    correlativas: "-",
  },

  // --- 2DO AÑO ---
  {
    id: "9",
    nombre: "Análisis Matemático II",
    anio: 2,
    estado: "cursando",
    correlativas: "Análisis I, Álgebra",
  },
  {
    id: "10",
    nombre: "Física II",
    anio: 2,
    estado: "pendiente",
    correlativas: "Análisis I, Física I",
  },
  {
    id: "13",
    nombre: "Sintaxis y Semántica de los Lenguajes",
    anio: 2,
    estado: "pendiente",
    correlativas: "Lógica, Algoritmos",
  },
  {
    id: "14",
    nombre: "Paradigmas de Programación",
    anio: 2,
    estado: "pendiente",
    correlativas: "Lógica, Algoritmos",
  },
  {
    id: "15",
    nombre: "Sistemas Operativos",
    anio: 2,
    estado: "pendiente",
    correlativas: "Arquitectura de Computadoras",
  },
  {
    id: "16",
    nombre: "Análisis de Sistemas",
    anio: 2,
    estado: "pendiente",
    correlativas: "Algoritmos, Sist. y Procesos",
  },

  // --- 3ER AÑO (Ejemplos) ---
  {
    id: "19",
    nombre: "Diseño de Sistemas",
    anio: 3,
    estado: "pendiente",
    correlativas: "Análisis de Sistemas, Paradigmas",
  },
  {
    id: "20",
    nombre: "Bases de Datos",
    anio: 3,
    estado: "pendiente",
    correlativas: "Análisis de Sistemas, Sintaxis",
  },
];
