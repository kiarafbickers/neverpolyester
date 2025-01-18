// Import Types
// Import External Packages
// Import Components
import Navbar_Public from "@/components/Navbar_Public";
import {
  getAllListingsForNavbar,
  getPromotedListingsForNavbar,
} from "../_actions/listings/getListingForNavbar";
// Import Functions & Actions & Hooks & State
// Import Data
// Import Assets & Icons

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: allListings } = await getAllListingsForNavbar(10);
  const { data: promotedListings } = await getPromotedListingsForNavbar(10);
  return (
    <section className="min-h-screen">
      <Navbar_Public
        allListings={allListings}
        promotedListings={promotedListings}
      />

      {children}
    </section>
  );
}
