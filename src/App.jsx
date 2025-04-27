import { Container, Button, Select, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useState } from 'react';

const productosMock = [
  { nombre: "Producto 1", precio: 1000 },
  { nombre: "Producto 2", precio: 2000 },
  { nombre: "Producto 3", precio: 3000 }
];

function App() {
  const [tienda, setTienda] = useState('');
  const [productos, setProductos] = useState([]);

  const consultarProductos = () => {
    setProductos(productosMock);
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Select
        value={tienda}
        displayEmpty
        onChange={(e) => setTienda(e.target.value)}
        sx={{ mb: 2, width: 300 }}
      >
        <MenuItem value="" disabled>Selecciona una tienda</MenuItem>
        <MenuItem value="exito">Éxito</MenuItem>
        <MenuItem value="homecenter">Homecenter</MenuItem>
        <MenuItem value="falabella">Falabella</MenuItem>
      </Select>

      <Button variant="contained" onClick={consultarProductos} sx={{ ml: 2 }}>
        Consultar
      </Button>

      {productos.length > 0 && (
        <TableContainer component={Paper} sx={{ mt: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Precio (COP)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {productos.map((producto, idx) => (
                <TableRow key={idx}>
                  <TableCell>{producto.nombre}</TableCell>
                  <TableCell>{producto.precio.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
}

export default App;
