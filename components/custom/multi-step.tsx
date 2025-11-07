"use client"

import * as z from "zod"
import { Item } from "../ui/item";
import { Field } from "../ui/field";
import { Button } from "../ui/button";
import { Activity, useState } from "react";
import PersonalForm from "../form/personal-details";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import EducationalForm from "../form/educational-details";
import { initialPersonalDetails } from "@/types/personal-details";
import { initialEducationalDetails } from "@/types/educational-details";

const personalDetail = z.object({
    fullName: z.string().min(2, { error: "Name is required" }),
    email: z.email().min(1, { error: "Email is required" }),
    address: z.string().min(2, { error: "Address is required" }),
    city: z.string().min(1, { error: "City is required" }),
    country: z.string().min(1, { error: "Country is required" }),
    phone: z.string().min(1, { error: "Phone is required" }),
});

const educationalDetails = z.object({
    institute: z.string().min(2, { error: "Institute Name is required" }),
    degree: z.string().min(1, { error: "Degree is required" }),
    startDate: z.coerce.date().nullable().refine(val => val !== null, {
        message: "Start Date is required",
    }),
    endDate: z.coerce.date().optional().nullable(),
    ongoing: z.boolean(),
    description: z.string().max(100, { error: "Description must not exceed 100 words" })
});

const resumeDetails = personalDetail.extend(educationalDetails.shape)

export default function MultiStep() {

    const [activeStep, setActiveStep] = useState(0);
    const steps = [
        { name: "personal", component: PersonalForm },
        { name: "educational", component: EducationalForm }
    ]

    const currentStep = steps[activeStep].name;

    const form = useForm({
        resolver: zodResolver(resumeDetails),
        defaultValues: {
            ...initialPersonalDetails,
            ...initialEducationalDetails
        }
    })

    const onSubmit = (state: z.infer<typeof resumeDetails>) => {
        console.log(form.formState)
        console.log(state)
    }

    return (
        <Item>
            <FormProvider {...form}>
                <form id="resume-form" onSubmit={form.handleSubmit(onSubmit)}>
                    <Activity mode={currentStep === "personal" ? "visible" : "hidden"}>
                        <PersonalForm />
                    </Activity>
                    <Activity mode={currentStep === "educational" ? "visible" : "hidden"}>
                        <EducationalForm />
                    </Activity>
                </form>
            </FormProvider>

            <Field orientation={"horizontal"}>
                {
                    activeStep > 0 &&
                    <Button
                        variant="outline"
                        onClick={() => setActiveStep(prev => prev - 1)}>
                        <ArrowLeft />Previous
                    </Button>
                }
                {
                    activeStep < steps.length - 1 &&
                    <Button
                        variant="outline"
                        onClick={() => setActiveStep(prev => prev + 1)}>
                        Next <ArrowRight />
                    </Button>
                }
                {
                    activeStep === steps.length - 1 &&
                    <Button
                        variant="default"
                        type="submit"
                        form="resume-form"
                    >
                        Submit
                    </Button>
                }
            </Field>
        </Item>
    )
} 