import * as yup from "yup";
import { formData } from "../types/FormTypes";

// correos electronicos "ya registrados" para comprobar validaciones
const registeredEmails = [
  "ejemplo1@mail.com",
  "ejepmlo2@mail.com",
  "test@mail.com",
];

// esquema de validaciones con yup
const validationSchema: yup.ObjectSchema<formData> = yup.object({
  name: yup
    .string()
    .required("El nombre es obligatorio")
    .min(2, "El nombre debe tener al menos 2 carácteres")
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]+(?: [a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]+)*\s*$/, "Debe contener letras y espacios"),
  lastName: yup
    .string()
    .required("El apellido es obligatorio")
    .min(2, "El apellido debe tener al menos 2 carácteres")
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]+(?: [a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]+)*\s*$/, "Debe contener letras y espacios"),
  email: yup
    .string()
    .required("El email es obligatorio")
    .email("Debe ser un email válido")
    .test("is-unique", "El correo electrónico ya está registrado", (value) => {
      return !registeredEmails.includes(value || "");
    }),
  address: yup
    .string()
    .required("La dirección es obligatoria")
    .min(10, "Debe contener 10 carácteres o más")
    .matches(/^[a-zA-Z0-9áéíóúÁÉÍÓÚüÜñÑ\s,.-/#'()]+$/, "Debe contener letras, números, espacios y simbolos permitidos [,.-/#'())]"), 
  loanAmount: yup
    .string()
    .required("El monto del préstamo es obligatorio")
    .typeError("El monto debe ser un número válido")
    .test(
      "is-valid-number",
      "El monto debe estar entre 25.000 y 250.000",
      (value) => {
        const cleanedValue = value.replace(/\./g, "").replace(",", ".");
        const numericValue = parseFloat(cleanedValue);

        if (value === undefined || isNaN(numericValue)) return false;
        return numericValue >= 25000 && numericValue <= 250000;
      }
    ),
  dateOfBirth: yup
    .string()
    .required("La fecha de nacimiento es obligatoria")
    .test("is-valid-date", "La fecha no es válida", (value) => {
      if (!value) return false;
      const date = new Date(value);
      return !isNaN(date.getTime());
    })
    .test("is-older-than-18", "Debe ser mayor de 18 años", (value) => {
      if (!value) return false;
      const date = new Date(value);
      if (isNaN(date.getTime())) return false;

      const today = new Date();
      let age = today.getFullYear() - date.getFullYear();
      const monthDiff = today.getMonth() - date.getMonth();
      const dayDiff = today.getDate() - date.getDate();
      if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        age--;
      }
      return age >= 18;
    })
    .test(
      "is-not-future-date",
      "La fecha no puede ser en el futuro",
      (value) => {
        if (!value) return false;
        const date = new Date(value);
        if (isNaN(date.getTime())) return false;

        const today = new Date();
        return date <= today;
      }
    ),
  phoneNumber: yup
    .string()
    .required("El número de teléfono es obligatorio")
    .matches(
      /^\(\d{3}\) \d{3}-\d{4}$/,
      "El número de teléfono debe tener el formato (xxx) xxx-xxxx"
    ),
});

export default validationSchema;
