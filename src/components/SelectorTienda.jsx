import { Select, Button, Flex } from "@chakra-ui/react";
import { useState } from "react";

export const SelectorTienda = ({ onConsultar }) => {
  const [tienda, setTienda] = useState("");

  const handleConsultar = () => {
    if (tienda) {
      onConsultar(tienda);
    }
  };

  return (
    <Flex gap={4} mb={6}>
      <Select placeholder="Selecciona una tienda" onChange={(e) => setTienda(e.target.value)}>
        <option value="exito">Éxito</option>
        <option value="homecenter">Homecenter</option>
        <option value="falabella">Falabella</option>
      </Select>
      <Button colorScheme="teal" onClick={handleConsultar}>
        Consultar
      </Button>
    </Flex>
  );
};
