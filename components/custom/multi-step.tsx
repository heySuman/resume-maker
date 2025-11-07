"use client"

import { Field } from "../ui/field";
import { Button } from "../ui/button";
import React, { Activity, useState } from "react";
import PersonalForm from "../form/personal-details";
import { ArrowLeft, ArrowRight } from "lucide-react";
import * as z from "zod"
import { Controller, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { initialPersonalDetails } from "@/types/personal-details";
import { Item } from "../ui/item";

const personalDetail = z.object({
    fullName: z.string().min(2, { error: "Name is required" }),
    email: z.email().min(1, { error: "Email is required" }),
    address: z.string().min(2, { error: "Address is required" }),
    city: z.string().min(1, { error: "City is required" }),
    country: z.string().min(1, { error: "Country is required" }),
    phone: z.string().min(1, { error: "Phone is required" }),
    postalCode: z.string().optional().nullable(),
});

export default function MultiStep() {

    const [activeStep, setActiveStep] = useState(0);
    const steps = [
        { name: "personal", component: PersonalForm },
        { name: "personal", component: PersonalForm }
    ]

    const currentStep = steps[activeStep].name;

    const form = useForm({
        resolver: zodResolver(personalDetail),
        defaultValues: {
            ...initialPersonalDetails
        }
    })

    return (
        <Item>
            <FormProvider {...form}>
                <form action="" id="resume-form">
                    <Activity mode={currentStep === "personal" ? "visible" : "hidden"}>
                        <PersonalForm />
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
                    >
                        Submit
                    </Button>
                }
            </Field>
        </Item>
    )
} 