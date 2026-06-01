import { MobileHeader } from "../../components/MobileHeader";
import { BottomNav } from "../../components/BottomNav";
import { Card } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Progress } from "../../components/ui/progress";
import { 
  Package, 
  CheckCircle2,
  Clock,
  Truck,
  MapPin,
  Phone
} from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";
import { toast } from "sonner";
import { useCartCount } from "../../data/demoStore";
import { translateDemoText } from "../../data/logisticsData";
import type { Language } from "../../data/productCatalog";

export default function OrderTracking() {
  const { t, language } = useLanguage();
  const lang = language as Language;
  const cartCount = useCartCount();

  const currentOrder = {
    id: "SİF-2024-0342",
    status: "in-transit",
    date: "23 Mart 2026",
    deliveryDate: "25 Mart 2026",
    items: 8,
    total: 42.5,
    timeline: [
      {
        status: "collected",
        label: t('tracking.step.collected'),
        description: t('tracking.step.collectedDesc'),
        timestamp: "23 Mart, 20:00",
        completed: true
      },
      {
        status: "at-hub",
        label: t('tracking.step.atHub'),
        description: t('tracking.step.atHubDesc'),
        timestamp: "24 Mart, 10:00",
        completed: true
      },
      {
        status: "in-transit",
        label: t('tracking.step.inTransit'),
        description: t('tracking.step.inTransitDesc'),
        timestamp: "24 Mart, 16:00",
        completed: true,
        current: true
      },
      {
        status: "delivered",
        label: t('tracking.step.delivered'),
        description: t('tracking.step.deliveredDesc'),
        timestamp: `${t('tracking.expected')} ${translateDemoText("25 Mart", lang)}, 14:00`,
        completed: false
      }
    ],
    items_list: [
      { name: t('product.organicTomatoes'), quantity: `2 ${t('product.kg')}` },
      { name: t('product.freshSpinach'), quantity: `3 ${t('product.bunch')}` },
      { name: t('product.freeRangeEggs'), quantity: `12 ${t('product.piece')}` },
      { name: t('product.sweetPeppers'), quantity: `1 ${t('product.kg')}` },
      { name: t('product.cucumbers'), quantity: `1.5 ${t('product.kg')}` }
    ]
  };

  const pastOrders = [
    {
      id: "SİF-2024-0298",
      date: "18 Mart 2026",
      items: 6,
      total: 38.0,
      status: "delivered"
    },
    {
      id: "SİF-2024-0245",
      date: "11 Mart 2026",
      items: 7,
      total: 45.5,
      status: "delivered"
    }
  ];

  const getProgressValue = () => {
    const currentIndex = currentOrder.timeline.findIndex(t => t.current);
    return ((currentIndex + 1) / currentOrder.timeline.length) * 100;
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <MobileHeader title={t('tracking.title')} showCart cartCount={cartCount} accentColor="green" />

      {/* Current Order Status */}
      <div className="p-4 space-y-4">
        <Card className="overflow-hidden border-2 border-green-300 border-l-4 border-l-green-500">
          <div className="bg-gradient-to-r from-green-600 to-emerald-700 text-white p-5">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h2 className="text-xl font-semibold mb-1">{t('tracking.title')}: {currentOrder.id}</h2>
                <p className="text-green-100 text-sm">{t('tracking.placed')}: {translateDemoText(currentOrder.date, lang)}</p>
              </div>
              <Badge className="bg-white text-green-700 font-semibold">{t('tracking.inTransit')}</Badge>
            </div>
            
            <div className="flex items-center gap-2 text-sm bg-white/15 rounded-xl px-3 py-2">
              <Package className="w-4 h-4" />
              <span>{currentOrder.items} {t('tracking.items')} • ₼{currentOrder.total}</span>
            </div>
          </div>

          <div className="p-5 bg-white">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1.5 h-5 bg-green-500 rounded-full" />
              <div className="text-sm font-semibold text-gray-700">{t('tracking.progress')}</div>
            </div>
            <Progress value={getProgressValue()} className="mb-5 h-3 bg-green-100 [&>div]:bg-green-500" />

            {/* Timeline */}
            <div className="space-y-4">
              {currentOrder.timeline.map((step, index) => (
                <div key={step.status} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className={`w-11 h-11 rounded-full flex items-center justify-center shadow-md ${
                      step.completed 
                        ? 'bg-green-600 text-white' 
                        : 'bg-gray-200 text-gray-400'
                    } ${step.current ? 'ring-4 ring-green-200 scale-110' : ''}`}>
                      {step.completed ? (
                        <CheckCircle2 className="w-5 h-5" />
                      ) : (
                        <Clock className="w-5 h-5" />
                      )}
                    </div>
                    {index < currentOrder.timeline.length - 1 && (
                      <div className={`w-0.5 h-12 mt-1 ${
                        step.completed ? 'bg-green-300' : 'bg-gray-200'
                      }`}></div>
                    )}
                  </div>

                  <div className={`flex-1 pb-4 ${step.current ? 'bg-green-50 rounded-xl p-3 -mt-1 border border-green-200' : ''}`}>
                    <h3 className={`mb-1 font-semibold ${step.current ? 'text-green-700' : 'text-gray-900'}`}>
                      {step.label}
                    </h3>
                    <p className="text-sm text-gray-600 mb-1">{step.description}</p>
                    <p className="text-xs text-gray-500 font-medium">{translateDemoText(step.timestamp, lang)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Divider */}
        <div className="h-2 bg-gradient-to-r from-green-200 via-emerald-100 to-green-200 rounded-full" />

        {/* Delivery Details */}
        <Card className="p-5 border-2 border-gray-200 border-l-4 border-l-blue-500">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1.5 h-6 bg-blue-500 rounded-full" />
            <h3 className="font-semibold text-gray-900">{t('tracking.deliveryDetails')}</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-xl border border-blue-200">
              <div className="bg-blue-100 rounded-xl p-2 flex-shrink-0">
                <MapPin className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1 font-medium">{t('tracking.pickupLocation')}</div>
                <div className="font-semibold text-gray-900">{t('tracking.nasimi')}</div>
                <div className="text-sm text-gray-600">{t('tracking.address')}</div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-green-50 rounded-xl border border-green-200">
              <div className="bg-green-100 rounded-xl p-2 flex-shrink-0">
                <Truck className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1 font-medium">{t('tracking.deliveryWindow')}</div>
                <div className="font-semibold text-gray-900">{t('tracking.wednesday')}</div>
                <div className="text-sm text-gray-600">{t('tracking.window')}</div>
              </div>
            </div>

            <button onClick={() => { window.location.href = "tel:+994123456789"; }} className="w-full text-left flex items-start gap-3 p-3 bg-gray-50 rounded-xl border border-gray-200 hover:border-green-300">
              <div className="bg-gray-100 rounded-xl p-2 flex-shrink-0">
                <Phone className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1 font-medium">{t('tracking.contactSupport')}</div>
                <div className="font-semibold text-gray-900">+994 12 345 6789</div>
              </div>
            </button>
          </div>
        </Card>

        {/* Divider */}
        <div className="h-2 bg-gradient-to-r from-green-200 via-emerald-100 to-green-200 rounded-full" />

        {/* Order Items */}
        <Card className="p-5 border-2 border-gray-200 border-l-4 border-l-emerald-500">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1.5 h-6 bg-emerald-500 rounded-full" />
            <h3 className="font-semibold text-gray-900">{t('tracking.orderItems')} ({currentOrder.items_list.length})</h3>
          </div>
          
          <div className="space-y-2 bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
            {currentOrder.items_list.map((item, idx) => (
              <div key={idx} className={`flex justify-between text-sm px-4 py-3 ${idx !== currentOrder.items_list.length - 1 ? 'border-b border-gray-200' : ''} hover:bg-green-50 transition-colors`}>
                <span className="font-medium text-gray-800">{item.name}</span>
                <span className="text-gray-600 font-semibold">{item.quantity}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Divider */}
        <div className="h-2 bg-gradient-to-r from-green-200 via-emerald-100 to-green-200 rounded-full" />

        {/* Past Orders */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1.5 h-6 bg-gray-400 rounded-full" />
            <h3 className="text-lg font-semibold text-gray-900">{t('tracking.pastOrders')}</h3>
          </div>
          
          <div className="space-y-3">
            {pastOrders.map((order) => (
              <Card key={order.id} onClick={() => toast.info(`${order.id}: ${t('tracking.delivered')}`)} className="p-4 cursor-pointer border-2 border-gray-200 hover:border-green-300 hover:shadow-lg hover:bg-green-50 hover:-translate-y-0.5 transition-all duration-200">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{order.id}</h4>
                    <p className="text-sm text-gray-600">{translateDemoText(order.date, lang)}</p>
                  </div>
                  <Badge className="bg-green-100 text-green-700 border border-green-300 font-semibold">
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    {t('tracking.delivered')}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between text-sm bg-gray-50 rounded-lg px-3 py-2">
                  <span className="text-gray-600">{order.items} {t('tracking.items')}</span>
                  <span className="font-bold text-gray-900">₼{order.total}</span>
                </div>
              </Card>
            ))}
          </div>

          <Button variant="outline" onClick={() => toast.info(t('common.detailsOpened'))} className="w-full mt-3 border-2 border-green-200 text-green-700 hover:bg-green-50 hover:border-green-400 transition-all font-semibold h-12">
            {t('tracking.viewAll')}
          </Button>
        </div>
      </div>

      <BottomNav type="customer" />
    </div>
  );
}
