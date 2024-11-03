import { Controller, UseFormSetValue } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers";
import { FormControl } from "@mui/material";
import { formData } from "../../types/FormTypes";

type datePickerProps = {
  control: any;
  name: keyof formData;
  label: string;
  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;
  setValue: UseFormSetValue<formData>;
  error: any;
};

const datePickerInput = ({
  control,
  name,
  label,
  selectedDate,
  setSelectedDate,
  setValue,
  error,
}: datePickerProps) => {
  return (
    <FormControl fullWidth margin="normal">
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <DatePicker
            {...field}
            label={label}
            value={selectedDate}
            onChange={(newValue) => {
              setSelectedDate(newValue);
              if (newValue) {
                setValue(name, newValue);
              } else {
                setValue(name, "");
              }
            }}
            disableFuture
            slotProps={{
              textField: {
                variant: "outlined",
                error: !!error,
                helperText: error?.message,
              },
            }}
          />
        )}
      />
    </FormControl>
  );
};

export default datePickerInput;
