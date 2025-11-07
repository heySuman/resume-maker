"use client"

import { Button } from "../ui/button";
import React, { useState } from "react";
import { ButtonGroup } from "../ui/button-group";
import PersonalForm from "../form/personal-details";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Field } from "../ui/field";

export default function MultiStep() {

    const [activeStep, setActiveStep] = useState(0);
    const steps = [
        { name: "personal", component: PersonalForm },
        { name: "personal", component: PersonalForm }
    ]

    return (
        <React.Fragment>
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
        </React.Fragment>
    )
} 