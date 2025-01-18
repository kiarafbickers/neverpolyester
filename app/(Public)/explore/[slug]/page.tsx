// Import Types
import { FullTagType, TagType } from "@/supabase-special-types";
import type { Metadata } from "next";
// Import External Packages
import { MDXRemote as ArticleContent } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
// Import Components
import ListingActionBar from "../_components/ListingActionBar";
import ExternalLinkButton from "@/components/listings/ExternalLinkButton";
import CommentSystem from "@/components/comments/CommentSystem";
import { useMDXComponents } from "@/mdx-components";
import ListingCard from "@/components/listings/ListingCard";
import SupabaseImage from "@/components/SupabaseImage";
import ViewPixel from "@/components/tracking/ViewPixel";
import Breadcrumps from "@/ui/Breadcrumps";
import UserAvatar from "@/ui/UserAvatar";
import {
  SectionOuterContainer,
  SectionTitle,
  SubSectionTitle,
  SectionDescription,
  SubSectionInnerContainer,
} from "@/ui/Section";
import CopyCouponCode from "../../products/_components/CopyCouponCode";
import GoogleMapsBox from "@/components/GoogleMapsBox";
import NewsletterBox_BeeHiiv from "@/components/NewsletterSection";
// Import Functions & Actions & Hooks & State
import getCommentsByCategoryAndId from "@/actions/comments/getCommentsByCategoryAndId";
import getPublishedListingBySlug from "@/actions/listings/getPublishedListingBySlug";
import getPublishedListings from "@/actions/listings/getPublishedListings";
import createMetaData from "@/lib/createMetaData";
import createSupabaseBrowserClient from "@/lib/createSupabaseBrowserClient";
import { stringToSlug } from "@/utils";
import getFullTags from "@/actions/tags/getFullTags";
// Import Data
import { COMPANY_BASIC_INFORMATION, GENERAL_SETTINGS } from "@/constants";
// Import Assets & Icons
import { BadgeCheckIcon, Copy } from "lucide-react";
import ListingCoupon from "@/app/_components/listings/ListingCoupon";
import serverAuth from "@/app/_actions/auth/serverAuth";

type Props = {
  params: { slug: string };
};

// https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes#generating-static-params

export async function generateStaticParams() {
  const supabase = createSupabaseBrowserClient();
  let results;
  try {
    results = await supabase
      .from("listings")
      .select("slug")
      .match({ is_user_published: true, is_admin_published: true });
    if (results.error) {
      console.error(results.error.message);
      return [];
    }
    if (!results.data) {
      return [];
    } else {
      return results.data.map(({ slug }) => ({ slug: slug }));
    }
  } catch (error) {
    console.error(error);
    return [];
  }
}

// https://nextjs.org/docs/app/building-your-application/optimizing/metadata

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { data: listingData } = await getPublishedListingBySlug(params.slug);

  if (!("id" in listingData)) {
    return createMetaData({
      customTitle: "Listing",
      customDescription: `This service is listed on ${COMPANY_BASIC_INFORMATION.NAME}. Find everything you need to know about this service and get in touch with the creator.`,
    });
  }

  const supabase = createSupabaseBrowserClient();
  let ogImageUrl = "";

  if (listingData.default_image_url) {
    const publicUrlLocation = supabase.storage
      .from("listing_images")
      .getPublicUrl(listingData.default_image_url);
    ogImageUrl = publicUrlLocation.data?.publicUrl ?? "";
  }

  return createMetaData({
    customTitle: listingData.title,
    customDescription:
      listingData.excerpt ??
      listingData.title ??
      `Listing on ${COMPANY_BASIC_INFORMATION.NAME}`,
    customTags: [
      listingData.category.name,
      ...listingData.tags.map((tag) => tag.name),
    ],
    customImages:
      ogImageUrl && ogImageUrl !== ""
        ? [
            {
              url: ogImageUrl,
              alt: `Image of ${listingData.title} on ${COMPANY_BASIC_INFORMATION.NAME}`,
              type: "image",
              width: 900,
              height: 600,
            },
          ]
        : undefined,
    customSlug: `explore/${params.slug}`,
  });
}

