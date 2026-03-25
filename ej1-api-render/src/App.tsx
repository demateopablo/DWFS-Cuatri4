import { useEffect, useState } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'

import './App.css'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import type { TipoFeriado } from './components/CardFeriado'
import { Buscador } from './components/Buscador'
import { About } from './pages/About'
import { List } from './pages/List'

const API_URL = `https://api.argentinadatos.com/v1/feriados/2026`

interface Feriados {
  nombre: string;
  fecha: string;
  tipo: TipoFeriado;
}

function App() {
  const [feriados, setFeriados] = useState<Feriados[]>([]); // Estado para almacenar la lista de feriados
  const [loading, setLoading] = useState<boolean>(true); // Estado para indicar si se están cargando los datos
  const [error, setError] = useState<string | null>(null); // Estado para almacenar cualquier error que ocurra durante la obtención de datos
  const [searchTerm, setSearchTerm] = useState<string>(''); // Estado para almacenar el término de búsqueda

  useEffect(() => {
    async function getFeriados(): Promise<void> {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error('No se pudo obtener la lista de feriados');
        }
        const data = await response.json();
        setFeriados(data);
      }
      catch (error) {
        setError(error instanceof Error ? error.message : 'Error desconocido');
      }
      finally {
        setLoading(false);
      }
    }
    getFeriados();
  }, [])

  // FILTRO DE BUSQUEDA: Función para determinar si un feriado coincide con el término de búsqueda

  const normalizeSearch = (term: string): string => {
    //esto es para que el buscador pueda encontrar coincidencias aunque el usuario escriba la fecha de diferentes formas
    // (ejemplos: "24 marzo 2026", "24-3-2026", "24/3/2026", "enero", "febrero", etc.)
    const monthMap: Record<string, string> = {
      enero: "1",
      febrero: "2",
      marzo: "3",
      abril: "4",
      mayo: "5",
      junio: "6",
      julio: "7",
      agosto: "8",
      septiembre: "9",
      setiembre: "9",
      octubre: "10",
      noviembre: "11",
      diciembre: "12",
    };

    //sacamos acentos y pasamos a minuscula para que el buscador no sea sensible a eso (esto me lo robe del laburo, lo usamos para búsquedas fonéticas)
    let value = term
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    // reemplazamos los nombres de los meses por su número correspondiente
    for (const [month, num] of Object.entries(monthMap)) {
      value = value.replace(new RegExp(`\\b${month}\\b`, "g"), `/${num}/`);
    }

    return value
      .replace(/\s+/g, "/")  // "24 marzo 2026" -> "24/3/2026" // reemplaza espacios por "/"
      .replace(/-/g, "/")    // "24-3-2026" -> "24/3/2026" // reemplaza guiones por "/"
      .replace(/\/+/g, "/"); // limpia ///// en caso de que el usuario haya puesto espacios y guiones juntos, o haya puesto varios espacios o guiones seguidos
  };
  
  // Función para determinar si un feriado coincide con el término de búsqueda
  const isMatchingFeriado = (feriado: Feriados, searchTerm: string): boolean => {
    const formattedDate = new Date(feriado.fecha + "T03:00:00Z").toLocaleDateString("es-AR");
    const searchLower = normalizeSearch(searchTerm);

    return (
      feriado.nombre.toLowerCase().includes(searchLower) ||
      feriado.tipo.toLowerCase().includes(searchLower) ||
      formattedDate.toLowerCase().includes(searchLower)
    );
  };

  // Filtramos la lista de feriados según el término de búsqueda
  const filteredFeriados = feriados.filter((feriado) =>
    isMatchingFeriado(feriado, searchTerm)
  );

  return (
    <>
      <Header />
      <main className="app-main">
        <Routes>
          <Route path="/" element={
            <>
              <Buscador searchTerm={searchTerm} onSearchChange={setSearchTerm} />
              <List feriados={filteredFeriados} loading={loading} error={error} />
            </>
          }
          />
          <Route path="/list" element={<Navigate to="/" replace />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App
