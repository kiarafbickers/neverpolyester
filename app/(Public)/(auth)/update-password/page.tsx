// Import Types
// Import External Packages
// Import Components
import UpdatePasswordForm from './UpdatePasswordForm';
// Import Functions & Actions & Hooks & State
import createSupabaseRLSClient from '@/lib/createSupabaseRLSClient';
// Import Data
// Import Assets & Icons

export default async function UpdatePasswordPage() {
	const supabase = createSupabaseRLSClient();

	const {
		data: { session },
	} = await supabase.auth.getSession();

	if (!session) {
		return <>We are facing an error. Please try again or contact support.</>;
	}

	return <UpdatePasswordForm />;
}
