"use client";

// Import External Packages
import { useFormState } from "react-dom";
import Link from "next/link";
// Import Components
import { Button } from "@/ui/Button";
import { Input } from "@/ui/Input";
import { Label } from "@/ui/Label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/ui/Card";
// Import Functions & Actions & Hooks & State
import login from "@/actions/auth/login";
// Import Data
import { COMPANY_BASIC_INFORMATION } from "@/constants";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/app/_components/_ui/Alert";
import { AlertCircle } from "lucide-react";

export default function SignInPage() {
  const [state, formAction] = useFormState(login, undefined);
  return (
    <div className="mt-12 flex dark:text-white">
      <div className="mx-auto max-w-3xl grid space-y-6">
        <h1 className="text-xl font-bold text-center">
          Sign In to {COMPANY_BASIC_INFORMATION.NAME}
        </h1>
        {!state?.success && (
          <form action={formAction}>
            <Card className="w-full min-w-96 max-w-sm">
              <CardHeader>
                <CardTitle className="text-2xl">Login</CardTitle>
                <CardDescription>
                  Enter your email below to login to your account.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    required
                  />
                  {state?.errors?.email && (
                    <p className="text-red-600">{state.errors.email}</p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                  />
                  {state?.errors?.password && (
                    <div className="text-red-500">
                      <p>Password must:</p>
                      <ul>
                        {state.errors.password.map((error) => (
                          <li key={error}>- {error}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                {state?.errors?.general && (
                  <Alert variant="destructive" className="mt-4">
                    <AlertCircle className="mr-2 h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{state.errors.general}</AlertDescription>
                  </Alert>
                )}
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full">
                  Sign in
                </Button>
              </CardFooter>
            </Card>
            <div className="w-full mt-2 text-center">
              <Link
                href="/sign-up"
                className="leading-6 underline text-muted-foreground"
              >
                Click here to sign-up instead!
              </Link>
            </div>
            <div className="w-full mt-2 text-center">
              <Link
                href="/forgot-password"
                className="leading-6 underline text-muted-foreground"
              >
                Forgot Password?
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
