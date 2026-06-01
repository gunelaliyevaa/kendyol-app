import { useState } from "react";
import { Edit, MapPin, Phone, ShoppingBag, User } from "lucide-react";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { BottomNav } from "../../components/BottomNav";
import { MobileHeader } from "../../components/MobileHeader";
import { ProfileEditDialog } from "../../components/ProfileEditDialog";
import { useLanguage } from "../../contexts/LanguageContext";
import { translateDemoText } from "../../data/logisticsData";
import type { Language } from "../../data/productCatalog";

export default function CustomerProfile() {
  const { t, language } = useLanguage();
  const lang = language as Language;
  const [editProfileOpen, setEditProfileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <MobileHeader title={t("customer.profile.title")} showBack showProfile={false} accentColor="green" />
      <ProfileEditDialog
        open={editProfileOpen}
        onOpenChange={setEditProfileOpen}
        name="Nigar Əliyeva"
        phone="+994 51 234 56 78"
      />

      <div className="p-4 space-y-4">
        <Card className="overflow-hidden border-2 border-green-200">
          <div className="bg-gradient-to-br from-green-600 to-emerald-700 p-5">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/30 rounded-2xl flex items-center justify-center border-2 border-white/40 shadow-lg">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white mb-0.5">Nigar Əliyeva</h2>
                <p className="text-green-100 text-sm">{t("customer.profile.memberSince")}: 2023</p>
                <Badge className="bg-white/20 text-white border-white/30 border text-xs mt-1">
                  {t("customer.profile.premiumMember")}
                </Badge>
              </div>
            </div>
          </div>

          <div className="p-4 bg-white">
            <div className="grid grid-cols-3 gap-2">
              {[
                ["24", t("customer.profile.totalOrders"), "bg-green-50 border-green-200 text-green-700"],
                ["₼186", t("customer.profile.totalSavings"), "bg-amber-50 border-amber-200 text-amber-700"],
                ["1", t("customer.profile.activeSubscriptions"), "bg-blue-50 border-blue-200 text-blue-700"],
              ].map(([value, label, style]) => (
                <div key={label} className={`text-center rounded-xl p-3 border ${style}`}>
                  <div className="text-xl font-bold">{value}</div>
                  <div className="text-xs text-gray-500 font-medium">{label}</div>
                </div>
              ))}
            </div>
          </div>
          <p className="px-4 pb-4 text-xs text-gray-600 bg-white">{t("customer.profile.premiumDesc")}</p>
        </Card>

        <Card className="p-4 border-2 border-gray-200">
          <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <div className="w-1 h-4 bg-green-500 rounded-full" />
            {t("customer.profile.personalDetails")}
          </h3>
          <div className="space-y-2">
            {[
              [Phone, t("customer.profile.phone"), "+994 51 234 56 78"],
              [MapPin, t("customer.profile.address"), "Nəsimi Rayonu, 28 May küçəsi 15, Bakı"],
            ].map(([Icon, label, value]) => {
              const DetailIcon = Icon as typeof Phone;
              return (
                <div key={label as string} className="flex items-start gap-3 bg-gray-50 rounded-xl p-3 border border-gray-200">
                  <DetailIcon className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs text-gray-500 font-medium">{label as string}</div>
                    <div className="text-sm font-semibold text-gray-900">{value as string}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        <Card className="p-4 border-2 border-gray-200">
          <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <div className="w-1 h-4 bg-green-500 rounded-full" />
            {t("customer.profile.recentOrders")}
          </h3>
          <div className="space-y-2">
            {[
              { date: "18 Mart 2026", amount: "₼43.50", items: 5 },
              { date: "11 Mart 2026", amount: "₼38.00", items: 4 },
            ].map((order) => (
              <div key={order.date} className="flex items-center justify-between bg-gray-50 rounded-xl p-3 border border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 rounded-lg p-2">
                    <ShoppingBag className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">{translateDemoText(order.date, lang)}</div>
                    <div className="text-xs text-gray-500">{order.items} {t("tracking.items")}</div>
                  </div>
                </div>
                <div className="text-sm font-bold text-gray-900">{order.amount}</div>
              </div>
            ))}
          </div>
        </Card>

        <Button onClick={() => setEditProfileOpen(true)} className="w-full bg-green-600 hover:bg-green-700 h-11 rounded-xl font-semibold">
          <Edit className="w-4 h-4 mr-2" />
          {t("customer.profile.editProfile")}
        </Button>
      </div>

      <BottomNav type="customer" />
    </div>
  );
}
