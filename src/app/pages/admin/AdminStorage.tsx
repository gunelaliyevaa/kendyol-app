import { useState } from "react";
import { MobileHeader } from "../../components/MobileHeader";
import { BottomNav } from "../../components/BottomNav";
import { Card } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Progress } from "../../components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { 
  Thermometer,
  Package,
  AlertTriangle,
  CheckCircle2,
  Clock,
  TrendingDown,
  Activity
} from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";
import { translateDemoText } from "../../data/logisticsData";
import type { Language } from "../../data/productCatalog";

function SectionDivider() {
  return (
    <div className="h-3 bg-gradient-to-r from-blue-200 via-indigo-100 to-blue-200" />
  );
}

export default function AdminStorage() {
  const { t, language } = useLanguage();
  const lang = language as Language;
  const [storageUnits] = useState([
    {
      id: "COLD-01",
      category: t('storage.sensitive'),
      temperature: { current: 3.2, target: "2-4°C" },
      humidity: 85,
      capacity: 100,
      occupied: 45,
      borderColor: "border-l-blue-500",
      bgColor: "bg-blue-50",
      items: [
        { name: "Yaşıl göyərti", quantity: 15, farmer: "Yaşıl Vadi" },
        { name: "Giləmeyvə", quantity: 8, farmer: "Giləmeyvə Bağı" },
        { name: "Təzə süd məhsulları", quantity: 12, farmer: "Süd Ferması" },
        { name: "Otlar", quantity: 10, farmer: "Yaşıl Vadi" }
      ],
      status: t('storage.optimal'),
      lastCheck: "15 dəq əvvəl"
    },
    {
      id: "COLD-02",
      category: t('storage.medium'),
      temperature: { current: 9.1, target: "8-10°C" },
      humidity: 75,
      capacity: 150,
      occupied: 67,
      borderColor: "border-l-amber-500",
      bgColor: "bg-amber-50",
      items: [
        { name: "Pomidor", quantity: 25, farmer: "Quba Ferması" },
        { name: "Bibər", quantity: 18, farmer: "Quba Ferması" },
        { name: "Xiyar", quantity: 14, farmer: "Yaşıl Vadi" },
        { name: "Meyvələr", quantity: 10, farmer: "Müxtəlif" }
      ],
      status: t('storage.optimal'),
      lastCheck: "20 dəq əvvəl"
    },
    {
      id: "COOL-01",
      category: t('storage.durable'),
      temperature: { current: 13.5, target: "12-15°C" },
      humidity: 65,
      capacity: 100,
      occupied: 30,
      borderColor: "border-l-green-500",
      bgColor: "bg-green-50",
      items: [
        { name: "Kartof", quantity: 12, farmer: "Lənkəran Ferması" },
        { name: "Soğan", quantity: 8, farmer: "Müxtəlif" },
        { name: "Kök tərəvəzlər", quantity: 6, farmer: "Quba Ferması" },
        { name: "Yumurta", quantity: 4, farmer: "Dağ Quşçuluğu" }
      ],
      status: t('storage.optimal'),
      lastCheck: "10 dəq əvvəl"
    }
  ]);

  const temperatureHistory = [
    { time: "08:00", temp: 3.1 },
    { time: "10:00", temp: 3.3 },
    { time: "12:00", temp: 3.2 },
    { time: "14:00", temp: 3.4 },
    { time: "İndi", temp: 3.2 }
  ];

  const alerts = [
    {
      level: "warning",
      message: t('storage.humidityAlert'),
      time: "1 saat əvvəl",
      resolved: false
    }
  ];

  const systemStatus = [
    { name: t('storage.cooling'), status: t('storage.active') },
    { name: t('storage.airCirculation'), status: t('storage.normal') },
    { name: t('storage.humidityControl'), status: t('storage.normal') },
    { name: t('storage.backupPower'), status: t('storage.ready') },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <MobileHeader title={t('storage.title')} showBack profilePath="/admin/profile" accentColor="blue" />

      {/* Overview Stats */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white px-6 py-7">
        <h2 className="text-2xl font-semibold mb-5">{t('storage.overview')}</h2>
        
        <div className="grid grid-cols-3 gap-3">
          <Card className="bg-white/20 backdrop-blur-sm border-white/30 border-2 p-3 text-white text-center hover:bg-white/30 transition-all">
            <Thermometer className="w-5 h-5 mx-auto mb-2" />
            <div className="text-2xl font-bold mb-1">3</div>
            <div className="text-xs text-blue-100 font-medium">{t('storage.activeUnits')}</div>
          </Card>
          <Card className="bg-white/20 backdrop-blur-sm border-white/30 border-2 p-3 text-white text-center hover:bg-white/30 transition-all">
            <Package className="w-5 h-5 mx-auto mb-2" />
            <div className="text-2xl font-bold mb-1">142</div>
            <div className="text-xs text-blue-100 font-medium">{t('storage.totalItems')}</div>
          </Card>
          <Card className="bg-white/20 backdrop-blur-sm border-white/30 border-2 p-3 text-white text-center hover:bg-white/30 transition-all">
            <Activity className="w-5 h-5 mx-auto mb-2" />
            <div className="text-2xl font-bold mb-1">41%</div>
            <div className="text-xs text-blue-100 font-medium">{t('storage.capacity')}</div>
          </Card>
        </div>
      </div>

      <div className="p-4">
        {/* Alerts */}
        {alerts.length > 0 && (
          <div className="mb-4 space-y-2">
            {alerts.map((alert, idx) => (
              <Card key={idx} className={`p-4 border-2 border-l-4 ${
                alert.level === 'warning' 
                  ? 'bg-amber-50 border-amber-300 border-l-amber-500' 
                  : 'bg-red-50 border-red-300 border-l-red-500'
              }`}>
                <div className="flex items-start gap-3">
                  <div className={`rounded-xl p-2 ${alert.level === 'warning' ? 'bg-amber-100' : 'bg-red-100'}`}>
                    <AlertTriangle className={`w-5 h-5 ${
                      alert.level === 'warning' ? 'text-amber-600' : 'text-red-600'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <div className={`font-semibold ${alert.level === 'warning' ? 'text-amber-900' : 'text-red-900'}`}>
                      {alert.message}
                    </div>
                    <div className="text-xs text-gray-500 mt-1 font-medium">{translateDemoText(alert.time, lang)}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Storage Units */}
        <Tabs defaultValue="overview">
          <TabsList className="w-full mb-4 bg-blue-50 p-1 rounded-xl border-2 border-blue-100">
            <TabsTrigger value="overview" className="flex-1 rounded-lg data-[state=active]:bg-blue-600 data-[state=active]:text-white font-medium">
              {t('storage.overviewTab')}
            </TabsTrigger>
            <TabsTrigger value="monitoring" className="flex-1 rounded-lg data-[state=active]:bg-blue-600 data-[state=active]:text-white font-medium">
              {t('storage.monitoringTab')}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4 mt-0">
            {storageUnits.map((unit) => (
              <Card key={unit.id} className={`overflow-hidden border-2 border-gray-200 border-l-4 ${unit.borderColor} transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5`}>
                {/* Header */}
                <div className={`p-4 ${unit.bgColor} border-b-2 border-gray-200`}>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{unit.id}</h3>
                      <div className="text-sm text-gray-600 font-medium">{unit.category} {t('storage.products')}</div>
                    </div>
                    <Badge className="bg-green-100 text-green-800 border border-green-300 font-semibold">
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      {unit.status}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white rounded-xl p-3 border-2 border-blue-200">
                      <div className="flex items-center gap-2 mb-1">
                        <Thermometer className="w-4 h-4 text-blue-600" />
                        <span className="text-xs text-gray-600 font-medium">{t('storage.temperature')}</span>
                      </div>
                      <div className="text-lg font-bold text-gray-900">{unit.temperature.current}°C</div>
                      <div className="text-xs text-gray-500">{t('storage.target')} {unit.temperature.target}</div>
                    </div>

                    <div className="bg-white rounded-xl p-3 border-2 border-indigo-200">
                      <div className="flex items-center gap-2 mb-1">
                        <TrendingDown className="w-4 h-4 text-indigo-600" />
                        <span className="text-xs text-gray-600 font-medium">{t('storage.humidity')}</span>
                      </div>
                      <div className="text-lg font-bold text-gray-900">{unit.humidity}%</div>
                      <div className="text-xs text-gray-500">{t('storage.optimalRange')}</div>
                    </div>
                  </div>
                </div>

                {/* Capacity */}
                <div className="p-4 border-b-2 border-gray-100 bg-white">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600 font-medium">{t('storage.capacity')}</span>
                    <span className="font-bold text-gray-900">{unit.occupied}/{unit.capacity} {t('storage.items')} ({Math.round((unit.occupied/unit.capacity)*100)}%)</span>
                  </div>
                  <Progress value={(unit.occupied / unit.capacity) * 100} className="h-3" />
                </div>

                {/* Items */}
                <div className="p-4 bg-white">
                  <h4 className="text-sm font-semibold mb-3 text-gray-700 flex items-center gap-2">
                    <div className="w-1 h-4 bg-blue-500 rounded-full" />
                    {t('storage.storedItems')}
                  </h4>
                  <div className="space-y-0 bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
                    {unit.items.map((item, idx) => (
                      <div key={idx} className={`flex justify-between text-sm px-4 py-3 hover:bg-blue-50 transition-colors ${idx !== unit.items.length - 1 ? 'border-b border-gray-200' : ''}`}>
                        <div>
                          <div className="font-medium text-gray-900">{translateDemoText(item.name, lang)}</div>
                          <div className="text-xs text-gray-500">{translateDemoText(item.farmer, lang)}</div>
                        </div>
                        <div className="text-gray-700 font-semibold">{item.quantity} {t('storage.items')}</div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
                    <Clock className="w-3 h-3" />
                    <span className="font-medium">{t('storage.lastCheck')} {translateDemoText(unit.lastCheck, lang)}</span>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="monitoring" className="space-y-4 mt-0">
            <Card className="p-5 border-2 border-blue-200 border-l-4 border-l-blue-500">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-1.5 h-6 bg-blue-500 rounded-full" />
                <h3 className="font-semibold text-gray-900">{t('storage.tempMonitoring')}</h3>
              </div>
              
              {/* Temperature chart */}
              <div className="mb-4">
                <div className="h-44 flex items-end justify-between gap-2 bg-blue-50 rounded-xl p-3 border border-blue-200">
                  {temperatureHistory.map((reading, idx) => {
                    const normalizedTemp = ((reading.temp - 2) / 2) * 100;
                    return (
                      <div key={idx} className="flex-1 flex flex-col items-center group cursor-pointer">
                        <div className="text-xs mb-1 text-blue-700 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">{reading.temp}°</div>
                        <div 
                          className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg shadow-md group-hover:from-blue-700 transition-all"
                          style={{ height: `${normalizedTemp}%` }}
                        ></div>
                        <div className="text-xs mt-2 text-gray-600 font-medium">{translateDemoText(reading.time, lang)}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-green-50 border-2 border-green-200 rounded-xl p-3">
                <div className="flex items-center gap-2 text-sm text-green-700 font-medium">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{t('storage.stableTemp')}</span>
                </div>
              </div>
            </Card>

            <Card className="p-5 border-2 border-blue-200 border-l-4 border-l-indigo-500">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1.5 h-6 bg-indigo-500 rounded-full" />
                <h3 className="font-semibold text-gray-900">{t('storage.systemStatus')}</h3>
              </div>
              
              <div className="space-y-0 bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
                {systemStatus.map((item, idx) => (
                  <div key={idx} className={`flex items-center justify-between px-4 py-3 hover:bg-blue-50 transition-colors ${idx !== systemStatus.length - 1 ? 'border-b border-gray-200' : ''}`}>
                    <span className="text-sm font-medium text-gray-800">{item.name}</span>
                    <Badge className="bg-green-100 text-green-800 border border-green-300 font-semibold">
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      {item.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-5 bg-blue-50 border-2 border-blue-300 border-l-4 border-l-blue-500">
              <div className="flex items-start gap-3">
                <div className="bg-blue-100 rounded-xl p-2">
                  <Activity className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-blue-900 font-semibold mb-1">{t('storage.autoMonitoring')}</h3>
                  <p className="text-sm text-blue-700 leading-relaxed">
                    {t('storage.autoMonitoringDesc')}
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <BottomNav type="admin" />
    </div>
  );
}
