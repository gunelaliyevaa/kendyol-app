import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { MobileHeader } from "../../components/MobileHeader";
import { BottomNav } from "../../components/BottomNav";
import { Card } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { 
  Clock, 
  TrendingDown, 
  Leaf, 
  MapPin, 
  ChevronRight,
  Package,
  Milk,
  Beef,
  Box
} from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";
import { useCartCount } from "../../data/demoStore";

function SectionDivider() {
  return (
    <div className="h-3 bg-gradient-to-r from-green-200 via-emerald-100 to-green-200" />
  );
}

function SectionHeader({ title, action, onAction }: { title: string; action?: string; onAction?: () => void }) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        <div className="w-1.5 h-7 bg-gradient-to-b from-green-500 to-emerald-600 rounded-full" />
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
      </div>
      {action && (
        <Button 
          variant="ghost" 
          size="lg"
          onClick={onAction}
          className="text-green-700 font-semibold hover:bg-green-50 hover:text-green-800"
        >
          {action}
          <ChevronRight className="w-5 h-5 ml-1" />
        </Button>
      )}
    </div>
  );
}

export default function CustomerHome() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const cartCount = useCartCount();
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 45,
    seconds: 30
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const subscriptionBoxes = [
    { 
      id: 1, 
      icon: Leaf, 
      name: t('boxes.vegetable'), 
      color: "bg-green-500",
      borderColor: "border-green-400",
      hoverBg: "hover:bg-green-50",
      price: "₼25",
      items: `8-10 ${t('boxes.items')}`,
      comingSoon: false,
    },
    { 
      id: 2, 
      icon: Milk, 
      name: t('boxes.dairy'), 
      color: "bg-blue-500",
      borderColor: "border-blue-400",
      hoverBg: "hover:bg-blue-50",
      price: "₼18",
      items: `5-7 ${t('boxes.items')}`,
      comingSoon: true,
    },
    { 
      id: 3, 
      icon: Beef, 
      name: t('boxes.meat'), 
      color: "bg-red-500",
      borderColor: "border-red-400",
      hoverBg: "hover:bg-red-50",
      price: "₼45",
      items: `3-5 ${t('boxes.kg')}`,
      comingSoon: true,
    },
    { 
      id: 4, 
      icon: Box, 
      name: t('boxes.custom'), 
      color: "bg-purple-500",
      borderColor: "border-purple-400",
      hoverBg: "hover:bg-purple-50",
      price: "—",
      items: t('boxes.yourChoice'),
      comingSoon: true,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <MobileHeader title={t('customer.home.title')} showCart cartCount={cartCount} accentColor="green" />

      {/* Hero Section with Countdown */}
      <div className="bg-gradient-to-br from-green-600 to-emerald-700 text-white px-6 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">{t('customer.home.freshFromFarm')}</h2>
          <p className="text-green-100 text-lg">{t('customer.home.nextDelivery')}: {t('tracking.wednesday')}</p>
        </div>

        {/* Countdown Timer */}
        <Card className="bg-white/15 backdrop-blur-sm border-white/30 p-5 shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-6 h-6" />
            <span className="text-base font-medium">{t('customer.home.orderCutoff')}</span>
          </div>
          <div className="flex gap-3">
            <div className="flex-1 text-center bg-white/25 rounded-xl p-4 shadow-md border border-white/20">
              <div className="text-4xl font-bold">{String(timeLeft.hours).padStart(2, '0')}</div>
              <div className="text-sm text-green-50 mt-2 font-medium">{t('customer.home.hours')}</div>
            </div>
            <div className="flex-1 text-center bg-white/25 rounded-xl p-4 shadow-md border border-white/20">
              <div className="text-4xl font-bold">{String(timeLeft.minutes).padStart(2, '0')}</div>
              <div className="text-sm text-green-50 mt-2 font-medium">{t('customer.home.minutes')}</div>
            </div>
            <div className="flex-1 text-center bg-white/25 rounded-xl p-4 shadow-md border border-white/20">
              <div className="text-4xl font-bold">{String(timeLeft.seconds).padStart(2, '0')}</div>
              <div className="text-sm text-green-50 mt-2 font-medium">{t('customer.home.seconds')}</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Benefits - Clear visual separator */}
      <div className="px-6 py-6 bg-white border-b-4 border-green-100">
        <div className="flex gap-6 overflow-x-auto pb-2">
          <div className="flex items-center gap-3 min-w-fit p-3 rounded-2xl bg-green-50 border-2 border-green-200">
            <div className="bg-green-100 rounded-full p-3">
              <TrendingDown className="w-6 h-6 text-green-700" />
            </div>
            <div>
              <div className="text-sm text-gray-600 font-medium">{t('customer.home.saveUpTo')}</div>
              <div className="text-lg font-semibold text-gray-900">30% {t('customer.home.vsRetail')}</div>
            </div>
          </div>
          <div className="flex items-center gap-3 min-w-fit p-3 rounded-2xl bg-emerald-50 border-2 border-emerald-200">
            <div className="bg-emerald-100 rounded-full p-3">
              <Leaf className="w-6 h-6 text-emerald-700" />
            </div>
            <div>
              <div className="text-sm text-gray-600 font-medium">{t('customer.home.farmFresh')}</div>
              <div className="text-lg font-semibold text-gray-900">1-2 {t('customer.home.daysOld')}</div>
            </div>
          </div>
          <div className="flex items-center gap-3 min-w-fit p-3 rounded-2xl bg-teal-50 border-2 border-teal-200">
            <div className="bg-teal-100 rounded-full p-3">
              <MapPin className="w-6 h-6 text-teal-700" />
            </div>
            <div>
              <div className="text-sm text-gray-600 font-medium">{t('customer.home.directFrom')}</div>
              <div className="text-lg font-semibold text-gray-900">{t('customer.home.ruralFarms')}</div>
            </div>
          </div>
        </div>
      </div>

      <SectionDivider />

      {/* Subscription Boxes */}
      <div className="px-6 py-8 bg-white border-b-4 border-green-100">
        <SectionHeader 
          title={t('customer.home.subscriptionBoxes')} 
          action={t('common.viewAll')}
          onAction={() => navigate('/customer/subscriptions')}
        />

        <div className="grid grid-cols-2 gap-4">
          {subscriptionBoxes.map((box) => {
            const Icon = box.icon;
            return (
              <Card 
                key={box.id}
                className={`p-5 cursor-pointer transition-all duration-200 border-2 ${box.borderColor} ${box.hoverBg} hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02] active:scale-95`}
                onClick={() => navigate('/customer/subscriptions')}
              >
                <div className={`${box.color} rounded-2xl p-4 w-14 h-14 flex items-center justify-center mb-4 shadow-md`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h4 className="text-base font-semibold mb-2 text-gray-900">{box.name}</h4>
                {box.comingSoon && <Badge className="mb-2 bg-gray-100 text-gray-700 border border-gray-200">{t('common.comingSoon')}</Badge>}
                <p className="text-sm text-gray-600 mb-3">{box.items}</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-gray-900">{box.price}</span>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      <SectionDivider />

      {/* Browse by Category */}
      <div className="px-6 py-8 bg-white border-b-4 border-green-100">
        <SectionHeader title={t('customer.home.browseByShelfLife')} />
        
        <div className="space-y-4">
          <Card 
            className="p-5 flex items-center justify-between cursor-pointer transition-all duration-200 border-l-4 border-l-red-400 border-t-2 border-r-2 border-b-2 border-gray-200 hover:shadow-xl hover:border-l-red-500 hover:bg-red-50 hover:-translate-y-0.5 active:scale-98"
            onClick={() => navigate('/customer/browse?category=sensitive')}
          >
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h4 className="text-lg font-semibold text-gray-900">{t('category.sensitive')}</h4>
                <Badge className="text-sm font-medium bg-red-100 text-red-700 border-red-300">{t('category.sensitiveDays')}</Badge>
              </div>
              <p className="text-base text-gray-600">{t('category.sensitiveDesc')}</p>
            </div>
            <ChevronRight className="w-6 h-6 text-gray-400 ml-3 flex-shrink-0" />
          </Card>

          <Card 
            className="p-5 flex items-center justify-between cursor-pointer transition-all duration-200 border-l-4 border-l-amber-400 border-t-2 border-r-2 border-b-2 border-gray-200 hover:shadow-xl hover:border-l-amber-500 hover:bg-amber-50 hover:-translate-y-0.5 active:scale-98"
            onClick={() => navigate('/customer/browse?category=medium')}
          >
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h4 className="text-lg font-semibold text-gray-900">{t('category.medium')}</h4>
                <Badge className="text-sm font-medium bg-amber-100 text-amber-700 border-amber-300">{t('category.mediumDays')}</Badge>
              </div>
              <p className="text-base text-gray-600">{t('category.mediumDesc')}</p>
            </div>
            <ChevronRight className="w-6 h-6 text-gray-400 ml-3 flex-shrink-0" />
          </Card>

          <Card 
            className="p-5 flex items-center justify-between cursor-pointer transition-all duration-200 border-l-4 border-l-green-500 border-t-2 border-r-2 border-b-2 border-gray-200 hover:shadow-xl hover:border-l-green-600 hover:bg-green-50 hover:-translate-y-0.5 active:scale-98"
            onClick={() => navigate('/customer/browse?category=durable')}
          >
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h4 className="text-lg font-semibold text-gray-900">{t('category.durable')}</h4>
                <Badge className="text-sm font-medium bg-green-100 text-green-700 border-green-300">{t('category.durableDays')}</Badge>
              </div>
              <p className="text-base text-gray-600">{t('category.durableDesc')}</p>
            </div>
            <ChevronRight className="w-6 h-6 text-gray-400 ml-3 flex-shrink-0" />
          </Card>
        </div>
      </div>

      <SectionDivider />

      {/* Active Order Banner */}
      <div className="px-6 py-8 bg-white">
        <Card 
          className="p-5 bg-green-50 border-2 border-green-300 cursor-pointer transition-all duration-200 hover:shadow-xl hover:border-green-400 hover:bg-green-100 hover:-translate-y-0.5 active:scale-98"
          onClick={() => navigate('/customer/tracking')}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 flex-1">
              <div className="bg-green-600 rounded-xl p-3 shadow-md">
                <Package className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="text-green-900 text-lg font-semibold mb-1">{t('customer.home.orderInTransit')}</h4>
                <p className="text-base text-green-700 font-medium">{t('customer.home.arriving')} Çərşənbə</p>
              </div>
            </div>
            <ChevronRight className="w-6 h-6 text-green-700 flex-shrink-0" />
          </div>
        </Card>
      </div>

      <BottomNav type="customer" />
    </div>
  );
}
