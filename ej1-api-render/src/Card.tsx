import './Card.css'

interface CardProps {
  nombre: string,
  fecha: string,
  tipo: string
}


function Card({ nombre: nombre, fecha: fecha, tipo: tipo }: CardProps) {

  return (
    <div className="card">
      <h2>{nombre}</h2>
      <p>{fecha}</p>
      <p>{tipo}</p>
    </div>
  )
}

export default Card
