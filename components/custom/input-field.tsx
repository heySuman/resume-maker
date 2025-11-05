import { Input } from "../ui/input";
import { FieldValues, useFormContext } from "react-hook-form";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";


type InputFieldProps = {
    name: keyof FieldValues;
    label: string;
    description?: string;
    placeholder?: string;
    required?: boolean,
    className?: string
};

export default function InputField({
    name,
    label,
    description,
    placeholder,
    required = false,
    className }: InputFieldProps) {

    const { control } = useFormContext();

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className={className}>
                    <FormLabel htmlFor={field.name}>
                        {label}
                        {required && <span className="text-red-500">*</span>}
                    </FormLabel>
                    <FormControl>
                        <Input
                            placeholder={placeholder}
                            {...field}
                        />
                    </FormControl>
                    <FormDescription>
                        {description}
                    </FormDescription>
                    <FormMessage />
                </FormItem>
            )}>
        </FormField>
    )
}