import { useNavigate } from "react-router";
import {
  ShoppingBag,
  Sprout,
  Settings,
  FileText,
  ChevronRight,
  Truck,
} from "lucide-react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";

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
    <div
      className="min-h-screen flex flex-col items-center justify-center p-6"
      style={{ backgroundColor: "#F7F5EF" }}
    >
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
                  border-gray-200
                  border-l-4
                  border-l-[#0F471A]
                  bg-white
                  hover:border-[#A8C3A0]
                  hover:bg-[#F7F5EF]
                  hover:shadow-xl
                  hover:-translate-y-0.5
                  transition-all
                  duration-200
                  active:scale-98
                "
                onClick={() => navigate(type.path)}
              >
                <div className="flex h-full items-center gap-4">
                  <div
                    className="rounded-2xl p-3 shadow-md flex-shrink-0"
                    style={{ backgroundColor: "#0F471A" }}
                  >
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

        {/* Footer Info */}
        <div className="text-center">
          <p className="text-sm text-gray-500 mb-3">
            İnterfeysə baxmaq üçün rolunuzu seçin
          </p>

          <div className="flex gap-2 justify-center">
            <Button
              variant="ghost"
              size="sm"
              className="
                text-gray-600
                border
                border-gray-200
                rounded-xl
                hover:bg-[#F7F5EF]
                hover:border-[#A8C3A0]
              "
              onClick={() => navigate("/screens")}
            >
              <FileText className="w-4 h-4 mr-2" />
              Ekran Xəritəsi
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="
                text-gray-600
                border
                border-gray-200
                rounded-xl
                hover:bg-[#F7F5EF]
                hover:border-[#A8C3A0]
              "
              onClick={() => navigate("/documentation")}
            >
              <FileText className="w-4 h-4 mr-2" />
              UX Sənədləri
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}