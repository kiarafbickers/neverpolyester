import CategoryQuickLinks from "@/components/__home/CategoryQuickLinks";
import Navbar_Public from "@/components/Navbar_Public";
import { SectionOuterContainer } from "@/ui/Section";
import MainHero from "@/components/__home/MainHero";
import WhyNeverPolyester from "./_components/__home/WhyNeverPolyester";
import {
  LABELS,
  NATURALFIBERBENEFITS,
  POLYESTERPROCESS,
  STEPS,
} from "./_constants/constants";
import ScrollingLabels from "./_components/__home/ScrollingLabels";
import StepsSection from "./_components/__home/Steps";
import getFullCategories from "./_actions/categories/getFullCategories";

export default async function Page() {
  const { data: rawCategoryData } = await getFullCategories("all");

  const CATEGORYDATA = rawCategoryData.map((category) => ({
    name: category.name,
    slug: category.slug,
    image_url_small: category.image_url_small ?? undefined,
    description: category.description ?? undefined,
  }));
  return (
    <>
      <Navbar_Public />
      <SectionOuterContainer className="mx-auto py-0">
        <MainHero />
        <WhyNeverPolyester
          polyesterProcess={POLYESTERPROCESS}
          benefits={NATURALFIBERBENEFITS}
        />
        <ScrollingLabels labels={LABELS} />
        <StepsSection steps={STEPS} />
        <CategoryQuickLinks categoryData={CATEGORYDATA} />
      </SectionOuterContainer>
    </>
  );
}
