import { Table } from "@chakra-ui/react";

export const TablaProductos = ({ productos }) => {
  if (productos.length === 0) {
    return <p>No hay productos para mostrar.</p>;
  }

  return (
    <Table variant="simple">
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Nombre</Table.Th>
          <Table.Th>Precio (COP)</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {productos.map((producto, idx) => (
          <Table.Tr key={idx}>
            <Table.Td>{producto.nombre}</Table.Td>
            <Table.Td>{producto.precio.toLocaleString()}</Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
};
