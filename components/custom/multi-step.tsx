"use client"

import * as z from "zod"
import { Item } from "../ui/item";
import { Field } from "../ui/field";
import { Button } from "../ui/button";
import { useState } from "react";
import PersonalForm from "../form/personal-details";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import EducationalForm from "../form/educational-details";
import { initialPersonalDetails } from "@/types/personal-details";
import { initialEducationalDetails } from "@/types/educational-details";
import { initialExperience } from "@/types/professional-details";
import ProfessionalExperiencesForm from "../form/professional-details";
import Preview from "./preview";

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

const professionalDetail = z.object({
    company: z.string().min(1, { error: "Company is required" }),
    title: z.string().min(1, { error: "Title is required" }),
    city: z.string().optional(),
    startDate: z.string().min(1, { error: "Start Date is required" }),
    endDate: z.string().optional(),
    ongoing: z.boolean(),
    description: z.string().optional(),
});

const resumeDetails = personalDetail.extend({
    educations: z.array(educationalDetails).min(1, { error: "At least one education is required" })
}
).extend({
    experiences: z.array(professionalDetail).min(1, { error: "At least one experience is required" }),
})

export default function MultiStep() {

    const [activeStep, setActiveStep] = useState(0);
    const steps = [
        { name: "personal", component: PersonalForm },
        { name: "educational", component: EducationalForm },
        { name: "professional", component: ProfessionalExperiencesForm },
    ]

    const currentStep = steps[activeStep].name;

    const [selectedTemplate, setSelectedTemplate] = useState("basic");

    const form = useForm({
        resolver: zodResolver(resumeDetails),
        defaultValues: {
            ...initialPersonalDetails,
            educations: [{
                ...initialEducationalDetails,
                startDate: null,
                endDate: null
            }],
            experiences: [initialExperience]
        }
    })

    const onSubmit = (state: z.infer<typeof resumeDetails>) => {
        console.log(form.formState)
        console.log(state)
    }

    const printPreview = () => {
        const preview = document.getElementById("resume-preview");
        if (!preview) return;
        const content = preview.innerHTML;
        const w = window.open("", "PrintResume", "width=800,height=900");
        if (!w) return;
        w.document.write(`<!doctype html><html><head><title>Resume Preview</title>`);
        w.document.write(`<meta name="viewport" content="width=device-width,initial-scale=1"/>`);
        w.document.write(`<style>body{font-family:Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; padding:20px; color:#111} .section{margin-bottom:12px} h1{font-size:20px;margin:0} h2{font-size:14px;margin:0} .muted{color:#666;font-size:13px}</style>`);
        w.document.write(`</head><body>${content}</body></html>`);
        w.document.close();
        w.focus();
        setTimeout(() => { w.print(); }, 300);
    }

    return (
        <Item>
            <FormProvider {...form}>
                <div className="md:flex gap-6">
                    <form
                        id="resume-form"
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="w-full md:w-1/3">
                        {currentStep === "personal" && <PersonalForm />}
                        {currentStep === "educational" && <EducationalForm />}
                        {currentStep === "professional" && <ProfessionalExperiencesForm />}

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
                                activeStep === steps.length - 1 && (
                                    <>
                                        <Button
                                            variant="default"
                                            type="button"
                                            onClick={async () => {
                                                const valid = await form.trigger();
                                                console.log("Submit clicked — trigger valid:", valid);
                                                console.log("FORM VALUES:", form.getValues());
                                                console.log("FORM ERRORS:", form.formState.errors);

                                                const submitFn = form.handleSubmit(onSubmit);
                                                submitFn();
                                            }}
                                        >
                                            Submit
                                        </Button>

                                        <Button
                                            variant="ghost"
                                            onClick={() => {
                                                console.log("DEBUG — form values:", form.getValues());
                                                console.log("DEBUG — form errors:", form.formState.errors);
                                            }}
                                        >
                                            Debug
                                        </Button>
                                    </>
                                )
                            }
                        </Field>
                    </form>

                    <div className="w-full md:w-2/3">
                        <div className="mb-4 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <label className="text-sm muted">Template:</label>
                                <select className="border rounded px-2 py-1" value={selectedTemplate} onChange={(e) => setSelectedTemplate(e.target.value)}>
                                    <option value="basic">Basic</option>
                                    <option value="modern">Modern</option>
                                </select>
                            </div>

                            <div className="flex items-center gap-2">
                                <Button onClick={printPreview} variant="outline">Print / Export</Button>
                            </div>
                        </div>

                        <Preview template={selectedTemplate} />
                    </div>
                </div>
            </FormProvider>
        </Item>
    )
} 