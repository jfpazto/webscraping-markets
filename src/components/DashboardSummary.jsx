import {
    Box, Card, CardContent, Grid, Typography
  } from '@mui/material';
  import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
  import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
  
  function DashboardSummary() {
    // Simulación de datos que luego traerías del backend
    const resumen = {
      totalProducts: 1120,
      availableItems: 1117,
      notAvailableItems: 3,
      mostExposedBrand: { name: "ENXUTA", items: 262 },
      leastExposedBrand: { name: "BRILLIANT", items: 1 },
      medianDiscount: 0.0
    };
  
    return (
      <Card sx={{ backgroundColor: '#142049', borderRadius: 4, boxShadow: 6, p: 3, mb: 5 }}>
        <CardContent>
          <Grid container spacing={4} justifyContent="center">
  
            <Grid item>
              <Typography color="white" fontSize={12}>Products</Typography>
              <Typography color="#00f0ff" fontWeight="bold" fontSize={28}>{resumen.totalProducts}</Typography>
            </Grid>
  
            <Grid item>
              <Typography color="white" fontSize={12}>Available</Typography>
              <Typography color="#00f0ff" fontWeight="bold" fontSize={28}>{resumen.availableItems} Items</Typography>
            </Grid>
  
            <Grid item>
              <Typography color="white" fontSize={12}>Not Available</Typography>
              <Typography color="#00f0ff" fontWeight="bold" fontSize={28}>{resumen.notAvailableItems} Items</Typography>
            </Grid>
  
            <Grid item>
              <Typography color="white" fontSize={12}>Most Exposed Brand</Typography>
              <Typography color="#00f0ff" fontWeight="bold" fontSize={24}>{resumen.mostExposedBrand.name}</Typography>
              <Box display="flex" alignItems="center">
                <ArrowUpwardIcon sx={{ color: 'lightgreen', fontSize: 18 }} />
                <Typography color="lightgreen" fontSize={14}>{resumen.mostExposedBrand.items} Items</Typography>
              </Box>
            </Grid>
  
            <Grid item>
              <Typography color="white" fontSize={12}>Least Exposed Brand</Typography>
              <Typography color="#00f0ff" fontWeight="bold" fontSize={24}>{resumen.leastExposedBrand.name}</Typography>
              <Box display="flex" alignItems="center">
                <ArrowDownwardIcon sx={{ color: 'red', fontSize: 18 }} />
                <Typography color="red" fontSize={14}>{resumen.leastExposedBrand.items} Items</Typography>
              </Box>
            </Grid>
  
            <Grid item>
              <Typography color="white" fontSize={12}>Median Discount Percentage</Typography>
              <Typography color="#00f0ff" fontWeight="bold" fontSize={28}>{resumen.medianDiscount}%</Typography>
            </Grid>
  
          </Grid>
        </CardContent>
      </Card>
    );
  }
  
  export default DashboardSummary;
  