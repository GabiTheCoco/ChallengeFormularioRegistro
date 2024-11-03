import { InputAdornment, TextField } from "@mui/material";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

export type FormInputProps = {
    label: string
    type?: string
    register: UseFormRegisterReturn
    error?: FieldError
    adornment?: React.ReactNode
}


const FormInput = ({label, type="text", register, error, adornment}: FormInputProps) => {

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (
            type === "number" && 
            !/[0-9.,]/.test(e.key) && 
            e.key !== "Backspace" && 
            e.key !== "Tab" && 
            e.key !== "ArrowUp" && 
            e.key !== "ArrowDown" && 
            e.key !== "ArrowLeft" && 
            e.key !== "ArrowRight"
        ) {
            e.preventDefault();
        }
    };

    return (
        <TextField
            variant="outlined"
            label={label}
            {...register}
            error={!!error}
            helperText={error?.message}
            fullWidth
            margin="normal"
            type={type}
            onKeyDown={handleKeyDown}
            color="secondary"
            slotProps={{
                input: {
                  startAdornment: adornment ? <InputAdornment position="start">{adornment}</InputAdornment> : null
                }
            }}
        />
    )
}

export default FormInput;