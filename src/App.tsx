import React, { useEffect, useRef } from "react";
import "./App.css";
import { Item } from "./components/Item";
import { useItems } from "./hooks/useItems";
import { useSEO } from "./hooks/useSEO";

export type ItemId = `${string}-${string}-${string}-${string}-${string}`;

export interface Item {
  id: ItemId;
  timestamp: number;
  content: string;
  checked: boolean;
}



function App() {

  useEffect(() => {
    console.log('Componente App montado');

    // componentWillUnmount
    return () => {
      console.log('Componente App desmontado');
      
    };
  }, []); // El segundo argumento es un array de dependencias, vacío en este caso

  // componentDidUpdate
  useEffect(() => {
    console.log('Componente App actualizado');
  });

  // Renderizado
  console.log('Renderizado el componente App');

  const {items, addItem, removeItem, changeCheck} = useItems()
  useSEO({ title: `[${items.length}] - Prueba Lista de items`, description: "List and items"})

  const miInputRef = useRef<HTMLInputElement | null>(null);

  // Establece el foco en el elemento de entrada cuando el componente se monta
  useEffect(() => {
    if(miInputRef.current) miInputRef.current.focus();
  }, []);


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { elements } = event.currentTarget;

    const input = elements.namedItem("item");
    const isInput = input instanceof HTMLInputElement;
    if (!isInput || input == null) return;

    addItem(input.value)
    
    input.value = "";
  };

  const handleDeleteElement = (id: ItemId) => () => {
    removeItem(id)
  };

  const handleCheck = (id: ItemId) => () => {
    changeCheck(id)
  };

  return (
    <main>
      <h1>Prueba tecnica List And Items</h1>
      <h3>Agregar y eliminar elementos de una lista</h3>

      <aside>
        <form aria-label="Add elements" onSubmit={handleSubmit}>
          <label>
            <p>Elemento nuevo:</p>
            <input
              ref={miInputRef}
              name="item"
              type="text"
              required
              placeholder="Este es un nuevo item"
            />
          </label>

          <button>Agregar elemento ➕</button>
        </form>
      </aside>

      <section>
        <h2>Lista de elementos</h2>
        {items.length === 0 ? (
          <p>
            <strong> No hay elementos agregados </strong>
          </p>
        ) : (
          <ul>
            {items.map((item) => {
              return (
                <Item
                  {...item}
                  handleCheck={handleCheck(item.id)}
                  handleRemove={handleDeleteElement(item.id)}
                  key={item.id}
                  checked={item.checked}
                />
              );
            })}
          </ul>
        )}
      </section>
    </main>
  );
}

export default App;
