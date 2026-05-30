import { useState } from "react";
import { BrainCircuit, CheckCircle2, Clock3, Gauge, Leaf, MapPin, Navigation, PackageCheck, RefreshCw, Route, Sparkles, TrafficCone } from "lucide-react";
import { toast } from "sonner";
import { MobileHeader } from "../../components/MobileHeader";
import { BottomNav } from "../../components/BottomNav";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { Progress } from "../../components/ui/progress";
import { useLanguage } from "../../contexts/LanguageContext";
import { APPROVED_ROUTES_STORAGE_KEY, usePersistentState } from "../../data/demoStore";
import { localize, scheduledRoutes } from "../../data/logisticsData";
import type { Language } from "../../data/productCatalog";

export default function AdminAIRoutePlanner() {
  const { t, language } = useLanguage();
  const lang = language as Language;
  const [selectedRouteId, setSelectedRouteId] = useState(scheduledRoutes[0].id);
  const [approvedRoutes, setApprovedRoutes] = usePersistentState<string[]>(APPROVED_ROUTES_STORAGE_KEY, []);
  const [recalculating, setRecalculating] = useState(false);
  const selectedRoute = scheduledRoutes.find(route => route.id === selectedRouteId) ?? scheduledRoutes[0];

  const factors = [
    [Leaf, t("ai.route.freshness")],
    [Route, t("ai.route.distance")],
    [TrafficCone, t("ai.route.roadConditions")],
    [Clock3, t("ai.route.urgency")],
    [PackageCheck, t("ai.route.nearbyOrders")],
  ];

  const approve = () => {
    setApprovedRoutes(prev => prev.includes(selectedRoute.id) ? prev : [...prev, selectedRoute.id]);
    toast.success(`${selectedRoute.id}: ${t("ai.route.approved")}`);
  };

  const recalculate = () => {
    setRecalculating(true);
    window.setTimeout(() => {
      setRecalculating(false);
      toast.success(t("ai.route.updated"));
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <MobileHeader title={t("ai.route.title")} showBack showProfile={false} accentColor="blue" />

      <div className="p-4 space-y-4">
        <Card className="p-4 border-2 border-blue-200 border-l-4 border-l-blue-500 bg-blue-50">
          <div className="flex items-start gap-3">
            <div className="bg-blue-100 rounded-xl p-2">
              <BrainCircuit className="w-5 h-5 text-blue-700" />
            </div>
            <div>
              <h2 className="font-semibold text-gray-900">{t("ai.route.heading")}</h2>
              <p className="text-xs text-gray-600 mt-1 leading-relaxed">{t("ai.route.desc")}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 border-2 border-gray-200 bg-white">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-800">{t("ai.route.factors")}</h3>
            <Badge className="bg-green-100 text-green-800 border border-green-300">{t("ai.route.weeklyBatch")}</Badge>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {factors.map(([Icon, label]) => {
              const FactorIcon = Icon as typeof Leaf;
              return (
                <div key={label as string} className="flex items-center gap-2 bg-gray-50 rounded-xl p-3 border border-gray-200">
                  <FactorIcon className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span className="text-xs font-medium text-gray-700">{label as string}</span>
                </div>
              );
            })}
          </div>
          <Button variant="outline" onClick={recalculate} disabled={recalculating} className="w-full mt-3 border-2 border-blue-200 text-blue-700 hover:bg-blue-50">
            <RefreshCw className={`w-4 h-4 mr-2 ${recalculating ? "animate-spin" : ""}`} />
            {recalculating ? t("ai.route.recalculating") : t("ai.route.recalculate")}
          </Button>
        </Card>

        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1 h-5 bg-blue-500 rounded-full" />
            <h3 className="font-semibold text-gray-900">{t("ai.route.options")}</h3>
          </div>
          <div className="space-y-3">
            {scheduledRoutes.map((route, index) => {
              const selected = route.id === selectedRoute.id;
              return (
                <Card
                  key={route.id}
                  onClick={() => setSelectedRouteId(route.id)}
                  className={`p-4 cursor-pointer transition-all border-2 border-l-4 ${selected ? "border-blue-400 border-l-blue-600 bg-blue-50 shadow-md" : "border-gray-200 border-l-gray-300 bg-white hover:border-blue-200"}`}
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-gray-900">{route.id}</span>
                        {index === 0 && (
                          <Badge className="bg-green-100 text-green-800 border border-green-300 text-xs">
                            <Sparkles className="w-3 h-3 mr-1" />
                            {t("admin.routes.recommended")}
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-gray-600 font-medium">{localize(route.routeDesc, lang)}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-green-700">{route.ai.score}</div>
                      <div className="text-xs text-gray-400">/100</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      [MapPin, route.distance],
                      [Clock3, localize(route.estimatedTime, lang)],
                      [PackageCheck, route.orders],
                      [Gauge, route.ai.cost],
                    ].map(([Icon, value], statIndex) => {
                      const StatIcon = Icon as typeof MapPin;
                      return (
                        <div key={statIndex} className="bg-white rounded-lg border border-gray-100 p-2 text-center">
                          <StatIcon className="w-3.5 h-3.5 mx-auto mb-1 text-blue-500" />
                          <div className="text-xs font-bold text-gray-800">{value as string | number}</div>
                        </div>
                      );
                    })}
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        <Card className="overflow-hidden border-2 border-indigo-200 border-l-4 border-l-indigo-500 bg-white">
          <div className="bg-gradient-to-r from-indigo-600 to-blue-700 p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-indigo-100">{t("ai.route.selected")}</div>
                <h3 className="font-semibold">{selectedRoute.id}</h3>
              </div>
              <Badge className="bg-white/20 text-white border border-white/30">{selectedRoute.ai.score}/100</Badge>
            </div>
          </div>

          <div className="relative h-48 bg-gradient-to-br from-green-50 via-blue-50 to-green-100 overflow-hidden border-b border-indigo-100">
            <div className="absolute inset-x-8 top-1/2 h-1 bg-blue-300 rotate-6 rounded-full" />
            <div className="absolute inset-x-12 top-1/3 h-1 bg-green-300 -rotate-6 rounded-full" />
            {[
              ["20%", "70%"],
              ["42%", "42%"],
              ["63%", "59%"],
              ["80%", "28%"],
            ].map(([left, top], index) => (
              <div key={index} className="absolute" style={{ left, top }}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 border-white shadow-md ${index === 0 || index === 3 ? "bg-green-600" : "bg-orange-500"}`}>
                  <MapPin className="w-4 h-4 text-white" />
                </div>
              </div>
            ))}
            <div className="absolute bottom-3 left-3 bg-white/90 rounded-xl px-3 py-2 border border-blue-100 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-semibold text-blue-700">
                <Navigation className="w-4 h-4" />
                {t("ai.route.optimal")}
              </div>
            </div>
          </div>

          <div className="p-4">
            <p className="text-sm text-gray-700 leading-relaxed mb-3">{localize(selectedRoute.ai.finding, lang)}</p>
            <div className="mb-3">
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-gray-500">{t("ai.route.efficiency")}</span>
                <span className="font-bold text-green-700">{selectedRoute.ai.score}%</span>
              </div>
              <Progress value={selectedRoute.ai.score} className="h-2.5 [&>div]:bg-green-500" />
            </div>
            <Button onClick={approve} className="w-full h-11 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold">
              <CheckCircle2 className="w-4 h-4 mr-2" />
              {approvedRoutes.includes(selectedRoute.id) ? t("ai.route.approved") : t("ai.route.approve")}
            </Button>
          </div>
        </Card>
      </div>

      <BottomNav type="admin" />
    </div>
  );
}
