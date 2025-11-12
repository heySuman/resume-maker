"use client";

import { useEffect } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
import { Plus, Trash } from "lucide-react";
import { DatePicker } from "../ui/date-picker";
import { initialExperience } from "@/types/professional-details";
import { useProfessionalExperiences } from "@/store/resume-store";
import { Field, FieldGroup, FieldLabel, FieldError } from "../ui/field";
import { useFieldArray, useFormContext, Controller } from "react-hook-form";

export default function ProfessionalExperiencesForm() {
    const { control, watch, reset, getValues } = useFormContext();
    const { fields, append, remove } = useFieldArray({
        control,
        name: "experiences",
    });

    const stored = useProfessionalExperiences((s) => s.experiences);
    const setStored = useProfessionalExperiences((s) => s.setExperiences);

    useEffect(() => {
        try {
            if (stored && stored.length) {
                const current = getValues("experiences");
                if (JSON.stringify(current) !== JSON.stringify(stored)) {
                    reset((prev) => ({ ...prev, experiences: stored }));
                }
            }
        } catch (e) {
            reset((prev) => ({ ...prev, experiences: stored }));
        }
    }, [stored, reset, getValues]);

    useEffect(() => {
        const sub = watch((value) => {
            const next = value?.experiences;
            if (!next) return;

            try {
                if (JSON.stringify(next) !== JSON.stringify(stored)) {
                    setStored(next);
                }
            } catch (e) {
                setStored(next);
            }
        });
        return () => sub.unsubscribe?.();
    }, [watch, setStored, stored]);

    return (
        <div className="w-full">
            <h1 className="text-2xl font-bold">Professional Experience</h1>
            <p className="mb-4">Add one or more past roles.</p>

            {fields.map((f, idx) => {
                const ongoing = watch(`experiences.${idx}.ongoing`);
                return (

                    <div key={f.id} className="mb-6 p-4 border rounded-lg">
                        <FieldGroup>
                            <Controller
                                name={`experiences.${idx}.company`}
                                control={control}
                                render={({ field, fieldState }) => (
                                    <Field>
                                        <FieldLabel>Company</FieldLabel>
                                        <Input placeholder="Enter company name" {...field} />
                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                    </Field>
                                )}
                            />

                            <Controller
                                name={`experiences.${idx}.title`}
                                control={control}
                                render={({ field, fieldState }) => (
                                    <Field>
                                        <FieldLabel>Title</FieldLabel>
                                        <Input placeholder="Enter job title" {...field} />
                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                    </Field>
                                )}
                            />

                            <Controller
                                name={`experiences.${idx}.city`}
                                control={control}
                                render={({ field, fieldState }) => (
                                    <Field>
                                        <FieldLabel>City</FieldLabel>
                                        <Input placeholder="Enter city" {...field} />
                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                    </Field>
                                )}
                            />

                            <Controller
                                name={`experiences.${idx}.startDate`}
                                control={control}
                                render={({ field, fieldState }) => (
                                    <Field>
                                        <FieldLabel>Start Date</FieldLabel>
                                        <DatePicker
                                            value={field.value ? new Date(field.value) : null}
                                            onChange={(d) => field.onChange(d ? d.toISOString() : "")}
                                        />
                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                    </Field>
                                )}
                            />

                            <Controller
                                name={`experiences.${idx}.ongoing`}
                                control={control}
                                render={({ field }) => (
                                    <Field orientation="horizontal" className="flex items-start">
                                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                        <FieldLabel>Ongoing</FieldLabel>
                                    </Field>
                                )}
                            />

                            {!ongoing && (
                                <Controller
                                    name={`experiences.${idx}.endDate`}
                                    control={control}
                                    render={({ field, fieldState }) => (
                                        <Field>
                                            <FieldLabel>End Date</FieldLabel>
                                            <DatePicker
                                                value={field.value ? new Date(field.value) : null}
                                                onChange={(d) => field.onChange(d ? d.toISOString() : "")}
                                            />
                                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                        </Field>
                                    )}
                                />
                            )}

                            <Controller
                                name={`experiences.${idx}.description`}
                                control={control}
                                render={({ field, fieldState }) => (
                                    <Field>
                                        <FieldLabel>Description</FieldLabel>
                                        <Textarea
                                            placeholder="Describe your responsibilities and achievements"
                                            {...field}
                                        />
                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                    </Field>
                                )}
                            />
                        </FieldGroup>

                        {fields.length > 1 && (
                            <div className="mt-4">
                                <Button variant="outline" onClick={() => remove(idx)}>
                                    <Trash /> Remove
                                </Button>
                            </div>
                        )}
                    </div>
                );
            })}

            <Button type="button" variant="ghost" onClick={() => append(initialExperience)}>
                <Plus /> Add experience
            </Button>
        </div>
    );
}