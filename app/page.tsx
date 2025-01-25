import serverAuth from "./_actions/auth/serverAuth";
import { getPublishedPosts } from "./_actions/blog/getPublishedPosts";
import { getFullSubcategories } from "./_actions/subcategories";
import getListingCoupon from "./_actions/listings/getListingCoupon";
import {
  getAllListingsForNavbar,
  getPromotedListingsForNavbar,
} from "./_actions/listings/getListingForNavbar";
import CategoryLinks from "./_components/__home/CategoryLinks";
import Coupons from "./_components/__home/Coupons";
import CreatorInfo from "./_components/__home/CreatorInfo";
import LatestArticles from "./_components/__home/LatestArticles";
import MainHero from "./_components/__home/MainHero";
import MediaLogos from "./_components/__home/MediaLogos";
import ScrollingLabels from "./_components/__home/ScrollingLabels";
import Steps from "./_components/__home/Steps";
import Timeline from "./_components/__home/Timeline";
import Why from "./_components/__home/Why";
import { SectionOuterContainer } from "./_components/_ui/Section";
import Navbar_Public from "./_components/Navbar_Public";
import {
  LABELS,
  MEDIA_PARTNERS,
  NATURALFIBERBENEFITS,
  POLYESTERPROCESS,
  STEPS,
  TIMELINE,
} from "./_constants/constants";

export default async function Page() {
  const { user } = await serverAuth({ checkUser: true });
  const { data: coupons } = await getListingCoupon(4);
  const { data: subcategories } = await getFullSubcategories("all");
  const { data: articles } = await getPublishedPosts(2);
  const { data: allListings } = await getAllListingsForNavbar(10);
  const { data: promotedListings } = await getPromotedListingsForNavbar(10);
  return (
    <>
      <Navbar_Public
        allListings={allListings}
        promotedListings={promotedListings}
      />

      <SectionOuterContainer className="mx-auto py-0">
        <MainHero />
        <Why
          polyesterProcess={POLYESTERPROCESS}
          benefits={NATURALFIBERBENEFITS}
        />
        <ScrollingLabels labels={LABELS} />
        <Steps steps={STEPS} />
        <Coupons listings={coupons} user={user} />
        <CategoryLinks subcategories={subcategories} />
        <LatestArticles articles={articles} />
        <ScrollingLabels labels={LABELS} />
        <MediaLogos logos={MEDIA_PARTNERS} />
        <CreatorInfo />
        <Timeline timelineData={TIMELINE} />
      </SectionOuterContainer>
    </>
  );
}
