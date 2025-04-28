import {
  Box, Typography, Grid, Select, MenuItem, Button, Paper, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, TextField, Checkbox, Link, Card, CardContent
} from '@mui/material';
import { useState } from 'react';
import { saveAs } from 'file-saver';
import SearchIcon from '@mui/icons-material/Search';
import DashboardSummary from './components/DashboardSummary'; 

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
    setProductos(productosMock); // Simulación de respuesta backend
  };

  const limpiarCache = () => {
    console.log('Cache limpiada y datos recargados');
    setProductos([]);
  };

  const descargarCSV = () => {
    const encabezado = [
      "DISPLAY POSITION", "PRODUCT GROUP", "PRODUCT SUBGROUP", "BRAND", "SKU", "TITLE",
      "URL", "AVAILABLE", "CURRENCY", "PRICE REGULAR", "PRICE OFFER",
      "PRICE REGULAR USD", "PRICE OFFER USD", "DISCOUNT", "DISCOUNT PCT", "STORE", "DT"
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
    <Box sx={{ backgroundColor: '#0a0f2c', minHeight: '100vh', p: 4 }}>

      <Typography variant="h4" fontWeight="bold" gutterBottom color="white" textAlign="center">
        Web Scraping de Productos
      </Typography>

      <DashboardSummary />

      {/* Card de filtros */}
      <Card sx={{ backgroundColor: '#142049', borderRadius: 4, boxShadow: 6, p: 3, mb: 5 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={2}>
              <Select
                value={tienda}
                displayEmpty
                onChange={(e) => setTienda(e.target.value)}
                size="small"
                fullWidth
                sx={{ backgroundColor: 'white', borderRadius: 2 }}
              >
                <MenuItem value="" disabled>Select a store</MenuItem>
                <MenuItem value="exito">www.exito.com</MenuItem>
                <MenuItem value="homecenter">www.homecenter.com.co</MenuItem>
                <MenuItem value="falabella">www.falabella.com.co</MenuItem>
              </Select>
            </Grid>

            <Grid item xs={12} md={2}>
              <TextField
                type="datetime-local"
                value={snapshot}
                onChange={(e) => setSnapshot(e.target.value)}
                size="small"
                fullWidth
                sx={{ backgroundColor: 'white', borderRadius: 2 }}
              />
            </Grid>

            <Grid item xs={12} md={2}>
              <Select
                value={availability}
                displayEmpty
                onChange={(e) => setAvailability(e.target.value)}
                size="small"
                fullWidth
                sx={{ backgroundColor: 'white', borderRadius: 2 }}
              >
                <MenuItem value="">Availability</MenuItem>
                <MenuItem value="available">Available</MenuItem>
                <MenuItem value="not_available">Not Available</MenuItem>
              </Select>
            </Grid>

            <Grid item xs={12} md={2}>
              <Select
                value={sku}
                displayEmpty
                onChange={(e) => setSku(e.target.value)}
                size="small"
                fullWidth
                sx={{ backgroundColor: 'white', borderRadius: 2 }}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="samsung">Samsung</MenuItem>
                <MenuItem value="lg">LG</MenuItem>
              </Select>
            </Grid>

            <Grid item xs={12} md={2}>
              <Button
                variant="contained"
                startIcon={<SearchIcon />}
                fullWidth
                sx={{
                  backgroundColor: '#00f0ff',
                  color: '#0a0f2c',
                  borderRadius: 2,
                  '&:hover': { backgroundColor: '#00c7d4' }
                }}
                onClick={consultarProductos}
              >
                Buscar
              </Button>
            </Grid>

            <Grid item xs={12} md={2}>
              <Button
                variant="outlined"
                fullWidth
                sx={{
                  color: '#00f0ff',
                  borderColor: '#00f0ff',
                  borderRadius: 2,
                  '&:hover': { backgroundColor: '#00c7d4', borderColor: '#00c7d4', color: '#0a0f2c' }
                }}
                onClick={limpiarCache}
              >
                Clear Cache
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Botón Descargar CSV */}
      {productos.length > 0 && (
        <Box mb={2} textAlign="center">
          <Button
            variant="contained"
            onClick={descargarCSV}
            sx={{
              backgroundColor: '#00f0ff',
              color: '#0a0f2c',
              borderRadius: 2,
              '&:hover': { backgroundColor: '#00c7d4' }
            }}
          >
            Descargar CSV
          </Button>
        </Box>
      )}

      {/* Card de tabla de productos */}
      <Card sx={{ backgroundColor: '#142049', borderRadius: 4, boxShadow: 6 }}>
        <CardContent>
          <TableContainer>
            <Table size="small">
              <TableHead sx={{ backgroundColor: '#00f0ff' }}>
                <TableRow>
                  {[
                    "DISPLAY POSITION", "PRODUCT GROUP", "PRODUCT SUBGROUP", "BRAND", "SKU",
                    "TITLE", "URL", "IMAGE", "AVAILABLE", "CURRENCY",
                    "PRICE REGULAR", "PRICE OFFER", "PRICE REGULAR USD", "PRICE OFFER USD",
                    "DISCOUNT", "DISCOUNT PCT", "STORE", "DT"
                  ].map((col) => (
                    <TableCell
                      key={col}
                      sx={{
                        fontWeight: 'bold',
                        color: '#0a0f2c',
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
                  <TableRow key={idx} hover sx={{ '&:hover': { backgroundColor: '#1d2a5c' } }}>
                    <TableCell sx={{ color: '#e0e0e0' }}>{p.position}</TableCell>
                    <TableCell sx={{ color: '#e0e0e0' }}>{p.group}</TableCell>
                    <TableCell sx={{ color: '#e0e0e0' }}>{p.subgroup}</TableCell>
                    <TableCell sx={{ color: '#e0e0e0' }}>{p.brand}</TableCell>
                    <TableCell sx={{ color: '#e0e0e0' }}>{p.sku}</TableCell>
                    <TableCell sx={{ color: '#e0e0e0' }}>{p.title}</TableCell>
                    <TableCell>
                      <Link href={p.url} target="_blank" rel="noopener" underline="hover" color="cyan">
                        Link
                      </Link>
                    </TableCell>
                    <TableCell>
                      <img src={p.image} alt="product" width="50" height="50" style={{ borderRadius: '8px' }} />
                    </TableCell>
                    <TableCell>
                      <Checkbox checked={p.available} disabled sx={{ color: '#00f0ff' }} />
                    </TableCell>
                    <TableCell sx={{ color: '#e0e0e0' }}>{p.currency}</TableCell>
                    <TableCell sx={{ color: '#e0e0e0' }}>{p.priceRegular}</TableCell>
                    <TableCell sx={{ color: '#e0e0e0' }}>{p.priceOffer}</TableCell>
                    <TableCell sx={{ color: '#e0e0e0' }}>{p.priceRegularUSD}</TableCell>
                    <TableCell sx={{ color: '#e0e0e0' }}>{p.priceOfferUSD}</TableCell>
                    <TableCell sx={{ color: '#e0e0e0' }}>{p.discount}</TableCell>
                    <TableCell sx={{ color: '#e0e0e0' }}>{p.discountPct}</TableCell>
                    <TableCell sx={{ color: '#e0e0e0' }}>{p.store}</TableCell>
                    <TableCell sx={{ whiteSpace: 'nowrap', textAlign: 'center', color: '#e0e0e0' }}>{p.dt}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

    </Box>
  );
}

export default App;
