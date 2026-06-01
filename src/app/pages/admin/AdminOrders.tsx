import { MobileHeader } from "../../components/MobileHeader";
import { BottomNav } from "../../components/BottomNav";
import { Card } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Package, Clock, MapPin } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";
import { getProductName, type Language } from "../../data/productCatalog";

export default function AdminOrders() {
  const { t, language } = useLanguage();
  const lang = language as Language;

  const orders = [
    { id: "ORD-2603-142", customer: "Nigar Əliyeva", productIds: ["tomato", "cucumber", "chicken_eggs"], time: "09:40", route: "ID-M001", batch: "ID-B2603", status: "in-transit" },
    { id: "ORD-2603-141", customer: "Aysel Quliyeva", productIds: ["pepper", "spinach"], time: "09:25", route: "ID-M001", batch: "ID-B2603", status: "in-transit" },
    { id: "ORD-2603-140", customer: "Murad Həsənov", productIds: ["milk", "butter", "cheese"], time: "08:55", route: "ID-M002", batch: "ID-B2603", status: "delayed" },
    { id: "ORD-2602-098", customer: "Leyla Rzayeva", productIds: ["potato", "apple"], time: "11:45", route: "ID-M003", batch: "ID-B2602", status: "completed" },
  ];

  const statusLabel = (status: string) => {
    if (status === "completed") return t('admin.completed');
    if (status === "delayed") return t('vehicles.delayed');
    return t('admin.inTransit');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <MobileHeader title={t('admin.orders.title')} showBack profilePath="/admin/profile" accentColor="blue" />
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">{t('admin.orders.logs')}</h2>
        <div className="space-y-3">
          {orders.map((order) => (
            <Card key={order.id} className="p-4 border-2 border-blue-100 border-l-4 border-l-blue-500 bg-white">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="text-xs text-gray-500 font-medium">{order.id}</div>
                  <h3 className="font-semibold text-gray-900">{order.customer}</h3>
                </div>
                <Badge className={order.status === "delayed" ? "bg-red-100 text-red-800 border border-red-300" : "bg-blue-100 text-blue-800 border border-blue-300"}>
                  {statusLabel(order.status)}
                </Badge>
              </div>
              <div className="space-y-2">
                <div className="flex items-start gap-2 text-sm text-gray-700">
                  <Package className="w-4 h-4 text-blue-600 mt-0.5" />
                  <span>{order.productIds.map((id) => getProductName(id, lang)).join(", ")}</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="bg-gray-50 rounded-lg p-2 border border-gray-200">
                    <Clock className="w-3.5 h-3.5 text-gray-500 mb-1" />
                    <div className="text-gray-500">{t('admin.orders.time')}</div>
                    <div className="font-semibold">{order.time}</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-2 border border-gray-200">
                    <MapPin className="w-3.5 h-3.5 text-gray-500 mb-1" />
                    <div className="text-gray-500">{t('admin.orders.route')}</div>
                    <div className="font-semibold">{order.route}</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-2 border border-gray-200">
                    <div className="text-gray-500">{t('admin.orders.batch')}</div>
                    <div className="font-semibold">{order.batch}</div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
      <BottomNav type="admin" />
    </div>
  );
}
