import { Home, Package, ShoppingBag, Clock, Truck, MapPin } from "lucide-react";
import { useNavigate, useLocation } from "react-router";
import { useLanguage } from "../contexts/LanguageContext";

interface BottomNavProps {
  type: "customer" | "farmer" | "admin" | "driver";
}

export function BottomNav({ type }: BottomNavProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();

  const customerNav = [
    { icon: Home, label: t("nav.home"), path: "/customer" },
    { icon: ShoppingBag, label: t("nav.browse"), path: "/customer/browse" },
    { icon: Package, label: t("nav.subscriptions"), path: "/customer/subscriptions" },
    { icon: Clock, label: t("nav.tracking"), path: "/customer/tracking" },
  ];

  const farmerNav = [
    { icon: Home, label: t("nav.dashboard"), path: "/farmer" },
    { icon: Package, label: t("nav.products"), path: "/farmer/products" },
    { icon: ShoppingBag, label: t("nav.deliveries"), path: "/farmer/deliveries" },
    { icon: Clock, label: t("nav.earnings"), path: "/farmer/earnings" },
  ];

  const adminNav = [
    { icon: Home, label: t("nav.dashboard"), path: "/admin" },
    { icon: Package, label: t("nav.orders"), path: "/admin/orders" },
    { icon: MapPin, label: t("nav.routes"), path: "/admin/routes" },
    { icon: Truck, label: t("nav.vehicles"), path: "/admin/vehicles" },
  ];

  const driverNav = [
    { icon: Home, label: t("nav.dashboard"), path: "/driver" },
    { icon: MapPin, label: t("driver.availableRoutes"), path: "/driver/routes" },
  ];

  const navItems =
    type === "customer"
      ? customerNav
      : type === "farmer"
        ? farmerNav
        : type === "admin"
          ? adminNav
          : driverNav;

  const activeColor =
    type === "customer"
      ? "text-green-700 bg-green-50"
      : type === "farmer"
        ? "text-amber-700 bg-amber-50"
        : type === "driver"
          ? "text-indigo-700 bg-indigo-50"
          : "text-blue-700 bg-blue-50";

  const topBar =
    type === "customer"
      ? "bg-green-500"
      : type === "farmer"
        ? "bg-amber-500"
        : type === "driver"
          ? "bg-indigo-500"
          : "bg-blue-500";

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 pb-safe">
      <div className="max-w-md mx-auto bg-white border-t shadow-[0_-4px_20px_rgba(0,0,0,0.10)]">
        <div className="flex items-center justify-around px-2 py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <button
                key={item.label}
                onClick={() => navigate(item.path)}
                className={`
                flex flex-col items-center justify-center gap-1.5
                px-2 py-2 rounded-xl
                transition-all duration-200
                min-w-[64px]
                ${isActive
                    ? `${activeColor} scale-105 shadow-sm`
                    : "text-gray-500 hover:text-gray-800 hover:bg-gray-100 hover:scale-105"
                  }
              `}
                aria-label={item.label}
                aria-current={isActive ? "page" : undefined}
              >
                <Icon className="w-6 h-6" strokeWidth={isActive ? 2.5 : 2} />

                <span className="text-[10px] sm:text-xs font-medium text-center leading-tight whitespace-normal">
                  {item.label}
                </span>

                {isActive && (
                  <div className={`h-1 w-7 rounded-full ${topBar}`} />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
