import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from "@mui/material/Grid2";

interface DataCardProps {
  dataForm: Record<string, any>;
}

const DataCard = ({ dataForm } : DataCardProps) => {
  return (
    <Box sx={{ minWidth: 275, marginTop: '20px' }}>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h5" component="div">
            Detalles del Registro
          </Typography>
          <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
            Formulario Enviado
          </Typography>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            {Object.entries(dataForm).map(([key, value]) => (
              <Grid  size={{ xs: 12, sm: 6 }} key={key}>
                <Typography variant="body2">
                  <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default DataCard;
