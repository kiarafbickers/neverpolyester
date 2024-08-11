'use client';
// Import Types
import { Tables } from '@/supabase-types';
// Import External Packages
import { useState } from 'react';
// Import Components
import Pagination from '@/ui/Pagination';
import { Switch } from '@/ui/Switch';
import { Input } from '@/ui/Input';
// Import Functions & Actions & Hooks & State
import handleUsers_ADMIN from '@/actions/users/handleUsers_ADMIN';
import { capitalize, cn, formatDate } from '@/lib/utils';
import usePagination from '@/lib/usePagination';
import { toast } from '@/lib/useToaster';
import { CheckCircle, XCircle } from 'lucide-react';
// Import Data
// Import Assets & Icons

/**
 * A table component that displays users.
 * @param users - The users to display.
 */
export default function UsersTable({
	users,
}: {
	users: Tables<'users'>[] | null;
}) {
	const [usersData, setUsersData] = useState<Tables<'users'>[]>(
		users === null ? [] : users
	);

	const {
		currentData,
		currentPage,
		totalPages,
		itemsPerPage,
		paginateBack,
		paginateFront,
		paginateBackFF,
		paginateFrontFF,
		setItemsPerPage,
		setSearchTerm,
	} = usePagination({
		initialItemsPerPage: 10,
		data: usersData,
		searchField: 'email',
	});

	const handleApproveToggle = async (
		changeUsers: Tables<'users'>,
		newState: boolean
	) => {
		const newUsersData = usersData.map((users) => {
			if (users.id === changeUsers.id) {
				users.is_active = newState;
			}
			return users;
		});
		setUsersData(newUsersData);

		await handleUsers_ADMIN(changeUsers.id, newState).then((res) =>
			res.success
				? toast({
						title: `You ${newState ? 'activated' : 'deactivated'} this users!`,
				  })
				: toast({
						title: `Error: ${res.error || 'Unknown Error'}`,
				  })
		);
	};

	return (
		<div>
			<div className="w-full flex justify-end">
				<Input
					className="w-58"
					placeholder="Search email..."
					onChange={(e) => setSearchTerm(e.target.value || '')}
				/>
			</div>

			<div className="grid">
				<div className="table table-auto w-full mt-6">
					<div className="table-header-group">
						<div className="table-row text-sm">
							<div className="table-cell h-10 px-2 text-left align-middle font-medium  border-b-2 border-neutral-200">
								Email
							</div>

							<div className="table-cell h-10 px-2 text-left align-middle font-medium  border-b-2 border-neutral-200">
								Username
							</div>

							<div className="table-cell h-10 px-2 text-left align-middle font-medium  border-b-2 border-neutral-200">
								Full Name
							</div>

							<div className="table-cell h-10 px-2 text-left align-middle font-medium  border-b-2 border-neutral-200">
								Website
							</div>
							<div className="table-cell h-10 px-2 text-left align-middle font-medium  border-b-2 border-neutral-200">
								Tag Line
							</div>

							<div className="table-cell h-10 px-2 text-left align-middle font-medium  border-b-2 border-neutral-200">
								Created
							</div>
							<div className="table-cell h-10 px-2 text-left align-middle font-medium  border-b-2 border-neutral-200">
								Super Admin
							</div>
							<div className="table-cell h-10 px-2 text-left align-middle font-medium  border-b-2 border-neutral-200">
								Active
							</div>
						</div>
					</div>
					<div className="table-row-group">
						{currentData.map((users) => (
							<div key={users.id} className={cn('table-row h-auto')}>
								<div className="table-cell content-center p-2 text-sm overflow-hidden  border-b-2 border-neutral-200">
									{users.email || '---'}
								</div>

								<div className="table-cell content-center p-2 text-sm text-muted-foreground overflow-hidden  border-b-2 border-neutral-200 break-words max-w-44">
									{users.username || '---'}
								</div>

								<div className="table-cell content-center p-2 text-sm text-muted-foreground overflow-hidden  border-b-2 border-neutral-200">
									{users.full_name || '---'}
								</div>
								<div className="table-cell content-center p-2 text-sm text-muted-foreground overflow-hidden  border-b-2 border-neutral-200">
									{users.website || '---'}
								</div>
								<div className="table-cell content-center p-2 text-sm text-muted-foreground overflow-hidden  border-b-2 border-neutral-200">
									{users.tag_line || '---'}
								</div>

								<div className="table-cell content-center text-sm p-2 align-middle border-b-2 border-neutral-200">
									{formatDate(new Date(users.created_at || 0))}
								</div>
								<div className="table-cell content-center text-sm p-2 border-b-2 border-neutral-200">
									{users.is_super_admin ? (
										<CheckCircle className="w-6 h-6 text-green-500" />
									) : (
										<XCircle className="w-6 h-6 text-red-500" />
									)}
								</div>

								<div className="table-cell content-center text-sm p-2 border-b-2 border-neutral-200">
									<Switch
										checked={users.is_active ? true : false}
										onCheckedChange={() =>
											handleApproveToggle(users, !users.is_active)
										}
									/>
								</div>
							</div>
						))}
					</div>
				</div>

				<Pagination
					itemsPerPage={itemsPerPage}
					totalItems={usersData?.length || 0}
					paginateBack={paginateBack}
					paginateFront={paginateFront}
					paginateBackFF={paginateBackFF}
					paginateFrontFF={paginateFrontFF}
					currentPage={currentPage}
					totalPages={totalPages}
					setItemsPerPage={setItemsPerPage}
					pageSizeOptions={[5, 10, 25, 50]}
					nameOfItems="users"
				/>
			</div>
		</div>
	);
}
