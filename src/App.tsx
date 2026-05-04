import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";
import { Dashboard } from "./pages/Dashboard";
import { Materias } from "./pages/Materias"; // 1. IMPORTAMOS TU NUEVO COMPONENTE
import { Finales } from "./pages/Finales"; // 1. IMPORTAMOS EL COMPONENTE DE FINALES
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Layout Principal (envuelve a todas las páginas internas) */}
        <Route element={<MainLayout />}>
          {/* Ruta: / (Home) -> Muestra Dashboard */}
          <Route path="/" element={<Dashboard />} />

          {/* Ruta: /materias -> Muestra el componente real de Materias */}
          {/* 2. REEMPLAZAMOS EL COMPONENTE FALSO POR EL REAL */}
          <Route path="/materias" element={<Materias />} />

          {/* Ruta: /finales -> Puedes crearla después */}
          <Route path="/finales" element={<Finales />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
