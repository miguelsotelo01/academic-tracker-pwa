import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Bell } from "lucide-react";
import { MateriaCard } from "../components/MateriaCard";
import { MIS_MATERIAS } from "../data/materias";

export const Dashboard = () => {
  const [cantidadVisible, setCantidadVisible] = useState(3);

  useEffect(() => {
    const calcularTarjetas = () => {
      const altoPantalla = window.innerHeight;
      if (altoPantalla < 850) setCantidadVisible(2);
      else setCantidadVisible(3);
    };

    calcularTarjetas();
    window.addEventListener("resize", calcularTarjetas);
    return () => window.removeEventListener("resize", calcularTarjetas);
  }, []);

  const materiasActivas = MIS_MATERIAS.filter(
    (m) => m.estado === "cursando" || m.estado === "regular",
  );
  const materiasVisibles = materiasActivas.slice(0, cantidadVisible);

  return (
    <div className="flex-1 h-full min-h-0 relative font-sans">
      {/* ===================================================================== */}
      {/* VERSIÓN ESCRITORIO (DISEÑO BENTO BOX LIMPIO Y UNIFICADO) */}
      {/* ===================================================================== */}
      <div className="hidden lg:grid grid-cols-[2fr_1fr] gap-6 h-full min-h-0">
        {/* 1. COLUMNA HERO (FÍSICA) */}
        <section
          className="bg-blue-600 rounded-[32px] p-8 text-white relative flex flex-col justify-between shadow-xl shadow-blue-500/10 overflow-hidden h-full border border-transparent"
          aria-labelledby="hero-heading-desktop"
        >
          {/* Fondo de Imagen: alt vacío para imágenes decorativas */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <img
              src="https://images.unsplash.com/photo-1517960413843-0aee8e2b3285?q=80&w=2099&auto=format&fit=crop"
              className="w-full h-full object-cover opacity-20 mix-blend-overlay"
              alt=""
              aria-hidden="true"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900 via-blue-800/60 to-transparent"></div>
          </div>

          <header className="relative z-10 flex justify-between items-center">
            <span className="bg-white/20 px-4 py-2 rounded-full text-xs font-bold backdrop-blur-md border border-white/10 flex items-center gap-2">
              <span role="img" aria-label="Fuego">
                🔥
              </span>{" "}
              Prioridad Alta
            </span>

            {/* FIX: Ahora es un <button> real, accesible por teclado */}
            <button
              aria-label="Abrir buscador"
              className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white flex items-center gap-3 px-5 h-12 w-[240px] rounded-[20px] transition-colors cursor-pointer border border-white/10 shadow-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600"
            >
              <Search size={18} className="text-blue-100" aria-hidden="true" />
              <span className="font-medium text-sm text-blue-50">
                Buscar...
              </span>
            </button>
          </header>

          <div className="relative z-10 mt-auto">
            {/* FIX: Jerarquía de Títulos (h2 en lugar de h3) */}
            <h2
              id="hero-heading-desktop"
              className="text-5xl xl:text-6xl font-extrabold mb-4 leading-tight tracking-tight"
            >
              Final de <br /> Física I
            </h2>
            <p className="text-blue-100 max-w-md mb-8 text-lg font-medium opacity-90">
              Faltan 12 días. El foco de hoy debe ser Termodinámica.
            </p>
            <button className="bg-white text-blue-700 px-10 py-4 rounded-2xl font-bold text-sm shadow-lg hover:scale-105 transition-transform focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600">
              Ver Temario
            </button>
          </div>
        </section>

        {/* 2. COLUMNA DERECHA (MATERIAS) */}
        <section
          className="bg-white rounded-[32px] flex flex-col h-full shadow-sm border border-slate-100 overflow-hidden"
          aria-labelledby="materias-heading-desktop"
        >
          <header className="px-8 pt-8 pb-2 flex justify-between items-center shrink-0">
            <span className="font-bold text-slate-800 text-lg">
              Hola, Miguel 👋
            </span>
            {/* FIX: aria-label y focus-ring en la campana */}
            <button
              aria-label="Ver notificaciones"
              className="p-2.5 bg-[#F6F7F9] rounded-full text-slate-500 hover:text-blue-600 relative transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <Bell size={18} aria-hidden="true" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>
          </header>

          <div className="flex flex-col flex-1 px-8 pb-8 pt-2 min-h-0">
            {/* FIX: Jerarquía (h2 en lugar de h3) */}
            <h2
              id="materias-heading-desktop"
              className="text-slate-500 font-bold text-xs uppercase tracking-wider mb-5"
            >
              En Curso / Regulares
            </h2>

            <div className="flex flex-col gap-4 flex-1 overflow-y-auto pr-2 custom-scrollbar">
              {materiasVisibles.map((materia) => (
                <MateriaCard key={materia.id} {...materia} />
              ))}
            </div>

            <Link
              to="/materias"
              className="mt-6 p-4 bg-[#F6F7F9] rounded-2xl text-center font-bold text-sm text-blue-600 hover:bg-blue-50 transition-colors block shrink-0 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Ver todas ({materiasActivas.length}) →
            </Link>
          </div>
        </section>
      </div>

      {/* ===================================================================== */}
      {/* VERSIÓN MOBILE */}
      {/* ===================================================================== */}
      <div className="flex lg:hidden flex-col h-full gap-6 overflow-y-auto pb-6">
        <section
          className="bg-blue-600 rounded-[32px] p-6 text-white min-h-[300px] relative flex flex-col justify-end overflow-hidden shadow-lg shrink-0"
          aria-labelledby="hero-heading-mobile"
        >
          <img
            src="https://images.unsplash.com/photo-1517960413843-0aee8e2b3285?q=80&w=2099&auto=format&fit=crop"
            className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none"
            alt=""
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900 via-blue-800/60 to-transparent pointer-events-none"></div>

          <div className="relative z-10">
            <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold border border-white/10 mb-3 inline-flex items-center gap-1">
              <span role="img" aria-label="Fuego">
                🔥
              </span>{" "}
              Prioridad Alta
            </span>
            <h2
              id="hero-heading-mobile"
              className="text-3xl md:text-4xl font-bold mb-2 leading-tight"
            >
              Final de Física I
            </h2>
            <p className="text-blue-100 text-sm md:text-base mb-5">
              Faltan 12 días. Foco en Termodinámica.
            </p>
            <button className="bg-white text-blue-700 px-6 py-3 rounded-2xl font-bold text-sm shadow-md focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600">
              Ver Temario
            </button>
          </div>
        </section>

        <section
          className="bg-white rounded-[32px] p-6 shadow-sm border border-slate-100 flex flex-col flex-1 shrink-0 min-h-[400px]"
          aria-labelledby="materias-heading-mobile"
        >
          <h2
            id="materias-heading-mobile"
            className="text-slate-500 font-bold text-xs uppercase tracking-wider mb-4"
          >
            En Curso / Regulares
          </h2>

          <div className="flex flex-col gap-4">
            {materiasVisibles.map((materia) => (
              <MateriaCard key={materia.id} {...materia} />
            ))}
          </div>

          <Link
            to="/materias"
            className="mt-auto pt-6 p-4 bg-transparent rounded-2xl text-center font-bold text-sm text-blue-600 block focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Ver todas las materias →
          </Link>
        </section>
      </div>
    </div>
  );
};
