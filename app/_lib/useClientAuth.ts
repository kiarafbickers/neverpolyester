'use client';
// Import Types
import { Tables } from '@/supabase-types';
import { PostgrestError, User } from '@supabase/supabase-js';
// Import External Packages
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
// Import Components
// Import Functions & Actions & Hooks & State
import createSupabaseBrowserClient from '@/lib/createSupabaseBrowserClient';
// Import Data
// Import Assets & Icons

/**
 * Custom hook for CLIENT SIDE authentication.
 *
 * @param options - The authentication options.
 * @param options.checkUser - Flag indicating whether to check for user authentication.
 * @param options.checkAdmin - Flag indicating whether to check for admin authentication.
 * @param options.mustBeAdmin - Flag indicating whether the user must be an admin.
 * @param options.mustBeSignedIn - Flag indicating whether the user must be signed in.
 * @returns An object containing user, userObject, isSuperAdmin, loading, and error.
 */
export default function useClientAuth({
	checkUser = false,
	checkAdmin = false,
	mustBeAdmin = false,
	mustBeSignedIn = false,
}: {
	checkUser?: boolean;
	checkAdmin?: boolean;
	mustBeAdmin?: boolean;
	mustBeSignedIn?: boolean;
}) {
	const [user, setUser] = useState<User | null>(null);
	const [userObject, setUserObject] = useState<Tables<'users'> | null>(null);
	const [isSuperAdmin, setIsSuperAdmin] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<PostgrestError | null | unknown>(null);

	const router = useRouter();

	useEffect(() => {
		const supabase = createSupabaseBrowserClient();

		const checkAuthStatus = async () => {
			try {
				const {
					data: { user },
				} = await supabase.auth.getUser();

				if (!user) {
					setUser(null);
					setLoading(false);
					if (mustBeSignedIn || mustBeAdmin) {
						router.push('/sign-in');
					}
					return;
				}

				setUser(user);

				if (checkUser) {
					const { data, error, status } = await supabase
						.from('users')
						.select('*')
						.eq('id', user.id)
						.single();

					if (error && status !== 406) {
						setError(error);
						throw error;
					}

					if (data) {
						setUserObject(data);
					}
				}

				if (checkAdmin || mustBeAdmin) {
					const { data, error, status } = await supabase
						.from('users')
						.select('is_super_admin')
						.eq('id', user.id)
						.single();

					if (error && status !== 406) {
						setError(error);
						throw error;
					}

					if (data && data.is_super_admin === true) {
						setIsSuperAdmin(true);
					} else {
						setIsSuperAdmin(false);
						if (mustBeAdmin) {
							router.push('/account');
						}
					}
				}
			} catch (error) {
				console.error(error);
				setError(error);
			} finally {
				setLoading(false);
			}
		};

		checkAuthStatus();
	}, [checkAdmin, mustBeAdmin, mustBeSignedIn, checkUser, router]);

	return { user, userObject, isSuperAdmin, loading, error };
}
