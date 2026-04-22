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
import CouponCarousel from '@/components/home/CouponCarousel';
import { getCollectionByHandle } from '@/lib/shopify';
import { getCouponsWithProducts } from '@/lib/shopify/coupons';
import ProductCarousel from '@/components/product/ProductCarousel';

export const revalidate = 3600;

async function getHomeData() {
  try {
    const [todaysDeals, travelProducts, coupons] = await Promise.all([
      getCollectionByHandle('todays-deals', { first: 12 }),
      getCollectionByHandle('travel-accessories', { first: 12 }),
      getCouponsWithProducts(),
    ]);

    return {
      todaysDeals: todaysDeals?.products || [],
      travelProducts: travelProducts?.products || [],
      coupons,
    };
  } catch (error) {
    console.error('Error fetching home data:', error);
    return {
      todaysDeals: [],
      travelProducts: [],
      coupons: [],
    };
  }
}

export default async function HomePage() {
  const { todaysDeals, travelProducts, coupons } = await getHomeData();

  return (
    <>
      <Hero />
      <ProductCarousel
        title="Today's Best Deals"
        highlightWord="Best Deals"
        products={todaysDeals}
        viewAllHref="/shop/todays-deals"
      />
      <CouponCarousel coupons={coupons} />
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
      <Testimonials />
      <BottomMembershipCTA />
    </>
  );
}
