import { useState } from "react";
import { MobileHeader } from "../../components/MobileHeader";
import { BottomNav } from "../../components/BottomNav";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Phone, ShieldCheck, Star, MapPin, Edit, Crown } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";
import { ProfileEditDialog } from "../../components/ProfileEditDialog";

export default function FarmerProfile() {
  const { t } = useLanguage();
  const [editProfileOpen, setEditProfileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <MobileHeader title={t('farmer.profile.title')} showBack showProfile={false} accentColor="amber" />
      <ProfileEditDialog open={editProfileOpen} onOpenChange={setEditProfileOpen} name="Ramiz Məmmədov" phone="+994 55 123 45 67" accent="amber" />
      <div className="p-4 space-y-4">
        <Card className="overflow-hidden border-2 border-amber-200">
          <div className="bg-gradient-to-br from-amber-600 to-orange-700 p-5 text-white">
            <div className="flex items-center gap-4">
              <img
                src="https://images.unsplash.com/photo-1726223210374-a7f8bc55b030?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=120"
                alt="Farmer"
                className="w-20 h-20 rounded-2xl object-cover border-2 border-white/40"
              />
              <div>
                <h2 className="text-xl font-semibold">Ramiz Məmmədov</h2>
                <p className="text-amber-100 text-sm">Quba Ferması</p>
                <Badge className="mt-2 bg-green-500 text-white border-0">
                  <ShieldCheck className="w-3 h-3 mr-1" />
                  {t('farmer.profile.verified')}
                </Badge>
              </div>
            </div>
          </div>
          <div className="p-4 bg-white space-y-3">
            {[
              [t('farmer.profile.name'), 'Ramiz'],
              [t('farmer.profile.surname'), 'Məmmədov'],
              [t('farmer.profile.farmName'), 'Quba Ferması'],
              [t('farmer.profile.region'), 'Quba Rayonu'],
            ].map(([label, value]) => (
              <div key={label} className="bg-gray-50 rounded-xl p-3 border border-gray-200">
                <div className="text-xs text-gray-500 font-medium">{label}</div>
                <div className="font-semibold text-gray-900">{value}</div>
              </div>
            ))}
            <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-3 border border-gray-200">
              <Phone className="w-4 h-4 text-amber-600" />
              <div>
                <div className="text-xs text-gray-500 font-medium">{t('farmer.profile.phone')}</div>
                <div className="font-semibold text-gray-900">+994 55 123 45 67</div>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-3 border border-gray-200">
              <MapPin className="w-4 h-4 text-amber-600" />
              <div>
                <div className="text-xs text-gray-500 font-medium">{t('farmer.profile.since')}</div>
                <div className="font-semibold text-gray-900">2021</div>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-4 border-2 border-amber-200 bg-amber-50">
          <div className="flex items-start gap-3">
            <div className="rounded-xl bg-amber-100 p-2">
              <Crown className="h-5 w-5 text-amber-700" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-semibold text-gray-900">{t('farmer.profile.premium')}</h3>
                <Badge className="border border-amber-300 bg-white text-amber-700">{t('farmer.profile.fromQ2')}</Badge>
              </div>
              <p className="mt-1 text-sm text-gray-600">{t('farmer.profile.premiumDesc')}</p>
              <div className="mt-2 font-bold text-amber-700">{t('farmer.profile.premiumPrice')}</div>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-3 gap-3">
          <Card className="p-3 text-center border-2 border-green-200">
            <div className="text-lg font-bold text-green-700">₼1,245</div>
            <div className="text-xs text-gray-500">{t('farmer.profile.totalEarnings')}</div>
          </Card>
          <Card className="p-3 text-center border-2 border-blue-200">
            <div className="text-lg font-bold text-blue-700">48</div>
            <div className="text-xs text-gray-500">{t('farmer.profile.deliveries')}</div>
          </Card>
          <Card className="p-3 text-center border-2 border-amber-200">
            <div className="flex items-center justify-center gap-1 text-lg font-bold text-amber-700">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />4.9
            </div>
            <div className="text-xs text-gray-500">{t('farmer.profile.rating')}</div>
          </Card>
        </div>

        <Button onClick={() => setEditProfileOpen(true)} className="w-full bg-amber-600 hover:bg-amber-700 h-12 rounded-xl font-semibold">
          <Edit className="w-4 h-4 mr-2" />
          {t('farmer.profile.editProfile')}
        </Button>
      </div>
      <BottomNav type="farmer" />
    </div>
  );
}
