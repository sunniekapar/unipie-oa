'use client';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import SignUpForm from './components/signup-form';
import LogInForm from './components/login-form';

export default function AuthPage() {
  const [loggingIn, setLoggingIn] = useState(true);
  return (
    <>
      {loggingIn ? <LogInForm /> : <SignUpForm />}
      <Button
        size="sm"
        className="text-primary/80"
        variant="link"
        onClick={() => setLoggingIn((prev) => !prev)}
      >
        {loggingIn ? 'Create User' : 'Sign In'}
      </Button>
    </>
  );
}
