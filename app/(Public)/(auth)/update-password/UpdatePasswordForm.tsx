'use client';

// Import Types
// Import External Packages
import { redirect } from 'next/navigation';
import { useFormState } from 'react-dom';
import Link from 'next/link';
// Import Components
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
import updatePassword from '@/actions/auth/updatePassword';
// Import Data
// Import Assets & Icons

export default function UpdatePasswordPage() {
	const [state, formAction] = useFormState(updatePassword, undefined);

	if (state?.success) {
		redirect('/account');
	}

	return (
		<div className="mt-12 flex dark:text-white">
			<div className="mx-auto max-w-3xl grid space-y-6">
				<h1 className="text-xl font-bold text-center">Update Your Password</h1>
				{!state?.success && (
					<form action={formAction}>
						<Card className="w-full min-w-96 max-w-sm">
							<CardHeader>
								<CardTitle className="text-2xl">Update Password</CardTitle>
								<CardDescription>Enter your new password.</CardDescription>
							</CardHeader>
							<CardContent className="grid gap-4">
								<div className="grid gap-2">
									<Label htmlFor="email">Email</Label>
									<Input
										id="password"
										type="password"
										name="password"
										placeholder="NotHunter2!!"
										required
									/>
									{state?.errors?.password && (
										<p className="text-red-600">{state.errors.password}</p>
									)}
								</div>
							</CardContent>
							<CardFooter>
								<Button type="submit" className="w-full">
									Update Password
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
