import { CheckCircle2, Clock, ExternalLink, MapPin, Phone, RotateCcw, Warehouse } from "lucide-react";
import { BottomNav } from "../../components/BottomNav";
import { MobileHeader } from "../../components/MobileHeader";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { useLanguage } from "../../contexts/LanguageContext";
import { farmerCollectionHub, farmerCollectionOrders, localize } from "../../data/logisticsData";
import type { Language } from "../../data/productCatalog";
import { DRIVER_COLLECTION_STATUSES_STORAGE_KEY, usePersistentState } from "../../data/demoStore";
import { toast } from "sonner";

export default function DriverCollections() {
  const { t, language } = useLanguage();
  const lang = language as Language;
  const [statusOverrides, setStatusOverrides] = usePersistentState<Record<string, string>>(DRIVER_COLLECTION_STATUSES_STORAGE_KEY, {});
  const orders = farmerCollectionOrders.map(order => ({
    ...order,
    status: statusOverrides[order.id] ?? order.status,
  }));
  const readyCount = orders.filter(order => order.status === "ready").length;
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(localize(farmerCollectionHub.address, lang))}`;
  const updateStatus = (orderId: string, status: string) => {
    setStatusOverrides(current => ({ ...current, [orderId]: status }));
    toast.success(t("driver.collectionStatusUpdated"));
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <MobileHeader title={t("driver.collectionOrders")} profilePath="/driver/profile" accentColor="blue" />

      <div className="p-4 space-y-3">
        <Card className="p-3 border-2 border-indigo-200 border-l-4 border-l-indigo-500 bg-indigo-50">
          <div className="flex items-start gap-3">
            <div className="rounded-xl bg-indigo-100 p-2">
              <Warehouse className="w-5 h-5 text-indigo-700" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-gray-900">{localize(farmerCollectionHub.name, lang)}</h2>
              <p className="text-xs text-gray-600 mt-1 leading-relaxed">{t("driver.collectionHubDesc")}</p>
              <p className="text-xs font-semibold text-indigo-700 mt-1">{localize(farmerCollectionHub.address, lang)}</p>
              <p className="text-xs text-indigo-700 mt-0.5">{farmerCollectionHub.pickupTime}</p>
            </div>
          </div>
          <Button asChild variant="outline" className="w-full mt-3 h-10 rounded-xl border-indigo-200 text-indigo-700">
            <a href={mapsUrl} target="_blank" rel="noreferrer">
              <ExternalLink className="w-4 h-4 mr-2" />
              {t("driver.openMaps")}
            </a>
          </Button>
        </Card>

        <Card className="p-3 border border-gray-200 bg-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-gray-900">{t("driver.collectionReadiness")}</h3>
              <p className="text-xs text-gray-500 mt-0.5">{t("driver.collectionReadinessDesc")}</p>
            </div>
            <Badge className="bg-green-100 text-green-700 border border-green-200">
              {readyCount}/{orders.length}
            </Badge>
          </div>
        </Card>

        <div className="space-y-2">
          {orders.map((order) => {
            const ready = order.status === "ready";
            return (
              <Card key={order.id} className={`p-3 border-2 border-l-4 ${ready ? "border-green-200 border-l-green-500" : "border-amber-200 border-l-amber-500"}`}>
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-semibold text-gray-900 truncate">{order.farmer}</span>
                      {ready ? <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" /> : <Clock className="w-4 h-4 text-amber-600 shrink-0" />}
                    </div>
                    <p className="text-xs text-gray-500">{order.id}</p>
                    <div className="flex items-center gap-1 mt-2 text-xs text-gray-700">
                      <MapPin className="w-3.5 h-3.5 text-gray-400" />
                      {localize(farmerCollectionHub.name, lang)}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-sm font-bold text-gray-900">{order.quantity}</div>
                    <div className="text-xs text-gray-600">{localize(order.product, lang)}</div>
                    <Badge className={`mt-2 text-xs ${ready ? "bg-green-100 text-green-700 border border-green-200" : "bg-amber-100 text-amber-700 border border-amber-200"}`}>
                      {t(ready ? "driver.ready" : "driver.awaitingFarmer")}
                    </Badge>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-gray-100">
                  <Button asChild variant="outline" className="h-9 rounded-xl border-blue-200 text-blue-700">
                    <a href={`tel:${order.phone}`}>
                      <Phone className="w-4 h-4 mr-1.5" />
                      {t("driver.contactFarmer")}
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => updateStatus(order.id, ready ? "pending" : "ready")}
                    className={`h-9 rounded-xl ${ready ? "border-gray-200 text-gray-700" : "border-green-200 text-green-700"}`}
                  >
                    {ready ? <RotateCcw className="w-4 h-4 mr-1.5" /> : <CheckCircle2 className="w-4 h-4 mr-1.5" />}
                    {t(ready ? "driver.markWaiting" : "driver.markReady")}
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      <BottomNav type="driver" />
    </div>
  );
}
