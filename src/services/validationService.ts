import * as yup from "yup";
import { formData } from "../types/FormTypes";
import dayjs from "dayjs";

const validationSchema: yup.ObjectSchema<formData> = yup.object({
  name: yup
    .string()
    .required("El nombre es obligatorio")
    .min(2, "El nombre debe tener al menos 2 carácteres")
    .matches(/[a-zA-Z]+$/, "El nombre solo debe contener letras"),
  lastName: yup
    .string()
    .required("El apellido es obligatorio")
    .min(2, "El apellido debe tener al menos 2 carácteres")
    .matches(/[a-zA-Z]+$/, "El nombre solo debe contener letras"),
  email: yup
    .string()
    .required("El email es obligatorio")
    .email("Debe ser un email válido"),
  address: yup
    .string()
    .required("La dirección es obligatoria")
    .min(10, "Debe contener 10 carácteres o más"),
  loanAmount: yup
    .number()
    .required("El monto del prestamo es obligatorio")
    .min(25000, "El monto mínimo es de $25000")
    .max(250000, "El monto máximo es de $250000"),
  dateOfBirth: yup
    .string()
    .required("La fecha de nacimiento es obligatoria")
    .matches(/^\d{2}\/\d{2}\/\d{4}$/, "El formato debe ser dd/mm/yyyy")
    .test("is-older-than-18", "Debe ser mayor de 18 años", (value) => {
      return dayjs(value, "DD/MM/YYYY").isBefore(dayjs().subtract(18, "years"));
    }),
  phoneNumber: yup
    .string()
    .required("El número de teléfono es obligatorio")
    .matches(/^\(\d{3}\) \d{3}-\d{4}$/, "Debe tener el formato (XXX) XXX-XXXX"),
});

export default validationSchema;
