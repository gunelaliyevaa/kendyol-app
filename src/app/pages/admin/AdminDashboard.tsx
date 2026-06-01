import { MobileHeader } from "../../components/MobileHeader";
import { BottomNav } from "../../components/BottomNav";
import { Card } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Progress } from "../../components/ui/progress";
import { Button } from "../../components/ui/button";
import { 
  Package,
  Truck,
  Clock,
  AlertCircle,
  TrendingUp
} from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";
import { localize, translateDemoText } from "../../data/logisticsData";
import type { Language } from "../../data/productCatalog";
import { marketplaceAssumptions } from "../../data/marketplaceAssumptions";
import { ADMIN_TASK_STATUSES_STORAGE_KEY, DRIVER_COLLECTION_STATUSES_STORAGE_KEY, DRIVER_ISSUES_STORAGE_KEY, usePersistentState, type AdminTaskUpdate, type DriverIssue } from "../../data/demoStore";
import { farmerCollectionHub, farmerCollectionOrders } from "../../data/logisticsData";

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
  const { t, language } = useLanguage();
  const lang = language as Language;
  const [driverIssues] = usePersistentState<DriverIssue[]>(DRIVER_ISSUES_STORAGE_KEY, []);
  const [taskStatuses, setTaskStatuses] = usePersistentState<Record<string, AdminTaskUpdate>>(ADMIN_TASK_STATUSES_STORAGE_KEY, {});
  const [collectionStatuses] = usePersistentState<Record<string, string>>(DRIVER_COLLECTION_STATUSES_STORAGE_KEY, {});
  const collectionOrders = farmerCollectionOrders.map(order => ({ ...order, status: collectionStatuses[order.id] ?? order.status }));
  const readyCollectionOrders = collectionOrders.filter(order => order.status === "ready").length;

  const stats = [
    { label: t('admin.activeOrders'), value: String(marketplaceAssumptions.startingDailyOrders), icon: Package, color: "text-green-600", bg: "bg-green-100" },
    { label: t('admin.routesToday'), value: "1", icon: Truck, color: "text-blue-600", bg: "bg-blue-100" },
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

  const urgentTasks = [
    ...driverIssues.map(issue => ({
      id: issue.id,
      title: `${t("admin.driverReport")}: ${issue.routeId}`,
      description: issue.message || t(issue.typeKey),
      priority: "high",
      time: issue.time,
    })),
    { 
      id: "urgent-route",
      title: t('admin.urgentRoute'), 
      description: t('admin.urgentRouteDesc'), 
      priority: "high",
      time: "15 dəq əvvəl"
    },
    { 
      id: "urgent-storage",
      title: t('admin.urgentStorage'), 
      description: t('admin.urgentStorageDesc'), 
      priority: "medium",
      time: "1 saat əvvəl"
    }
  ];
  const updateTaskStatus = (taskId: string, status: string) => {
    setTaskStatuses(current => ({ ...current, [taskId]: { status, adminName: "Aysel Quliyeva" } }));
  };
  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <MobileHeader title={t('customer.home.title')} titlePath="/" profilePath="/admin/profile" accentColor="blue" />

      {/* Stats */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white px-4 py-4">
        <h2 className="text-lg font-semibold mb-3">{t('admin.operations')}</h2>
        
        <div className="grid grid-cols-2 gap-2">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label} className="bg-white/20 backdrop-blur-sm border-white/30 border p-2.5 text-white hover:bg-white/30 transition-all cursor-default">
                <div className="flex items-center gap-2">
                  <div className={`${stat.bg} rounded-full w-8 h-8 flex items-center justify-center shrink-0`}>
                    <Icon className={`w-4 h-4 ${stat.color}`} />
                  </div>
                  <div>
                    <div className="text-xl font-bold leading-none">{stat.value}</div>
                    <div className="text-xs text-blue-100 leading-tight font-medium mt-1">{stat.label}</div>
                  </div>
                </div>
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
            <Progress value={(batchProgress.collected / batchProgress.total) * 100} className="h-3 bg-green-100 [&>div]:bg-green-500" />
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
            {urgentTasks.map((task) => {
              const taskUpdate = taskStatuses[task.id] ?? { status: "pending", adminName: "" };
              return (
              <Card key={task.id} className={`p-4 border-2 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 ${
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
                    <div className="grid grid-cols-3 gap-1 mt-3">
                      {["pending", "resolved", "cancelled"].map(status => (
                        <button
                          key={status}
                          type="button"
                          onClick={() => updateTaskStatus(task.id, status)}
                          className={`rounded-lg border px-1.5 py-2 text-[11px] font-semibold ${taskUpdate.status === status ? "bg-blue-600 border-blue-600 text-white" : "bg-white/70 border-gray-200 text-gray-600"}`}
                        >
                          {t(`admin.taskStatus.${status}`)}
                        </button>
                      ))}
                    </div>
                    {taskUpdate.adminName && (
                      <p className="text-xs text-gray-500 mt-2">
                        {t("admin.statusChangedBy")}: <span className="font-semibold text-gray-700">{taskUpdate.adminName}</span>
                      </p>
                    )}
                  </div>
                </div>
              </Card>
            )})}
          </div>
        </div>
      )}

      <SectionDivider />

      {/* Driver Handoff Status */}
      <div className="px-4 py-5 bg-white border-b-4 border-blue-100">
        <SectionHeader title={t('admin.collectionStatus')} />
        <Card className="p-4 border-2 border-indigo-200 border-l-4 border-l-indigo-500 bg-indigo-50">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div>
              <h4 className="font-semibold text-gray-900">{localize(farmerCollectionHub.name, lang)}</h4>
              <p className="text-xs text-gray-600 mt-1">{localize(farmerCollectionHub.address, lang)}</p>
              <p className="text-xs text-indigo-700 mt-0.5">{t("admin.driverPickupDesc")}</p>
            </div>
            <Badge className="bg-indigo-100 text-indigo-700 border border-indigo-200 shrink-0">
              {readyCollectionOrders}/{collectionOrders.length}
            </Badge>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-xl border border-green-200 bg-white p-3 text-center">
              <div className="text-lg font-bold text-green-700">{readyCollectionOrders}</div>
              <div className="text-xs text-gray-500">{t("admin.readyForDriver")}</div>
            </div>
            <div className="rounded-xl border border-amber-200 bg-white p-3 text-center">
              <div className="text-lg font-bold text-amber-700">{collectionOrders.length - readyCollectionOrders}</div>
              <div className="text-xs text-gray-500">{t("admin.awaitingFarmer")}</div>
            </div>
          </div>
          <div className="mt-3 space-y-1.5">
            {collectionOrders.map(order => (
              <div key={order.id} className="flex items-center justify-between gap-2 rounded-lg border border-indigo-100 bg-white px-2.5 py-2">
                <span className="text-xs font-medium text-gray-800">{order.farmer}</span>
                <span className={`text-xs font-semibold ${order.status === "ready" ? "text-green-700" : "text-amber-700"}`}>
                  {t(order.status === "ready" ? "driver.ready" : "driver.awaitingFarmer")}
                </span>
              </div>
            ))}
          </div>
        </Card>
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
