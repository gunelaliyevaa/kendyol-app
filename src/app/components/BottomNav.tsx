import { Home, Package, ShoppingBag, Clock, Truck, MapPin, Warehouse } from "lucide-react";
import { useNavigate, useLocation } from "react-router";
import { useLanguage } from "../contexts/LanguageContext";

interface BottomNavProps {
  type: "customer" | "farmer" | "admin" | "driver";
}

export function BottomNav({ type }: BottomNavProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();

  const navConfig =
    type === "customer"
      ? [
        { icon: Home, label: t("nav.home"), path: "/customer" },
        { icon: ShoppingBag, label: t("nav.browse"), path: "/customer/browse" },
        { icon: Package, label: t("nav.subscriptions"), path: "/customer/subscriptions" },
        { icon: Clock, label: t("nav.tracking"), path: "/customer/tracking" },
      ]
      : type === "farmer"
        ? [
          { icon: Home, label: t("nav.dashboard"), path: "/farmer" },
          { icon: Package, label: t("nav.products"), path: "/farmer/products" },
          { icon: ShoppingBag, label: t("nav.deliveries"), path: "/farmer/deliveries" },
          { icon: Clock, label: t("nav.earnings"), path: "/farmer/earnings" },
        ]
        : type === "admin"
          ? [
            { icon: Home, label: t("nav.dashboard"), path: "/admin" },
            { icon: Package, label: t("nav.orders"), path: "/admin/orders" },
            { icon: MapPin, label: t("nav.routes"), path: "/admin/routes" },
            { icon: Truck, label: t("nav.vehicles"), path: "/admin/vehicles" },
          ]
          : [
            { icon: Home, label: t("nav.dashboard"), path: "/driver" },
            { icon: Warehouse, label: t("driver.collectionsNav"), path: "/driver/collections" },
            { icon: MapPin, label: t("driver.availableRoutes"), path: "/driver/routes" },
          ];

  const activeColor =
    type === "customer"
      ? "text-green-700"
      : type === "farmer"
        ? "text-amber-700"
        : type === "driver"
          ? "text-indigo-700"
          : "text-blue-700";

  const activeDot =
    type === "customer"
      ? "bg-green-500"
      : type === "farmer"
        ? "bg-amber-500"
        : type === "driver"
          ? "bg-indigo-500"
          : "bg-blue-500";

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 pointer-events-none">
      {/* smaller background lift */}
      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#F7F5EF] via-[#F7F5EF]/90 to-transparent" />

      <div className="relative flex justify-center px-3 pb-[calc(env(safe-area-inset-bottom)+8px)]">
        <div className="pointer-events-auto w-full max-w-md rounded-3xl border border-white/40 bg-white/85 backdrop-blur-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
          <div
            className="grid px-2 py-1.5"
            style={{
              gridTemplateColumns: `repeat(${navConfig.length}, minmax(0, 1fr))`,
            }}
          >
            {navConfig.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className="
                    min-w-0
                    flex flex-col items-center justify-center
                    gap-0.5
                    px-1 py-1.5
                    rounded-2xl
                    transition-all duration-200
                    active:scale-95
                  "
                >
                  <div
                    className={`
                      w-9 h-9 flex items-center justify-center rounded-xl
                      transition-transform duration-200
                      ${isActive ? `${activeColor} scale-110` : "text-gray-500"}
                    `}
                  >
                    <Icon className="w-5.5 h-5.5" strokeWidth={isActive ? 2.5 : 2} />
                  </div>

                  <span
                    className={`
                      w-full
                      text-[9px] sm:text-[10px]
                      font-medium
                      text-center
                      leading-none
                      whitespace-nowrap
                      overflow-hidden
                      text-ellipsis
                      ${isActive ? activeColor : "text-gray-500"}
                    `}
                  >
                    {item.label}
                  </span>

                  {isActive && (
                    <div className={`h-1 w-1 rounded-full mt-0.5 ${activeDot}`} />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
