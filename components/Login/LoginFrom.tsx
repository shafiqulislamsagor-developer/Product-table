"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  user: z.string().min(1, {
    message: "Please enter a valid username.",
  }),
  password: z.string().min(1, {
    message: "Please enter a valid api key.",
  }),
});

export function LoginForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      user: "",
      password: "",
    },
  });

  const router = useRouter();

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
    if (data.user && data.password) {
      router.push("./products");
    }
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
        <div className="mb-6 flex items-center rounded-xl bg-black px-5 py-2 text-2xl font-semibold">
          <div className="pl-5 font-clash_display text-2xl font-semibold text-blue-400 lg:pl-0">
            Products<span className="text-white">Shops</span>
          </div>
        </div>
        <div className="w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0">
          <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
            <h1 className="text-xl font-bold text-center leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
              User Log-in
            </h1>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 md:space-y-6"
              >
                <FormField
                  control={form.control}
                  name="user"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your username</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Type  username"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>API Key</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Type api key"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Submit Button */}
                <Button type="submit" className="w-full">
                  Save
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}
