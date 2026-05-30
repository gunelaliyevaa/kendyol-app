import { MobileHeader } from "../../components/MobileHeader";
import { BottomNav } from "../../components/BottomNav";
import { Card } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Package, Truck, User, CheckCircle2 } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";
import { getProductName, getUnitName, type Language } from "../../data/productCatalog";

export default function FarmerDeliveries() {
  const { t, language } = useLanguage();
  const lang = language as Language;

  const deliveries = [
    { id: "FD-2603-01", productId: "tomato", quantity: 45, buyer: "Nigar Əliyeva", driver: "Elvin Məmmədov", route: "ID-M001", status: "completed" },
    { id: "FD-2603-02", productId: "pepper", quantity: 25, buyer: "Aysel Quliyeva", driver: "Elvin Məmmədov", route: "ID-M001", status: "completed" },
    { id: "FD-2603-03", productId: "cucumber", quantity: 20, buyer: "Murad Həsənov", driver: "Fərid Axundov", route: "ID-M002", status: "completed" },
    { id: "FD-2603-04", productId: "spinach", quantity: 18, buyer: "Leyla Rzayeva", driver: "Rəmil Süleymanov", route: "ID-M003", status: "completed" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <MobileHeader title={t('nav.deliveries')} showBack profilePath="/farmer/profile" accentColor="amber" />
      <div className="p-4 space-y-4">
        {deliveries.map((delivery) => (
          <Card key={delivery.id} className="p-4 border-2 border-green-200 border-l-4 border-l-green-500 bg-white">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="text-xs text-gray-500 font-medium">{delivery.id}</div>
                <h3 className="font-semibold text-gray-900">{getProductName(delivery.productId, lang)}</h3>
              </div>
              <Badge className="bg-green-100 text-green-800 border border-green-300">
                <CheckCircle2 className="w-3 h-3 mr-1" />
                {t('admin.completed')}
              </Badge>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-gray-50 rounded-xl p-3 border border-gray-200">
                <Package className="w-4 h-4 text-amber-600 mb-1" />
                <div className="text-xs text-gray-500">{t('farmer.products.quantityLabel')}</div>
                <div className="font-semibold">{delivery.quantity} {getUnitName(delivery.productId, lang)}</div>
              </div>
              <div className="bg-gray-50 rounded-xl p-3 border border-gray-200">
                <User className="w-4 h-4 text-blue-600 mb-1" />
                <div className="text-xs text-gray-500">{t('admin.orders.customer')}</div>
                <div className="font-semibold">{delivery.buyer}</div>
              </div>
              <div className="bg-gray-50 rounded-xl p-3 border border-gray-200">
                <Truck className="w-4 h-4 text-green-600 mb-1" />
                <div className="text-xs text-gray-500">{t('farmer.delivery.driver')}</div>
                <div className="font-semibold">{delivery.driver}</div>
              </div>
              <div className="bg-gray-50 rounded-xl p-3 border border-gray-200">
                <div className="text-xs text-gray-500">{t('admin.orders.route')}</div>
                <div className="font-semibold">{delivery.route}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>
      <BottomNav type="farmer" />
    </div>
  );
}
