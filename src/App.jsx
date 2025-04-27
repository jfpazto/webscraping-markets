import { 
  Box, Typography, Grid, Select, MenuItem, Button, Paper, Table, TableBody, 
  TableCell, TableContainer, TableHead, TableRow, TextField, Checkbox, Link
} from '@mui/material';
import { useState } from 'react';
import { saveAs } from 'file-saver';
import SearchIcon from '@mui/icons-material/Search';

const productosMock = [
  {
    position: 1,
    group: "COCCION",
    subgroup: "ANAFES",
    brand: "SAMSUNG",
    sku: "UNKNOWN",
    title: "ANAJE A GAS MODELO X",
    url: "https://shop.tata.com.uy/producto1",
    image: "https://via.placeholder.com/50",
    available: true,
    currency: "UYU",
    priceRegular: 6000,
    priceOffer: 5500,
    priceRegularUSD: 150,
    priceOfferUSD: 140,
    discount: 500,
    discountPct: 8.3,
    store: "shop.tata",
    dt: "2025-04-27-11-00"
  },
  {
    position: 2,
    group: "COCCION",
    subgroup: "ANAFES",
    brand: "LG",
    sku: "UNKNOWN",
    title: "ANAJE ELECTRICO MODELO Y",
    url: "https://shop.tata.com.uy/producto2",
    image: "https://via.placeholder.com/50",
    available: false,
    currency: "UYU",
    priceRegular: 8000,
    priceOffer: 7000,
    priceRegularUSD: 200,
    priceOfferUSD: 180,
    discount: 1000,
    discountPct: 12.5,
    store: "shop.tata",
    dt: "2025-04-27-11-00"
  }
];

