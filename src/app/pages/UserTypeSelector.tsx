import { useNavigate } from "react-router";
import { ShoppingBag, Sprout, Settings, FileText, ChevronRight, Truck } from "lucide-react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";

export default function UserTypeSelector() {
  const navigate = useNavigate();

  const userTypes = [
    {
      title: "Müştəri",
      description: "Təzə məhsulları seçin və çatdırılma paketlərinə abunə olun",
      icon: ShoppingBag,
      color: "bg-green-500",
      borderColor: "border-l-4 border-l-green-500",
      hoverBg: "hover:bg-green-50 hover:border-green-300",
      path: "/customer",
    },
    {
      title: "Fermer",
      description: "Məhsullarınızı idarə edin və müştəri sifarişlərini izləyin",
      icon: Sprout,
      color: "bg-amber-500",
      borderColor: "border-l-4 border-l-amber-500",
      hoverBg: "hover:bg-amber-50 hover:border-amber-300",
      path: "/farmer",
    },
    {
      title: "Sürücü",
      description: "Mövcud marşrutlara baxın və sifarişləri çatdırın",
      icon: Truck,
      color: "bg-indigo-500",
      borderColor: "border-l-4 border-l-indigo-500",
      hoverBg: "hover:bg-indigo-50 hover:border-indigo-300",
      path: "/driver",
    },
    {
      title: "Admin / Operator",
      description: "Nəqliyyat vasitələrini, sürücüləri və sifarişləri idarə edin",
      icon: Settings,
      color: "bg-blue-500",
      borderColor: "border-l-4 border-l-blue-500",
      hoverBg: "hover:bg-blue-50 hover:border-blue-300",
      path: "/admin",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full">
        {/* Logo and Title */}
        <div className="text-center mb-10">
          <div className="w-40 h-32 overflow-hidden mx-auto mb-3">
            <img src="/kendyol-logo.png" alt="KəndYol" className="w-40 h-auto" />
          </div>
          <h1 className="text-4xl font-bold mb-2" style={{ color: "#0F471A" }}>KəndYol</h1>
          <p className="text-gray-600 text-lg">Fermadan Şəhərə Bazarı</p>
        </div>

        {/* User Type Cards */}
        <div className="space-y-4 mb-8">
          {userTypes.map((type) => {
            const Icon = type.icon;
            return (
              <Card
                key={type.path}
                className={`h-[116px] p-5 cursor-pointer border-2 border-gray-200 ${type.borderColor} ${type.hoverBg} hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 active:scale-98`}
                onClick={() => navigate(type.path)}
              >
                <div className="flex h-full items-center gap-4">
                  <div className={`${type.color} rounded-2xl p-3 shadow-md flex-shrink-0`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{type.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{type.description}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                </div>
              </Card>
            );
          })}
        </div>

        {/* Footer Info */}
        <div className="text-center">
          <p className="text-sm text-gray-500 mb-3">İnterfeysə baxmaq üçün rolunuzu seçin</p>
          <div className="flex gap-2 justify-center">
            <Button 
              variant="ghost" 
              size="sm"
              className="hover:bg-green-50 text-gray-600 border border-gray-200 rounded-xl"
              onClick={() => navigate('/screens')}
            >
              <FileText className="w-4 h-4 mr-2" />
              Ekran Xəritəsi
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              className="hover:bg-green-50 text-gray-600 border border-gray-200 rounded-xl"
              onClick={() => navigate('/documentation')}
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
