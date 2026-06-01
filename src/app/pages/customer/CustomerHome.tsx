import { useState, useEffect, type ElementType } from "react";
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
  return <div className="h-px bg-green-100" />;
}

function SectionHeader({
  title,
  action,
  onAction
}: {
  title: string;
  action?: string;
  onAction?: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-2 mb-3 sm:mb-4">
      <div className="flex items-center gap-2 min-w-0">
        <div className="w-1.5 h-5 sm:h-6 shrink-0 bg-gradient-to-b from-green-500 to-emerald-600 rounded-full" />
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 truncate">
          {title}
        </h3>
      </div>

      {action && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onAction}
          className="shrink-0 h-8 px-2 text-green-700 font-semibold hover:bg-green-50 hover:text-green-800"
        >
          {action}
          <ChevronRight className="w-4 h-4 ml-0.5" />
        </Button>
      )}
    </div>
  );
}

function CompactHero({
  timeLeft,
  t
}: {
  timeLeft: {
    hours: number;
    minutes: number;
    seconds: number;
  };
  t: (key: string) => string;
}) {
  const hours = String(timeLeft.hours).padStart(2, "0");
  const minutes = String(timeLeft.minutes).padStart(2, "0");
  const seconds = String(timeLeft.seconds).padStart(2, "0");

  return (
    <div className="bg-gradient-to-br from-green-600 to-emerald-700 text-white px-4 py-5 sm:px-6 sm:py-6">
      <div className="mb-4">
        <h2 className="text-2xl sm:text-3xl font-semibold leading-tight">
          {t("customer.home.freshFromFarm")}
        </h2>

        <p className="text-sm sm:text-base text-green-100 mt-1.5">
          {t("customer.home.nextDelivery")}: {t("tracking.wednesday")}
        </p>
      </div>

      <Card className="bg-white/15 backdrop-blur-sm border-white/30 px-3 py-2.5 sm:px-4 sm:py-3 shadow-lg">
        <div className="flex items-center gap-2 mb-1.5">
          <Clock className="w-5 h-5 text-white shrink-0" />
          <span className="text-sm sm:text-base font-medium text-white">
            {t("customer.home.orderCutoff")}
          </span>
        </div>

        <div className="flex gap-2 sm:gap-3">
          <div className="flex-1 min-w-0 text-center bg-white/20 rounded-xl px-2 py-2.5 sm:py-3 shadow-sm border border-white/20">
            <div className="font-mono text-2xl sm:text-3xl font-bold tracking-tight leading-none text-white">
              {hours}
            </div>
            <div className="text-[11px] sm:text-xs text-green-50/85 mt-1 font-medium">
              {t("customer.home.hours")}
            </div>
          </div>

          <div className="flex-1 min-w-0 text-center bg-white/20 rounded-xl px-2 py-2.5 sm:py-3 shadow-sm border border-white/20">
            <div className="font-mono text-2xl sm:text-3xl font-bold tracking-tight leading-none text-white">
              {minutes}
            </div>
            <div className="text-[11px] sm:text-xs text-green-50/85 mt-1 font-medium">
              {t("customer.home.minutes")}
            </div>
          </div>

          <div className="flex-1 min-w-0 text-center bg-white/20 rounded-xl px-2 py-2.5 sm:py-3 shadow-sm border border-white/20">
            <div className="font-mono text-2xl sm:text-3xl font-bold tracking-tight leading-none text-white">
              {seconds}
            </div>
            <div className="text-[11px] sm:text-xs text-green-50/85 mt-1 font-medium">
              {t("customer.home.seconds")}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

function CompactSubscriptionBox({
  box,
  comingSoonText,
  onClick
}: {
  box: {
    id: number;
    icon: ElementType;
    name: string;
    color: string;
    borderColor: string;
    hoverBg: string;
    price: string;
    items: string;
    comingSoon: boolean;
  };
  comingSoonText: string;
  onClick: () => void;
}) {
  const Icon = box.icon;

  return (
    <Card
      className={`min-w-[138px] sm:min-w-[160px] p-3 cursor-pointer transition-all duration-200 border ${box.borderColor} ${box.hoverBg} hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98]`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between gap-2 mb-3">
        <div
          className={`${box.color} rounded-xl p-2.5 w-10 h-10 flex items-center justify-center shadow-sm`}
        >
          <Icon className="w-5 h-5 text-white" />
        </div>

        {box.comingSoon && (
          <Badge className="px-1.5 py-0 text-[10px] bg-gray-100 text-gray-600 border border-gray-200 leading-5">
            {comingSoonText}
          </Badge>
        )}
      </div>

      <h4 className="text-sm font-semibold text-gray-900 leading-tight">
        {box.name}
      </h4>

      <div className="mt-2 flex items-end justify-between gap-2">
        <div className="min-w-0">
          <p className="text-xs text-gray-500 truncate">{box.items}</p>
          <p className="text-base font-bold text-gray-900 mt-0.5">
            {box.price}
          </p>
        </div>

        <ChevronRight className="w-4 h-4 text-gray-400 shrink-0" />
      </div>
    </Card>
  );
}

function ShelfLifeRow({
  title,
  days,
  description,
  accentClass,
  badgeClass,
  onClick
}: {
  title: string;
  days: string;
  description: string;
  accentClass: string;
  badgeClass: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full p-3 sm:p-4 flex items-center gap-3 text-left transition-colors hover:bg-gray-50 active:bg-gray-100"
    >
      <div className={`w-1.5 h-10 rounded-full shrink-0 ${accentClass}`} />

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <h4 className="text-sm sm:text-base font-semibold text-gray-900 truncate">
            {title}
          </h4>

          <Badge
            className={`shrink-0 text-[11px] sm:text-xs font-medium border ${badgeClass}`}
          >
            {days}
          </Badge>
        </div>

        <p className="text-xs sm:text-sm text-gray-500 truncate">
          {description}
        </p>
      </div>

      <ChevronRight className="w-5 h-5 text-gray-400 shrink-0" />
    </button>
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
        }

        if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        }

        if (prev.hours > 0) {
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
      name: t("boxes.vegetable"),
      color: "bg-green-500",
      borderColor: "border-green-300",
      hoverBg: "hover:bg-green-50",
      price: "₼25",
      items: `8-10 ${t("boxes.items")}`,
      comingSoon: false
    },
    {
      id: 2,
      icon: Milk,
      name: t("boxes.dairy"),
      color: "bg-blue-500",
      borderColor: "border-blue-300",
      hoverBg: "hover:bg-blue-50",
      price: "₼18",
      items: `5-7 ${t("boxes.items")}`,
      comingSoon: true
    },
    {
      id: 3,
      icon: Beef,
      name: t("boxes.meat"),
      color: "bg-red-500",
      borderColor: "border-red-300",
      hoverBg: "hover:bg-red-50",
      price: "₼45",
      items: `3-5 ${t("boxes.kg")}`,
      comingSoon: true
    },
    {
      id: 4,
      icon: Box,
      name: t("boxes.custom"),
      color: "bg-purple-500",
      borderColor: "border-purple-300",
      hoverBg: "hover:bg-purple-50",
      price: "—",
      items: t("boxes.yourChoice"),
      comingSoon: true
    }
  ];

  const shelfLifeCategories = [
    {
      title: t("category.sensitive"),
      days: t("category.sensitiveDays"),
      description: t("category.sensitiveDesc"),
      accentClass: "bg-red-400",
      badgeClass: "bg-red-50 text-red-700 border-red-200",
      route: "/customer/browse?category=sensitive"
    },
    {
      title: t("category.medium"),
      days: t("category.mediumDays"),
      description: t("category.mediumDesc"),
      accentClass: "bg-amber-400",
      badgeClass: "bg-amber-50 text-amber-700 border-amber-200",
      route: "/customer/browse?category=medium"
    },
    {
      title: t("category.durable"),
      days: t("category.durableDays"),
      description: t("category.durableDesc"),
      accentClass: "bg-green-500",
      badgeClass: "bg-green-50 text-green-700 border-green-200",
      route: "/customer/browse?category=durable"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <MobileHeader
        title={t("customer.home.title")}
        titlePath="/"
        showCart
        cartCount={cartCount}
        accentColor="green"
      />

      <CompactHero timeLeft={timeLeft} t={t} />

      <div className="px-4 py-4 sm:px-6 sm:py-5 bg-white border-b border-green-100">
        <div className="flex gap-3 overflow-x-auto pb-1">
          <div className="flex items-center gap-3 min-w-fit p-3 rounded-2xl bg-green-50 border border-green-200">
            <div className="bg-green-100 rounded-full p-2.5">
              <TrendingDown className="w-5 h-5 text-green-700" />
            </div>
            <div>
              <div className="text-xs text-gray-600 font-medium">
                {t("customer.home.saveUpTo")}
              </div>
              <div className="text-base font-semibold text-gray-900">
                30% {t("customer.home.vsRetail")}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 min-w-fit p-3 rounded-2xl bg-emerald-50 border border-emerald-200">
            <div className="bg-emerald-100 rounded-full p-2.5">
              <Leaf className="w-5 h-5 text-emerald-700" />
            </div>
            <div>
              <div className="text-xs text-gray-600 font-medium">
                {t("customer.home.farmFresh")}
              </div>
              <div className="text-base font-semibold text-gray-900">
                1-2 {t("customer.home.daysOld")}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 min-w-fit p-3 rounded-2xl bg-teal-50 border border-teal-200">
            <div className="bg-teal-100 rounded-full p-2.5">
              <MapPin className="w-5 h-5 text-teal-700" />
            </div>
            <div>
              <div className="text-xs text-gray-600 font-medium">
                {t("customer.home.directFrom")}
              </div>
              <div className="text-base font-semibold text-gray-900">
                {t("customer.home.ruralFarms")}
              </div>
            </div>
          </div>
        </div>
      </div>

      <SectionDivider />

      <div className="px-4 py-5 sm:px-6 sm:py-6 bg-white border-b border-green-100">
        <SectionHeader
          title={t("customer.home.subscriptionBoxes")}
          action={t("common.viewAll")}
          onAction={() => navigate("/customer/subscriptions")}
        />

        <div className="flex gap-3 overflow-x-auto pb-1 snap-x">
          {subscriptionBoxes.map(box => (
            <CompactSubscriptionBox
              key={box.id}
              box={box}
              comingSoonText={t("common.comingSoon")}
              onClick={() => navigate("/customer/subscriptions")}
            />
          ))}
        </div>
      </div>

      <SectionDivider />

      <div className="px-4 py-5 sm:px-6 sm:py-6 bg-white border-b border-green-100">
        <SectionHeader title={t("customer.home.browseByShelfLife")} />

        <Card className="overflow-hidden border border-gray-200 divide-y divide-gray-100 shadow-sm">
          {shelfLifeCategories.map(category => (
            <ShelfLifeRow
              key={category.route}
              title={category.title}
              days={category.days}
              description={category.description}
              accentClass={category.accentClass}
              badgeClass={category.badgeClass}
              onClick={() => navigate(category.route)}
            />
          ))}
        </Card>
      </div>

      <SectionDivider />

      <div className="px-4 py-5 sm:px-6 sm:py-6 bg-white">
        <Card
          className="p-4 sm:p-5 bg-green-50 border border-green-300 cursor-pointer transition-all duration-200 hover:shadow-md hover:border-green-400 hover:bg-green-100 hover:-translate-y-0.5 active:scale-[0.98]"
          onClick={() => navigate("/customer/tracking")}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
              <div className="bg-green-600 rounded-xl p-3 shadow-sm shrink-0">
                <Package className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="text-green-900 text-base sm:text-lg font-semibold mb-1 truncate">
                  {t("customer.home.orderInTransit")}
                </h4>
                <p className="text-sm sm:text-base text-green-700 font-medium truncate">
                  {t("customer.home.arriving")} Çərşənbə
                </p>
              </div>
            </div>

            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-green-700 shrink-0" />
          </div>
        </Card>
      </div>

      <BottomNav type="customer" />
    </div>
  );
}
