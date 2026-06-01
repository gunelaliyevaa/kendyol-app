import { useNavigate } from "react-router";
import {
  ShoppingBag,
  Sprout,
  Settings,
  ChevronRight,
  Truck,
} from "lucide-react";
import { Card } from "../components/ui/card";

export default function UserTypeSelector() {
  const navigate = useNavigate();

  const userTypes = [
    {
      title: "Müştəri",
      description: "Təzə məhsulları seçin və çatdırılma paketlərinə abunə olun",
      icon: ShoppingBag,
      path: "/customer",
    },
    {
      title: "Fermer",
      description: "Məhsullarınızı idarə edin və müştəri sifarişlərini izləyin",
      icon: Sprout,
      path: "/farmer",
    },
    {
      title: "Sürücü",
      description: "Mövcud marşrutlara baxın və sifarişləri çatdırın",
      icon: Truck,
      path: "/driver",
    },
    {
      title: "Admin / Operator",
      description: "Nəqliyyat vasitələrini, sürücüləri və sifarişləri idarə edin",
      icon: Settings,
      path: "/admin",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <div className="max-w-md w-full">
        {/* Logo and Title */}
        <div className="text-center mb-10">
          <div className="w-32 h-32 overflow-hidden mx-auto mb-3">
            <img
              src="/kendyol-logo.png"
              alt="KəndYol"
              className="w-full h-full object-contain"
            />
          </div>

          <h1
            className="text-5xl font-bold mb-2"
            style={{ color: "#0F471A" }}
          >
            KəndYol
          </h1>

          <p className="text-gray-600 text-lg">Kənd və şəhər arasında rəqəmsal körpü</p>
        </div>

        {/* User Type Cards */}
        <div className="space-y-4 mb-8">
          {userTypes.map((type) => {
            const Icon = type.icon;

            return (
              <Card
                key={type.path}
                className="
                  h-[116px]
                  p-5
                  cursor-pointer
                  border-2
                  border-green-200
                  border-l-4
                  border-l-green-600
                  bg-white
                  hover:border-green-400
                  hover:bg-green-50
                  hover:shadow-xl
                  hover:-translate-y-0.5
                  transition-all
                  duration-200
                  active:scale-98
                "
                onClick={() => navigate(type.path)}
              >
                <div className="flex h-full items-center gap-4">
                  <div className="rounded-2xl bg-green-600 p-3 shadow-md flex-shrink-0">
                    <Icon className="w-7 h-7 text-white" />
                  </div>

                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {type.title}
                    </h3>

                    <p className="text-gray-600 text-sm leading-relaxed">
                      {type.description}
                    </p>
                  </div>

                  <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                </div>
              </Card>
            );
          })}
        </div>

      </div>
    </div>
  );
}
