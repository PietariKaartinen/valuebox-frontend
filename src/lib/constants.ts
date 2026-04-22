export const MAIN_CATEGORIES = [
  { handle: 'electronics', title: 'Electronics', icon: '💻' },
  { handle: 'home-kitchen', title: 'Home & Kitchen', icon: '🏠' },
  { handle: 'fashion-accessories', title: 'Fashion & Accessories', icon: '👗' },
  { handle: 'beauty-personal-care', title: 'Beauty & Personal Care', icon: '💄' },
  { handle: 'fitness-wellness', title: 'Fitness & Wellness', icon: '💪' },
  { handle: 'outdoors-travel', title: 'Outdoors & Travel', icon: '🏕️' },
  { handle: 'kids-toys', title: 'Kids & Toys', icon: '🧸' },
] as const;

export const SUBCATEGORIES: Record<string, { handle: string; title: string }[]> = {
  electronics: [
    { handle: 'phone-charging', title: 'Phone & Charging' },
    { handle: 'computer-desk', title: 'Computer & Desk' },
    { handle: 'audio-accessories', title: 'Audio Accessories' },
  ],
  'home-kitchen': [
    { handle: 'home-organization', title: 'Home Organization' },
    { handle: 'kitchen-essentials', title: 'Kitchen Essentials' },
    { handle: 'cleaning', title: 'Cleaning' },
  ],
  'fashion-accessories': [
    { handle: 'bags-travel', title: 'Bags & Travel' },
    { handle: 'everyday-accessories', title: 'Everyday Accessories' },
    { handle: 'jewelry-watches', title: 'Jewelry & Watches' },
  ],
  'beauty-personal-care': [
    { handle: 'skincare-tools', title: 'Skincare Tools' },
    { handle: 'hair-accessories', title: 'Hair Accessories' },
    { handle: 'self-care-relaxation', title: 'Self-Care & Relaxation' },
  ],
  'fitness-wellness': [
    { handle: 'workout-gear', title: 'Workout Gear' },
    { handle: 'recovery', title: 'Recovery' },
    { handle: 'support-posture', title: 'Support & Posture' },
  ],
  'outdoors-travel': [
    { handle: 'travel-accessories', title: 'Travel Accessories' },
    { handle: 'outdoor-essentials', title: 'Outdoor Essentials' },
    { handle: 'safety-essentials', title: 'Safety Essentials' },
  ],
  'kids-toys': [
    { handle: 'toys-games', title: 'Toys & Games' },
    { handle: 'learning-stem', title: 'Learning & STEM' },
    { handle: 'kids-gear', title: 'Kids Gear' },
  ],
};

export const SPECIAL_COLLECTIONS = [
  { handle: 'todays-deals', title: "Today's Deals" },
  { handle: 'best-gifts', title: 'Best Gifts' },
  { handle: 'featured', title: 'Featured' },
  { handle: 'under-25', title: 'Under $25' },
  { handle: 'work-from-home', title: 'Work From Home' },
  { handle: 'gift-ideas', title: 'Gift Ideas' },
  { handle: 'big-savings', title: 'Big Savings' },
] as const;

export const ALL_COLLECTION_HANDLES = [
  ...MAIN_CATEGORIES.map((c) => c.handle),
  ...Object.values(SUBCATEGORIES).flat().map((c) => c.handle),
  ...SPECIAL_COLLECTIONS.map((c) => c.handle),
];

export const NAV_CATEGORIES = [
  { handle: 'electronics', title: 'Electronics' },
  { handle: 'home-kitchen', title: 'Home & Kitchen' },
  { handle: 'fashion-accessories', title: 'Fashion & Accessories' },
  { handle: 'beauty-personal-care', title: 'Beauty & Personal Care' },
  { handle: 'fitness-wellness', title: 'Fitness & Wellness' },
  { handle: 'outdoors-travel', title: 'Outdoors & Travel' },
  { handle: 'kids-toys', title: 'Kids & Toys' },
] as const;

/**
 * Map each main-category handle to an array containing itself + all its subcategory handles.
 * Used for filtering: selecting "Electronics" should also match products in
 * phone-charging, computer-desk, audio-accessories, etc.
 */
export const CATEGORY_HANDLE_GROUPS: Record<string, string[]> = Object.fromEntries(
  MAIN_CATEGORIES.map((cat) => [
    cat.handle,
    [cat.handle, ...(SUBCATEGORIES[cat.handle]?.map((s) => s.handle) || [])],
  ])
);

/**
 * Reverse map: given any collection handle (main or sub), return the parent
 * main-category handle. Returns undefined for special collections.
 */
export const HANDLE_TO_PARENT: Record<string, string> = (() => {
  const map: Record<string, string> = {};
  for (const cat of MAIN_CATEGORIES) {
    map[cat.handle] = cat.handle;
    for (const sub of SUBCATEGORIES[cat.handle] || []) {
      map[sub.handle] = cat.handle;
    }
  }
  return map;
})();

export const CATEGORY_IMAGES: Record<string, string> = {
  electronics: '/categories/electronics.svg',
  'home-kitchen': '/categories/home-kitchen.svg',
  'fashion-accessories': '/categories/fashion.svg',
  'beauty-personal-care': '/categories/beauty.svg',
  'fitness-wellness': '/categories/fitness.svg',
  'outdoors-travel': '/categories/outdoors.svg',
  'kids-toys': '/categories/kids.svg',
};
