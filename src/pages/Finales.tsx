import { useState } from "react";
import {
  CalendarDays,
  Clock,
  CheckCircle2,
  AlertCircle,
  BookOpen,
  Target,
  ChevronRight,
} from "lucide-react";

// --- DATOS DE PRUEBA (MOCK) ---
// En el futuro puedes mover esto a tu carpeta /data
const TURNOS = [
  { id: "feb-mar", label: "Febrero / Marzo" },
  { id: "jul-ago", label: "Julio / Agosto" },
  { id: "dic", label: "Diciembre" },
];

const MIS_FINALES = [
  {
    id: 1,
    materia: "Física I",
    fecha: "2026-02-28T09:00:00",
    diasRestantes: 8,
    estadoEstudio: "Estudiando", // Estudiando, Repasando, Listo
    condicion: "Regular", // Regular, Libre
    inscripto: true,
  },
  {
    id: 2,
    materia: "Lógica y Estructuras Discretas",
    fecha: "2026-03-05T14:00:00",
    diasRestantes: 13,
    estadoEstudio: "Repasando",
    condicion: "Promocionada (Firma)",
    inscripto: false,
  },
  {
    id: 3,
    materia: "Inglés I",
    fecha: "2026-03-12T10:00:00",
    diasRestantes: 20,
    estadoEstudio: "Listo",
    condicion: "Regular",
    inscripto: true,
  },
];

