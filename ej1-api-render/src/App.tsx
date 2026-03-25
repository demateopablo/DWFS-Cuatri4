import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'

import './App.css'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import type { TipoFeriado } from './components/CardFeriado'
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

  return (
    <>
      <Header />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<List feriados={feriados} loading={loading} error={error} />} />
          <Route path="/list" element={<List feriados={feriados} loading={loading} error={error} />} /> {/*  /list es la ruta que renderiza feriados o el error si ocurriera */}
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App
