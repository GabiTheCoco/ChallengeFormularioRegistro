import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";
import format from "date-fns/format";
import { Alert } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

interface DataCardProps {
  dataForm: Record<string, any>;
}

const DataCard = ({ dataForm }: DataCardProps) => {
  return (
    <Box sx={{ minWidth: 275, marginTop: "20px" }}>
      <Alert icon={<CheckIcon fontSize="inherit" />} severity="success" sx={{ marginBottom: "20px" }}>
        Formulario enviado con éxito!
      </Alert>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h5" component="div">
            Detalles del Registro
          </Typography>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography variant="body2" component="div">
                <strong>Nombre: </strong> {dataForm.name}
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography variant="body2" component="div">
                <strong>Apellido: </strong> {dataForm.lastName}
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography variant="body2" component="div">
                <strong>Correo electrónico: </strong> {dataForm.email}
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography variant="body2" component="div">
                <strong>Número de teléfono: </strong> {dataForm.phoneNumber}
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography variant="body2" component="div">
                <strong>Dirección: </strong> {dataForm.address}
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography variant="body2" component="div">
                <strong>Fecha de nacimiento: </strong>
                {dataForm.dateOfBirth
                  ? format(new Date(dataForm.dateOfBirth), "dd/MM/yyyy")
                  : "Fecha no disponible"}
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography variant="body2" component="div">
                <strong>Monto del préstamo: </strong> $ {dataForm.loanAmount}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default DataCard;
