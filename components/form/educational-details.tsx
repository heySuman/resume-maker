"use client";

import { Controller, useFormContext } from "react-hook-form";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
import { DatePicker } from "../ui/date-picker";

export default function EducationalForm() {

    const { control, watch } = useFormContext();
    const ongoing = watch("ongoing");

    return (
        <div className="w-full">
            <h1 className="text-2xl font-bold">Educational Background</h1>
            <p className="mb-4">
                This page is designed to collect your educational details.
            </p>

            <FieldGroup>
                <Controller
                    name="institute"
                    control={control}
                    render={({ field, fieldState }) => (
                        <Field>
                            <FieldLabel>Institute</FieldLabel>
                            <Input placeholder="Enter institute name" {...field} />
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />

                <Controller
                    name="degree"
                    control={control}
                    render={({ field, fieldState }) => (
                        <Field>
                            <FieldLabel>Degree</FieldLabel>
                            <Input placeholder="Enter your degree" {...field} />
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />

                <Controller
                    name="startDate"
                    control={control}
                    render={({ field, fieldState }) => (
                        <Field>
                            <FieldLabel htmlFor="startDate">
                                Start Date
                            </FieldLabel>
                            <DatePicker value={field.value} onChange={field.onChange} />
                            {fieldState.invalid && (<FieldError errors={[fieldState.error]} />)}
                        </Field>
                    )}
                />



                <Controller
                    name="ongoing"
                    control={control}
                    render={({ field }) => (
                        <Field orientation={"horizontal"} className="flex items=start">
                            <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                            />
                            <FieldLabel>Ongoing</FieldLabel>
                        </Field>
                    )}
                />

                {!ongoing && (
                    <Controller
                        name="endDate"
                        control={control}
                        render={({ field, fieldState }) => (
                            <Field>
                                <FieldLabel>End Date</FieldLabel>
                                <DatePicker value={field.value} onChange={field.onChange} />
                                {fieldState.invalid && (<FieldError errors={[fieldState.error]} />)}
                            </Field>
                        )}
                    />
                )}


                <Controller
                    name="description"
                    control={control}
                    render={({ field, fieldState }) => (
                        <Field>
                            <Field>
                                <FieldLabel htmlFor="phone">
                                    Description
                                </FieldLabel>
                                <Textarea
                                    placeholder="Describe what you learnt there"
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