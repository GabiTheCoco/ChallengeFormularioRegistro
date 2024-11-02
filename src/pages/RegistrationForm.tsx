import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import validationSchema from "../services/validationService";
import { TextField, Button, Container, FormControl } from "@mui/material";
import { formData } from "../types/FormTypes";
import { DatePicker } from "@mui/x-date-pickers";
import { useState } from "react";
import { Dayjs } from "dayjs";

const RegistrationForm = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<formData>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      loanAmount: 25000,
    }
  });

  const [selectedDate] = useState<Dayjs | null>(null);

  const onSubmit = (data: formData) => {

    console.log("Formulario enviado", data);
  };

  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          variant="standard"
          label="Nombre"
          {...register("name")}
          error={!!errors.name}
          helperText={errors.name?.message}
          fullWidth
          margin="normal"
        />
        <TextField
          variant="standard"
          label="Apellido"
          {...register("lastName")}
          error={!!errors.lastName}
          helperText={errors.lastName?.message}
          fullWidth
          margin="normal"
        />
        <TextField
          variant="standard"
          label="Correo Electrónico"
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
          fullWidth
          margin="normal"
        />
        <TextField
          variant="standard"
          label="Dirección*"
          {...register("address")}
          error={!!errors.address}
          helperText={errors.address?.message}
          fullWidth
          margin="normal"
        />
        {/* <TextField
          variant="outlined"
          label="Fecha de Nacimiento"
          {...register("dateOfBirth")}
          type="date"
          error={!!errors.dateOfBirth}
          helperText={errors.dateOfBirth?.message}
          fullWidth
          margin="normal"
        /> */}
        <FormControl fullWidth margin="normal">
          <DatePicker
            label="Fecha de Nacimiento*"
            value={selectedDate}
            onChange={(newValue) => {
              if (newValue) {
                const formattedDate = newValue.format("DD/MM/YYYY");
                setValue("dateOfBirth", formattedDate);
              }
            }}
            slotProps={{
              textField: {
                variant: "standard",
                error: !!errors.dateOfBirth,
                helperText: errors.dateOfBirth?.message,
              },
            }}
          />
        </FormControl>
        <TextField
          variant="standard"
          label="Cantidad del prestamo*"
          {...register("loanAmount")}
          type="number"
          error={!!errors.loanAmount}
          helperText={errors.loanAmount?.message}
          fullWidth
          margin="normal"
        />
        <TextField
          variant="standard"
          label="Número de telefono"
          {...register("phoneNumber")}
          type="text"
          error={!!errors.phoneNumber}
          helperText={errors.phoneNumber?.message}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Enviar
        </Button>
        <Button
          onClick={() => reset()}
          variant="outlined"
          color="secondary"
          style={{ marginLeft: "8px" }}
        >
          Restablecer
        </Button>
      </form>
    </Container>
  );
};

export default RegistrationForm;
