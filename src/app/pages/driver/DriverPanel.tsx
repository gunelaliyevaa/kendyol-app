import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
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
  Navigation,
  Package,
  Star,
  Phone,
  User,
  Route,
  CircleCheck
} from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";
import { CLAIMED_ROUTE_STORAGE_KEY, usePersistentState } from "../../data/demoStore";
import { ProfileEditDialog } from "../../components/ProfileEditDialog";
import { toast } from "sonner";
import { localize, routes as routesData } from "../../data/logisticsData";
import type { Language } from "../../data/productCatalog";
import { marketplaceAssumptions } from "../../data/marketplaceAssumptions";

export default function DriverPanel() {
  const { t, language } = useLanguage();
  const lang = language as Language;
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get("tab") || "active");
  const [claimedRoute] = usePersistentState<string | null>(CLAIMED_ROUTE_STORAGE_KEY, "ID-M001");
  const [completedStops, setCompletedStops] = useState<number[]>([0]);
  const [editProfileOpen, setEditProfileOpen] = useState(false);

  const sharedActiveRoute = routesData[0];
  const myActiveRoute = {
    id: sharedActiveRoute.id,
    routeDesc: localize(sharedActiveRoute.routeDesc, lang),
    progress: Math.max(sharedActiveRoute.progress, Math.round((completedStops.length / sharedActiveRoute.stops.length) * 100)),
    stops: sharedActiveRoute.stops.map((stop, index) => ({
      ...stop,
      name: localize(stop.location, lang),
      status: index < completedStops.length ? "completed" : index === completedStops.length ? "current" : "pending",
    })),
    estimatedCompletion: sharedActiveRoute.estimatedCompletion,
    totalOrders: sharedActiveRoute.stops.reduce((total, stop) => total + stop.orders, 0),
  };

  const todayStats = {
    deliveries: 2,
    totalOrders: marketplaceAssumptions.startingDailyOrders,
    distance: "285 km",
    earnings: "₼55",
    rating: 4.9
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <MobileHeader title={t('driver.title')} accentColor="blue" onProfileClick={() => setActiveTab("profile")} />
      <ProfileEditDialog open={editProfileOpen} onOpenChange={setEditProfileOpen} name="Elvin Məmmədov" phone="+994 70 987 65 43" accent="blue" />

      {/* Driver Dashboard Header */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white px-6 py-6">
        {/* Today Stats */}
        <div className="grid grid-cols-4 gap-2">
          {[
            { label: t('driver.deliveries'), value: todayStats.deliveries },
            { label: t('driver.orders'), value: todayStats.totalOrders },
            { label: t('driver.totalDistance'), value: todayStats.distance },
            { label: t('driver.earnings'), value: todayStats.earnings },
          ].map((stat, idx) => (
            <div key={idx} className="bg-white/15 rounded-xl p-2.5 text-center">
              <div className="text-base font-bold">{stat.value}</div>
              <div className="text-xs text-blue-100 font-medium leading-tight">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="bg-white border-b-4 border-blue-100 sticky top-[57px] z-40 shadow-sm px-4 pt-3 pb-0">
          <TabsList className="w-full bg-blue-50 p-1 rounded-xl border-2 border-blue-100">
            <TabsTrigger value="active" className="flex-1 rounded-lg data-[state=active]:bg-blue-600 data-[state=active]:text-white font-medium text-xs">
              {t('driver.activeDelivery')}
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Active Delivery Tab */}
        <TabsContent value="active" className="p-4 space-y-4 mt-0">
          {claimedRoute ? (
            <>
              {/* Active Route Header */}
              <Card className="overflow-hidden border-2 border-blue-300 border-l-4 border-l-blue-500">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 border-b border-blue-100">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs text-blue-600 font-semibold uppercase tracking-wide">{t('admin.route.id')}</span>
                        <span className="font-bold text-gray-900">{myActiveRoute.id}</span>
                        <Badge className="bg-blue-600 text-white text-xs font-semibold">{t('driver.inProgress')}</Badge>
                      </div>
                      <p className="text-xs text-gray-600 font-medium">{myActiveRoute.routeDesc}</p>
                    </div>
                  </div>

                  <div className="mb-2">
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-gray-600 font-medium">{t('admin.routes.progress')}</span>
                      <span className="font-bold text-blue-700">{myActiveRoute.progress}% · {myActiveRoute.stops.filter(s => s.status === 'completed').length}/{myActiveRoute.stops.length} {t('driver.stops')}</span>
                    </div>
                    <Progress value={myActiveRoute.progress} className="h-2.5 [&>div]:bg-blue-500" />
                  </div>

                  <div className="flex items-center gap-2 text-xs text-blue-700 bg-blue-100 rounded-lg px-3 py-2">
                    <Clock className="w-3.5 h-3.5" />
                      <span className="font-medium">{t('admin.routes.estimatedCompletion')}: {myActiveRoute.estimatedCompletion} · {myActiveRoute.totalOrders} {t('driver.orders')}</span>
                  </div>
                </div>

                {/* Next Stop Highlight */}
                <div className="p-4 bg-white">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-1 h-5 bg-blue-500 rounded-full" />
                    <span className="text-sm font-semibold text-gray-800">{t('driver.nextStop')}</span>
                  </div>
                  {myActiveRoute.stops.filter(s => s.status === 'current').map((stop, idx) => (
                    <div key={idx} className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 mb-3">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center shadow-md">
                          <Navigation className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-blue-900 mb-0.5">{stop.name}</h4>
                          <p className="text-xs text-blue-600 mb-2">{stop.address}</p>
                          <div className="flex items-center gap-3 text-xs">
                            <span className="bg-white rounded-lg px-2 py-1 border border-blue-200 font-medium text-blue-700">
                              <Package className="w-3 h-3 inline mr-1" />{stop.orders} {t('driver.orders')}
                            </span>
                            <span className="bg-white rounded-lg px-2 py-1 border border-blue-200 font-medium text-blue-700">
                              <Clock className="w-3 h-3 inline mr-1" />{stop.time}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-3">
                        <Button onClick={() => toast.success(t('common.demoUpdated'))} className="flex-1 bg-blue-600 hover:bg-blue-700 h-10 font-semibold text-sm rounded-xl">
                          <Navigation className="w-4 h-4 mr-2" />
                          {t('driver.navigationStart')}
                        </Button>
                        <Button variant="outline" onClick={() => { window.location.href = "tel:+994123456789"; }} className="h-10 px-3 border-2 border-blue-200 text-blue-700 hover:bg-blue-50 rounded-xl">
                          <Phone className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}

                  {/* All Stops */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-1 h-5 bg-gray-300 rounded-full" />
                    <span className="text-sm font-semibold text-gray-700">{t('driver.allStops')}</span>
                  </div>
                  <div className="space-y-2">
                    {myActiveRoute.stops.map((stop, idx) => (
                      <div key={idx} className="flex gap-3">
                        <div className="flex flex-col items-center">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-sm text-xs font-bold ${
                            stop.status === 'completed' ? 'bg-green-500 text-white' :
                            stop.status === 'current' ? 'bg-blue-600 text-white ring-4 ring-blue-100' :
                            'bg-gray-200 text-gray-500'
                          }`}>
                            {stop.status === 'completed' ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                          </div>
                          {idx < myActiveRoute.stops.length - 1 && (
                            <div className={`w-0.5 h-7 mt-1 ${stop.status === 'completed' ? 'bg-green-300' : 'bg-gray-200'}`} />
                          )}
                        </div>
                        <div className={`flex-1 rounded-xl px-3 py-2 mb-0 ${stop.status === 'current' ? 'bg-blue-50 border border-blue-200' : ''}`}>
                          <div className="flex items-center justify-between">
                            <h4 className={`text-sm font-medium ${stop.status === 'current' ? 'text-blue-700' : stop.status === 'completed' ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
                              {stop.name}
                            </h4>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-gray-500">{stop.time}</span>
                              <span className="text-xs font-medium text-gray-600">{stop.orders} {t('driver.orders')}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Button 
                    onClick={() => {
                      setCompletedStops(prev => prev.length >= myActiveRoute.stops.length ? prev : [...prev, prev.length]);
                      toast.success(t('common.demoUpdated'));
                    }}
                    className="w-full mt-4 bg-green-600 hover:bg-green-700 h-11 font-semibold rounded-xl shadow-md"
                  >
                    <CircleCheck className="w-4 h-4 mr-2" />
                    {t('driver.markDelivered')}
                  </Button>
                </div>
              </Card>
            </>
          ) : (
            <Card className="p-8 text-center border-2 border-dashed border-blue-200">
              <Route className="w-14 h-14 mx-auto mb-4 text-blue-300" />
              <h3 className="text-lg font-semibold mb-2 text-gray-900">{t('driver.noRoutes')}</h3>
              <p className="text-sm text-gray-500 mb-4">{t('driver.noRoutesDesc')}</p>
              <Button onClick={() => navigate('/driver/routes')} className="bg-blue-600 hover:bg-blue-700">
                {t('driver.availableRoutes')}
              </Button>
            </Card>
          )}
        </TabsContent>

        {/* Profile Tab */}
        <TabsContent value="profile" className="p-4 space-y-4 mt-0">
          {/* Driver Profile Card */}
          <Card className="overflow-hidden border-2 border-blue-200">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-5">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-white/20 rounded-2xl border-2 border-white/30 flex items-center justify-center shadow-lg">
                  <User className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-white mb-0.5">Elvin Məmmədov</h2>
                  <p className="text-blue-100 text-sm">ID: KY-DRV-0042</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge className="bg-green-500/80 text-white border-0 text-xs">{t('driver.activeDriver')}</Badge>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-white/15 rounded-xl p-2.5 text-center">
                  <div className="flex items-center justify-center gap-1 mb-0.5">
                    <Star className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                    <span className="font-bold text-white">4.9</span>
                  </div>
                  <div className="text-xs text-blue-100">{t('driver.rating')}</div>
                </div>
                <div className="bg-white/15 rounded-xl p-2.5 text-center">
                  <div className="font-bold text-white mb-0.5">248</div>
                  <div className="text-xs text-blue-100">{t('driver.deliveries')}</div>
                </div>
                <div className="bg-white/15 rounded-xl p-2.5 text-center">
                  <div className="font-bold text-white mb-0.5">98%</div>
                  <div className="text-xs text-blue-100">{t('driver.onTime')}</div>
                </div>
              </div>
            </div>
            <div className="p-4 bg-white space-y-2">
              {[
                { label: t('driver.vehicle'), value: `${marketplaceAssumptions.pilotVehicle} - 10BH456` },
                { label: t('driver.phone'), value: "+994 70 987 65 43" },
                { label: t('driver.memberSince'), value: "2022" },
                { label: t('driver.areas'), value: "Bakı şəhəri - bütün rayonlar" },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between bg-gray-50 rounded-xl px-3 py-2.5 border border-gray-100">
                  <span className="text-xs text-gray-500 font-medium">{item.label}</span>
                  <span className="text-sm font-semibold text-gray-900">{item.value}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Recent Earnings */}
          <Card className="p-5 border-2 border-gray-200">
            <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <div className="w-1 h-4 bg-green-500 rounded-full" />
              {t('driver.recentEarnings')}
            </h3>
            <div className="space-y-2">
              {[
                { date: t('driver.thisWeek'), amount: "₼145", deliveries: 6, status: "paid" },
                { date: t('driver.lastWeek'), amount: "₼132", deliveries: 5, status: "paid" },
              ].map((earning, idx) => (
                <div key={idx} className="flex items-center justify-between bg-gray-50 rounded-xl px-3 py-3 border border-gray-100">
                  <div>
                    <div className="text-sm font-semibold text-gray-900">{earning.date}</div>
                    <div className="text-xs text-gray-500">{earning.deliveries} {t('driver.deliveries')}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-base font-bold text-green-700">{earning.amount}</div>
                    <Badge className="bg-green-100 text-green-700 border border-green-200 text-xs">{t('driver.paid')}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>
          <Button onClick={() => setEditProfileOpen(true)} className="w-full bg-blue-600 hover:bg-blue-700 h-11 rounded-xl font-semibold">
            {t('common.editProfile')}
          </Button>
        </TabsContent>
      </Tabs>

      <BottomNav type="driver" />
    </div>
  );
}