function App() {
  const [tienda, setTienda] = useState('');
  const [snapshot, setSnapshot] = useState('');
  const [availability, setAvailability] = useState('');
  const [sku, setSku] = useState('');
  const [productos, setProductos] = useState([]);

  const consultarProductos = () => {
    setProductos(productosMock); // Aquí luego conectas con tu backend
  };

  const limpiarCache = () => {
    console.log('Cache limpiada y datos recargados');
    setProductos([]);
  };

  const descargarCSV = () => {
    const encabezado = [
      "DISPLAY POSITION","PRODUCT GROUP","PRODUCT SUBGROUP","BRAND","SKU","TITLE",
      "URL","AVAILABLE","CURRENCY","PRICE REGULAR","PRICE OFFER",
      "PRICE REGULAR USD","PRICE OFFER USD","DISCOUNT","DISCOUNT PCT","STORE","DT"
    ].join(",") + "\n";

    const filas = productos.map((p) => [
      p.position, p.group, p.subgroup, p.brand, p.sku, `"${p.title}"`,
      p.url, p.available ? 1 : 0, p.currency, p.priceRegular, p.priceOffer,
      p.priceRegularUSD, p.priceOfferUSD, p.discount, p.discountPct, p.store, p.dt
    ].join(",")).join("\n");

    const csv = encabezado + filas;
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'productos.csv');
  };

  return (
    <Box p={4}>

      {/* Título */}
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Iris: Prices Explorer
      </Typography>

      {/* Filtros y botones */}
      <Grid container spacing={2} alignItems="center" mb={4}>
        <Grid item>
          <Select
            value={tienda}
            displayEmpty
            onChange={(e) => setTienda(e.target.value)}
            size="small"
            sx={{ width: 250 }}
          >
            <MenuItem value="" disabled>Select a store</MenuItem>
            <MenuItem value="exito">www.exito.com</MenuItem>
            <MenuItem value="homecenter">www.homecenter.com.co</MenuItem>
            <MenuItem value="falabella">www.falabella.com.co</MenuItem>
          </Select>
        </Grid>

        <Grid item>
          <TextField
            type="datetime-local"
            value={snapshot}
            onChange={(e) => setSnapshot(e.target.value)}
            size="small"
          />
        </Grid>

        <Grid item>
          <Select
            value={availability}
            displayEmpty
            onChange={(e) => setAvailability(e.target.value)}
            size="small"
            sx={{ width: 200 }}
          >
            <MenuItem value="">Availability</MenuItem>
            <MenuItem value="available">Available</MenuItem>
            <MenuItem value="not_available">Not Available</MenuItem>
          </Select>
        </Grid>

        <Grid item>
          <Select
            value={sku}
            displayEmpty
            onChange={(e) => setSku(e.target.value)}
            size="small"
            sx={{ width: 150 }}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="samsung">Samsung</MenuItem>
            <MenuItem value="lg">LG</MenuItem>
          </Select>
        </Grid>

        {/* Botón "Buscar" */}
        <Grid item>
          <Button
            variant="contained"
            startIcon={<SearchIcon />}
            color="primary"
            onClick={consultarProductos}
          >
            Buscar
          </Button>
        </Grid>

        {/* Botón "Clear Cache" */}
        <Grid item>
          <Button variant="outlined" onClick={limpiarCache}>
            Clear Cache and Reload Data
          </Button>
        </Grid>
      </Grid>

      {/* Botón Descargar CSV */}
      {productos.length > 0 && (
        <Box mb={2}>
          <Button variant="contained" color="success" onClick={descargarCSV}>
            Descargar CSV
          </Button>
        </Box>
      )}

      {/* Tabla de productos */}
      <TableContainer component={Paper} sx={{
        borderRadius: 3,
        boxShadow: 3,
        mt: 4
      }}>
        <Table size="small">
          <TableHead sx={{
            backgroundColor: '#f5f7fa'
          }}>
            <TableRow>
              {[
                "DISPLAY POSITION", "PRODUCT GROUP", "PRODUCT SUBGROUP", "BRAND", "SKU", "TITLE",
                "URL", "IMAGE", "AVAILABLE", "CURRENCY", "PRICE REGULAR", "PRICE OFFER",
                "PRICE REGULAR USD", "PRICE OFFER USD", "DISCOUNT", "DISCOUNT PCT", "STORE", "DT"
              ].map((col) => (
                <TableCell 
                  key={col}
                  sx={{
                    fontWeight: 'bold',
                    color: '#2d3748',
                    textTransform: 'uppercase',
                    fontSize: '12px'
                  }}
                >
                  {col}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {productos.map((p, idx) => (
              <TableRow 
                key={idx}
                hover
                sx={{
                  '&:hover': {
                    backgroundColor: '#edf2f7'
                  }
                }}
              >
                <TableCell>{p.position}</TableCell>
                <TableCell>{p.group}</TableCell>
                <TableCell>{p.subgroup}</TableCell>
                <TableCell>{p.brand}</TableCell>
                <TableCell>{p.sku}</TableCell>
                <TableCell>{p.title}</TableCell>
                <TableCell>
                  <Link href={p.url} target="_blank" rel="noopener" underline="hover" color="primary">
                    Link
                  </Link>
                </TableCell>
                <TableCell>
                  <img src={p.image} alt="product" width="50" height="50" style={{ borderRadius: '8px' }} />
                </TableCell>
                <TableCell>
                  <Checkbox checked={p.available} disabled />
                </TableCell>
                <TableCell>{p.currency}</TableCell>
                <TableCell>{p.priceRegular}</TableCell>
                <TableCell>{p.priceOffer}</TableCell>
                <TableCell>{p.priceRegularUSD}</TableCell>
                <TableCell>{p.priceOfferUSD}</TableCell>
                <TableCell>{p.discount}</TableCell>
                <TableCell>{p.discountPct}</TableCell>
                <TableCell>{p.store}</TableCell>
                <TableCell sx={{ whiteSpace: 'nowrap', textAlign: 'center' }}>
                  {p.dt}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>


    </Box>
  );
}

export default App;
