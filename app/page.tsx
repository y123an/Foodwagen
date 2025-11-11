import RestaurantHero from "@/components/RestaurantHero";
import RestaurantNavbar from "@/components/RestaurantNavbar";
import RestaurantFeature from "@/components/RestaurantFeature";

function page() {
  return (
    <>
      <RestaurantNavbar />
      <RestaurantHero />
      <RestaurantFeature />
    </>
  );
}

export default page;
