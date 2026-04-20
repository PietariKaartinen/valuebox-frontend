import Hero from '@/components/home/Hero';
import CategoryGrid from '@/components/home/CategoryGrid';
import HowItWorks from '@/components/home/HowItWorks';
import {
  MembershipSection,
  GiveawayBanner,
  TryFreeBar,
  BottomMembershipCTA,
} from '@/components/home/MembershipCTA';
import Testimonials from '@/components/home/Testimonials';
import FamiliarBrands from '@/components/home/FamiliarBrands';
import FashionBrands from '@/components/home/FashionBrands';
import { getCollectionByHandle } from '@/lib/shopify';
import ProductCarousel from '@/components/product/ProductCarousel';

export const revalidate = 3600;

async function getHomeData() {
  try {
    const [todaysDeals, fashionProducts, travelProducts] = await Promise.all([
      getCollectionByHandle('todays-deals', { first: 12 }),
      getCollectionByHandle('fashion-accessories', { first: 12 }),
      getCollectionByHandle('travel-accessories', { first: 12 }),
    ]);

    return {
      todaysDeals: todaysDeals?.products || [],
      fashionProducts: fashionProducts?.products || [],
      travelProducts: travelProducts?.products || [],
    };
  } catch (error) {
    console.error('Error fetching home data:', error);
    return {
      todaysDeals: [],
      fashionProducts: [],
      travelProducts: [],
    };
  }
}

export default async function HomePage() {
  const { todaysDeals, travelProducts } = await getHomeData();

  return (
    <>
      <Hero />
      <ProductCarousel
        title="Today's Best Deals"
        highlightWord="Best Deals"
        products={todaysDeals}
        viewAllHref="/shop/todays-deals"
      />
      <FashionBrands />
      <ProductCarousel
        title="Best Deals in Travel Accessories"
        highlightWord="Travel Accessories"
        products={travelProducts}
        viewAllHref="/shop/travel-accessories"
      />
      <CategoryGrid />
      <HowItWorks />
      <MembershipSection />
      <GiveawayBanner />
      <TryFreeBar />
      <FamiliarBrands />
      <Testimonials />
      <BottomMembershipCTA />
    </>
  );
}
