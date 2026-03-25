

import './Buscador.css'

type BuscadorProps = {
  searchTerm: string;
  onSearchChange: (value: string) => void; // Función para actualizar el término de búsqueda en el componente padre
};

export function Buscador({ searchTerm, onSearchChange }: BuscadorProps) {
  return (
    <div className="buscador">
      <input
        type="text"
        placeholder="Buscar feriado..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)} // Llamar a la función de actualización del término de búsqueda cuando el usuario escriba
      />
    </div>
  );
}