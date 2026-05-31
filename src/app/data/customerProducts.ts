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
  { id: 1, productId: "tomato", nameKey: "product.organicTomatoes", price: 4.5, unitKey: "product.kg", category: "medium", farm: "Quba Ferması", farmerName: "Ramiz Məmmədov", farmerVerified: true, location: "Quba Rayonu", image: "https://images.unsplash.com/photo-1561136594-7f68413baa99?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dG9tYXRvJTIwaGFydmVzdHxlbnwwfHwwfHx8MA%3D%3D" },
  { id: 2, productId: "spinach", nameKey: "product.freshSpinach", price: 3.2, unitKey: "product.bunch", category: "sensitive", farm: "Yaşıl Vadi", farmerName: "Aynur Hüseynova", farmerVerified: true, location: "Şamaxı", image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3BpbmFjaHxlbnwwfHwwfHx8MA%3D%3D" },
  { id: 3, productId: "chicken_eggs", nameKey: "product.freeRangeEggs", price: 0.7, unitKey: "product.piece", category: "durable", farm: "Dağ Quşçuluğu", farmerName: "Tural Əliyev", farmerVerified: true, location: "Qəbələ", image: "https://images.unsplash.com/photo-1585355611266-f01530088d60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600" },
  { id: 4, productId: "pepper", nameKey: "product.sweetPeppers", price: 5.5, unitKey: "product.kg", category: "medium", farm: "Quba Ferması", farmerName: "Ramiz Məmmədov", farmerVerified: true, location: "Quba Rayonu", image: "https://images.unsplash.com/photo-1669863347362-1630fe821708?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHN3ZWV0JTIwcGVwcGVyfGVufDB8fDB8fHww" },
  { id: 5, productId: "butter", nameKey: "product.freshButter", price: 12, unitKey: "product.piece", category: "sensitive", farm: "Süd Ferması", farmerName: "Leyla Quliyeva", farmerVerified: false, location: "İsmayıllı", image: "https://media.istockphoto.com/id/1316327431/photo/homemade-purified-butter-ghee-in-jar-and-wooden-spoon.jpg?s=612x612&w=0&k=20&c=RGvFhBm583Or6clB3mjR21NMm_p1e145WMHcv_WLOKU=" },
  { id: 6, productId: "potato", nameKey: "product.potatoes", price: 2.8, unitKey: "product.kg", category: "durable", farm: "Lənkəran Ferması", farmerName: "Vüsal Nəsirov", farmerVerified: true, location: "Lənkəran", image: "https://images.unsplash.com/photo-1744659751904-3b2e5c095323?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600" },
  { id: 7, productId: "strawberry", nameKey: "product.strawberries", price: 15, unitKey: "product.kg", category: "sensitive", farm: "Giləmeyvə Bağı", farmerName: "Samirə Babayeva", farmerVerified: true, location: "Qəbələ", image: "https://media.istockphoto.com/id/2214139908/photo/containers-filled-with-ripe-strawberries-awaiting-purchase.jpg?s=612x612&w=0&k=20&c=bjI0ht4tIDDR37HM7QMHmASFw2dDc7aHAHR1jbt9nNI=" },
  { id: 8, productId: "cucumber", nameKey: "product.cucumbers", price: 3.6, unitKey: "product.kg", category: "medium", farm: "Yaşıl Vadi", farmerName: "Aynur Hüseynova", farmerVerified: true, location: "Şamaxı", image: "https://img.freepik.com/premium-photo/many-green-ripe-cucumbers-box_457211-14126.jpg" },
];

export const getCustomerProduct = (id: number) =>
  customerProducts.find((product) => product.id === id) ?? customerProducts[0];
