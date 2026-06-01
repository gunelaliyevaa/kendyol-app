import { useState } from "react";
import { Edit, Star, User } from "lucide-react";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { BottomNav } from "../../components/BottomNav";
import { MobileHeader } from "../../components/MobileHeader";
import { ProfileEditDialog } from "../../components/ProfileEditDialog";
import { useLanguage } from "../../contexts/LanguageContext";
import { marketplaceAssumptions } from "../../data/marketplaceAssumptions";

export default function DriverProfile() {
  const { t } = useLanguage();
  const [editProfileOpen, setEditProfileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <MobileHeader title={t("driver.profile")} showBack showProfile={false} accentColor="blue" />
      <ProfileEditDialog
        open={editProfileOpen}
        onOpenChange={setEditProfileOpen}
        name="Elvin Məmmədov"
        phone="+994 70 987 65 43"
        accent="blue"
      />

      <div className="p-4 space-y-4">
        <Card className="overflow-hidden border-2 border-blue-200">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-5">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-white/20 rounded-2xl border-2 border-white/30 flex items-center justify-center shadow-lg">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white mb-0.5">Elvin Məmmədov</h2>
                <p className="text-blue-100 text-sm">ID: KY-DRV-0042</p>
                <Badge className="mt-1 bg-green-500/80 text-white border-0 text-xs">
                  {t("driver.activeDriver")}
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div className="bg-white/15 rounded-xl p-2.5 text-center">
                <div className="flex items-center justify-center gap-1 mb-0.5">
                  <Star className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                  <span className="font-bold text-white">4.9</span>
                </div>
                <div className="text-xs text-blue-100">{t("driver.rating")}</div>
              </div>
              <div className="bg-white/15 rounded-xl p-2.5 text-center">
                <div className="font-bold text-white mb-0.5">248</div>
                <div className="text-xs text-blue-100">{t("driver.deliveries")}</div>
              </div>
              <div className="bg-white/15 rounded-xl p-2.5 text-center">
                <div className="font-bold text-white mb-0.5">98%</div>
                <div className="text-xs text-blue-100">{t("driver.onTime")}</div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-white space-y-2">
            {[
              { label: t("driver.vehicle"), value: `${marketplaceAssumptions.pilotVehicle} - 10BH456` },
              { label: t("driver.phone"), value: "+994 70 987 65 43" },
              { label: t("driver.memberSince"), value: "2022" },
              { label: t("driver.areas"), value: "Bakı şəhəri - bütün rayonlar" },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between gap-3 bg-gray-50 rounded-xl px-3 py-2.5 border border-gray-100">
                <span className="text-xs text-gray-500 font-medium">{item.label}</span>
                <span className="text-sm font-semibold text-gray-900 text-right">{item.value}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-4 border-2 border-gray-200">
          <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <div className="w-1 h-4 bg-green-500 rounded-full" />
            {t("driver.recentEarnings")}
          </h3>
          <div className="space-y-2">
            {[
              { date: t("driver.thisWeek"), amount: "₼145", deliveries: 6 },
              { date: t("driver.lastWeek"), amount: "₼132", deliveries: 5 },
            ].map((earning) => (
              <div key={earning.date} className="flex items-center justify-between bg-gray-50 rounded-xl px-3 py-3 border border-gray-100">
                <div>
                  <div className="text-sm font-semibold text-gray-900">{earning.date}</div>
                  <div className="text-xs text-gray-500">{earning.deliveries} {t("driver.deliveries")}</div>
                </div>
                <div className="text-right">
                  <div className="text-base font-bold text-green-700">{earning.amount}</div>
                  <Badge className="bg-green-100 text-green-700 border border-green-200 text-xs">
                    {t("driver.paid")}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Button onClick={() => setEditProfileOpen(true)} className="w-full bg-blue-600 hover:bg-blue-700 h-11 rounded-xl font-semibold">
          <Edit className="w-4 h-4 mr-2" />
          {t("common.editProfile")}
        </Button>
      </div>

      <BottomNav type="driver" />
    </div>
  );
}
