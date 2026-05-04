import { useState, useMemo } from "react";
import {
  Search,
  SlidersHorizontal,
  BookX,
  ChevronDown,
  Filter,
} from "lucide-react";
import { MateriaCard, EstadoMateria } from "../components/MateriaCard";
import { MateriaModal } from "../components/MateriaModal"; // Importamos el modal
import { MIS_MATERIAS, Materia } from "../data/materias"; // Importamos el tipo Materia

type FiltroOpcion = EstadoMateria | "todas";

const FILTROS_ESTADO: { label: string; value: FiltroOpcion }[] = [
  { label: "Todas", value: "todas" },
  { label: "Cursando", value: "cursando" },
  { label: "Regulares", value: "regular" },
  { label: "Aprobadas", value: "aprobada" },
  { label: "Pendientes", value: "pendiente" },
];

export const Materias = () => {
  const [busqueda, setBusqueda] = useState("");
  const [filtroActivo, setFiltroActivo] = useState<FiltroOpcion>("todas");

  // NUEVOS ESTADOS
  const [filtroAnio, setFiltroAnio] = useState<number | "todos">("todos"); // Filtro de Año
  const [materiaSeleccionada, setMateriaSeleccionada] =
    useState<Materia | null>(null); // Para el Modal

  const materiasFiltradas = useMemo(() => {
    return MIS_MATERIAS.filter((materia) => {
      const coincideEstado =
        filtroActivo === "todas" || materia.estado === filtroActivo;
      const coincideBusqueda = materia.nombre
        .toLowerCase()
        .includes(busqueda.toLowerCase());

      // Lógica del filtro de año
      const coincideAnio =
        filtroAnio === "todos" || materia.anio === filtroAnio;

      return coincideEstado && coincideBusqueda && coincideAnio;
    });
  }, [busqueda, filtroActivo, filtroAnio]); // Agregamos filtroAnio a las dependencias

  return (
    <div className="flex flex-col h-full font-sans relative">
      {/* RENDERIZADO DEL MODAL (Si hay materia seleccionada) */}
      <MateriaModal
        materia={materiaSeleccionada}
        onClose={() => setMateriaSeleccionada(null)}
      />

      {/* HEADER (Buscador y Filtros) */}
      <section
        className="bg-white rounded-[32px] p-6 shadow-sm border border-slate-100 mb-6 shrink-0"
        aria-labelledby="materias-title"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
          <div>
            <h1
              id="materias-title"
              className="text-3xl font-extrabold text-slate-800 tracking-tight"
            >
              Mis Materias
            </h1>
            <p className="text-slate-500 font-medium mt-1">
              Plan 2023 - Ingeniería en Sistemas
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            {/* 1. EL NUEVO FILTRO DE AÑO (Dropdown Nativo Estilizado) */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Filter size={18} className="text-blue-600" />
              </div>
              <select
                value={filtroAnio}
                onChange={(e) =>
                  setFiltroAnio(
                    e.target.value === "todos"
                      ? "todos"
                      : Number(e.target.value),
                  )
                }
                className="w-full sm:w-[160px] appearance-none bg-blue-50 text-blue-700 pl-11 pr-10 py-3.5 rounded-2xl font-bold cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-blue-100 transition-colors"
                aria-label="Filtrar por año"
              >
                <option value="todos">Todos los años</option>
                <option value="1">1º Año</option>
                <option value="2">2º Año</option>
                <option value="3">3º Año</option>
                <option value="4">4º Año</option>
                <option value="5">5º Año</option>
              </select>
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                <ChevronDown size={18} className="text-blue-600" />
              </div>
            </div>

            {/* Buscador */}
            <div className="relative w-full sm:w-[300px]">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search
                  size={18}
                  className="text-slate-400"
                  aria-hidden="true"
                />
              </div>
              <input
                type="text"
                placeholder="Buscar materia..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="w-full bg-[#F6F7F9] text-slate-700 pl-11 pr-4 py-3.5 rounded-2xl border-2 border-transparent focus:bg-white focus:border-blue-500 focus:outline-none transition-all font-medium placeholder:text-slate-400"
              />
            </div>
          </div>
        </div>

        {/* Filtros de Estado (Pills) */}
        <div
          className="flex items-center gap-2 overflow-x-auto pb-2 custom-scrollbar"
          role="group"
        >
          <div className="flex items-center gap-2 text-slate-400 pr-2 border-r border-slate-200">
            <SlidersHorizontal size={18} />
            <span className="text-sm font-bold uppercase tracking-wider hidden md:block">
              Estado
            </span>
          </div>

          {FILTROS_ESTADO.map((filtro) => {
            const isActive = filtroActivo === filtro.value;
            return (
              <button
                key={filtro.value}
                onClick={() => setFiltroActivo(filtro.value)}
                className={`whitespace-nowrap px-5 py-2.5 rounded-2xl text-sm font-bold transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isActive
                    ? "bg-slate-800 text-white shadow-md shadow-slate-500/20"
                    : "bg-[#F6F7F9] text-slate-500 hover:bg-slate-200"
                }`}
              >
                {filtro.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* GRILLA DE MATERIAS */}
      <section className="flex-1 overflow-y-auto custom-scrollbar pb-6">
        {materiasFiltradas.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 auto-rows-fr pb-4">
            {materiasFiltradas.map((materia) => (
              <div
                key={materia.id}
                onClick={() => setMateriaSeleccionada(materia)}
              >
                <MateriaCard
                  nombre={materia.nombre}
                  estado={materia.estado}
                  nota={materia.nota}
                />
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center h-full min-h-[300px] text-center bg-white/50 rounded-[32px] border border-slate-100 border-dashed">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mb-4">
              <BookX size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">
              No hay resultados
            </h3>
            <p className="text-slate-500 max-w-sm mb-6">
              Prueba cambiando el año o el filtro de estado.
            </p>
            <button
              onClick={() => {
                setBusqueda("");
                setFiltroActivo("todas");
                setFiltroAnio("todos");
              }}
              className="text-blue-600 font-bold hover:text-blue-700"
            >
              Limpiar filtros
            </button>
          </div>
        )}
      </section>
    </div>
  );
};
