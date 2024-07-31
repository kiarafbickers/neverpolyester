'use client';

// Import Types
import Link from 'next/link';
// Import External Packages
import { useFormState } from 'react-dom';
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
import signup from '@/actions/auth/signup';
// Import Data
import { GENERAL_SETTINGS, COMPANY_BASIC_INFORMATION } from '@/constants';
// Import Assets & Icons
import { AlertCircle, MailOpenIcon } from 'lucide-react';

export default function Page() {
	const [state, formAction] = useFormState(signup, undefined);
	return (
		<div className="mt-12 flex dark:text-white">
			<div className="max-3-xl mx-auto grid space-y-6">
				<h1 className="text-xl font-bold text-center">
					Sign Up to {COMPANY_BASIC_INFORMATION.NAME}
				</h1>

				{GENERAL_SETTINGS.USE_PUBLISH ? (
					state?.success ? (
						<div className="mx-auto max-w-md text-center pt-12">
							<MailOpenIcon className="mx-auto h-12 w-12 text-primary" />
							<h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
								Check Your Email
							</h1>
							<p className="mt-4 text-muted-foreground">
								We&apos;ve sent a confirmation link to your email address.
								Please check your inbox and click the link to complete your
								registration.
							</p>
						</div>
					) : (
						<form action={formAction}>
							<Card className="w-full min-w-96 max-w-sm">
								<CardHeader>
									<CardTitle className="text-2xl">Sign up</CardTitle>
									<CardDescription>
										Enter your email below to sign up.
									</CardDescription>
								</CardHeader>
								<CardContent className="grid gap-4">
									<div className="grid gap-2">
										<Label htmlFor="email">Email</Label>
										<Input
											id="email"
											name="email"
											type="email"
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
											autoComplete="new-password"
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
								</CardContent>
								<CardFooter>
									<Button type="submit" className="w-full">
										Sign up
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
					)
				) : (
					<Alert
						variant="destructive"
						className="bg-white w-fit h-fit mx-auto text-left"
					>
						<AlertCircle className="h-4 w-4" />
						<AlertTitle>Heads up!</AlertTitle>
						<AlertDescription>
							At this moment, we do not allow signups. Write us an email if you
							have any questions: {COMPANY_BASIC_INFORMATION.SUPPORT_EMAIL}.
						</AlertDescription>
					</Alert>
				)}
			</div>
		</div>
	);
}
