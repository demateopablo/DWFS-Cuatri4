import type { ReactElement } from 'react';
import Card from '../components/CardFeriado';
import type { TipoFeriado } from '../components/CardFeriado';


type Feriado = {
  nombre: string;
  fecha: string;
  tipo: TipoFeriado;
}

type ListProps = {
  feriados: Feriado[];
  loading: boolean;
  error: string | null;
}
//div para mensaje de carga
const loadingDiv = (): ReactElement =>
  <div className="list-page">
    <p>Cargando...</p>
  </div>;

//div para mensaje de error
const errorDiv = (error: string | null): ReactElement =>
  <div className="list-page">
    <p>Error al cargar los feriados: {error}</p>
  </div>;

//div para mensaje de feriados vacíos
const emptyFeriadosDiv = (): ReactElement =>
  <div className="list-page">
    <p>No hay feriados para mostrar.</p>
  </div>;

export const List = ({ feriados, loading, error }: ListProps) => {
  if (loading) return loadingDiv();
  if (error) return errorDiv(error);
  if (feriados.length === 0) return emptyFeriadosDiv();

  return (
    <div className="list-page">
      <h2>Lista de Feriados</h2>
      <main className="list-grid">
        {feriados.map((feriado) => (
          <Card
            key={`${feriado.fecha}-${feriado.nombre}`}
            nombre={feriado.nombre}
            fecha={feriado.fecha}
            tipo={feriado.tipo}
          />
        ))}
      </main>
    </div>
  );
};