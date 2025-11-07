"use client";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import InputField from "@/components/custom/input-field";
import { usePersonalDetails } from "@/store/resume-store";
import { initialPersonalDetails, PersonalDetail } from "@/types/personal-details";

const formSchema = z.object({
    fullName: z.string(),
    email: z.email(),
    address: z.string(),
    city: z.string(),
    country: z.string(),
    phone: z.string(),
    postalCode: z.string(),
});

export default function PersonalForm() {

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: initialPersonalDetails,
    });

    const updatePersonalDetails = usePersonalDetails((state) => state.setPersonalDetails)

    const onSubmit = (data: PersonalDetail) => {
        updatePersonalDetails(data);
    }

    return (
        <div className="w-full">
            <h1 className="text-2xl font-bold">Personal Details</h1>
            <p className="mb-4">
                This page is designed to collect personal details from users.
            </p>

            <FormProvider {...form}>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <InputField
                            label="Full Name"
                            name="fullName"
                            placeholder="Enter your fullname" />

                        <div className="w-full flex justify-between gap-2">
                            <InputField
                                label="Email"
                                className="flex-1"
                                name="email"
                                placeholder="Enter your email" />

                            <InputField
                                label="Phone"
                                className="flex-1"
                                name="phone"
                                placeholder="Enter your phone number" />

                        </div>

                        <InputField
                            label="Address"
                            name="address"
                            placeholder="Enter your address" />

                        <div className="w-full flex justify-between gap-2">
                            <InputField
                                label="Country"
                                name="country"
                                className="flex-1"
                                placeholder="Enter your country" />

                            <InputField
                                label="Postal Code"
                                name="postalCode"
                                className="flex-1"
                                placeholder="Enter your postal address" />
                        </div>

                        <Button>Save</Button>
                    </form>
                </Form>
            </FormProvider>
        </div >
    )
}