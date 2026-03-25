import './CardFeriado.css'

type CardProps = {
  nombre: string,
  fecha: string,
  tipo: TipoFeriado
}
export type TipoFeriado = 'puente' | 'inamovible' | 'trasladable'


function Card({ nombre, fecha, tipo }: CardProps) {

  return (
    <div className="card">
      <span className={`card-badge card-badge--${tipo}`}>{tipo}</span>
      <h2>{nombre}</h2>
      <p>{new Date(fecha + 'T03:00:00Z').toLocaleDateString('es-AR')}</p> {/* Agarramos la fecha con +3 horas para que no rompa al pasar a formato Argentino (el toLocaleDateString le resta 3 horas) */}
    </div>
  )
}

export default Card
