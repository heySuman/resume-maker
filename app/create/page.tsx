"use client";
import { z } from "zod";
import { Form} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import InputField from "@/components/custom/input-field";
import { usePersonalDetails } from "@/store/resume-store";
import { ButtonGroup } from "@/components/ui/button-group";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
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

export default function Page() {

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: initialPersonalDetails,
    });

    const updatePersonalDetails = usePersonalDetails((state) => state.setPersonalDetails)

    const onSubmit = (data: PersonalDetail) => {
        updatePersonalDetails(data);
    }

    return (
        <div className="w-full mx-auto p-4 bg-amber-50 dark:bg-gray-900">
            <h1 className="text-2xl font-bold">Personal Details</h1>
            <p className="mb-4">
                This page is designed to collect personal details from users.
            </p>

            <FormProvider {...form}>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <InputField
                            description="Please enter your full name."
                            label="Full Name"
                            name="fullName"
                            placeholder="Enter your fullname" />

                        <div className="w-full flex justify-between gap-2">
                            <InputField
                                description="Please enter your personal email."
                                label="Email"
                                className="flex-1"
                                name="email"
                                placeholder="Enter your email" />

                            <InputField
                                description="Please enter your contact number."
                                label="Phone"
                                className="flex-1"
                                name="phone"
                                placeholder="Enter your phone number" />

                        </div>

                        <InputField
                            description="Please enter your address."
                            label="Address"
                            name="address"
                            placeholder="Enter your address" />

                        <div className="w-full flex justify-between gap-2">
                            <InputField
                                description="Please enter your country."
                                label="Country"
                                name="country"
                                className="flex-1"
                                placeholder="Enter your country" />

                            <InputField
                                description="Please enter your country."
                                label="Postal Code"
                                name="postalCode"
                                className="flex-1"
                                placeholder="Enter your postal address" />
                        </div>

                        <ButtonGroup className="w-full flex justify-between">
                            <ButtonGroup>
                                <Button>Submit</Button>
                            </ButtonGroup>

                            <ButtonGroup>
                                <Button variant="outline" aria-label="Previous">
                                    <ArrowLeftIcon />
                                </Button>
                                <Button variant="outline" aria-label="Next">
                                    <ArrowRightIcon />
                                </Button>
                            </ButtonGroup>
                        </ButtonGroup>
                    </form>
                </Form>
            </FormProvider>
        </div >
    )
}