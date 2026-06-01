import { useState } from "react";
import { MobileHeader } from "../../components/MobileHeader";
import { BottomNav } from "../../components/BottomNav";
import { Card } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { AlertCircle, BrainCircuit, CheckCircle2, ChevronDown, ExternalLink, MapPin, Package, Play, Route, ShieldCheck, Sparkles, Clock } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";
import { localize, scheduledRoutes } from "../../data/logisticsData";
import type { Language } from "../../data/productCatalog";
import { useNavigate } from "react-router";
import { APPROVED_ROUTES_STORAGE_KEY, CLAIMED_ROUTE_STORAGE_KEY, usePersistentState } from "../../data/demoStore";
import { toast } from "sonner";

export default function DriverRoutes() {
  const { t, language } = useLanguage();
  const lang = language as Language;
  const navigate = useNavigate();
  const [claimedRoute, setClaimedRoute] = usePersistentState<string | null>(CLAIMED_ROUTE_STORAGE_KEY, null);
  const [approvedRoutes] = usePersistentState<string[]>(APPROVED_ROUTES_STORAGE_KEY, []);
  const [expandedRouteId, setExpandedRouteId] = useState<string | null>(scheduledRoutes[0].id);

  const claimRoute = (routeId: string) => {
    if (!approvedRoutes.includes(routeId)) {
      toast.info(t("driver.adminPending"));
      return;
    }
    setClaimedRoute(routeId);
    toast.success(`${routeId}: ${t('common.saved')}`);
    navigate('/driver');
  };

  const getGoogleMapsUrl = (routeDescription: string) => {
    const stops = routeDescription
      .replace(/\s*\([^)]*\)/g, "")
      .split("→")
      .map(stop => stop.trim())
      .filter(Boolean);
    const params = new URLSearchParams({
      api: "1",
      origin: stops[0],
      destination: stops[stops.length - 1],
    });
    if (stops.length > 2) params.set("waypoints", stops.slice(1, -1).join("|"));
    return `https://www.google.com/maps/dir/?${params.toString()}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <MobileHeader title={t('driver.availableRoutes')} profilePath="/driver/profile" accentColor="blue" />
      <div className="p-4 space-y-4">
        <Card className="p-3 border-2 border-indigo-200 border-l-4 border-l-indigo-500 bg-indigo-50">
          <div className="flex items-start gap-3">
            <div className="bg-indigo-100 rounded-xl p-2">
              <BrainCircuit className="w-5 h-5 text-indigo-700" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-gray-900">{t("driver.aiRouteHeading")}</h2>
              <p className="text-xs text-gray-600 mt-1 leading-relaxed">{t("driver.aiRouteDesc")}</p>
            </div>
          </div>
        </Card>

        {scheduledRoutes.map((route, index) => {
          const isApproved = approvedRoutes.includes(route.id);
          const isExpanded = expandedRouteId === route.id;
          const routeDescription = localize(route.routeDesc, lang);

          return (
            <Card key={route.id} className="overflow-hidden border-2 border-blue-200 border-l-4 border-l-blue-500 bg-white">
              <div className="bg-blue-50 p-3 border-b border-blue-100">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <div className="flex flex-wrap items-center gap-1.5 mb-1">
                      <span className="text-xs text-gray-500 font-medium">{t('admin.route.id')}</span>
                      <span className="font-bold text-gray-900">{route.id}</span>
                      {index === 0 && (
                        <Badge className="bg-amber-100 text-amber-700 border border-amber-200 text-xs">
                          <AlertCircle className="w-3 h-3 mr-1" />
                          {t('driver.priority')}
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-gray-600 font-medium">{routeDescription}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-lg font-bold text-green-700">{route.ai.score}%</div>
                    <div className="text-xs text-gray-500">{t('driver.efficiency')}</div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-3">
                  <Badge className="bg-indigo-100 text-indigo-700 border border-indigo-200 text-xs">
                    <Sparkles className="w-3 h-3 mr-1" />
                    {t("driver.aiOptimized")}
                  </Badge>
                  <Badge className={isApproved ? "bg-green-100 text-green-700 border border-green-200 text-xs" : "bg-orange-100 text-orange-700 border border-orange-200 text-xs"}>
                    {isApproved ? <CheckCircle2 className="w-3 h-3 mr-1" /> : <ShieldCheck className="w-3 h-3 mr-1" />}
                    {isApproved ? t("driver.adminApproved") : t("driver.adminPending")}
                  </Badge>
                </div>

                <div className="grid grid-cols-4 gap-2">
                  {[
                    { icon: MapPin, label: t('driver.stops'), value: route.stops },
                    { icon: Package, label: t('driver.orders'), value: route.orders },
                    { icon: Route, label: t('driver.km'), value: route.distance },
                    { icon: Clock, label: t('driver.estimatedTime'), value: localize(route.estimatedTime, lang) },
                  ].map((stat) => {
                    const Icon = stat.icon;
                    return (
                      <div key={stat.label} className="bg-white rounded-xl p-2 border border-blue-100 text-center">
                        <Icon className="w-3.5 h-3.5 text-blue-500 mx-auto mb-0.5" />
                        <div className="text-sm font-bold text-gray-900">{stat.value}</div>
                        <div className="text-xs text-gray-400">{stat.label}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="p-3 space-y-2">
                <button
                  type="button"
                  onClick={() => setExpandedRouteId(isExpanded ? null : route.id)}
                  className="w-full flex items-center justify-between text-left text-xs font-semibold text-indigo-700 bg-indigo-50 rounded-xl px-3 py-2.5 border border-indigo-100"
                >
                  <span className="flex items-center gap-2">
                    <BrainCircuit className="w-4 h-4" />
                    {t("admin.routes.aiFindings")}
                  </span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                </button>

                {isExpanded && (
                  <div className="bg-gray-50 rounded-xl px-3 py-2.5 border border-gray-100">
                    <p className="text-xs text-gray-600 leading-relaxed">{localize(route.ai.finding, lang)}</p>
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-200 text-xs">
                      <span className="text-gray-500">{t("driver.estimatedCost")}</span>
                      <span className="font-bold text-gray-800">{route.ai.cost}</span>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-2">
                  <Button asChild variant="outline" className="h-10 rounded-xl border-blue-200 text-blue-700">
                    <a href={getGoogleMapsUrl(routeDescription)} target="_blank" rel="noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      {t("driver.openMaps")}
                    </a>
                  </Button>
                  <Button onClick={() => claimRoute(route.id)} className={`h-10 rounded-xl font-semibold ${isApproved ? "bg-blue-600 hover:bg-blue-700" : "bg-orange-500 hover:bg-orange-600"}`}>
                    {isApproved ? <Play className="w-4 h-4 mr-2" /> : <ShieldCheck className="w-4 h-4 mr-2" />}
                    {claimedRoute === route.id ? t('driver.inProgress') : isApproved ? t('driver.claimRoute') : t("driver.requestReview")}
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
      <BottomNav type="driver" />
    </div>
  );
}