export const Finales = () => {
  const [turnoActivo, setTurnoActivo] = useState("feb-mar");

  return (
    <div className="flex flex-col h-full font-sans">
      {/* ========================================================= */}
      {/* HEADER Y FILTRO DE TURNOS */}
      {/* ========================================================= */}
      <section
        className="bg-white rounded-[32px] p-6 shadow-sm border border-slate-100 mb-6 shrink-0"
        aria-labelledby="finales-title"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1
              id="finales-title"
              className="text-3xl font-extrabold text-slate-800 tracking-tight"
            >
              Turnos de Examen
            </h1>
            <p className="text-slate-500 font-medium mt-1">
              Planifica tus mesas y asegura tus correlativas.
            </p>
          </div>

          {/* Selector de Turnos (Pills) */}
          <div
            className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 custom-scrollbar"
            role="tablist"
            aria-label="Turnos de examen"
          >
            {TURNOS.map((turno) => {
              const isActive = turnoActivo === turno.id;
              return (
                <button
                  key={turno.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setTurnoActivo(turno.id)}
                  className={`whitespace-nowrap px-6 py-3 rounded-2xl text-sm font-bold transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    isActive
                      ? "bg-slate-800 text-white shadow-md shadow-slate-500/20"
                      : "bg-[#F6F7F9] text-slate-500 hover:bg-slate-200"
                  }`}
                >
                  {turno.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* CUERPO PRINCIPAL (2 COLUMNAS) */}
      {/* ========================================================= */}
      <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-6 pb-6 lg:pb-0 overflow-y-auto lg:overflow-hidden">
        {/* COLUMNA IZQUIERDA: Lista de Exámenes */}
        <section
          className="flex-1 flex flex-col gap-4 lg:overflow-y-auto custom-scrollbar pr-2"
          aria-label="Lista de exámenes próximos"
        >
          {MIS_FINALES.map((examen) => (
            <article
              key={examen.id}
              tabIndex={0}
              className="bg-white rounded-[24px] p-5 sm:p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 group flex flex-col sm:flex-row gap-6 items-start sm:items-center"
            >
              {/* Bloque de Fecha (Izquierda) */}
              <div className="bg-[#F6F7F9] rounded-[20px] p-4 flex flex-col items-center justify-center min-w-[100px] shrink-0 group-hover:bg-blue-50 transition-colors">
                <span className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">
                  {new Date(examen.fecha).toLocaleDateString("es-AR", {
                    month: "short",
                  })}
                </span>
                <span className="text-4xl font-black text-slate-800">
                  {new Date(examen.fecha).getDate()}
                </span>
              </div>

              {/* Información del Examen (Centro) */}
              <div className="flex-1">
                <h3 className="text-xl font-bold text-slate-800 mb-2 leading-tight">
                  {examen.materia}
                </h3>

                <div className="flex flex-wrap items-center gap-3 text-sm">
                  <span className="flex items-center gap-1.5 text-slate-500 font-medium">
                    <Clock size={16} />
                    {new Date(examen.fecha).toLocaleTimeString("es-AR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}{" "}
                    hs
                  </span>
                  <span className="hidden sm:inline text-slate-300">•</span>
                  <span className="flex items-center gap-1.5 text-amber-600 font-bold bg-amber-50 px-2.5 py-1 rounded-lg">
                    <AlertCircle size={14} />
                    Faltan {examen.diasRestantes} días
                  </span>
                </div>
              </div>

              {/* Estados y Acciones (Derecha) */}
              <div className="flex flex-row sm:flex-col items-center sm:items-end gap-3 w-full sm:w-auto mt-2 sm:mt-0 pt-4 sm:pt-0 border-t border-slate-100 sm:border-0">
                <span
                  className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                    examen.inscripto
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  <CheckCircle2 size={14} />
                  {examen.inscripto ? "Inscripto" : "Sin Inscribir"}
                </span>

                <button
                  className="ml-auto sm:ml-0 flex items-center gap-2 text-blue-600 font-bold text-sm hover:text-blue-800 transition-colors focus:outline-none focus:underline"
                  aria-label={`Ver detalles del final de ${examen.materia}`}
                >
                  Detalles <ChevronRight size={16} />
                </button>
              </div>
            </article>
          ))}
        </section>

        {/* COLUMNA DERECHA: Foco de Estudio (Plan de Acción) */}
        <aside className="w-full lg:w-[380px] shrink-0">
          <div className="bg-blue-600 rounded-[32px] p-8 text-white flex flex-col h-full shadow-xl shadow-blue-500/10 relative overflow-hidden">
            {/* Fondo decorativo */}
            <div className="absolute top-0 right-0 -mt-10 -mr-10 opacity-10 pointer-events-none">
              <Target size={200} />
            </div>

            <header className="relative z-10 mb-8 flex items-center gap-3">
              <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                <BookOpen size={24} className="text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-extrabold tracking-tight">
                  Foco de la Semana
                </h2>
                <p className="text-blue-200 text-sm font-medium mt-1">
                  Tu plan de acción inmediato
                </p>
              </div>
            </header>

            <div className="relative z-10 flex-1 flex flex-col gap-4">
              {/* Tarea 1 */}
              <div className="bg-white/10 hover:bg-white/20 transition-colors p-4 rounded-2xl border border-white/10 flex items-start gap-4 cursor-pointer">
                <div className="mt-1 w-5 h-5 rounded border-2 border-blue-300 flex-shrink-0"></div>
                <div>
                  <h4 className="font-bold text-lg leading-tight">
                    Termodinámica (Física I)
                  </h4>
                  <p className="text-blue-100 text-sm mt-1">
                    Repasar primer y segundo principio. Hacer guía 4.
                  </p>
                </div>
              </div>

              {/* Tarea 2 */}
              <div className="bg-white/10 hover:bg-white/20 transition-colors p-4 rounded-2xl border border-white/10 flex items-start gap-4 cursor-pointer">
                <div className="mt-1 w-5 h-5 rounded border-2 border-blue-300 flex-shrink-0"></div>
                <div>
                  <h4 className="font-bold text-lg leading-tight">
                    Lógica Proposicional
                  </h4>
                  <p className="text-blue-100 text-sm mt-1">
                    Practicar tablas de verdad complejas.
                  </p>
                </div>
              </div>
            </div>

            <button className="relative z-10 mt-8 w-full py-4 bg-white text-blue-700 rounded-2xl font-bold hover:scale-[1.02] transition-transform shadow-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600">
              Agregar Tarea
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};
