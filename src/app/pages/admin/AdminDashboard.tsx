import { useNavigate } from "react-router";
import { MobileHeader } from "../../components/MobileHeader";
import { BottomNav } from "../../components/BottomNav";
import { Card } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Progress } from "../../components/ui/progress";
import { Button } from "../../components/ui/button";
import { 
  Package,
  Truck,
  MapPin,
  Clock,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Navigation,
  User,
  Fuel
} from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";
import { localize, routes as routesData, translateDemoText } from "../../data/logisticsData";
import type { Language } from "../../data/productCatalog";
import { marketplaceAssumptions } from "../../data/marketplaceAssumptions";
import { DRIVER_ISSUES_STORAGE_KEY, usePersistentState, type DriverIssue } from "../../data/demoStore";

function SectionDivider() {
  return (
    <div className="h-3 bg-gradient-to-r from-blue-200 via-indigo-100 to-blue-200" />
  );
}

function SectionHeader({ title, action, onAction }: { title: string; action?: string; onAction?: () => void }) {
  return (
    <div className="flex items-center justify-between mb-5">
      <div className="flex items-center gap-3">
        <div className="w-1.5 h-7 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full" />
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
      </div>
      {action && (
        <button 
          onClick={onAction}
          className="text-blue-600 text-sm font-semibold hover:text-blue-800 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-all"
        >
          {action}
        </button>
      )}
    </div>
  );
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const lang = language as Language;
  const [driverIssues] = usePersistentState<DriverIssue[]>(DRIVER_ISSUES_STORAGE_KEY, []);

  const stats = [
    { label: t('admin.activeOrders'), value: String(marketplaceAssumptions.startingDailyOrders), icon: Package, color: "text-green-600", bg: "bg-green-100" },
    { label: t('admin.routesToday'), value: "1", icon: Truck, color: "text-blue-600", bg: "bg-blue-100" },
    { label: t('admin.collectionPoints'), value: "1", icon: MapPin, color: "text-purple-600", bg: "bg-purple-100" },
  ];

  const batchProgress = {
    current: "ID-B2603",
    routeDesc: localize(marketplaceAssumptions.pilotRoute, lang),
    stage: "in-transit",
    collected: marketplaceAssumptions.startingDailyOrders,
    total: marketplaceAssumptions.pilotVehicleCapacity,
    cutoffTime: localize({ az: "Bazar ertəsi 23:59", en: "Monday 23:59", ru: "Понедельник 23:59" }, lang),
    deliveryDate: "25 Mart 2026"
  };

  const collectionPoints = [
    {
      name: t('admin.shamakhi'),
      collected: marketplaceAssumptions.startingDailyOrders,
      expected: marketplaceAssumptions.pilotVehicleCapacity,
      status: "collecting",
      farmers: marketplaceAssumptions.initialActiveFarmers
    }
  ];

  const coldStorage = [
    { category: t('storage.sensitive'), items: 45, capacity: 100, temperature: "2-4°C", status: t('storage.optimal') },
    { category: t('storage.medium'), items: 67, capacity: 150, temperature: "8-10°C", status: t('storage.optimal') },
    { category: t('storage.durable'), items: 30, capacity: 100, temperature: "12-15°C", status: t('storage.optimal') }
  ];

  const vehicles = [
    { id: "KY-VH-001", plate: "10BH456", driver: "Elvin M.", route: "ID-M001", routeDesc: "Şamaxı → Bakı", status: "active", progress: 50, orders: "3/10", speed: "42 km/s", fuel: 72 },
  ];

  const urgentTasks = [
    ...driverIssues.map(issue => ({
      title: `${t("admin.driverReport")}: ${issue.routeId}`,
      description: issue.message || t(issue.typeKey),
      priority: "high",
      time: issue.time,
    })),
    { 
      title: t('admin.urgentRoute'), 
      description: t('admin.urgentRouteDesc'), 
      priority: "high",
      time: "15 dəq əvvəl"
    },
    { 
      title: t('admin.urgentStorage'), 
      description: t('admin.urgentStorageDesc'), 
      priority: "medium",
      time: "1 saat əvvəl"
    }
  ];
  const routeDescription = (routeId: string, fallback: string) => {
    const route = routesData.find(item => item.id === routeId);
    return route ? localize(route.routeDesc, lang) : fallback;
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <MobileHeader title={t('customer.home.title')} titlePath="/" showProfile={false} accentColor="blue" />

      {/* Stats */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white px-6 py-7">
        <h2 className="text-2xl font-semibold mb-5">{t('admin.operations')}</h2>
        
        <div className="grid grid-cols-3 gap-3">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label} className="bg-white/20 backdrop-blur-sm border-white/30 border-2 p-3 text-white text-center hover:bg-white/30 transition-all cursor-default">
                <div className={`${stat.bg} rounded-full p-2 w-10 h-10 mx-auto mb-2 flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <div className="text-2xl font-bold mb-1">{stat.value}</div>
                <div className="text-xs text-blue-100 leading-tight font-medium">{stat.label}</div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Current Batch Progress */}
      <div className="px-4 pt-5 pb-2">
        <Card className="p-5 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 border-l-4 border-l-green-500">
          <div className="flex items-start justify-between mb-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">{t('admin.batch.batchId')}</span>
                <span className="text-base font-bold text-gray-900">{batchProgress.current}</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <span className="font-medium">{t('admin.batch.routeDesc')}:</span>
                <span className="text-gray-800 font-semibold">{batchProgress.routeDesc}</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">{t('admin.delivery')} {translateDemoText(batchProgress.deliveryDate, lang)}</p>
            </div>
            <Badge className="bg-blue-600 text-white font-semibold">{t('admin.inTransit')}</Badge>
          </div>

          <div className="mb-3">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600 font-medium">{t('admin.ordersProcessed')}</span>
              <span className="font-bold text-gray-900">{batchProgress.collected}/{batchProgress.total}</span>
            </div>
            <Progress value={(batchProgress.collected / batchProgress.total) * 100} className="h-3 bg-green-100" />
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600 bg-green-100 rounded-lg px-3 py-2">
            <Clock className="w-4 h-4 text-green-700" />
            <span className="font-medium">{t('admin.orderCutoff')} {batchProgress.cutoffTime}</span>
          </div>
        </Card>
      </div>

      <SectionDivider />

      {/* Urgent Tasks */}
      {urgentTasks.length > 0 && (
        <div className="px-4 py-5 bg-white border-b-4 border-blue-100">
          <SectionHeader title={t('admin.urgentTasks')} />
          <div className="space-y-3">
            {urgentTasks.map((task, idx) => (
              <Card key={idx} className={`p-4 border-2 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 ${
                task.priority === 'high' 
                  ? 'border-red-300 border-l-4 border-l-red-500 bg-red-50' 
                  : 'border-amber-300 border-l-4 border-l-amber-500 bg-amber-50'
              }`}>
                <div className="flex items-start gap-3">
                  <div className={`rounded-xl p-2 ${task.priority === 'high' ? 'bg-red-100' : 'bg-amber-100'}`}>
                    <AlertCircle className={`w-5 h-5 ${
                      task.priority === 'high' ? 'text-red-600' : 'text-amber-600'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-semibold mb-1 ${task.priority === 'high' ? 'text-red-900' : 'text-amber-900'}`}>
                      {task.title}
                    </h4>
                    <p className={`text-sm ${
                      task.priority === 'high' ? 'text-red-700' : 'text-amber-700'
                    }`}>
                      {task.description}
                    </p>
                    <p className="text-xs text-gray-500 mt-1 font-medium">{translateDemoText(task.time, lang)}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      <SectionDivider />

      {/* Collection Points Status */}
      <div className="px-4 py-5 bg-white border-b-4 border-blue-100">
        <SectionHeader title={t('admin.collectionStatus')} />
        <div className="space-y-3">
          {collectionPoints.map((point, idx) => (
            <Card key={idx} className={`p-4 border-2 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 ${
              point.status === 'complete' 
                ? 'border-green-200 border-l-4 border-l-green-500 hover:bg-green-50' 
                : 'border-blue-200 border-l-4 border-l-blue-500 hover:bg-blue-50'
            }`}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-1">{point.name}</h4>
                  <p className="text-sm text-gray-600">{point.farmers} {t('admin.farmers')}</p>
                </div>
                {point.status === 'complete' ? (
                  <Badge className="bg-green-100 text-green-800 border border-green-300 font-semibold">
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    {t('admin.complete')}
                  </Badge>
                ) : (
                  <Badge className="bg-blue-100 text-blue-800 border border-blue-300 font-semibold">
                    <Clock className="w-3 h-3 mr-1" />
                    {t('admin.collecting')}
                  </Badge>
                )}
              </div>

              <div className="mb-2">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 font-medium">{t('admin.collectionProgress')}</span>
                  <span className="font-bold text-gray-900">{point.collected}/{point.expected} {t('admin.orders')}</span>
                </div>
                <Progress value={(point.collected / point.expected) * 100} className="h-3" />
              </div>
            </Card>
          ))}
        </div>
      </div>

      <SectionDivider />

      {/* Vehicles Section - replaces Cold Storage */}
      <div className="px-4 py-5 bg-white border-b-4 border-blue-100">
        <SectionHeader 
          title={t('vehicles.title')} 
          action={t('admin.viewDetails')}
          onAction={() => navigate('/admin/vehicles')}
        />

        <div className="space-y-3">
          {vehicles.map((v, idx) => (
            <Card key={idx} className={`p-4 border-2 border-l-4 hover:shadow-md hover:-translate-y-0.5 transition-all ${
              v.status === 'active' ? 'border-green-200 border-l-green-500' :
              v.status === 'delayed' ? 'border-red-200 border-l-red-500' :
              'border-gray-200 border-l-gray-400'
            }`}>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <Truck className="w-3.5 h-3.5 text-gray-500" />
                    <span className="font-bold text-gray-900 text-sm">{v.plate}</span>
                    <span className="text-xs text-blue-600 font-semibold">{v.route}</span>
                    {v.delay && <AlertCircle className="w-3.5 h-3.5 text-red-500" />}
                  </div>
                  <p className="text-xs text-gray-500">{routeDescription(v.route, v.routeDesc)}</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <User className="w-3 h-3 text-gray-400" />
                    <span className="text-xs text-gray-500">{v.driver}</span>
                  </div>
                </div>
                <Badge className={`text-xs font-semibold ${
                  v.status === 'active' ? 'bg-green-100 text-green-800 border border-green-300' :
                  v.status === 'delayed' ? 'bg-red-100 text-red-800 border border-red-300' :
                  'bg-gray-100 text-gray-700 border border-gray-200'
                }`}>
                  {v.status === 'active' ? t('vehicles.active') : v.status === 'delayed' ? t('vehicles.delayed') : t('admin.completed')}
                </Badge>
              </div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-500">{v.orders} {t('vehicles.orders')} · {v.speed}</span>
                <span className="font-bold text-gray-800">{v.progress}%</span>
              </div>
              <Progress value={v.progress} className={`h-1.5 ${v.status === 'delayed' ? '[&>div]:bg-red-500' : '[&>div]:bg-green-500'}`} />
            </Card>
          ))}
        </div>
      </div>

      <SectionDivider />

      {/* Quick Stats */}
      <div className="px-4 py-5 bg-white">
        <Card className="p-5 bg-blue-50 border-2 border-blue-300 border-l-4 border-l-blue-500">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-blue-100 rounded-xl p-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-blue-900 font-semibold">{t('admin.todayOverview')}</h3>
          </div>
          
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="bg-white rounded-xl p-3 border border-blue-200">
              <div className="text-gray-600 mb-1 font-medium">{t('admin.totalOrders')}</div>
              <div className="text-2xl font-bold text-gray-900">{marketplaceAssumptions.startingDailyOrders}</div>
            </div>
            <div className="bg-white rounded-xl p-3 border border-blue-200">
              <div className="text-gray-600 mb-1 font-medium">{t('admin.activeRoutes')}</div>
              <div className="text-2xl font-bold text-gray-900">1</div>
            </div>
            <div className="bg-white rounded-xl p-3 border border-green-200">
              <div className="text-gray-600 mb-1 font-medium">{t('admin.completed')}</div>
              <div className="text-2xl font-bold text-green-600">0</div>
            </div>
            <div className="bg-white rounded-xl p-3 border border-amber-200">
              <div className="text-gray-600 mb-1 font-medium">{t('admin.pending')}</div>
              <div className="text-2xl font-bold text-amber-600">{marketplaceAssumptions.startingDailyOrders}</div>
            </div>
          </div>
        </Card>
      </div>

      <BottomNav type="admin" />
    </div>
  );
}
