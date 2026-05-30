import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { BrainCircuit, Camera, CheckCircle2, ImagePlus, Leaf, MapPin, ScanLine, ShieldCheck, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { MobileHeader } from "../../components/MobileHeader";
import { BottomNav } from "../../components/BottomNav";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { useLanguage } from "../../contexts/LanguageContext";
import { catalogProducts, getProductName, getUnitName, type Language } from "../../data/productCatalog";
import { defaultFarmerProducts, FARMER_PRODUCTS_STORAGE_KEY, readStoredValue, type FarmerProduct } from "../../data/demoStore";

export default function FarmerAIAnalysis() {
  const navigate = useNavigate();
  const routeLocation = useLocation();
  const { t, language } = useLanguage();
  const lang = language as Language;
  const inputRef = useRef<HTMLInputElement>(null);
  const draftProduct = (routeLocation.state as { draftProduct?: Partial<FarmerProduct> } | null)?.draftProduct;
  const [productId, setProductId] = useState(draftProduct?.productId ?? "tomato");
  const [quantity, setQuantity] = useState(String(draftProduct?.available ?? 10));
  const [price, setPrice] = useState(String(draftProduct?.price ?? "2.50"));
  const [location, setLocation] = useState(draftProduct?.location ?? "Qəbələ");
  const [preview, setPreview] = useState(draftProduct?.image ?? catalogProducts.find(product => product.id === "tomato")?.image ?? "");
  const [analyzing, setAnalyzing] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const selectedProduct = catalogProducts.find(product => product.id === productId) ?? catalogProducts[0];

  const analyze = () => {
    setAnalyzing(true);
    setShowResult(false);
    window.setTimeout(() => {
      setAnalyzing(false);
      setShowResult(true);
      toast.success(t("ai.product.complete"));
    }, 800);
  };

  const selectProduct = (value: string) => {
    const product = catalogProducts.find(item => item.id === value);
    setProductId(value);
    if (product?.image) setPreview(product.image);
  };

  const handlePhoto = (file?: File) => {
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    toast.success(t("ai.product.photoAdded"));
  };

  const publishListing = () => {
    const savedProducts = readStoredValue(FARMER_PRODUCTS_STORAGE_KEY, defaultFarmerProducts);
    const nextId = Math.max(0, ...savedProducts.map(product => product.id)) + 1;
    const listingImage = preview.startsWith("blob:") ? selectedProduct.image ?? draftProduct?.image ?? "" : preview;
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

    localStorage.setItem(FARMER_PRODUCTS_STORAGE_KEY, JSON.stringify([...savedProducts, listing]));
    toast.success(t("ai.product.published"));
    navigate("/farmer/products");
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <MobileHeader title={t("ai.product.title")} showBack profilePath="/farmer/profile" accentColor="amber" />

      <div className="p-4 space-y-4">
        <Card className="p-4 border-2 border-green-200 bg-white">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">1</div>
            <div className="flex-1 h-1 bg-green-300 rounded-full" />
            <div className="w-9 h-9 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold">2</div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-2 text-center">
            <div className="text-xs font-semibold text-green-700">{t("ai.product.stepDetails")}</div>
            <div className="text-xs font-semibold text-amber-700">{t("ai.product.stepAnalysis")}</div>
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
          <div className="p-4">
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              capture="environment"
              className="hidden"
              onChange={event => handlePhoto(event.target.files?.[0])}
            />
            <Button variant="outline" onClick={() => inputRef.current?.click()} className="w-full border-2 border-amber-200 text-amber-800 hover:bg-amber-50">
              <Camera className="w-4 h-4 mr-2" />
              {t("ai.product.addPhoto")}
            </Button>
          </div>
        </Card>

        <Card className="p-4 border-2 border-gray-200 bg-white space-y-4">
          <div>
            <Label>{t("catalog.product")}</Label>
            <Select value={productId} onValueChange={selectProduct}>
              <SelectTrigger className="border-2 border-gray-200 rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {catalogProducts.filter(product => product.image).map(product => (
                  <SelectItem key={product.id} value={product.id}>{product.names[lang]}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="ai-quantity">{t("ai.product.quantity")}</Label>
              <Input id="ai-quantity" type="number" value={quantity} onChange={event => setQuantity(event.target.value)} />
            </div>
            <div>
              <Label htmlFor="ai-price">{t("ai.product.price")}</Label>
              <Input id="ai-price" type="number" value={price} onChange={event => setPrice(event.target.value)} />
            </div>
          </div>
          <div>
            <Label htmlFor="ai-location">{t("ai.product.location")}</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-600" />
              <Input id="ai-location" className="pl-9" value={location} onChange={event => setLocation(event.target.value)} />
            </div>
          </div>
          <Button onClick={analyze} disabled={analyzing} className="w-full h-12 bg-amber-600 hover:bg-amber-700 rounded-xl font-semibold">
            <ScanLine className={`w-5 h-5 mr-2 ${analyzing ? "animate-pulse" : ""}`} />
            {analyzing ? t("ai.product.analyzing") : t("ai.product.analyze")}
          </Button>
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
