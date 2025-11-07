"use client";

import { Controller, useFormContext } from "react-hook-form";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";

export default function PersonalForm() {

    const { control } = useFormContext();

    return (
        <div className="w-full">
            <h1 className="text-2xl font-bold">Personal Details</h1>
            <p className="mb-4">
                This page is designed to collect personal details from users.
            </p>

            <FieldGroup>
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
                <Controller
                    name="email"
                    control={control}
                    render={({ field, fieldState }) => (
                        <Field>
                            <Field>
                                <FieldLabel htmlFor="email">
                                    Email
                                </FieldLabel>
                                <Input
                                    placeholder="Enter your email"
                                    {...field}
                                />
                                {fieldState.invalid && (<FieldError errors={[fieldState.error]} />)}
                            </Field>
                        </Field>
                    )}
                />
                <Controller
                    name="address"
                    control={control}
                    render={({ field, fieldState }) => (
                        <Field>
                            <Field>
                                <FieldLabel htmlFor="address">
                                    Address
                                </FieldLabel>
                                <Input
                                    placeholder="Enter your address"
                                    {...field}
                                />
                                {fieldState.invalid && (<FieldError errors={[fieldState.error]} />)}
                            </Field>
                        </Field>
                    )}
                />
                <Controller
                    name="city"
                    control={control}
                    render={({ field, fieldState }) => (
                        <Field>
                            <Field>
                                <FieldLabel htmlFor="city">
                                    City
                                </FieldLabel>
                                <Input
                                    placeholder="Enter your city"
                                    {...field}
                                />
                                {fieldState.invalid && (<FieldError errors={[fieldState.error]} />)}
                            </Field>
                        </Field>
                    )}
                />
                <Controller
                    name="country"
                    control={control}
                    render={({ field, fieldState }) => (
                        <Field>
                            <Field>
                                <FieldLabel htmlFor="country">
                                    Country
                                </FieldLabel>
                                <Input
                                    placeholder="Enter your country"
                                    {...field}
                                />
                                {fieldState.invalid && (<FieldError errors={[fieldState.error]} />)}
                            </Field>
                        </Field>
                    )}
                />
                <Controller
                    name="phone"
                    control={control}
                    render={({ field, fieldState }) => (
                        <Field>
                            <Field>
                                <FieldLabel htmlFor="phone">
                                    Phone
                                </FieldLabel>
                                <Input
                                    placeholder="Enter your phone"
                                    {...field}
                                />
                                {fieldState.invalid && (<FieldError errors={[fieldState.error]} />)}
                            </Field>
                        </Field>
                    )}
                />
            </FieldGroup>
        </div >
    )
}