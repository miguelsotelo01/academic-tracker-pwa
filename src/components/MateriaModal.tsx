import { X, BookOpen, GraduationCap, AlertCircle } from "lucide-react";
import { Materia } from "../data/materias";

interface MateriaModalProps {
  materia: Materia | null;
  onClose: () => void;
}

export const MateriaModal = ({ materia, onClose }: MateriaModalProps) => {
  if (!materia) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Overlay Oscuro */}
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Card */}
      <div className="bg-white rounded-[32px] p-8 w-full max-w-md relative shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        {/* Botón Cerrar */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 bg-slate-100 rounded-full text-slate-500 hover:bg-slate-200 hover:text-slate-800 transition-colors"
        >
          <X size={20} />
        </button>

        {/* Encabezado */}
        <div className="mb-6">
          <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider mb-3">
            {materia.anio}º Año
          </span>
          <h2 className="text-2xl font-extrabold text-slate-800 leading-tight">
            {materia.nombre}
          </h2>
        </div>

        {/* Info Grid */}
        <div className="space-y-4">
          {/* Estado y Nota */}
          <div className="flex gap-4">
            <div className="flex-1 bg-[#F6F7F9] p-4 rounded-2xl border border-slate-100">
              <div className="flex items-center gap-2 text-slate-400 mb-1">
                <GraduationCap size={16} />
                <span className="text-xs font-bold uppercase">Estado</span>
              </div>
              <p className="text-slate-800 font-bold capitalize">
                {materia.estado}
              </p>
            </div>

            {materia.nota && (
              <div className="flex-1 bg-emerald-50 p-4 rounded-2xl border border-emerald-100">
                <div className="flex items-center gap-2 text-emerald-600 mb-1">
                  <BookOpen size={16} />
                  <span className="text-xs font-bold uppercase">
                    Nota Final
                  </span>
                </div>
                <p className="text-3xl font-black text-emerald-700">
                  {materia.nota}
                </p>
              </div>
            )}
          </div>

          {/* Correlativas */}
          <div className="bg-amber-50 p-5 rounded-2xl border border-amber-100">
            <div className="flex items-center gap-2 text-amber-600 mb-2">
              <AlertCircle size={18} />
              <span className="text-sm font-bold uppercase">
                Correlativas Necesarias
              </span>
            </div>
            <p className="text-slate-700 text-sm leading-relaxed">
              {materia.correlativas && materia.correlativas !== "-"
                ? materia.correlativas
                : "No tiene correlativas previas."}
            </p>
          </div>
        </div>

        {/* Botón Acción */}
        <div className="mt-8">
          <button
            onClick={onClose}
            className="w-full py-3.5 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-transform active:scale-95"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
