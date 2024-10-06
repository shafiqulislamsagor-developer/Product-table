'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { Checkbox } from '../ui/checkbox';

// Define the form schema using zod
const FormSchema = z.object({
  user: z.string().min(1, {
    message: 'Please enter a valid username or email.',
  }),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters.',
  }),
  checkbox: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the terms.',
  }),
});

// Create the form component
export function LoginForm() {
  // Use the react-hook-form hook with zod validation
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      user: '',
      password: '',
      checkbox: false, // Default checkbox value
    },
  });

  // Handle form submission
  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
        <div className="mb-6 flex items-center rounded-xl bg-black px-5 py-2 text-2xl font-semibold">
          <div className="pl-5 font-clash_display text-2xl font-semibold text-primary-500 lg:pl-0">
            Dosen<span className="text-white">bd</span>
          </div>
        </div>
        <div className="w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0">
          <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
              User Log-in
            </h1>
            {/* Render the form */}
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 md:space-y-6"
              >
                {/* User Field */}
                <FormField
                  control={form.control}
                  name="user"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your email or username</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Type email or username"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Password Field */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="••••••••"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Remember me */}
                <FormField
                  control={form.control}
                  name="checkbox"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-start">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="ml-3 text-sm">
                          <label
                            htmlFor="remember"
                            className="text-gray-500 dark:text-gray-300"
                          >
                            Remember me
                          </label>
                        </div>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Submit Button */}
                <Button type="submit" className="w-full">
                  Sign in
                </Button>
              </form>
            </Form>
            {/* <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Don’t have an account yet?{' '}
              <a
                href="#"
                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                Sign up
              </a>
            </p> */}
          </div>
        </div>
      </div>
    </section>
  );
}
