import { MobileHeader } from "../../components/MobileHeader";
import { BottomNav } from "../../components/BottomNav";
import { Card } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { MapPin, Package, Route, Clock, Play, AlertCircle } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";
import { localize, scheduledRoutes } from "../../data/logisticsData";
import type { Language } from "../../data/productCatalog";
import { useNavigate } from "react-router";
import { CLAIMED_ROUTE_STORAGE_KEY, usePersistentState } from "../../data/demoStore";
import { toast } from "sonner";

export default function DriverRoutes() {
  const { t, language } = useLanguage();
  const lang = language as Language;
  const navigate = useNavigate();
  const [claimedRoute, setClaimedRoute] = usePersistentState<string | null>(CLAIMED_ROUTE_STORAGE_KEY, null);

  const claimRoute = (routeId: string) => {
    setClaimedRoute(routeId);
    toast.success(`${routeId}: ${t('common.saved')}`);
    navigate('/driver');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <MobileHeader title={t('driver.availableRoutes')} showBack profilePath="/driver?tab=profile" accentColor="blue" />
      <div className="p-4 space-y-4">
        {scheduledRoutes.map((route) => (
          <Card key={route.id} className="overflow-hidden border-2 border-blue-200 border-l-4 border-l-blue-500 bg-white">
            <div className="bg-blue-50 p-4 border-b border-blue-100">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs text-gray-500 font-medium">{t('admin.route.id')}</span>
                    <span className="font-bold text-gray-900">{route.id}</span>
                    <Badge className="bg-red-100 text-red-700 border border-red-200 text-xs">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      {t('driver.priority')}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-600 font-medium">{localize(route.routeDesc, lang)}</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-green-700">{route.ai.score}%</div>
                  <div className="text-xs text-gray-500">{t('driver.efficiency')}</div>
                </div>
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
            <div className="p-4">
              <p className="text-xs text-gray-600 mb-4">{localize(route.ai.finding, lang)}</p>
              <Button onClick={() => claimRoute(route.id)} className="w-full bg-blue-600 hover:bg-blue-700 h-11 rounded-xl font-semibold">
                <Play className="w-4 h-4 mr-2" />
                {claimedRoute === route.id ? t('driver.inProgress') : `${t('driver.claimRoute')} - ${route.id}`}
              </Button>
            </div>
          </Card>
        ))}
      </div>
      <BottomNav type="driver" />
    </div>
  );
}
