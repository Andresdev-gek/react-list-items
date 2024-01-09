import { useEffect } from "react";

const styles = {
  baseStyle : {
    color: "black",
    fontSize: "16px",
    background: "#fff",
    padding: "6px",
    borderRadius: "12px",
    width: "fit-content",
    border: '2px solid black',
    listStyle: 'none',
    display: 'flex',
    justifyContent: 'center'
  },
  buttonChecked: {
    color: "#008f39",
    fontSize: "16px",
    padding: "6px",
    background: "#b8daba",
    borderRadius: "12px",
    width: "fit-content",
    border: '2px solid #008f39',
    listStyle: 'none',
    display: 'flex',
    justifyContent: 'space-around'
  },
  deleteButtonStyle : {
    width: "fit-content",
    padding: '0',
    margin: '4px'
  },
  spanStyle : {
    marginRight: '20px',
    fontSize: '22px'
  }
}

export function Item({
  content,
  handleRemove,
  checked,
  handleCheck,
}: Readonly<{
  content: string;
  checked: boolean;
  handleRemove: () => void;
  handleCheck: () => void;
}>) {

  useEffect(() => {
    console.log('Componente Item montado');

    // componentWillUnmount
    return () => {
      console.log('Componente Item desmontado');
      
    };
  }, []); // El segundo argumento es un array de dependencias, vacío en este caso

  // componentDidUpdate
  useEffect(() => {
    console.log('Componente Item actualizado');
  });

  // Renderizado
  console.log('Renderizado el componente Item');



  return (
    <li style={checked ? styles.buttonChecked : styles.baseStyle}>
      <span style={styles.spanStyle}>{content}</span>
      {checked ? (
        <button  onClick={handleCheck}>✅</button>
      ) : (
        <button onClick={handleCheck}>🔲</button>
      )}
      <button style={styles.deleteButtonStyle} onClick={handleRemove}>❌</button>
    </li>
  );
}
