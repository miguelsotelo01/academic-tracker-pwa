import { useState } from "react";
import {
  LayoutDashboard,
  Book,
  Calendar,
  Menu,
  X,
  GraduationCap,
} from "lucide-react";
import { Outlet, Link, useLocation } from "react-router-dom";

// 1. Movemos la configuración estática FUERA del componente para evitar re-renders innecesarios
const MENU_ITEMS = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: Book, label: "Materias", path: "/materias" },
  { icon: Calendar, label: "Finales", path: "/finales" },
];

export const MainLayout = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="h-screen p-4 md:p-6 lg:p-6 flex gap-6 font-sans text-slate-900 overflow-hidden bg-[#F6F7F9]">
      {/* OVERLAY OSCURO PARA MOBILE */}
      {/* Agregamos aria-hidden para que los lectores de pantalla lo ignoren */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
        fixed top-0 left-0 h-full w-64 bg-white p-6 shadow-2xl z-50 
        transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
        md:relative md:translate-x-0 md:rounded-[32px] md:shadow-sm border border-slate-100 md:flex md:flex-col justify-between
      `}
      >
        <div>
          <div className="flex items-center justify-between mb-10 px-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center text-white">
                <GraduationCap size={20} aria-hidden="true" />
              </div>
              <h1 className="text-xl font-bold text-slate-800">UniTracker</h1>
            </div>

            {/* Botón cerrar: Añadido aria-label y focus states */}
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="md:hidden text-slate-400 hover:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg p-1"
              aria-label="Cerrar menú"
            >
              <X size={24} aria-hidden="true" />
            </button>
          </div>

          <nav className="space-y-2" aria-label="Navegación principal">
            {MENU_ITEMS.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.label}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-current={isActive ? "page" : undefined}
                  className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    isActive
                      ? "bg-blue-50 text-blue-600 font-bold"
                      : "text-slate-400 hover:bg-slate-50"
                  }`}
                >
                  <item.icon size={20} aria-hidden="true" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <main className="flex-1 flex flex-col h-full min-w-0">
        {/* HEADER MOBILE (Oculto en Desktop lg:hidden) */}
        <header className="flex lg:hidden justify-between items-center mb-6 bg-white/60 backdrop-blur-sm p-3 rounded-[24px] shrink-0">
          <div className="flex items-center gap-3">
            {/* Botón menú: Añadido aria-label, aria-expanded y focus */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 -ml-2 text-slate-600 hover:text-blue-600 md:hidden focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
              aria-label="Abrir menú principal"
              aria-expanded={isMobileMenuOpen}
            >
              <Menu size={24} aria-hidden="true" />
            </button>

            <div>
              <h2 className="text-xl font-bold text-slate-800">
                Hola, Miguel 👋
              </h2>
            </div>
          </div>
        </header>

        {/* CONTENEDOR DE PÁGINAS (Outlet) */}
        <div className="flex-1 min-h-0 overflow-y-auto lg:overflow-hidden pb-4 lg:pb-0">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
