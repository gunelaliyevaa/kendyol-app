import { useEffect, useState } from "react";
import { MobileHeader } from "../../components/MobileHeader";
import { BottomNav } from "../../components/BottomNav";
import { Card } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Switch } from "../../components/ui/switch";
import { Checkbox } from "../../components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../../components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import {
  Leaf,
  Milk,
  Beef,
  Box,
  Clock,
  Edit,
  CheckCircle2,
  Calendar,
  Sparkles,
  AlertTriangle,
  X,
  TrendingDown
} from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";
import { toast } from "sonner";
import { useCartCount } from "../../data/demoStore";
import { getProductName, type Language } from "../../data/productCatalog";
import { localize, translateDemoText } from "../../data/logisticsData";
import { customerProducts } from "../../data/customerProducts";

export default function Subscriptions() {
  const { t, language } = useLanguage();
  const lang = language as Language;
  const cartCount = useCartCount();

  const [activeTab, setActiveTab] = useState("active");
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [cancelledSubId, setCancelledSubId] = useState<number | null>(null);
  const [cancelSuccess, setCancelSuccess] = useState(false);
  const [cancelledSubName, setCancelledSubName] = useState("");
  const [customizeSubId, setCustomizeSubId] = useState<number | null>(null);
  const [customizedProductIds, setCustomizedProductIds] = useState<string[]>([]);

  const vegetableItems = () => [
    `${getProductName("tomato", lang)} (1 ${t("product.kg")})`,
    `${getProductName("cucumber", lang)} (1 ${t("product.kg")})`,
    `${getProductName("pepper", lang)} (500 q)`,
    `${getProductName("spinach", lang)} (2 ${t("product.bunch")})`,
    `${getProductName("onion", lang)} (500 q)`,
    `${getProductName("carrot", lang)} (1 ${t("product.kg")})`
  ];

  const dairyItems = () => [
    `${getProductName("milk", lang)} (2L)`,
    `${getProductName("yogurt", lang)} (500q)`,
    `${getProductName("butter", lang)} (250q)`,
    `${getProductName("cheese", lang)} (300q)`,
    `${getProductName("chicken_eggs", lang)} (6 ${t("product.piece")})`
  ];

  const [activeSubscriptions, setActiveSubscriptions] = useState([
    {
      id: 1,
      name: t("boxes.vegetable"),
      icon: Leaf,
      color: "bg-green-500",
      borderColor: "border-l-4 border-l-green-500",
      headerBg: "bg-gradient-to-r from-green-50 to-emerald-50",
      price: 25,
      frequency: t("sub.weekly"),
      nextDelivery: "25 Mart 2026",
      endDate: "25 Aprel 2026",
      lastBilling: "₼25.00",
      items: vegetableItems(),
      status: "active"
    }
  ]);

  useEffect(() => {
    setActiveSubscriptions(prev =>
      prev.map(subscription => {
        if (subscription.id === 1 || subscription.id === 101) {
          return {
            ...subscription,
            name: t("boxes.vegetable"),
            frequency: t("sub.weekly"),
            items: vegetableItems()
          };
        }

        if (subscription.id === 2 || subscription.id === 102) {
          return {
            ...subscription,
            name: t("boxes.dairy"),
            frequency: t("sub.weekly"),
            items: dairyItems()
          };
        }

        return subscription;
      })
    );
  }, [language]);

  const toggleSubscription = (id: number) => {
    setActiveSubscriptions(prev =>
      prev.map(sub =>
        sub.id === id
          ? { ...sub, status: sub.status === "active" ? "paused" : "active" }
          : sub
      )
    );
  };

  const openCancelDialog = (sub: typeof activeSubscriptions[0]) => {
    setCancelledSubId(sub.id);
    setCancelledSubName(sub.name);
    setCancelDialogOpen(true);
    setCancelSuccess(false);
  };

  const confirmCancel = () => {
    setActiveSubscriptions(prev => prev.filter(sub => sub.id !== cancelledSubId));
    setCancelSuccess(true);
  };

  const closeCancelDialog = () => {
    setCancelDialogOpen(false);
    setCancelledSubId(null);
    setCancelSuccess(false);
  };

  const openCustomizeDialog = (sub: typeof activeSubscriptions[0]) => {
    setCustomizeSubId(sub.id);
    setCustomizedProductIds(
      customerProducts
        .filter(product => sub.items.some(item => item.startsWith(t(product.nameKey))))
        .map(product => product.productId)
    );
  };

  const toggleCustomizedProduct = (productId: string) => {
    setCustomizedProductIds(current =>
      current.includes(productId)
        ? current.filter(currentProductId => currentProductId !== productId)
        : [...current, productId]
    );
  };

  const saveCustomizedItems = () => {
    const items = customerProducts
      .filter(product => customizedProductIds.includes(product.productId))
      .map(product => `${t(product.nameKey)} (1 ${t(product.unitKey)})`);

    setActiveSubscriptions(current =>
      current.map(subscription =>
        subscription.id === customizeSubId
          ? { ...subscription, items }
          : subscription
      )
    );
    setCustomizeSubId(null);
    toast.success(t("sub.customizeSaved"));
  };

  const subscribeToBox = (box: {
    id: number;
    name: string;
    icon: typeof Leaf;
    color: string;
    borderColor: string;
    price: number | null;
    frequency: string;
    items: string[];
    comingSoon?: boolean;
  }) => {
    if (box.comingSoon || box.price === null) return;

    const price = box.price;

    setActiveSubscriptions(prev =>
      prev.some(subscription => subscription.id === box.id)
        ? prev
        : [
          ...prev,
          {
            id: box.id,
            name: box.name,
            icon: box.icon,
            color: box.color,
            borderColor: box.borderColor,
            headerBg: "bg-gradient-to-r from-green-50 to-emerald-50",
            price,
            frequency: box.frequency,
            nextDelivery: "25 Mart 2026",
            endDate: "25 Aprel 2026",
            lastBilling: `₼${price.toFixed(2)}`,
            items: box.items,
            status: "active"
          }
        ]
    );

    toast.success(t("common.saved"));
    setActiveTab("active");
  };

  const cancelSubInfo = activeSubscriptions.find(s => s.id === cancelledSubId);

  return (
    <div className="min-h-screen bg-gray-50 pb-32">
      <MobileHeader
        title={t("sub.title")}
        showCart
        cartCount={cartCount}
        accentColor="green"
      />


      {/* Cancel Confirmation Dialog */}
      {cancelDialogOpen && (
        <div className="fixed inset-0 z-[1000]">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/45"
            onClick={closeCancelDialog}
          />

          {/* Safe display area: below header/tabs and above bottom nav */}
          <div className="absolute left-0 right-0 top-[112px] bottom-[calc(5.5rem+env(safe-area-inset-bottom))] flex items-center justify-center px-4">
            <div className="relative w-full max-w-[360px] rounded-2xl bg-white shadow-2xl border border-gray-100 overflow-hidden max-h-full overflow-y-auto">
              {!cancelSuccess ? (
                <>
                  {/* Header */}
                  <div className="px-4 pt-4 pb-3 border-b border-gray-100">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                          <AlertTriangle className="w-5 h-5 text-red-500" />
                        </div>

                        <div className="min-w-0">
                          <h3 className="text-base font-semibold text-gray-900 leading-tight">
                            {t("sub.cancelTitle")}
                          </h3>
                          <p className="text-xs text-gray-500 mt-0.5 leading-snug truncate">
                            {cancelledSubName}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={closeCancelDialog}
                        className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-all shrink-0"
                      >
                        <X className="w-4 h-4 text-gray-500" />
                      </button>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="px-4 py-4">
                    <p className="text-center text-sm font-semibold text-gray-900 mb-1.5">
                      {t("sub.cancelConfirm")}
                    </p>

                    <p className="text-center text-xs text-gray-500 mb-4 leading-relaxed">
                      {t("sub.cancelDesc")}
                    </p>

                    {cancelSubInfo && (
                      <div className="rounded-xl bg-gray-50 border border-gray-200 p-3 mb-4 space-y-2">
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-2 min-w-0">
                            <Calendar className="w-4 h-4 text-gray-500 shrink-0" />
                            <span className="text-xs text-gray-600 truncate">
                              {t("sub.cancelEndDate")}
                            </span>
                          </div>

                          <span className="text-xs font-semibold text-gray-900 text-right shrink-0">
                            {translateDemoText(cancelSubInfo.endDate, lang)}
                          </span>
                        </div>

                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-2 min-w-0">
                            <Clock className="w-4 h-4 text-gray-500 shrink-0" />
                            <span className="text-xs text-gray-600 truncate">
                              {t("sub.cancelLastBilling")}
                            </span>
                          </div>

                          <span className="text-xs font-semibold text-gray-900 text-right shrink-0">
                            {cancelSubInfo.lastBilling}
                          </span>
                        </div>
                      </div>
                    )}

                    <div className="rounded-xl bg-blue-50 border border-blue-100 px-3 py-2 mb-4">
                      <p className="text-[11px] text-blue-700 text-center leading-relaxed">
                        {t("sub.cancelledEndInfo")}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        variant="outline"
                        className="h-10 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 font-semibold text-sm"
                        onClick={closeCancelDialog}
                      >
                        {t("sub.cancelNo")}
                      </Button>

                      <Button
                        className="h-10 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold text-sm shadow-sm"
                        onClick={confirmCancel}
                      >
                        {t("sub.cancelYes")}
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="px-4 py-5 text-center">
                  <div className="flex justify-center mb-3">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle2 className="w-6 h-6 text-green-600" />
                    </div>
                  </div>

                  <h3 className="text-base font-semibold text-gray-900 mb-1">
                    {t("sub.cancelledMsg")}
                  </h3>

                  <p className="text-xs text-gray-500 mb-3 leading-relaxed">
                    {cancelledSubName}
                  </p>

                  <p className="text-[11px] text-blue-600 bg-blue-50 rounded-xl px-3 py-2 border border-blue-100 inline-block mb-4">
                    {t("sub.cancelledEndInfo")}
                  </p>

                  <Button
                    className="w-full bg-green-600 hover:bg-green-700 font-semibold rounded-xl h-10"
                    onClick={closeCancelDialog}
                  >
                    {t("common.close")}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <Dialog open={customizeSubId !== null} onOpenChange={(open) => !open && setCustomizeSubId(null)}>
        <DialogContent className="max-w-[360px] rounded-2xl p-4">
          <DialogHeader>
            <DialogTitle>{t("sub.customizeTitle")}</DialogTitle>
            <DialogDescription>{t("sub.customizeDesc")}</DialogDescription>
          </DialogHeader>
          <div className="max-h-[58vh] space-y-2 overflow-y-auto pr-1">
            {customerProducts.map(product => (
              <label key={product.id} className="flex cursor-pointer items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5">
                <Checkbox
                  checked={customizedProductIds.includes(product.productId)}
                  onCheckedChange={() => toggleCustomizedProduct(product.productId)}
                  className="data-[state=checked]:border-green-600 data-[state=checked]:bg-green-600"
                />
                <img src={product.image} alt={t(product.nameKey)} className="h-12 w-12 shrink-0 rounded-lg border border-gray-200 object-cover object-center" />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-semibold text-gray-800">{t(product.nameKey)}</span>
                  <span className="block truncate text-xs text-gray-500">{product.farm} · ₼{product.price}/{t(product.unitKey)}</span>
                </span>
              </label>
            ))}
          </div>
          <p className="text-xs text-gray-500">{t("sub.customizeHint")}</p>
          <Button onClick={saveCustomizedItems} disabled={customizedProductIds.length === 0} className="w-full h-10 rounded-xl bg-green-600 hover:bg-green-700">
            {t("common.save")}
          </Button>
        </DialogContent>
      </Dialog>


      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="bg-white border-b-4 border-green-100 sticky top-[57px] z-40 shadow-sm px-4 pt-3 pb-0">
          <TabsList className="w-full bg-green-50 p-1 rounded-xl border-2 border-green-100">
            <TabsTrigger
              value="active"
              className="flex-1 rounded-lg data-[state=active]:bg-green-600 data-[state=active]:text-white font-medium"
            >
              {t("sub.active")}
            </TabsTrigger>

            <TabsTrigger
              value="available"
              className="flex-1 rounded-lg data-[state=active]:bg-green-600 data-[state=active]:text-white font-medium"
            >
              {t("sub.available")}
            </TabsTrigger>

          </TabsList>
        </div>

        {/* Active Subscriptions */}
        <TabsContent value="active" className="px-4 pt-4 pb-36 space-y-4 mt-0">
          {activeSubscriptions.length === 0 ? (
            <Card className="p-8 text-center border-2 border-dashed border-green-200">
              <Box className="w-14 h-14 mx-auto mb-4 text-green-300" />
              <h3 className="text-lg font-semibold mb-2 text-gray-900">
                {t("sub.noActive")}
              </h3>
              <p className="text-gray-600 mb-4 text-sm">
                {t("sub.noActiveDesc")}
              </p>
              <Button
                className="bg-green-600 hover:bg-green-700"
                onClick={() => setActiveTab("available")}
              >
                {t("sub.browseBoxes")}
              </Button>
            </Card>
          ) : (
            activeSubscriptions.map(subscription => {
              const Icon = subscription.icon;
              const isActive = subscription.status === "active";

              return (
                <Card
                  key={subscription.id}
                  className={`overflow-hidden border-2 ${isActive ? "border-green-300" : "border-gray-200"
                    } ${subscription.borderColor} transition-all duration-200 hover:shadow-lg`}
                >
                  <div
                    className={`p-4 ${subscription.headerBg} border-b-2 ${isActive ? "border-green-200" : "border-gray-200"
                      }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`${subscription.color} rounded-2xl p-3 shadow-md`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>

                        <div>
                          <h3 className="text-base font-semibold text-gray-900">
                            {subscription.name}
                          </h3>
                          <p className="text-xs text-gray-600">
                            {subscription.frequency} {t("sub.delivery")}
                          </p>
                        </div>
                      </div>

                      <Badge
                        className={`font-semibold text-xs ${isActive
                          ? "bg-green-600 text-white"
                          : "bg-gray-200 text-gray-700"
                          }`}
                      >
                        {isActive ? t("sub.status.active") : t("sub.status.paused")}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-gray-700 bg-white/70 rounded-lg px-3 py-2">
                      <Calendar className="w-3.5 h-3.5 text-green-600" />
                      <span className="font-medium">
                        {t("sub.nextDelivery")}:{" "}
                        {translateDemoText(subscription.nextDelivery, lang)}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 bg-white">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-2xl font-bold text-gray-900">
                        ₼{subscription.price}/{t("sub.week")}
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        className="border-2 border-green-200 text-green-700 hover:bg-green-50 hover:border-green-400 transition-all text-xs h-8"
                        onClick={() => openCustomizeDialog(subscription)}
                      >
                        <Edit className="w-3.5 h-3.5 mr-1.5" />
                        {t("cart.customize")}
                      </Button>
                    </div>

                    <div className="mb-4">
                      <h4 className="text-xs font-semibold mb-3 text-gray-700 flex items-center gap-2">
                        <div className="w-1 h-4 bg-green-500 rounded-full" />
                        {t("sub.included")}
                      </h4>

                      <div className="space-y-1.5 bg-gray-50 rounded-xl p-3 border border-gray-200">
                        {subscription.items.map((item, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-xs">
                            <CheckCircle2 className="w-3.5 h-3.5 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t-2 border-gray-100 mb-3">
                      <span className="text-sm font-medium text-gray-700">
                        {isActive ? t("sub.activeStatus") : t("sub.paused")}
                      </span>

                      <Switch
                        checked={isActive}
                        onCheckedChange={() => toggleSubscription(subscription.id)}
                        className="data-[state=checked]:bg-green-600"
                      />
                    </div>

                    <div className="flex justify-center pt-1">
                      <Button
                        variant="outline"
                        className="w-fit min-w-[180px] px-5 border border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 font-semibold rounded-full h-9 transition-all text-sm"
                        onClick={() => openCancelDialog(subscription)}
                      >
                        {t("sub.cancel")}
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })
          )}

          <Card className="p-4 bg-blue-50 border-2 border-blue-300 border-l-4 border-l-blue-500">
            <div className="flex items-start gap-3">
              <div className="bg-blue-100 rounded-xl p-2">
                <Clock className="w-5 h-5 text-blue-600" />
              </div>

              <div className="flex-1">
                <h4 className="text-blue-900 font-semibold mb-1 text-sm">
                  {t("sub.nextBatch")}
                </h4>
                <p className="text-xs text-blue-700 mb-2 leading-relaxed">
                  {t("sub.nextBatchDesc")}
                </p>
                <div className="text-xs text-blue-600 font-medium bg-blue-100 rounded-lg px-2 py-1 inline-block">
                  {t("sub.cutoff")}
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Available Boxes */}
        <TabsContent value="available" className="p-4 space-y-4 mt-0">
          <Card className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 border-l-4 border-l-green-500">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-green-600" />
              <h3 className="font-semibold text-green-900 text-sm">
                {t("sub.whySubscribe")}
              </h3>
            </div>

            <ul className="space-y-2">
              {[
                t("sub.benefit1"),
                t("sub.benefit2"),
                t("sub.benefit3"),
                t("sub.benefit4")
              ].map((benefit, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-gray-700">
                  <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </Card>

          {[
            {
              id: 101,
              name: t("boxes.vegetable"),
              icon: Leaf,
              color: "bg-green-500",
              borderColor: "border-l-4 border-l-green-500",
              price: 25,
              individualPrice: 32.5,
              frequency: t("sub.weekly"),
              dealBadge: t("sub.bestValue"),
              dealBadgeColor: "bg-green-100 text-green-800 border-green-300",
              highlightColor: "from-green-50 to-emerald-50",
              items: vegetableItems()
            },
            {
              id: 102,
              name: t("boxes.dairy"),
              icon: Milk,
              color: "bg-blue-500",
              borderColor: "border-l-4 border-l-blue-500",
              price: 18,
              individualPrice: 30.0,
              frequency: t("sub.weekly"),
              dealBadge: t("sub.hotOffer"),
              dealBadgeColor: "bg-red-100 text-red-800 border-red-300",
              highlightColor: "from-blue-50 to-sky-50",
              items: dairyItems(),
              comingSoon: true
            },
            {
              id: 103,
              name: t("boxes.meat"),
              icon: Beef,
              color: "bg-red-500",
              borderColor: "border-l-4 border-l-red-500",
              price: 45,
              individualPrice: 62.5,
              frequency: t("sub.weekly"),
              dealBadge: t("sub.goodDeal"),
              dealBadgeColor: "bg-amber-100 text-amber-800 border-amber-300",
              highlightColor: "from-red-50 to-rose-50",
              items: [
                `${getProductName("chicken", lang)} (1.5 ${t("product.kg")})`,
                `${getProductName("beef", lang)} (1 ${t("product.kg")})`,
                `${getProductName("lamb", lang)} (500 q)`,
                localize(
                  {
                    az: "Mövsümi seçim",
                    en: "Seasonal selection",
                    ru: "Сезонный выбор"
                  },
                  lang
                )
              ],
              comingSoon: true
            },
            {
              id: 104,
              name: t("boxes.custom"),
              icon: Box,
              color: "bg-purple-500",
              borderColor: "border-l-4 border-l-purple-500",
              price: null,
              individualPrice: null,
              frequency: t("sub.weekly"),
              dealBadge: t("sub.flexible"),
              dealBadgeColor: "bg-purple-100 text-purple-800 border-purple-300",
              highlightColor: "from-purple-50 to-violet-50",
              items: [
                localize(
                  {
                    az: "Öz məhsullarınızı seçin",
                    en: "Choose your products",
                    ru: "Выберите свои продукты"
                  },
                  lang
                ),
                localize(
                  {
                    az: "Minimum 5 məhsul",
                    en: "Minimum 5 products",
                    ru: "Минимум 5 продуктов"
                  },
                  lang
                ),
                localize(
                  {
                    az: "İstənilən kateqoriyanı qarışdırın",
                    en: "Mix any category",
                    ru: "Смешивайте любые категории"
                  },
                  lang
                )
              ],
              comingSoon: true
            }
          ].map(box => {
            const Icon = box.icon;
            const saveAmount =
              box.price && box.individualPrice
                ? (box.individualPrice - box.price).toFixed(2)
                : null;
            const savePercent =
              box.price && box.individualPrice
                ? Math.round(((box.individualPrice - box.price) / box.individualPrice) * 100)
                : null;

            return (
              <Card
                key={box.id}
                className={`overflow-hidden border-2 border-gray-200 ${box.borderColor} transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5 cursor-pointer`}
              >
                <div className={`bg-gradient-to-r ${box.highlightColor} p-4 border-b border-gray-100`}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`${box.color} rounded-2xl p-3 shadow-md`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>

                      <div>
                        <h3 className="text-base font-semibold text-gray-900">
                          {box.name}
                        </h3>
                        <p className="text-xs text-gray-500">
                          {box.frequency} {t("sub.delivery")}
                        </p>
                      </div>
                    </div>

                    <span className={`text-xs font-bold px-2 py-1 rounded-full border ${box.dealBadgeColor}`}>
                      {box.comingSoon ? t("common.comingSoon") : box.dealBadge}
                    </span>
                  </div>

                  {box.price && box.individualPrice && saveAmount && savePercent ? (
                    <div className="bg-white rounded-xl p-3 border border-gray-200 shadow-sm">
                      <div className="text-xs text-gray-500 font-medium mb-2 text-center">
                        {t("sub.comparisonTitle")}
                      </div>

                      <div className="flex items-center justify-between mb-2">
                        <div className="flex-1 text-center">
                          <div className="text-xs text-gray-400 font-medium mb-0.5">
                            {t("sub.individualPrice")}
                          </div>
                          <div className="text-base font-bold text-gray-400 line-through">
                            ₼{box.individualPrice.toFixed(2)}
                          </div>
                        </div>

                        <div className="px-2 text-gray-300 font-bold">→</div>

                        <div className="flex-1 text-center">
                          <div className="text-xs text-green-600 font-medium mb-0.5">
                            {t("sub.bundlePrice")}
                          </div>
                          <div className="text-2xl font-bold text-green-700">
                            ₼{box.price}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-center gap-2 bg-green-50 border border-green-200 rounded-lg px-3 py-1.5">
                        <TrendingDown className="w-3.5 h-3.5 text-green-600" />
                        <span className="text-sm font-bold text-green-700">
                          {t("sub.youSave")} ₼{saveAmount} ({savePercent}%{" "}
                          {t("sub.savePercent")})
                        </span>
                      </div>

                      <p className="text-xs text-gray-400 text-center mt-1.5">
                        {t("sub.vsIndividual")}
                      </p>
                    </div>
                  ) : (
                    <div className="bg-white rounded-xl p-3 border border-gray-200 text-center">
                      <div className="text-2xl font-bold text-gray-900 mb-0.5">
                        {t("sub.flexible")}
                      </div>
                      <p className="text-xs text-gray-500">
                        {t("sub.vsIndividual")}
                      </p>
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <div className="space-y-1.5 bg-gray-50 rounded-xl p-3 border border-gray-200 mb-4">
                    {box.items.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-gray-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-gray-400 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  <Button
                    disabled={box.comingSoon}
                    onClick={() => subscribeToBox(box)}
                    className={`w-full h-11 text-sm font-semibold rounded-xl shadow-md hover:shadow-lg transition-all hover:scale-[1.01] ${box.color
                      .replace("bg-", "bg-")
                      .replace("-500", "-600")} hover:opacity-90 text-white disabled:opacity-60 disabled:cursor-not-allowed`}
                  >
                    {box.comingSoon
                      ? t("common.comingSoon")
                      : `${t("sub.subscribeNow")} ${box.price ? `- ₼${box.price}/${t("sub.week")}` : ""
                      }`}
                  </Button>
                </div>
              </Card>
            );
          })}
        </TabsContent>

      </Tabs>

      <BottomNav type="customer" />
    </div>
  );
}
