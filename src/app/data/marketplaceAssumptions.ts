import type { Language } from "./productCatalog";

export const marketplaceAssumptions = {
  startingDailyOrders: 10,
  initialActiveFarmers: 15,
  minimumOrder: 22,
  deliveryFee: 4,
  freeDeliveryThreshold: 45,
  platformCommissionPercent: 10,
  pilotVehicle: "Ford Transit Custom Cargo",
  pilotVehicleCapacity: 25,
  pilotRoute: {
    az: "Şamaxı → Bakı",
    en: "Shamakhi → Baku",
    ru: "Шемаха → Баку",
  },
} as const;

export const getPilotRoute = (language: Language) =>
  marketplaceAssumptions.pilotRoute[language];
