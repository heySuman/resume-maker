"use client";

import * as z from "zod";
import { useEffect } from "react";
import Stepper from "./stepper";
import { resumeSchema } from "@/schemas/resume";
import { ResumeStoreData } from "@/types/resume";
import { zodResolver } from "@hookform/resolvers/zod";
import { useResumeStore } from "@/store/resume-store";
import { useForm, FormProvider } from "react-hook-form";

export default function ResumeForm() {
  const { formData, setField } = useResumeStore();

  const form = useForm<z.infer<typeof resumeSchema>>({
    resolver: zodResolver(resumeSchema),
    defaultValues: formData,
    mode: "onChange",
  });

  useEffect(() => {
    const subscription = form.watch((value: any) => {
      useResumeStore.setState({ formData: value as ResumeStoreData });
    });

    return () => subscription.unsubscribe();
  });

  return (
    <FormProvider {...form}>
      <form>
        <Stepper />
      </form>
    </FormProvider>
  );
}
