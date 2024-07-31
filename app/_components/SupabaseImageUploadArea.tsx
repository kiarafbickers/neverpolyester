'use client';
// Import Types
import { useEffect, useState } from 'react';
import Image from 'next/image';
// Import External Packages
// Import Components
import { Input } from '@/ui/Input';
import { Label } from '@/ui/Label';
// Import Functions & Actions & Hooks & State
import createSupabaseBrowserClient from '@/lib/createSupabaseBrowserClient';
// Import Data
// Import Assets & Icons

/**
 * A component for uploading and displaying images using Supabase.
 *
 * @param uid - The unique identifier of the user.
 * @param url - The URL of the image to be displayed.
 * @param width - The width of the image.
 * @param height - The height of the image.
 * @param onUpload - A callback function that is called when an image is uploaded.
 * @param database - The name of the Supabase storage database to use.
 */
export default function SupabaseImageUploadArea({
	uid,
	url,
	width,
	height,
	onUpload,
	database,
}: {
	uid: string | null;
	url: string | null | undefined;
	width: number;
	height: number;
	onUpload: (url: string) => void;
	database: 'avatars' | 'listing_images' | 'blog_images' | 'ad_images';
}) {
	const supabase = createSupabaseBrowserClient();
	const [imageURL, setImageURL] = useState<string | null | undefined>(null);
	const [uploading, setUploading] = useState(false);

	useEffect(() => {
		async function downloadImage(path: string) {
			try {
				const { data, error } = await supabase.storage
					.from(database)
					.download(path);
				if (error) {
					throw error;
				}

				const url = URL.createObjectURL(data);
				setImageURL(url);
			} catch (error) {
				console.error('Error downloading image: ', error);
			}
		}

		if (url) downloadImage(url);
	}, [url, supabase, database]);

	const uploadImage: React.ChangeEventHandler<HTMLInputElement> = async (
		event
	) => {
		try {
			setUploading(true);

			if (!event.target.files || event.target.files.length === 0) {
				throw new Error('You must select an image to upload.');
			}

			const file = event.target.files[0];
			const fileExt = file.name.split('.').pop();
			const filePath = `${uid}-${Math.random()}.${fileExt}`;

			const { error: uploadError } = await supabase.storage
				.from(database)
				.upload(filePath, file);

			if (uploadError) {
				throw uploadError;
			}

			onUpload(filePath);
		} catch (error) {
			alert(
				'Error uploading image. File too big or wrong format. Only .png or .jpg!'
			);
		} finally {
			setUploading(false);
		}
	};

	return (
		<div>
			<Image
				width={width}
				height={height}
				src={imageURL || '/img/placeholder.png'}
				alt="Image"
			/>
			<div className="grid w-full gap-1.5 mt-4">
				<Label htmlFor="picture" className="text-xs italic">
					Only png, jpg, jpeg, webp. Max 1mb.
				</Label>
				<Input
					type="file"
					name="picture"
					id="single"
					accept="image/*"
					onChange={uploadImage}
					disabled={uploading}
				/>
			</div>
		</div>
	);
}
