import { useState, useEffect } from 'react'

import './App.css'
import Card from "./Card"

const API_URL = `https://api.argentinadatos.com/v1/feriados/2026`

interface Feriados {
  nombre: string;
  fecha: string;
  tipo: string;
}

function App() {

  const [feriados, setFeriados] = useState<Feriados[]>();




  useEffect(() => {
    async function getFeriados(): Promise<void> {
      try {
        const cotizaciones = await fetch(API_URL);
        const data = await cotizaciones.json();
        setFeriados(data);
      }
      catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    getFeriados();
  }, [])

  return (
    <>
      <header>
        <h1>Feriados</h1>
      </header>
      <main>
          {
            !feriados || feriados.length === 0 ? (
              <h3>Cargando feriados...</h3>
            ) : (
              feriados.map((feriado, index) => (
                <Card key={index} nombre={feriado.nombre} fecha={feriado.fecha} tipo={feriado.tipo} />
              ))
            )
          }
      </main>
    </>
  )
}

export default App
