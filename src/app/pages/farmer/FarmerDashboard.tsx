import { useNavigate } from "react-router";
import { MobileHeader } from "../../components/MobileHeader";
import { BottomNav } from "../../components/BottomNav";
import { Card } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { 
  TrendingUp,
  Package,
  Clock,
  MapPin,
  ChevronRight,
  CheckCircle2,
  User,
  Truck,
  Box,
  Phone,
} from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";
import { localize, translateDemoText } from "../../data/logisticsData";
import type { Language } from "../../data/productCatalog";
import { marketplaceAssumptions } from "../../data/marketplaceAssumptions";

function SectionHeader({ title, action, onAction }: { title: string; action?: string; onAction?: () => void }) {
  return (
    <div className="flex items-center justify-between mb-5">
      <div className="flex items-center gap-3">
        <div className="w-1.5 h-7 bg-gradient-to-b from-amber-500 to-orange-600 rounded-full" />
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
      </div>
      {action && (
        <Button 
          variant="ghost" 
          size="lg"
          onClick={onAction}
          className="text-amber-700 font-semibold hover:bg-amber-50 hover:text-amber-800"
        >
          {action}
          <ChevronRight className="w-5 h-5 ml-1" />
        </Button>
      )}
    </div>
  );
}

export default function FarmerDashboard() {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const lang = language as Language;

  const stats = [
    { label: t('farmer.dashboard.revenue'), value: "₼245", icon: TrendingUp, color: "text-green-600", bg: "bg-green-100", border: "border-green-200" },
    { label: t('farmer.dashboard.activeProducts'), value: "12", icon: Package, color: "text-blue-600", bg: "bg-blue-100", border: "border-blue-200" },
    { label: t('farmer.dashboard.pendingOrders'), value: "8", icon: Clock, color: "text-amber-600", bg: "bg-amber-100", border: "border-amber-200" },
  ];

  const recentDeliveries = [
    { id: 1, date: "18 Mart 2026", items: 6, revenue: 145.5, status: "completed" },
    { id: 2, date: "11 Mart 2026", items: 5, revenue: 132.0, status: "completed" }
  ];

  const packingRequirements = [
    t('farmer.delivery.packingBox'),
    t('farmer.delivery.packingTemp'),
    t('farmer.delivery.packingLabel'),
    t('farmer.delivery.packingTime'),
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <MobileHeader title={t('customer.home.title')} titlePath="/" accentColor="amber" onProfileClick={() => navigate('/farmer/profile')} />

      {/* Next collection */}
      <div className="bg-gradient-to-br from-amber-600 to-orange-700 text-white px-6 py-7">
        <div className="flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/20">
          <div className="bg-white/30 rounded-full p-3">
            <MapPin className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <div className="text-xs text-amber-100 font-medium mb-0.5">{t('farmer.dashboard.nextCollection')}</div>
            <div className="text-sm font-semibold">{localize({ az: "Şamaxı Rayon Mərkəzi - Bazar ertəsi 18:00", en: "Shamakhi District Hub - Monday 18:00", ru: "Центр района Шемаха - понедельник 18:00" }, lang)}</div>
          </div>
        </div>
      </div>

      {/* Weekly Stats */}
      <div className="px-6 py-6 bg-white border-b border-gray-100">
        <SectionHeader title={t('farmer.dashboard.thisWeek')} />
        <div className="grid grid-cols-3 gap-3">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label} className={`p-4 text-center border-2 ${stat.border} hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-default`}>
                <div className={`${stat.bg} rounded-full p-3 w-12 h-12 mx-auto mb-3 flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className="text-2xl font-bold mb-1 text-gray-900">{stat.value}</div>
                <div className="text-xs text-gray-600 leading-tight font-medium">{stat.label}</div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Delivery/Shipping Section */}
      <div className="px-6 py-6 bg-white border-b border-gray-100">
        <SectionHeader title={t('farmer.delivery.title')} />

        {/* Next Pickup Card */}
        <Card className="p-5 border-2 border-amber-200 border-l-4 border-l-amber-500 bg-amber-50 mb-4">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="text-xs text-amber-700 font-semibold uppercase tracking-wide mb-1">{t('farmer.delivery.nextPickup')}</div>
              <h4 className="text-base font-bold text-gray-900">{localize({ az: "Şamaxı Rayon Mərkəzi", en: "Shamakhi District Hub", ru: "Центр района Шемаха" }, lang)}</h4>
            </div>
            <Badge className="bg-amber-500 text-white font-semibold text-xs">{t('farmer.delivery.upcoming')}</Badge>
          </div>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-white rounded-xl p-3 border border-amber-200">
              <div className="flex items-center gap-2 mb-1">
                <MapPin className="w-4 h-4 text-amber-600" />
                <span className="text-xs text-gray-500 font-medium">{t('farmer.delivery.location')}</span>
              </div>
              <div className="text-sm font-semibold text-gray-900">{localize({ az: "Şamaxı Rayonu", en: "Shamakhi District", ru: "Шемахинский район" }, lang)}</div>
            </div>
            <div className="bg-white rounded-xl p-3 border border-amber-200">
              <div className="flex items-center gap-2 mb-1">
                <Clock className="w-4 h-4 text-amber-600" />
                <span className="text-xs text-gray-500 font-medium">{t('farmer.delivery.time')}</span>
              </div>
              <div className="text-sm font-semibold text-gray-900">{t('farmer.delivery.monday')}</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-white rounded-xl p-3 border border-amber-200">
              <div className="flex items-center gap-2 mb-1">
                <User className="w-4 h-4 text-amber-600" />
                <span className="text-xs text-gray-500 font-medium">{t('farmer.delivery.driver')}</span>
              </div>
              <div className="text-sm font-semibold text-gray-900">Elvin M.</div>
            </div>
            <div className="bg-white rounded-xl p-3 border border-amber-200">
              <div className="flex items-center gap-2 mb-1">
                <Truck className="w-4 h-4 text-amber-600" />
                <span className="text-xs text-gray-500 font-medium">{t('farmer.delivery.vehicle')}</span>
              </div>
              <div className="text-sm font-semibold text-gray-900">{marketplaceAssumptions.pilotVehicle}</div>
            </div>
          </div>
          <Button variant="outline" onClick={() => { window.location.href = "tel:+994709876543"; }} className="w-full border-2 border-amber-300 text-amber-700 hover:bg-amber-100 font-semibold rounded-xl h-10 transition-all">
            <Phone className="w-4 h-4 mr-2" />
            {t('farmer.delivery.contactDriver')}
          </Button>
        </Card>

        {/* Batch Info */}
        <Card className="p-4 border-2 border-blue-200 border-l-4 border-l-blue-500 bg-blue-50 mb-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-blue-100 rounded-xl p-2">
              <Box className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <div className="text-xs text-blue-700 font-semibold uppercase tracking-wide">{t('farmer.delivery.currentBatch')}</div>
              <div className="font-bold text-gray-900">ID-B2603 · {localize(marketplaceAssumptions.pilotRoute, lang)}</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-white rounded-lg p-3 border border-blue-200 text-center">
              <div className="text-lg font-bold text-blue-700">3</div>
              <div className="text-xs text-gray-500 font-medium">{t('farmer.delivery.pendingItems')}</div>
            </div>
            <div className="bg-white rounded-lg p-3 border border-blue-200 text-center">
              <div className="text-lg font-bold text-green-700">₼245</div>
              <div className="text-xs text-gray-500 font-medium">{t('farmer.dashboard.revenue')}</div>
            </div>
          </div>
        </Card>

        {/* Packing Requirements */}
        <Card className="p-4 border-2 border-gray-200">
          <div className="flex items-center gap-2 mb-3">
            <Package className="w-4 h-4 text-gray-600" />
            <h4 className="text-sm font-semibold text-gray-800">{t('farmer.delivery.packingTitle')}</h4>
          </div>
          <div className="space-y-2">
            {packingRequirements.map((req, idx) => (
              <div key={idx} className="flex items-start gap-2 text-sm">
                <div className="w-5 h-5 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-amber-700 text-xs font-bold">{idx + 1}</span>
                </div>
                <span className="text-gray-700 leading-relaxed">{req}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="px-6 py-6 bg-white border-b border-gray-100">
        <SectionHeader title={t('farmer.dashboard.quickActions')} />
        
        <div className="space-y-3">
          <Card 
            className="p-4 flex items-center justify-between cursor-pointer transition-all duration-200 border-2 border-green-200 border-l-4 border-l-green-500 hover:shadow-xl hover:bg-green-50 hover:-translate-y-0.5 active:scale-98"
            onClick={() => navigate('/farmer/products')}
          >
            <div className="flex items-center gap-4 flex-1">
              <div className="bg-green-100 rounded-xl p-3 shadow-sm">
                <Package className="w-6 h-6 text-green-700" />
              </div>
              <div className="flex-1">
                <h4 className="text-base font-semibold text-gray-900 mb-0.5">{t('farmer.dashboard.addProduct')}</h4>
                <p className="text-xs text-gray-500">{t('farmer.dashboard.addProductDesc')}</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
          </Card>

          <Card 
            className="p-4 flex items-center justify-between cursor-pointer transition-all duration-200 border-2 border-blue-200 border-l-4 border-l-blue-500 hover:shadow-xl hover:bg-blue-50 hover:-translate-y-0.5 active:scale-98"
            onClick={() => navigate('/farmer/earnings')}
          >
            <div className="flex items-center gap-4 flex-1">
              <div className="bg-blue-100 rounded-xl p-3 shadow-sm">
                <TrendingUp className="w-6 h-6 text-blue-700" />
              </div>
              <div className="flex-1">
                <h4 className="text-base font-semibold text-gray-900 mb-0.5">{t('farmer.dashboard.viewEarnings')}</h4>
                <p className="text-xs text-gray-500">{t('farmer.dashboard.viewEarningsDesc')}</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
          </Card>

          <Card onClick={() => navigate('/farmer/deliveries')} className="p-4 flex items-center justify-between cursor-pointer transition-all duration-200 border-2 border-amber-200 border-l-4 border-l-amber-500 hover:shadow-xl hover:bg-amber-50 hover:-translate-y-0.5 active:scale-98">
            <div className="flex items-center gap-4 flex-1">
              <div className="bg-amber-100 rounded-xl p-3 shadow-sm">
                <MapPin className="w-6 h-6 text-amber-700" />
              </div>
              <div className="flex-1">
                <h4 className="text-base font-semibold text-gray-900 mb-0.5">{t('farmer.dashboard.collectionPoints')}</h4>
                <p className="text-xs text-gray-500">{t('farmer.dashboard.collectionPointsDesc')}</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
          </Card>
        </div>
      </div>

      {/* Recent Deliveries */}
      <div className="px-6 py-6 bg-white border-b border-gray-100">
        <SectionHeader title={t('farmer.dashboard.recentDeliveries')} />
        
        <div className="space-y-3">
          {recentDeliveries.map((delivery) => (
            <Card key={delivery.id} className="p-4 border-2 border-green-200 border-l-4 border-l-green-500 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
              <div className="flex items-center justify-between mb-3">
                <div className="flex-1">
                  <h4 className="text-base font-semibold text-gray-900 mb-1">{translateDemoText(delivery.date, lang)}</h4>
                  <p className="text-sm text-gray-600">{delivery.items} {t('farmer.dashboard.productsDelivered')}</p>
                </div>
                <Badge className="bg-green-100 text-green-800 border border-green-300 text-xs font-semibold">
                  <CheckCircle2 className="w-3 h-3 mr-1" />{t('farmer.dashboard.paid')}
                </Badge>
              </div>
              <div className="text-xl font-bold text-gray-900 bg-green-50 rounded-xl p-3 text-center border border-green-200">
                ₼{delivery.revenue}
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Tips Section */}
      <div className="px-6 py-6 bg-white">
        <Card className="p-5 bg-blue-50 border-2 border-blue-300 border-l-4 border-l-blue-500">
          <div className="flex items-start gap-3">
            <div className="text-2xl">💡</div>
            <div className="flex-1">
              <h3 className="text-blue-900 text-base font-semibold mb-2">{t('farmer.dashboard.tip')}</h3>
              <p className="text-sm text-blue-800 leading-relaxed">{t('farmer.dashboard.tipText')}</p>
            </div>
          </div>
        </Card>
      </div>

      <BottomNav type="farmer" />
    </div>
  );
}
