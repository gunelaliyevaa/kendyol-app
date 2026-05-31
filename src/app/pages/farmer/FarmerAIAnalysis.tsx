import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { BrainCircuit, Camera, CheckCircle2, ImagePlus, Leaf, MapPin, Package, PencilLine, ScanLine, ShieldCheck, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { MobileHeader } from "../../components/MobileHeader";
import { BottomNav } from "../../components/BottomNav";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { useLanguage } from "../../contexts/LanguageContext";
import { catalogProducts, getProductName, getUnitName, type Language } from "../../data/productCatalog";
import { defaultFarmerProducts, FARMER_PRODUCTS_STORAGE_KEY, FARMER_PRODUCTS_UPDATED_EVENT, readStoredValue, type FarmerProduct } from "../../data/demoStore";

export default function FarmerAIAnalysis() {
  const navigate = useNavigate();
  const routeLocation = useLocation();
  const { t, language } = useLanguage();
  const lang = language as Language;
  const draftProduct = (routeLocation.state as { draftProduct?: Partial<FarmerProduct> } | null)?.draftProduct;
  const productId = draftProduct?.productId ?? "tomato";
  const quantity = String(draftProduct?.available ?? 10);
  const price = String(draftProduct?.price ?? "2.50");
  const location = draftProduct?.location ?? "Qəbələ";
  const preview = draftProduct?.image ?? catalogProducts.find(product => product.id === "tomato")?.image ?? "";
  const [analyzing, setAnalyzing] = useState(true);
  const [showResult, setShowResult] = useState(false);

  const selectedProduct = catalogProducts.find(product => product.id === productId) ?? catalogProducts[0];

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setAnalyzing(false);
      setShowResult(true);
      toast.success(t("ai.product.complete"));
    }, 800);
    return () => window.clearTimeout(timer);
  }, [t]);

  const editDraft = () => navigate("/farmer/products", {
    state: { draftProduct, reopenAddDialog: true }
  });

  const publishListing = () => {
    const savedProducts = readStoredValue(FARMER_PRODUCTS_STORAGE_KEY, defaultFarmerProducts);
    const nextId = Math.max(0, ...savedProducts.map(product => product.id)) + 1;
    const listingImage = preview;
    const listing: FarmerProduct = {
      id: nextId,
      productId,
      categoryId: selectedProduct.categoryId,
      category: draftProduct?.category ?? "medium",
      price: Number(price),
      available: Number(quantity),
      unit: getUnitName(productId, lang),
      demand: 0,
      status: "active",
      image: listingImage,
      message: draftProduct?.message,
      location,
    };

    try {
      localStorage.setItem(FARMER_PRODUCTS_STORAGE_KEY, JSON.stringify([...savedProducts, listing]));
      window.dispatchEvent(new Event(FARMER_PRODUCTS_UPDATED_EVENT));
      toast.success(t("ai.product.published"));
      navigate("/farmer/products");
    } catch {
      toast.error(t("ai.product.publishFailed"));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <MobileHeader title={t("ai.product.title")} showBack profilePath="/farmer/profile" accentColor="amber" />

      <div className="p-4 space-y-4">
        <Card className="p-3 border-2 border-amber-200 bg-white">
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
            <div className="flex items-center gap-2 rounded-xl bg-green-50 px-2.5 py-2 border border-green-200">
              <div className="w-7 h-7 rounded-full bg-green-600 text-white flex items-center justify-center text-xs font-bold">1</div>
              <div className="text-xs font-semibold leading-tight text-green-800">{t("ai.product.stepDetails")}</div>
            </div>
            <div className="w-4 h-0.5 bg-amber-300 rounded-full" />
            <div className="flex items-center gap-2 rounded-xl bg-amber-50 px-2.5 py-2 border border-amber-300">
              <div className="w-7 h-7 rounded-full bg-amber-600 text-white flex items-center justify-center text-xs font-bold">2</div>
              <div className="text-xs font-semibold leading-tight text-amber-800">{t("ai.product.stepAnalysis")}</div>
            </div>
          </div>
        </Card>

        <Card className="p-4 border-2 border-amber-200 border-l-4 border-l-amber-500 bg-amber-50">
          <div className="flex items-start gap-3">
            <div className="bg-amber-100 rounded-xl p-2">
              <BrainCircuit className="w-5 h-5 text-amber-700" />
            </div>
            <div>
              <h2 className="font-semibold text-gray-900">{t("ai.product.heading")}</h2>
              <p className="text-xs text-gray-600 mt-1 leading-relaxed">{t("ai.product.desc")}</p>
            </div>
          </div>
        </Card>

        <Card className="overflow-hidden border-2 border-gray-200 bg-white">
          <div className="relative h-48 bg-gray-100">
            {preview ? (
              <img src={preview} alt={getProductName(productId, lang)} className="w-full h-full object-cover" />
            ) : (
              <div className="h-full flex items-center justify-center">
                <ImagePlus className="w-12 h-12 text-gray-300" />
              </div>
            )}
            <Badge className="absolute top-3 left-3 bg-white/90 text-amber-800 border border-amber-200">
              <Camera className="w-3 h-3 mr-1" />
              {t("ai.product.photo")}
            </Badge>
          </div>
        </Card>

        <Card className="p-4 border-2 border-gray-200 bg-white space-y-3">
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-semibold text-gray-900">{t("ai.product.summary")}</h2>
            <Button variant="outline" size="sm" onClick={editDraft} className="h-8 border-amber-300 text-amber-800 hover:bg-amber-50">
              <PencilLine className="w-3.5 h-3.5 mr-1.5" />
              {t("ai.product.edit")}
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {[
              [Package, t("catalog.product"), getProductName(productId, lang)],
              [Leaf, t("ai.product.quantity"), `${quantity} ${getUnitName(productId, lang)}`],
              [Sparkles, t("ai.product.price"), `₼${price}`],
              [MapPin, t("ai.product.location"), location],
            ].map(([Icon, label, value]) => {
              const DetailIcon = Icon as typeof Package;
              return (
                <div key={label as string} className="rounded-xl border border-gray-200 bg-gray-50 p-2.5">
                  <div className="flex items-center gap-1.5 text-[11px] font-medium text-gray-500">
                    <DetailIcon className="w-3.5 h-3.5 text-amber-600" />
                    {label as string}
                  </div>
                  <div className="mt-1 text-sm font-semibold text-gray-900">{value as string}</div>
                </div>
              );
            })}
          </div>
          {analyzing ? (
            <div className="flex items-center justify-center gap-2 rounded-xl bg-amber-50 p-3 text-sm font-semibold text-amber-800">
              <ScanLine className="w-5 h-5 animate-pulse" />
              {t("ai.product.analyzing")}
            </div>
          ) : null}
        </Card>

        {showResult && (
          <Card className="overflow-hidden border-2 border-green-300 border-l-4 border-l-green-500 bg-white">
            <div className="bg-gradient-to-r from-green-600 to-emerald-700 p-4 text-white">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                <h2 className="font-semibold">{t("ai.product.result")}</h2>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-24 h-24 rounded-full bg-green-100 p-2 flex-shrink-0">
                  <div
                    className="w-full h-full rounded-full flex items-center justify-center"
                    style={{ background: "conic-gradient(#16a34a 0 92%, #dcfce7 92% 100%)" }}
                  >
                    <div className="w-16 h-16 rounded-full bg-white flex flex-col items-center justify-center">
                      <span className="text-xl font-bold text-green-700">92</span>
                      <span className="text-xs text-gray-500">/100</span>
                    </div>
                  </div>
                </div>
                <div>
                  <Badge className="mb-2 bg-green-100 text-green-800 border border-green-300">
                    <ShieldCheck className="w-3 h-3 mr-1" />
                    {t("ai.product.saleReady")}
                  </Badge>
                  <h3 className="font-semibold text-gray-900">{getProductName(productId, lang)}</h3>
                  <p className="text-xs text-gray-500 mt-1">{quantity} {getUnitName(productId, lang)} · ₼{price} · {location}</p>
                </div>
              </div>

              <div className="space-y-2">
                {[
                  [Leaf, t("ai.product.category"), getProductName(selectedProduct.id, lang)],
                  [CheckCircle2, t("ai.product.visualQuality"), t("ai.product.good")],
                  [CheckCircle2, t("ai.product.freshnessRisk"), t("ai.product.low")],
                ].map(([Icon, label, value]) => {
                  const MetricIcon = Icon as typeof Leaf;
                  return (
                    <div key={label as string} className="flex items-center gap-3 bg-green-50 rounded-xl p-3 border border-green-100">
                      <MetricIcon className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-gray-600 flex-1">{label as string}</span>
                      <span className="text-sm font-semibold text-green-800">{value as string}</span>
                    </div>
                  );
                })}
              </div>

              <Button onClick={publishListing} className="w-full mt-4 h-11 bg-green-600 hover:bg-green-700 rounded-xl font-semibold">
                <CheckCircle2 className="w-4 h-4 mr-2" />
                {t("ai.product.publish")}
              </Button>
            </div>
          </Card>
        )}
      </div>

      <BottomNav type="farmer" />
    </div>
  );
}
