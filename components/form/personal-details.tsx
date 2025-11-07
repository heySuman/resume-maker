"use client";

import { Controller, useFormContext } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";

export default function PersonalForm() {

    const { control } = useFormContext();

    return (
        <div className="w-full">
            <h1 className="text-2xl font-bold">Personal Details</h1>
            <p className="mb-4">
                This page is designed to collect personal details from users.
            </p>

            <Controller
                name="fullName"
                control={control}
                render={({ field, fieldState }) => (
                    <Field>
                        <Field>
                            <FieldLabel htmlFor="fullName">
                                Name
                            </FieldLabel>
                            <Input
                                placeholder="Enter your name"
                                {...field}
                            />
                            {fieldState.invalid && (<FieldError errors={[fieldState.error]} />)}
                        </Field>
                    </Field>
                )}
            />
        </div >
    )
}