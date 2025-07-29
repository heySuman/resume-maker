"use client";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
    name: z.string().optional(),
    email: z.email().optional(),
});

export default function Page() {

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
        },
    });

    const onSubmit = (data: any) => {
        console.log(data);
    }

    return (
        <div className="w-full mx-auto p-4 bg-amber-50 dark:bg-gray-900">
            <h1 className="text-2xl font-bold">Personal Details</h1>
            <p className="">
                This page is designed to collect personal details from users.
            </p>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor={field.name}>Name</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter your name"
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    Please enter your full name.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}>
                    </FormField>

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor={field.name}>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter your email"
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    Please enter your email address.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}>
                    </FormField>

                    <Button>Submit</Button>
                </form>
            </Form>
        </div>
    )
}