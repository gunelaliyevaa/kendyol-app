import { useState } from "react";
import { MobileHeader } from "../../components/MobileHeader";
import { BottomNav } from "../../components/BottomNav";
import { Card } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Progress } from "../../components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { 
  Truck,
  MapPin,
  Clock,
  CheckCircle2,
  AlertCircle,
  Navigation,
  Package,
  Plus,
  BrainCircuit
} from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";
import { localize, routes as routesData, scheduledRoutes } from "../../data/logisticsData";
import type { Language } from "../../data/productCatalog";
import { useNavigate } from "react-router";
import { APPROVED_ROUTES_STORAGE_KEY, usePersistentState } from "../../data/demoStore";
import { toast } from "sonner";

export default function AdminRoutes() {
  const { t, language } = useLanguage();
  const lang = language as Language;
  const [routes] = useState(routesData);
  const navigate = useNavigate();
  const [approvedRoutes, setApprovedRoutes] = usePersistentState<string[]>(APPROVED_ROUTES_STORAGE_KEY, []);

  const approveRoute = (routeId: string) => {
    setApprovedRoutes(prev => prev.includes(routeId) ? prev : [...prev, routeId]);
    toast.success(`${routeId}: ${t('common.saved')}`);
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-300';
      case 'in-progress': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'delayed': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getStatusLabel = (status: string) => {
    switch(status) {
      case 'completed': return t('admin.completed');
      case 'in-progress': return t('driver.inProgress');
      case 'delayed': return t('vehicles.delayed');
      default: return status;
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'completed': return CheckCircle2;
      case 'in-progress': return Truck;
      case 'delayed': return AlertCircle;
      default: return Clock;
    }
  };

  const getCardBorder = (status: string) => {
    switch(status) {
      case 'completed': return 'border-green-200 border-l-4 border-l-green-500';
      case 'in-progress': return 'border-blue-200 border-l-4 border-l-blue-500';
      case 'delayed': return 'border-red-200 border-l-4 border-l-red-500';
      default: return 'border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <MobileHeader title={t('admin.routes.title')} showBack showProfile={false} accentColor="blue" />

      <Tabs defaultValue="active" className="w-full">
        <div className="bg-white border-b-4 border-blue-100 sticky top-[57px] z-40 shadow-sm px-4 pt-3 pb-0">
          <TabsList className="w-full bg-blue-50 p-1 rounded-xl border-2 border-blue-100">
            <TabsTrigger value="active" className="flex-1 rounded-lg data-[state=active]:bg-blue-600 data-[state=active]:text-white font-medium">
              {t('admin.routes.active')}
            </TabsTrigger>
            <TabsTrigger value="scheduled" className="flex-1 rounded-lg data-[state=active]:bg-blue-600 data-[state=active]:text-white font-medium">
              {t('admin.routes.scheduled')}
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Active Routes */}
        <TabsContent value="active" className="p-4 space-y-4 mt-0">
          {routes.map((route) => {
            const StatusIcon = getStatusIcon(route.status);
            
            return (
              <Card key={route.id} className={`overflow-hidden border-2 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 ${getCardBorder(route.status)}`}>
                {/* Header */}
                <div className={`p-4 border-b-2 ${
                  route.status === 'completed' ? 'bg-green-50 border-green-100' :
                  route.status === 'delayed' ? 'bg-red-50 border-red-100' :
                  'bg-blue-50 border-blue-100'
                }`}>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">{t('admin.route.id')}</span>
                        <span className="text-base font-bold text-gray-900">{route.id}</span>
                      </div>
                      <div className="text-xs text-gray-600 font-medium mb-1">
                        {t('admin.route.routeDesc')}: <span className="text-gray-800 font-semibold">{localize(route.routeDesc, lang)}</span>
                      </div>
                      <div className="text-xs text-gray-500">{route.driverShort} • {route.vehicle}</div>
                    </div>
                    <Badge className={`border font-semibold ${getStatusColor(route.status)}`}>
                      <StatusIcon className="w-3 h-3 mr-1" />
                      {getStatusLabel(route.status)}
                    </Badge>
                  </div>

                  <div className="mb-2">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600 font-medium">{t('admin.routes.progress')}</span>
                      <span className="font-bold text-gray-900">{route.progress}%</span>
                    </div>
                    <Progress value={route.progress} className="h-3" />
                  </div>

                  {route.delay && (
                    <div className="flex items-center gap-2 text-sm text-red-700 bg-red-100 px-3 py-2 rounded-xl border border-red-200 mt-2">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span className="font-medium">{localize(route.delay, lang)}</span>
                    </div>
                  )}
                </div>

                {/* Stops */}
                <div className="p-4 bg-white">
                  <div className="space-y-3">
                    {route.stops.map((stop, idx) => (
                      <div key={idx} className="flex gap-3">
                        <div className="flex flex-col items-center">
                          <div className={`w-9 h-9 rounded-full flex items-center justify-center shadow-sm ${
                            stop.status === 'completed' ? 'bg-green-600 text-white' :
                            stop.status === 'current' ? 'bg-blue-600 text-white ring-4 ring-blue-100 scale-110' :
                            'bg-gray-200 text-gray-400'
                          }`}>
                            {stop.status === 'completed' ? (
                              <CheckCircle2 className="w-4 h-4" />
                            ) : stop.status === 'current' ? (
                              <Navigation className="w-4 h-4" />
                            ) : (
                              <MapPin className="w-4 h-4" />
                            )}
                          </div>
                          {idx < route.stops.length - 1 && (
                            <div className={`w-0.5 h-8 mt-1 ${
                              stop.status === 'completed' ? 'bg-green-200' : 'bg-gray-200'
                            }`}></div>
                          )}
                        </div>

                        <div className={`flex-1 rounded-xl px-3 py-2 ${stop.status === 'current' ? 'bg-blue-50 border border-blue-200' : ''}`}>
                          <div className="flex items-start justify-between mb-1">
                            <h4 className={`font-semibold text-sm ${stop.status === 'current' ? 'text-blue-700' : 'text-gray-900'}`}>
                              {localize(stop.location, lang)}
                            </h4>
                            <span className="text-xs text-gray-500 font-medium">{stop.time}</span>
                          </div>
                          <div className="text-xs text-gray-600 font-medium">
                            {stop.orders} {t('admin.orders')}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 pt-4 border-t-2 border-gray-100">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 font-medium">{t('admin.routes.estimatedCompletion')}:</span>
                      <span className="font-bold text-gray-900">{route.estimatedCompletion}</span>
                    </div>
                  </div>

                  {route.status === 'in-progress' && (
                    <div className="mt-3 flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => navigate('/admin/vehicles')} className="flex-1 border-2 border-blue-200 text-blue-700 hover:bg-blue-50 font-medium rounded-xl">
                        <MapPin className="w-4 h-4 mr-2" />
                        {t('admin.routes.track')}
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => { window.location.href = "tel:+994709876543"; }} className="flex-1 border-2 border-gray-200 hover:bg-gray-50 font-medium rounded-xl">
                        {t('admin.routes.contactDriver')}
                      </Button>
                    </div>
                  )}
                </div>
              </Card>
            );
          })}
        </TabsContent>

        {/* Scheduled Routes */}
        <TabsContent value="scheduled" className="p-4 space-y-4 mt-0">
          <Card className="p-4 bg-blue-50 border-2 border-blue-300 border-l-4 border-l-blue-500">
            <h3 className="text-blue-900 font-semibold mb-1">{t('admin.routes.planning')}</h3>
            <p className="text-sm text-blue-700">
              {t('admin.routes.planningDesc')}
            </p>
          </Card>

          <Button onClick={() => navigate("/admin/ai-route-planner")} className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 rounded-xl font-semibold shadow-md">
            <BrainCircuit className="w-5 h-5 mr-2" />
            {t("ai.route.open")}
          </Button>

          {scheduledRoutes.map((route) => (
            <Card key={route.id} className="p-5 border-2 border-gray-200 border-l-4 border-l-indigo-500 hover:shadow-lg hover:bg-indigo-50 hover:-translate-y-0.5 transition-all duration-200">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">{t('admin.route.id')}</span>
                    <span className="text-base font-bold text-gray-900">{route.id}</span>
                  </div>
                  <div className="text-xs text-gray-700 font-medium mb-0.5">
                    {t('admin.route.routeDesc')}: <span className="font-semibold">{localize(route.routeDesc, lang)}</span>
                  </div>
                  <div className="text-xs text-gray-500">{localize(route.area, lang)}</div>
                </div>
                <Badge className="bg-indigo-100 text-indigo-800 border border-indigo-300 font-semibold">{localize(route.date, lang)}</Badge>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="bg-gray-50 rounded-xl p-3 border border-gray-200 text-center">
                  <div className="text-xs text-gray-600 mb-1 font-medium">{t('driver.stopsTitle')}</div>
                  <div className="flex items-center justify-center gap-1">
                    <MapPin className="w-4 h-4 text-gray-600" />
                    <span className="font-bold text-gray-900">{route.stops}</span>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-3 border border-gray-200 text-center">
                  <div className="text-xs text-gray-600 mb-1 font-medium">{t('vehicles.orders')}</div>
                  <div className="flex items-center justify-center gap-1">
                    <Package className="w-4 h-4 text-gray-600" />
                    <span className="font-bold text-gray-900">{route.orders}</span>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-3 border border-gray-200 text-center">
                  <div className="text-xs text-gray-600 mb-1 font-medium">{t('vehicles.driver')}</div>
                  <div className="text-xs font-semibold text-gray-700">{localize(route.driver, lang)}</div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-3 border border-indigo-100 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-indigo-700">{t('admin.routes.aiFindings')}</span>
                  <Badge className="bg-green-100 text-green-800 border border-green-300">{route.ai.score}%</Badge>
                </div>
                <p className="text-xs text-gray-600 mb-2">{localize(route.ai.finding, lang)}</p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-green-50 rounded-lg p-2 border border-green-100">
                    <div className="text-green-700 font-semibold">{t('admin.routes.cheaper')}</div>
                    <div className="font-bold text-gray-900">{route.ai.cost}</div>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-2 border border-blue-100">
                    <div className="text-blue-700 font-semibold">{t('admin.routes.fastest')}</div>
                    <div className="font-bold text-gray-900">{localize(route.ai.time, lang)}</div>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button size="sm" onClick={() => approveRoute(route.id)} className="flex-1 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold">{approvedRoutes.includes(route.id) ? t('common.saved') : t('admin.routes.approve')}</Button>
                <Button size="sm" variant="outline" onClick={() => toast.info(localize(route.ai.finding, lang))} className="flex-1 border-2 border-blue-200 text-blue-700 hover:bg-blue-50 rounded-xl font-semibold">
                  {t('admin.routes.viewDetails')}
                </Button>
              </div>
            </Card>
          ))}

          <Button onClick={() => toast.info(t('common.demoUpdated'))} className="w-full bg-blue-600 hover:bg-blue-700 h-12 text-base font-semibold rounded-xl shadow-md hover:shadow-lg transition-all hover:scale-[1.01]">
            <Plus className="w-5 h-5 mr-2" />
            {t('admin.routes.createNew')}
          </Button>
        </TabsContent>
      </Tabs>

      <BottomNav type="admin" />
    </div>
  );
}
