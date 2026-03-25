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
      <p>{fecha}</p>
    </div>
  )
}

export default Card
