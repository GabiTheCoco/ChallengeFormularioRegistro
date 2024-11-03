import { useNumberFormat } from "@react-input/number-format";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { TextField, InputAdornment } from "@mui/material";

type loanAmountProps = {
  label: string
  register: UseFormRegisterReturn
  error?: FieldError
  adornment?: React.ReactNode
};

const LoanAmountInput = ({
  label,
  register,
  error,
  adornment,
}: loanAmountProps) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      !/[0-9]/.test(e.key) &&
      e.key !== "Backspace" &&
      e.key !== "Tab" &&
      e.key !== "ArrowUp" &&
      e.key !== "ArrowDown" &&
      e.key !== "ArrowLeft" &&
      e.key !== "ArrowRight" &&
      e.key !== "Enter"
    ) {
      e.preventDefault();
    }
  };

  const inputRef = useNumberFormat({
    locales: "es-AR",
    currency: "ARS",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <TextField
      inputRef={inputRef}
      variant="outlined"
      inputMode="decimal"
      label={label}
      {...register}
      error={!!error}
      helperText={error?.message}
      fullWidth
      margin="normal"
      color="secondary"
      onKeyDown={handleKeyDown}
      slotProps={{
        htmlInput: {
          inputMode: "decimal",
        },
        input: {
          startAdornment: adornment ? (
            <InputAdornment position="start">{adornment}</InputAdornment>
          ) : null,
        },
      }}
    />
  );
};

export default LoanAmountInput;
