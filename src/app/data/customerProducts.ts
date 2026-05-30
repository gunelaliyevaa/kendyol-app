export interface CustomerProduct {
  id: number;
  productId: string;
  nameKey: string;
  price: number;
  unitKey: string;
  category: "sensitive" | "medium" | "durable";
  farm: string;
  farmerName: string;
  farmerVerified: boolean;
  location: string;
  image: string;
}

export const customerProducts: CustomerProduct[] = [
  { id: 1, productId: "tomato", nameKey: "product.organicTomatoes", price: 4.5, unitKey: "product.kg", category: "medium", farm: "Quba Ferması", farmerName: "Ramiz Məmmədov", farmerVerified: true, location: "Quba Rayonu", image: "https://images.unsplash.com/photo-1757332334678-e76d258c49c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600" },
  { id: 2, productId: "spinach", nameKey: "product.freshSpinach", price: 3.2, unitKey: "product.bunch", category: "sensitive", farm: "Yaşıl Vadi", farmerName: "Aynur Hüseynova", farmerVerified: true, location: "Şamaxı", image: "https://images.unsplash.com/photo-1634731201932-9bd92839bea2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600" },
  { id: 3, productId: "chicken_eggs", nameKey: "product.freeRangeEggs", price: 0.7, unitKey: "product.piece", category: "durable", farm: "Dağ Quşçuluğu", farmerName: "Tural Əliyev", farmerVerified: true, location: "Qəbələ", image: "https://images.unsplash.com/photo-1585355611266-f01530088d60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600" },
  { id: 4, productId: "pepper", nameKey: "product.sweetPeppers", price: 5.5, unitKey: "product.kg", category: "medium", farm: "Quba Ferması", farmerName: "Ramiz Məmmədov", farmerVerified: true, location: "Quba Rayonu", image: "https://images.unsplash.com/photo-1775343963054-11247c9d4d30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600" },
  { id: 5, productId: "butter", nameKey: "product.freshButter", price: 12, unitKey: "product.piece", category: "sensitive", farm: "Süd Ferması", farmerName: "Leyla Quliyeva", farmerVerified: false, location: "İsmayıllı", image: "https://images.unsplash.com/photo-1709177068446-d5c0f6d25c48?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600" },
  { id: 6, productId: "potato", nameKey: "product.potatoes", price: 2.8, unitKey: "product.kg", category: "durable", farm: "Lənkəran Ferması", farmerName: "Vüsal Nəsirov", farmerVerified: true, location: "Lənkəran", image: "https://images.unsplash.com/photo-1744659751904-3b2e5c095323?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600" },
  { id: 7, productId: "strawberry", nameKey: "product.strawberries", price: 15, unitKey: "product.kg", category: "sensitive", farm: "Giləmeyvə Bağı", farmerName: "Samirə Babayeva", farmerVerified: true, location: "Qəbələ", image: "https://images.unsplash.com/photo-1710528184650-fc75ae862c13?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600" },
  { id: 8, productId: "cucumber", nameKey: "product.cucumbers", price: 3.6, unitKey: "product.kg", category: "medium", farm: "Yaşıl Vadi", farmerName: "Aynur Hüseynova", farmerVerified: true, location: "Şamaxı", image: "https://images.unsplash.com/photo-1604977042946-1eecc30f269e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600" },
];

export const getCustomerProduct = (id: number) =>
  customerProducts.find((product) => product.id === id) ?? customerProducts[0];