function clusterTagsByGroups(
  selected: { id: string; name: string; slug: string }[],
  allTags: FullTagType[]
) {
  const tagChoiceGroups: {
    [groupName: string]: TagType[];
  } = { Other: [] };

  selected.forEach((selectedTag) => {
    const correspondingTag = allTags.find(
      (tag) => tag.slug === selectedTag.slug
    );

    if (!correspondingTag || !correspondingTag.tag_groups) return;

    if (correspondingTag.tag_groups.length === 0) {
      tagChoiceGroups["Other"].push(correspondingTag);
    } else {
      if (!tagChoiceGroups[correspondingTag.tag_groups[0].name]) {
        tagChoiceGroups[correspondingTag.tag_groups[0].name] = [];
      }

      tagChoiceGroups[correspondingTag.tag_groups[0].name].push(
        correspondingTag
      );
    }
  });

  if (tagChoiceGroups["Other"].length === 0) {
    delete tagChoiceGroups["Other"];
  }

  return tagChoiceGroups;
}

export default async function ListingPage({ params }: Props) {
  const { user } = await serverAuth({ checkUser: true });
  const { data: listing } = await getPublishedListingBySlug(params.slug);

  if (!("id" in listing)) return notFound();

  const { data: comments } = await getCommentsByCategoryAndId(
    "listing_id",
    listing.id
  );

  const { data: listingData } = await getPublishedListings(2, listing.id);

  const { data: tagData } = await getFullTags("active");

  const tagGroups = clusterTagsByGroups(listing.tags, tagData);

  return (
    <SectionOuterContainer>
      <div className="mx-auto max-w-5xl px-4 pt-8 pb-24 sm:px-6 lg:px-8">
        {/* Breadcrumps */}
        <Breadcrumps />

        {/* Cover Image */}
        <div className="aspect-w-16 aspect-h-7 overflow-hidden w-full mt-4 shadow-sm">
          <SupabaseImage
            dbImageUrl={listing.default_image_url}
            width={1350}
            height={900}
            database="listing_images"
            priority
            className="w-full h-full object-cover"
            imageAlt={`${listing.title} cover image on ${COMPANY_BASIC_INFORMATION.NAME}`}
          />
        </div>

        {/* View Pixel */}
        {GENERAL_SETTINGS.USE_VIEW && <ViewPixel listingId={listing.id} />}

        {/* Listing Information */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="flex flex-col space-y-4">
            {/* Logo and Title */}
            <div className="flex items-center gap-4">
              {!!listing.logo_image_url && (
                <div className="w-16 h-16 bg-gray-100 rounded-full overflow-hidden">
                  <SupabaseImage
                    dbImageUrl={listing.logo_image_url}
                    width={900}
                    height={900}
                    database="listing_images"
                    priority
                    className="w-full h-full object-cover"
                    imageAlt={`${listing.title} logo on ${COMPANY_BASIC_INFORMATION.NAME}`}
                  />
                </div>
              )}
              <div className="flex items-center gap-x-2">
                <SectionTitle className="text-2xl">
                  {listing.title}
                </SectionTitle>
                {listing.owner_id && (
                  <BadgeCheckIcon className="w-6 h-6 fill-blue-500 text-white stroke-white" />
                )}
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-4">
              {listing.tags.map((tag) => (
                <Link
                  key={tag.id}
                  href={`/explore?tags=${stringToSlug(tag.name)}`}
                  className="px-3 py-1 text-sm font-medium bg-gray-200 text-gray-800 hover:bg-gray-300"
                >
                  {tag.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Discount Code Section */}
          <ListingCoupon listing={listing} user={user} layout="detail" />
        </div>

        {/* External Link Button */}
        <div className="mt-6 flex justify-end">
          <ExternalLinkButton
            listing={listing}
            textVariant={1}
            className="w-full lg:w-auto bg-dark-foreground rounded-none hover:bg-gray-800"
          />
        </div>

        {/* Divider */}
        <hr className="border-gray-200 my-8" />

        {/* Description Section */}
        <article className="prose max-w-none text-gray-700">
          <ArticleContent
            source={listing.description}
            components={{
              ...useMDXComponents,
            }}
          />
        </article>
      </div>

      {/* <div className="max-w-5xl mx-auto w-full my-10 px-2">
        <Suspense>
          <CommentSystem
            comments={comments}
            blog_or_listing_id={listing.id}
            blog_or_listing="listing_id"
          />
        </Suspense>
      </div> */}

      {/* <NewsletterBox_BeeHiiv /> */}

      {/* {listingData?.length !== 0 && (
        <div className="max-w-5xl mx-auto my-10 px-2">
          <SubSectionTitle>You May Also Like</SubSectionTitle>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {listingData?.map((listing) => (
              <ListingCard key={listing.id} listing={listing} user={null} />
            ))}
          </div>
        </div>
      )} */}
    </SectionOuterContainer>
  );
}
