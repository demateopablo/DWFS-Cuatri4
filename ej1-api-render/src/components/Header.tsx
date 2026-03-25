import { NavLink } from 'react-router-dom';

export const Header = () => {
  return (
    <header className="app-header">
      <h1>Ejercicio API Render</h1>
      <nav>
        <NavLink to="/">Feriados</NavLink>
        <NavLink to="/about">Sobre el proyecto</NavLink>
      </nav>
    </header>
  )
}