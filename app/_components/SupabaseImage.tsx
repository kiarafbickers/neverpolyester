"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import createSupabaseBrowserClient from "@/lib/createSupabaseBrowserClient";
import { cn } from "@/utils";
import { DEFAULT_IMAGE_OPTIONS } from "@/constants";

export default function SupabaseImage({
  dbImageUrl,
  width,
  height,
  database,
  className,
  imageAlt,
  priority,
}: {
  dbImageUrl: string | null;
  width: number;
  height: number;
  database:
    | "avatars"
    | "listing_images"
    | "sublisting_images"
    | "blog_images"
    | "ad_images"
    | "cattag_images";
  className?: string;
  imageAlt?: string;
  priority: boolean;
}) {
  const supabase = createSupabaseBrowserClient();
  const [imageURL, setImageURL] = useState<string | null>(() => {
    const isLocalImage = DEFAULT_IMAGE_OPTIONS.find(
      (localImage) => localImage.nameInDB === dbImageUrl
    );
    return isLocalImage ? isLocalImage.localHref : null;
  });

  useEffect(() => {
    if (!dbImageUrl || imageURL) return;

    async function downloadImage(path: string) {
      try {
        const { data, error } = await supabase.storage
          .from(database)
          .download(path);
        if (error) throw error;

        const url = URL.createObjectURL(data);
        setImageURL(url);
      } catch (error) {
        console.error("Error downloading image: ", error);
      }
    }

    downloadImage(dbImageUrl);
  }, [dbImageUrl, imageURL, supabase, database]);

  return (
    <Image
      width={width}
      height={height}
      src={imageURL || "/img/placeholder.png"}
      alt={imageAlt || "Cover Image"}
      className={cn("object-cover bg-no-repeat h-auto w-full", className)}
      placeholder="blur"
      blurDataURL="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
      priority={priority}
      loading={priority ? "eager" : "lazy"}
    />
  );
}
