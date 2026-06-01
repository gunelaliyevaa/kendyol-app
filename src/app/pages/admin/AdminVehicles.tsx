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
  User,
  Navigation,
  Package,
  Clock,
  CheckCircle2,
  AlertCircle,
  Fuel,
  Activity,
  Radio,
  Star,
  TrendingUp,
  Plus
} from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { localize, routes as routesData, translateDemoText } from "../../data/logisticsData";
import type { Language } from "../../data/productCatalog";
import { marketplaceAssumptions } from "../../data/marketplaceAssumptions";

export default function AdminVehicles() {
  const { t, language } = useLanguage();
  const lang = language as Language;
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("vehicles");

  const [vehicles, setVehicles] = useState([
    {
      id: "KY-VH-001",
      plate: "10BH456",
      type: marketplaceAssumptions.pilotVehicle,
      capacity: "25 sifariş/gün",
      driver: "Elvin Məmmədov",
      driverPhone: "+994 70 987 65 43",
      driverRating: 4.9,
      status: "active",
      location: "Xətai Mərkəzinə yaxın",
      coords: { lat: 40.4093, lng: 49.8671 },
      speed: "42 km/s",
      fuel: 72,
      currentRoute: "ID-M001",
      routeDesc: "Şamaxı → Bakı",
      progress: 50,
      ordersTotal: marketplaceAssumptions.startingDailyOrders,
      ordersCompleted: 3,
      lastUpdate: "1 dəq əvvəl",
      color: "border-l-green-500",
      headerBg: "from-green-50 to-emerald-50",
    },
    {
      id: "KY-VH-002",
      plate: "77AZ112",
      type: "Mercedes-Benz Sprinter 316 CDI",
      capacity: "3500 kq",
      driver: "Fərid Axundov",
      driverPhone: "+994 55 765 43 21",
      driverRating: 4.7,
      status: "delayed",
      location: "M1 magistralı, Binəqədi",
      coords: { lat: 40.4672, lng: 49.8291 },
      speed: "18 km/s",
      fuel: 45,
      currentRoute: "ID-M002",
      routeDesc: "Suraxanı → Binəqədi → Qaradağ",
      progress: 40,
      ordersTotal: 65,
      ordersCompleted: 32,
      lastUpdate: "2 dəq əvvəl",
      delay: "M1 magistralında tıxac",
      color: "border-l-red-500",
      headerBg: "from-red-50 to-rose-50",
    },
    {
      id: "KY-VH-003",
      plate: "33BX899",
      type: "Volkswagen Crafter 35",
      capacity: "900 kq",
      driver: "Rəmil Süleymanov",
      driverPhone: "+994 70 111 22 33",
      driverRating: 4.8,
      status: "completed",
      location: "Nizami Mərkəzi — Tamamlandı",
      coords: { lat: 40.3780, lng: 49.8580 },
      speed: "0 km/s",
      fuel: 88,
      currentRoute: "ID-M003",
      routeDesc: "Səbail → Nizami",
      progress: 100,
      ordersTotal: 34,
      ordersCompleted: 34,
      lastUpdate: "12 dəq əvvəl",
      color: "border-l-green-500",
      headerBg: "from-gray-50 to-slate-50",
    },
    {
      id: "KY-VH-004",
      plate: "50KU234",
      type: "Mercedes-Benz Sprinter 315 CDI Soyuduculu",
      capacity: "800 kq",
      driver: null,
      driverPhone: null,
      driverRating: null,
      status: "idle",
      location: "Anbar mərkəzi, Bakı",
      coords: { lat: 40.4021, lng: 49.8522 },
      speed: "0 km/s",
      fuel: 95,
      currentRoute: null,
      routeDesc: null,
      progress: 0,
      ordersTotal: 0,
      ordersCompleted: 0,
      lastUpdate: "30 dəq əvvəl",
      color: "border-l-gray-400",
      headerBg: "from-gray-50 to-slate-50",
    }
  ]);

  const fleetStats = {
    total: 4,
    active: 2,
    idle: 1,
    maintenance: 0,
    totalDrivers: 3,
    ordersToday: 182,
  };

  const getRouteDescription = (routeId: string | null, fallback: string | null) => {
    const route = routesData.find(item => item.id === routeId);
    return route ? localize(route.routeDesc, lang) : fallback;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active': return <Badge className="bg-green-100 text-green-800 border border-green-300 font-semibold text-xs"><CheckCircle2 className="w-3 h-3 mr-1" />{t('vehicles.active')}</Badge>;
      case 'delayed': return <Badge className="bg-red-100 text-red-800 border border-red-300 font-semibold text-xs"><AlertCircle className="w-3 h-3 mr-1" />{t('vehicles.delayed')}</Badge>;
      case 'completed': return <Badge className="bg-blue-100 text-blue-800 border border-blue-300 font-semibold text-xs"><CheckCircle2 className="w-3 h-3 mr-1" />{t('admin.completed')}</Badge>;
      case 'idle': return <Badge className="bg-gray-100 text-gray-700 border border-gray-300 font-semibold text-xs">{t('vehicles.idle')}</Badge>;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <MobileHeader title={t('vehicles.title')} profilePath="/admin/profile" accentColor="blue" />

      {/* Fleet Overview */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white px-6 py-6">
        <h2 className="text-xl font-semibold mb-4">{t('vehicles.fleet')}</h2>
        <div className="grid grid-cols-3 gap-3 mb-4">
          {[
            { icon: Truck, value: fleetStats.total, label: t('vehicles.allVehicles') },
            { icon: Activity, value: fleetStats.active, label: t('vehicles.activeNow') },
            { icon: User, value: fleetStats.totalDrivers, label: t('vehicles.totalDrivers') },
          ].map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <Card key={idx} className="bg-white/20 backdrop-blur-sm border-white/30 border-2 p-3 text-white text-center hover:bg-white/30 transition-all">
                <Icon className="w-5 h-5 mx-auto mb-1.5" />
                <div className="text-2xl font-bold mb-0.5">{stat.value}</div>
                <div className="text-xs text-blue-100 font-medium leading-tight">{stat.label}</div>
              </Card>
            );
          })}
        </div>
        {/* Live indicator */}
        <div className="flex items-center gap-2 bg-white/15 rounded-xl px-3 py-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-sm font-medium text-blue-100">{t('vehicles.gpsActive')}</span>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="bg-white border-b-4 border-blue-100 sticky top-[57px] z-40 shadow-sm px-4 pt-3 pb-0">
          <TabsList className="w-full bg-blue-50 p-1 rounded-xl border-2 border-blue-100">
            <TabsTrigger value="vehicles" className="flex-1 rounded-lg data-[state=active]:bg-blue-600 data-[state=active]:text-white font-medium text-xs">
              {t('vehicles.allVehicles')}
            </TabsTrigger>
            <TabsTrigger value="drivers" className="flex-1 rounded-lg data-[state=active]:bg-blue-600 data-[state=active]:text-white font-medium text-xs">
              {t('vehicles.totalDrivers')}
            </TabsTrigger>
            <TabsTrigger value="tracking" className="flex-1 rounded-lg data-[state=active]:bg-blue-600 data-[state=active]:text-white font-medium text-xs">
              {t('vehicles.liveTracking')}
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Vehicles Tab */}
        <TabsContent value="vehicles" className="p-4 space-y-4 mt-0">
          {vehicles.map((vehicle) => (
            <Card key={vehicle.id} className={`overflow-hidden border-2 border-l-4 ${vehicle.color} transition-all hover:shadow-lg hover:-translate-y-0.5 ${vehicle.status === 'delayed' ? 'border-red-200' : vehicle.status === 'completed' ? 'border-gray-200' : vehicle.status === 'idle' ? 'border-gray-200' : 'border-green-200'}`}>
              {/* Vehicle Header */}
              <div className={`bg-gradient-to-r ${vehicle.headerBg} p-4 border-b border-gray-100`}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Truck className="w-4 h-4 text-gray-600" />
                      <span className="font-bold text-gray-900">{vehicle.plate}</span>
                      <span className="text-xs text-gray-500">{translateDemoText(vehicle.type, lang)}</span>
                    </div>
                    <div className="text-xs text-gray-500 font-medium">{vehicle.id} · {translateDemoText(vehicle.capacity, lang)}</div>
                    {vehicle.currentRoute && (
                      <div className="flex items-center gap-1 mt-1">
                        <span className="text-xs font-semibold text-blue-600">{vehicle.currentRoute}</span>
                        <span className="text-xs text-gray-400">·</span>
                        <span className="text-xs text-gray-600 truncate max-w-[160px]">{getRouteDescription(vehicle.currentRoute, vehicle.routeDesc)}</span>
                      </div>
                    )}
                  </div>
                  {getStatusBadge(vehicle.status)}
                </div>

                {/* Delay warning */}
                {vehicle.delay && (
                  <div className="flex items-center gap-2 bg-red-100 border border-red-200 rounded-xl px-3 py-2 mb-3">
                    <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                    <span className="text-xs text-red-700 font-medium">{translateDemoText(vehicle.delay, lang)}</span>
                  </div>
                )}

                {/* Progress */}
                {vehicle.currentRoute && vehicle.status !== 'idle' && (
                  <div className="mb-3">
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-gray-600 font-medium">{t('vehicles.routeProgress')}</span>
                      <span className="font-bold text-gray-900">{vehicle.ordersCompleted}/{vehicle.ordersTotal} {t('vehicles.orders')} · {vehicle.progress}%</span>
                    </div>
                    <Progress value={vehicle.progress} className={`h-2 ${vehicle.status === 'completed' ? '[&>div]:bg-blue-500' : '[&>div]:bg-green-500'}`} />
                  </div>
                )}

                {/* Location & Speed */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center gap-1.5 bg-white rounded-lg px-2 py-1.5 border border-gray-100">
                    <MapPin className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
                    <span className="text-xs text-gray-700 truncate">{translateDemoText(vehicle.location, lang)}</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-white rounded-lg px-2 py-1.5 border border-gray-100">
                    <Navigation className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                    <span className="text-xs text-gray-700">{vehicle.speed}</span>
                    <span className="text-xs text-gray-400 ml-auto">{translateDemoText(vehicle.lastUpdate, lang)}</span>
                  </div>
                </div>
              </div>

              {/* Vehicle Details */}
              <div className="p-4 bg-white">
                {/* Driver Info */}
                {vehicle.driver ? (
                  <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-3 border border-gray-100 mb-3">
                    <div className="w-9 h-9 bg-blue-100 rounded-xl flex items-center justify-center">
                      <User className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-gray-900">{vehicle.driver}</div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">{vehicle.driverPhone}</span>
                        {vehicle.driverRating && (
                          <div className="flex items-center gap-0.5">
                            <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                            <span className="text-xs font-semibold text-gray-600">{vehicle.driverRating}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-3 bg-amber-50 rounded-xl p-3 border border-amber-200 mb-3">
                    <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0" />
                    <span className="text-sm text-amber-800 font-medium flex-1">{t('vehicles.unassigned')}</span>
                    <Button size="sm" onClick={() => {
                      setVehicles(prev => prev.map(item => item.id === vehicle.id ? { ...item, driver: "Növbətçi sürücü", driverPhone: "+994 50 555 44 33", driverRating: 4.8, status: "active" } : item));
                      toast.success(t('common.saved'));
                    }} className="h-8 text-xs bg-amber-500 hover:bg-amber-600 rounded-xl font-semibold">
                      {t('vehicles.assignDriver')}
                    </Button>
                  </div>
                )}

                {/* Fuel */}
                <div className="mb-3">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <div className="flex items-center gap-1.5">
                      <Fuel className="w-3.5 h-3.5 text-gray-500" />
                      <span className="text-gray-600 font-medium">{t('vehicles.fuel')}</span>
                    </div>
                    <span className={`font-bold ${vehicle.fuel < 30 ? 'text-red-600' : 'text-gray-800'}`}>{vehicle.fuel}%</span>
                  </div>
                  <Progress value={vehicle.fuel} className={`h-2 ${vehicle.fuel < 30 ? '[&>div]:bg-red-500' : '[&>div]:bg-green-500'}`} />
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => { setActiveTab("tracking"); toast.info(t('vehicles.liveTracking')); }} className="flex-1 border-2 border-blue-200 text-blue-700 hover:bg-blue-50 font-medium rounded-xl text-xs h-9">
                    <Navigation className="w-3.5 h-3.5 mr-1.5" />
                    {t('vehicles.trackLive')}
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => navigate('/admin/routes')} className="flex-1 border-2 border-gray-200 hover:bg-gray-50 font-medium rounded-xl text-xs h-9">
                    <Package className="w-3.5 h-3.5 mr-1.5" />
                    {t('vehicles.viewRoute')}
                  </Button>
                </div>
              </div>
            </Card>
          ))}

          {/* Add Vehicle */}
          <Button onClick={() => {
            if (!vehicles.some(vehicle => vehicle.id === "KY-VH-005")) {
              setVehicles(prev => [...prev, {
                id: "KY-VH-005", plate: "90YZ505", type: "Renault Master L2H2", capacity: "1000 kq", driver: null, driverPhone: null, driverRating: null,
                status: "idle", location: "Anbar mərkəzi, Bakı", coords: { lat: 40.4021, lng: 49.8522 }, speed: "0 km/s", fuel: 100,
                currentRoute: null, routeDesc: null, progress: 0, ordersTotal: 0, ordersCompleted: 0, lastUpdate: "indi", color: "border-l-gray-400", headerBg: "from-gray-50 to-slate-50",
              }]);
            }
            toast.success(t('common.saved'));
          }} className="w-full bg-blue-600 hover:bg-blue-700 h-12 font-semibold rounded-xl shadow-md hover:shadow-lg transition-all">
            <Plus className="w-5 h-5 mr-2" />
            {t('vehicles.addVehicle')}
          </Button>
        </TabsContent>

        {/* Drivers Tab */}
        <TabsContent value="drivers" className="p-4 space-y-3 mt-0">
          {vehicles.filter(v => v.driver).map((vehicle) => (
            <Card key={vehicle.id} className="p-4 border-2 border-gray-200 border-l-4 border-l-blue-500 hover:shadow-md transition-all">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center border-2 border-blue-200">
                  <User className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">{vehicle.driver}</h3>
                    {getStatusBadge(vehicle.status)}
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">{vehicle.driverPhone}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      <span className="text-xs font-semibold text-gray-700">{vehicle.driverRating}</span>
                    </div>
                    <span className="text-xs text-gray-400">·</span>
                    <span className="text-xs text-gray-500">{vehicle.plate} · {translateDemoText(vehicle.type, lang)}</span>
                  </div>
                </div>
              </div>
              {vehicle.currentRoute && (
                <div className="bg-blue-50 rounded-xl p-3 border border-blue-100">
                  <div className="flex items-center gap-2 mb-1">
                    <Navigation className="w-3.5 h-3.5 text-blue-500" />
                    <span className="text-xs font-semibold text-blue-700">{vehicle.currentRoute}</span>
                    <span className="text-xs text-gray-500 truncate">{getRouteDescription(vehicle.currentRoute, vehicle.routeDesc)}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-600">
                    <span>{vehicle.ordersCompleted}/{vehicle.ordersTotal} {t('vehicles.orders')}</span>
                    <span>•</span>
                    <span>{translateDemoText(vehicle.location, lang)}</span>
                  </div>
                </div>
              )}
            </Card>
          ))}
        </TabsContent>

        {/* Live Tracking Tab */}
        <TabsContent value="tracking" className="mt-0">
          {/* Simulated Map View */}
          <div className="relative bg-gradient-to-br from-slate-200 via-blue-100 to-slate-200 mx-4 mt-4 rounded-2xl overflow-hidden border-2 border-blue-200 shadow-lg" style={{ height: '280px' }}>
            {/* Map background simulation */}
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-400" />
              <div className="absolute top-0 bottom-0 left-1/3 w-0.5 bg-gray-400" />
              <div className="absolute top-0 bottom-0 left-2/3 w-0.5 bg-gray-400" />
              <div className="absolute top-1/3 left-0 right-0 h-0.5 bg-gray-400" />
              <div className="absolute top-2/3 left-0 right-0 h-0.5 bg-gray-400" />
            </div>
            {/* Map label */}
            <div className="absolute top-3 left-3 bg-white/90 rounded-xl px-3 py-1.5 border border-blue-200 shadow-sm">
              <div className="flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
                <span className="text-xs font-semibold text-blue-700">{t('vehicles.liveTracking')}</span>
              </div>
            </div>

            {/* Vehicle pins */}
            {[
              { id: "VH-001", x: "30%", y: "45%", status: "active", label: "10BH456" },
              { id: "VH-002", x: "60%", y: "30%", status: "delayed", label: "77AZ112" },
              { id: "VH-003", x: "55%", y: "65%", status: "completed", label: "33BX899" },
              { id: "VH-004", x: "45%", y: "55%", status: "idle", label: "50KU234" },
            ].map((pin) => (
              <div
                key={pin.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
                style={{ left: pin.x, top: pin.y }}
              >
                <div className={`relative w-10 h-10 rounded-full border-2 border-white flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-all ${
                  pin.status === 'active' ? 'bg-green-500' :
                  pin.status === 'delayed' ? 'bg-red-500' :
                  pin.status === 'completed' ? 'bg-blue-500' :
                  'bg-gray-400'
                }`}>
                  <Truck className="w-4 h-4 text-white" />
                  {pin.status === 'active' && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border border-white animate-pulse" />
                  )}
                  {pin.status === 'delayed' && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-400 rounded-full border border-white animate-pulse" />
                  )}
                </div>
                <div className="bg-white text-gray-800 text-xs font-semibold px-2 py-0.5 rounded-full border border-gray-200 shadow-sm text-center mt-1 whitespace-nowrap">
                  {pin.label}
                </div>
              </div>
            ))}

            {/* Legend */}
            <div className="absolute bottom-3 right-3 bg-white/90 rounded-xl p-2 border border-gray-200 shadow-sm space-y-1">
              {[
                { color: "bg-green-500", label: t('vehicles.active') },
                { color: "bg-red-500", label: t('vehicles.delayed') },
                { color: "bg-blue-500", label: t('admin.completed') },
                { color: "bg-gray-400", label: t('vehicles.idle') },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-1.5">
                  <div className={`w-2.5 h-2.5 rounded-full ${item.color}`} />
                  <span className="text-xs text-gray-600">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Vehicle Quick Status List */}
          <div className="px-4 pt-4 pb-4 space-y-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1 h-5 bg-blue-500 rounded-full" />
              <h3 className="text-base font-semibold text-gray-900">{t('vehicles.currentStatus')}</h3>
            </div>
            {vehicles.map((vehicle) => (
              <div key={vehicle.id} className="flex items-center gap-3 bg-white rounded-xl p-3 border-2 border-gray-100 shadow-sm">
                <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${
                  vehicle.status === 'active' ? 'bg-green-500 animate-pulse' :
                  vehicle.status === 'delayed' ? 'bg-red-500 animate-pulse' :
                  vehicle.status === 'completed' ? 'bg-blue-400' : 'bg-gray-300'
                }`} />
                <Truck className="w-4 h-4 text-gray-500 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-gray-900">{vehicle.plate}</span>
                    <span className="text-xs text-gray-400">{vehicle.currentRoute ?? '—'}</span>
                  </div>
                  <p className="text-xs text-gray-500 truncate">{translateDemoText(vehicle.location, lang)}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-xs font-semibold text-gray-700">{vehicle.speed}</div>
                  <div className="text-xs text-gray-400">{translateDemoText(vehicle.lastUpdate, lang)}</div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <BottomNav type="admin" />
    </div>
  );
}
