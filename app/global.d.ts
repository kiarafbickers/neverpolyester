import { Database as DB } from "@/app/_types/supabase";

declare global {
  type Activity = Database["public"]["Tables"]["activities"]["Row"];
  type AdCampaign = Database["public"]["Tables"]["ad_campaigns"]["Row"];
  type BlogPost = Database["public"]["Tables"]["blog_posts"]["Row"];
  type Category = Database["public"]["Tables"]["categories"]["Row"];
  type CategoryGroup = Database["public"]["Tables"]["category_groups"]["Row"];
  type CategoryGroupCategoryAssociation =
    Database["public"]["Tables"]["category_groups_categories_association"]["Row"];
  type Comment = Database["public"]["Tables"]["comments"]["Row"];
  type Feedback = Database["public"]["Tables"]["feedback"]["Row"];
  type Listing = Database["public"]["Tables"]["listings"]["Row"];
  type ListingTag = Database["public"]["Tables"]["listings_tags"]["Row"];
  type Promotion = Database["public"]["Tables"]["promotions"]["Row"];
  type Subcategory = Database["public"]["Tables"]["subcategories"]["Row"];
  type SubcategoryGroup =
    Database["public"]["Tables"]["subcategory_groups"]["Row"];
  type SubcategoryGroupSubcategoryAssociation =
    Database["public"]["Tables"]["subcategory_groups_subcategories_association"]["Row"];
  type Sublisting = Database["public"]["Tables"]["sublistings"]["Row"];
  type SublistingSubtag =
    Database["public"]["Tables"]["sublistings_subtags"]["Row"];
  type SubtagGroup = Database["public"]["Tables"]["subtag_groups"]["Row"];
  type SubtagGroupSubtagAssociation =
    Database["public"]["Tables"]["subtag_groups_subtags_association"]["Row"];
  type Subtag = Database["public"]["Tables"]["subtags"]["Row"];
  type TagGroup = Database["public"]["Tables"]["tag_groups"]["Row"];
  type TagGroupTagAssociation =
    Database["public"]["Tables"]["tag_groups_tags_association"]["Row"];
  type Tag = Database["public"]["Tables"]["tags"]["Row"];
  type Topic = Database["public"]["Tables"]["topics"]["Row"];
  type User = Database["public"]["Tables"]["users"]["Row"];
}
