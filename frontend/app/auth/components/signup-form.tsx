'use client';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { signup } from '@/app/actions';
import { signupFormSchema } from '../../../db/schema';
import { toast } from 'sonner';
import { redirect } from 'next/navigation';

export default function SignUpForm() {
  const form = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  function onSubmit(values: z.infer<typeof signupFormSchema>) {
    signup(values).then((result) => {
      if ('success' in result) {
        return toast.success(result.success, {
          action: {
            label: 'Login',
            onClick: () => redirect('/auth/'),
          },
        });
      }
      if ('error' in result) return toast.error(result.error);
    });
  }

  return (
    <>
      <small>Sign up to start.</small>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-2.5 flex flex-col min-w-72"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="text-wrap">
                <FormControl>
                  <Input type="password" placeholder="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button size="sm" type="submit" className="self-center px-10">
            Create Account
          </Button>
        </form>
      </Form>
    </>
  );
}
