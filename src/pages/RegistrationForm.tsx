import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import validationSchema from "../services/validationService";
import { Button, Container, Typography } from "@mui/material";
import { formData } from "../types/FormTypes";
import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid2";
import FormInput from "../components/form/FormInput";
import DatePickerInput from "../components/form/DatePickerInput";
import LoanAmountInput from "../components/form/LoanAmountInput";
import PhoneNumberInput from "../components/form/PhoneNumberInput";
import DataCard from "../components/dataCard";

const RegistrationForm = () => {
  const restoredValues : formData = JSON.parse(
    localStorage.getItem("registrationFormData") || "{}"
  ); 

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<formData>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: restoredValues.name,
      lastName: restoredValues.lastName,
      email: restoredValues.email,
      address: restoredValues.address,
      dateOfBirth: restoredValues.dateOfBirth,
      loanAmount: restoredValues.loanAmount,
      phoneNumber: restoredValues.phoneNumber,
    },
  });

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [dataForm, setDataForm] = useState<formData | null>(null);

  useEffect(() => {
    if (restoredValues.dateOfBirth) {
      setSelectedDate(new Date(restoredValues.dateOfBirth));
    }
    
    const subscription = watch((data) => {
      localStorage.setItem("registrationFormData", JSON.stringify(data));
    });
    return () => subscription.unsubscribe();
  }, [control]);

  const onSubmit = (data: formData) => {
    setSelectedDate(null);
    setIsSubmitted(true);
    setDataForm(data);
    localStorage.removeItem("registrationFormData");
    reset({
      name: "",
      lastName: "",
      email: "",
      address: "",
      dateOfBirth: "",
      loanAmount: "",
      phoneNumber: ""
    });
  };

  return (
    <Container maxWidth="md">
      <Typography maxWidth="md" variant="h5" sx={{ mt: 2, mb: 2 }}>
        Formulario de registro
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* contenedor nombre, apellido, correo eletrónico */}
        <Grid
          container
          spacing={{ xs: 0, sm: 2 }}
          rowSpacing={{ xs: 1, sm: 4 }}
        >
          {/* nombre */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <FormInput
              label="Nombre *"
              register={register("name")}
              error={errors.name}
            />
          </Grid>
          {/* apellido */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <FormInput
              label="Apellido *"
              register={register("lastName")}
              error={errors.lastName}
            />
          </Grid>
        </Grid>
        {/* contenedor correo electronico, direccion, fecha de nacimiento */}
        <Grid
          container
          spacing={{ xs: 0, sm: 2 }}
          rowSpacing={{ xs: 1, sm: 4 }}
          columnSpacing={{ xs: 2 }}
        >
          {/* correo electrónico */}
          <Grid size={{ xs: 12, sm: 4, md: 4 }}>
            <FormInput
              label="Correo Electrónico *"
              register={register("email")}
              error={errors.email}
            />
          </Grid>
          {/* direccion */}
          <Grid size={{ xs: 6, sm: 4, md: 4 }}>
            <FormInput
              label="Dirección *"
              register={register("address")}
              error={errors.address}
            />
          </Grid>
          {/* fecha de nacimiento */}
          <Grid size={{ xs: 6, sm: 4, md: 4 }}>
            <DatePickerInput
              control={control}
              name="dateOfBirth"
              label="Fecha de Nacimiento *"
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              setValue={setValue}
              error={errors.dateOfBirth}
            />
          </Grid>
        </Grid>
        <Grid
          container
          spacing={{ xs: 0, sm: 2 }}
          rowSpacing={{ xs: 1, sm: 4 }}
          columnSpacing={{ xs: 2 }}
        >
          <Grid size={{ xs: 6, md: 4 }}>
            <LoanAmountInput
              label="Monto del préstamo *"
              register={register("loanAmount")}
              error={errors.loanAmount}
              adornment="$"
            />
          </Grid>
          <Grid size={{ xs: 6, md: 4 }}>
            <PhoneNumberInput
              label="Número de teléfono *"
              register={register("phoneNumber")}
              error={errors.phoneNumber}
            />
          </Grid>
          <Grid size={{ xs: 6, sm: 6, md: 2 }} sx={{ placeSelf: "center" }}>
            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="secondary"
              sx={{
                mt: { xs: 3, sm: 0 },
                fontSize: { xs: "1rem", sm: "1.25rem", md: "1rem" },
                padding: { xs: "12px 8px", sm: "10px 6px", md: "8px" },
              }}
            >
              Enviar
            </Button>
          </Grid>
          <Grid size={{ xs: 6, sm: 6, md: 2 }}  sx={{ placeSelf: "center" }}>
            <Button
              fullWidth
              onClick={() => {
                localStorage.removeItem("registrationFormData");
                setIsSubmitted(false);
                setSelectedDate(null);
                setDataForm(null);
                reset();
              }}
              variant="outlined"
              color="secondary"
              sx={{
                mt: { xs: 3, sm: 0 },
                fontSize: { xs: "1rem", sm: "1.25rem", md: "1rem" },
                padding: { xs: "12px 8px", sm: "10px 6px", md: "8px" },
              }}
            >
              Restablecer
            </Button>
          </Grid>
        </Grid>
      </form>

      {isSubmitted && dataForm && (
        <DataCard dataForm={dataForm} />
      )}
    </Container>
  );
};

export default RegistrationForm;
