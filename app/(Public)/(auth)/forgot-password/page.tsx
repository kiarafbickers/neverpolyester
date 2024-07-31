'use client';

// Import Types
// Import External Packages
import { useFormState } from 'react-dom';
import Link from 'next/link';
// Import Components
import { Alert, AlertTitle, AlertDescription } from '@/ui/Alert';
import { Button } from '@/ui/Button';
import { Input } from '@/ui/Input';
import { Label } from '@/ui/Label';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/ui/Card';
// Import Functions & Actions & Hooks & State
import forgotPassword from '@/actions/auth/forgotPassword';
// Import Data
// Import Assets & Icons
import { RocketIcon } from 'lucide-react';

export default function ForgotPasswordPage() {
	const [state, formAction] = useFormState(forgotPassword, undefined);

	if (state?.success) {
		return (
			<Alert
				variant="default"
				className="bg-white w-fit h-fit max-w-sm mx-auto text-left drop-shadow-lg mt-12"
			>
				<RocketIcon className="h-6 w-6" />
				<AlertTitle className="text-lg font-semibold">
					One more step!
				</AlertTitle>
				<AlertDescription className="text-xl">
					Check your <span className="font-semibold">emails</span> for a reset
					link to update your password. You can close this window.
				</AlertDescription>
			</Alert>
		);
	}

	return (
		<div className="mt-12 flex dark:text-white">
			<div className="mx-auto max-w-3xl grid space-y-6">
				<h1 className="text-xl font-bold text-center">Forgot Password</h1>
				{!state?.success && (
					<form action={formAction}>
						<Card className="w-full min-w-96 max-w-sm">
							<CardHeader>
								<CardTitle className="text-2xl">Send Reset Link</CardTitle>
								<CardDescription>
									Enter your email below to get a reset link.
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
							</CardContent>
							<CardFooter>
								<Button type="submit" className="w-full">
									Sent Reset Link
								</Button>
							</CardFooter>
						</Card>
						<div className="w-full mt-2 text-center">
							<Link
								href="/sign-in"
								className="leading-6 underline text-muted-foreground"
							>
								Click here to sign-in instead!
							</Link>
						</div>
					</form>
				)}
			</div>
		</div>
	);
}
