"use client";

import { useResumeStore } from "@/store/resume-store";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import PersonalForm from "./personal-details";

const steps = [
  { id: 0, name: "Personal Info", component: <PersonalForm /> },
  //   { id: 1, name: "Experience", component: <Experience /> },
  //   { id: 2, name: "Education", component: <Education /> },
  //   { id: 3, name: "Skills", component: <Skills /> },
  //   { id: 4, name: "Preview", component: <Preview /> },
];

export default function Stepper() {
  const { currentStep, nextStep, previousStep } = useResumeStore();
  const { trigger } = useFormContext();

  const handleNext = async () => {
    const isValid = await trigger();
    if (isValid) nextStep();
  };

  return (
    <div>
      {/* Progress bar */}
      <div className="flex justify-between mb-8">
        {steps.map((step, i) => (
          <button
            key={i}
            onClick={() => useResumeStore.setState({ currentStep: i })}
            className={`px-4 py-2 rounded ${
              i <= currentStep ? "bg-blue-600 text-white" : "bg-gray-300"
            }`}
          >
            {step.name}
          </button>
        ))}
      </div>

      {/* Current Step */}
      <div className="min-h-[500px]">{steps[currentStep].component}</div>

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <button
          type="button"
          onClick={previousStep}
          disabled={currentStep === 0}
          className="px-6 py-3 bg-gray-500 text-white rounded"
        >
          Previous
        </button>

        {currentStep < steps.length - 1 ? (
          <button
            type="button"
            onClick={handleNext}
            className="px-6 py-3 bg-blue-600 text-white rounded"
          >
            Next
          </button>
        ) : (
          <button
            type="submit"
            className="px-6 py-3 bg-green-600 text-white rounded"
          >
            Download Resume
          </button>
        )}
      </div>
    </div>
  );
}
