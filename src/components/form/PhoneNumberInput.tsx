import { useMask } from "@react-input/mask";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { TextField } from "@mui/material";

type phoneNumberProps = {
  label: string
  register: UseFormRegisterReturn
  error?: FieldError
};

const PhoneNumberInput = ({ label, register, error }: phoneNumberProps) => {

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      !/[0-9.,]/.test(e.key) &&
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

  const inputRef = useMask({
    mask: "(xxx) xxx-xxxx", 
    replacement: { "x": /\d/ },
  });

  return (
    <TextField
      inputRef={inputRef}
      variant="outlined"
      margin="normal"
      color="secondary"
      fullWidth
      label={label}
      {...register}
      error={!!error}
      helperText={error?.message}
      onKeyDown={handleKeyDown}
      slotProps={{
        htmlInput: {
          inputMode: "numeric",
        },
      }}
    />
  );
};

export default PhoneNumberInput;
