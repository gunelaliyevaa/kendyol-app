import { useState } from "react";
import { ClipboardCheck, Edit, Route, ShieldCheck, User, Users } from "lucide-react";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { BottomNav } from "../../components/BottomNav";
import { MobileHeader } from "../../components/MobileHeader";
import { ProfileEditDialog } from "../../components/ProfileEditDialog";
import { useLanguage } from "../../contexts/LanguageContext";

export default function AdminProfile() {
  const { t } = useLanguage();
  const [editProfileOpen, setEditProfileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <MobileHeader title={t("admin.profile.title")} showBack showProfile={false} accentColor="blue" />
      <ProfileEditDialog
        open={editProfileOpen}
        onOpenChange={setEditProfileOpen}
        name="Aysel Quliyeva"
        phone="+994 50 555 12 34"
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
                <h2 className="text-lg font-semibold text-white mb-0.5">Aysel Quliyeva</h2>
                <p className="text-blue-100 text-sm">ID: KY-ADM-0001</p>
                <Badge className="mt-1 bg-blue-500/80 text-white border-0 text-xs">
                  <ShieldCheck className="w-3 h-3 mr-1" />
                  {t("admin.profile.operator")}
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {[
                { icon: Route, value: "12", label: t("admin.profile.routesReviewed") },
                { icon: Users, value: "4", label: t("admin.profile.activeDrivers") },
                { icon: ClipboardCheck, value: "28", label: t("admin.profile.tasksResolved") },
              ].map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="bg-white/15 rounded-xl p-2.5 text-center">
                    <Icon className="w-4 h-4 text-blue-100 mx-auto mb-1" />
                    <div className="font-bold text-white">{stat.value}</div>
                    <div className="text-[11px] leading-tight text-blue-100">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="p-4 bg-white space-y-2">
            {[
              { label: t("admin.profile.role"), value: t("admin.profile.roleValue") },
              { label: t("admin.profile.phone"), value: "+994 50 555 12 34" },
              { label: t("admin.profile.region"), value: t("admin.profile.regionValue") },
              { label: t("admin.profile.memberSince"), value: "2023" },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between gap-3 bg-gray-50 rounded-xl px-3 py-2.5 border border-gray-100">
                <span className="text-xs text-gray-500 font-medium">{item.label}</span>
                <span className="text-sm font-semibold text-gray-900 text-right">{item.value}</span>
              </div>
            ))}
          </div>
        </Card>

        <Button onClick={() => setEditProfileOpen(true)} className="w-full bg-blue-600 hover:bg-blue-700 h-11 rounded-xl font-semibold">
          <Edit className="w-4 h-4 mr-2" />
          {t("common.editProfile")}
        </Button>
      </div>

      <BottomNav type="admin" />
    </div>
  );
}
