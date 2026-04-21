export const SHIPPING = {
  standard: {
    label: "Standard Shipping",
    price: 0.99,
    freeThreshold: 50,
    estimatedDays: "5-8 business days",
  },
  priority: {
    label: "Priority Shipping",
    price: 3.99,
    freeThreshold: 99,
    estimatedDays: "3-5 business days",
  },
  regions: ["US", "EU", "UK"],
  currency: "USD",
} as const;

export function getShippingCost(
  subtotal: number,
  tier: "standard" | "priority" = "standard"
): number {
  const config = SHIPPING[tier];
  return subtotal >= config.freeThreshold ? 0 : config.price;
}

export function isFreeShipping(
  subtotal: number,
  tier: "standard" | "priority" = "standard"
): boolean {
  return subtotal >= SHIPPING[tier].freeThreshold;
}

export function getShippingProgressMessage(subtotal: number): {
  message: string;
  progress: number;
  standardFree: boolean;
  priorityFree: boolean;
} {
  const standardFree = subtotal >= SHIPPING.standard.freeThreshold;
  const priorityFree = subtotal >= SHIPPING.priority.freeThreshold;

  if (priorityFree) {
    return {
      message: "You've unlocked FREE Priority Shipping!",
      progress: 100,
      standardFree: true,
      priorityFree: true,
    };
  }
  if (standardFree) {
    const remaining = SHIPPING.priority.freeThreshold - subtotal;
    return {
      message: `FREE Standard Shipping unlocked! Add $${remaining.toFixed(2)} more for FREE Priority Shipping.`,
      progress:
        50 +
        ((subtotal - SHIPPING.standard.freeThreshold) /
          (SHIPPING.priority.freeThreshold - SHIPPING.standard.freeThreshold)) *
          50,
      standardFree: true,
      priorityFree: false,
    };
  }
  const remaining = SHIPPING.standard.freeThreshold - subtotal;
  return {
    message: `Add $${remaining.toFixed(2)} more for FREE Standard Shipping.`,
    progress: (subtotal / SHIPPING.standard.freeThreshold) * 50,
    standardFree: false,
    priorityFree: false,
  };
}
