import { BookOpen, CheckCircle, Clock, AlertCircle } from "lucide-react";

export type EstadoMateria = "aprobada" | "regular" | "cursando" | "pendiente";

export interface MateriaCardProps {
  nombre: string;
  estado: EstadoMateria;
  nota?: number;
  progreso?: number;
}

const ESTADO_CONFIG = {
  aprobada: {
    color: "bg-emerald-100 text-emerald-700",
    icon: CheckCircle,
    bar: "bg-emerald-500",
    defaultProgress: 100,
  },
  regular: {
    color: "bg-amber-100 text-amber-700",
    icon: AlertCircle,
    bar: "bg-amber-500",
    defaultProgress: 75,
  },
  cursando: {
    color: "bg-blue-100 text-blue-700",
    icon: Clock,
    bar: "bg-blue-500",
    defaultProgress: 50,
  },
  pendiente: {
    color: "bg-slate-100 text-slate-500",
    icon: BookOpen,
    bar: "bg-slate-300",
    defaultProgress: 0,
  },
};

export const MateriaCard = ({
  nombre,
  estado,
  nota,
  progreso,
}: MateriaCardProps) => {
  const style = ESTADO_CONFIG[estado];
  const Icon = style.icon;
  const progresoActual =
    progreso !== undefined ? progreso : style.defaultProgress;

  return (
    <article
      /* FIX: Agregamos flex flex-col, min-h-[180px] y aumentamos el padding a p-6 */
      className="group relative bg-white rounded-[24px] p-6 border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent flex flex-col h-full min-h-[180px]"
      tabIndex={0}
      aria-labelledby={`titulo-materia-${nombre.replace(/\s+/g, "-")}`}
    >
      <div className="flex justify-between items-start mb-4">
        <span
          className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 ${style.color}`}
        >
          <Icon size={12} aria-hidden="true" />
          <span>{estado}</span>
        </span>

        {nota !== undefined && (
          <span
            className="text-2xl font-black text-slate-800"
            aria-label={`Nota final: ${nota}`}
          >
            {nota}
          </span>
        )}
      </div>

      {/* FIX: flex-1 empuja la barra inferior hacia el fondo de la tarjeta siempre */}
      <h3
        id={`titulo-materia-${nombre.replace(/\s+/g, "-")}`}
        className="text-lg font-bold text-slate-800 mb-4 leading-tight flex-1"
      >
        {nombre}
      </h3>

      <div
        className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-auto shrink-0"
        role="progressbar"
        aria-valuenow={progresoActual}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Progreso: ${progresoActual}%`}
      >
        <div
          className={`h-full ${style.bar} transition-all duration-500 ease-out`}
          style={{ width: `${progresoActual}%` }}
        ></div>
      </div>
    </article>
  );
};
