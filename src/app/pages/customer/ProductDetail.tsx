import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { MobileHeader } from "../../components/MobileHeader";
import { Card } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { 
  MapPin, 
  Leaf, 
  Calendar, 
  Truck,
  CheckCircle2,
  Minus,
  Plus,
  Award,
  ShieldCheck,
  Star,
  Phone,
  X,
  User,
  ChevronRight
} from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";
import { toast } from "sonner";
import { getCustomerProduct } from "../../data/customerProducts";
import { addCartItem, getCartCount } from "../../data/demoStore";
import { localize, translateDemoText } from "../../data/logisticsData";
import type { Language } from "../../data/productCatalog";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const [quantity, setQuantity] = useState(1);
  const [showFarmerProfile, setShowFarmerProfile] = useState(false);
  const [cartCount, setCartCount] = useState(getCartCount);
  const selectedProduct = getCustomerProduct(Number(id));

  const product = {
    ...selectedProduct,
    name: t(selectedProduct.nameKey),
    unit: t(selectedProduct.unitKey),
    farmer: selectedProduct.farmerName,
    shelfLife: t(`category.${selectedProduct.category}Days`),
    harvestDate: "22 Mart 2026",
    description: localize({
      az: "Yerli fermadan təzə yığılmış məhsul. Həftəlik toplu çatdırılma üçün hazırlanıb.",
      en: "Freshly harvested local produce, prepared for the weekly batch delivery.",
      ru: "Свежий местный продукт, подготовленный для еженедельной групповой доставки.",
    }, language),
    certifications: [
      localize({ az: "Yerli", en: "Local", ru: "Местный" }, language),
      localize({ az: "Yoxlanılıb", en: "Verified", ru: "Проверено" }, language),
    ],
    inStock: true,
    availableStock: 150
  };

  const farmerInfo = {
    name: "Ramiz",
    surname: "Məmmədov",
    experience: "15 il",
    location: "Quba Rayonu, Azərbaycan",
    bio: "Üzvi tərəvəzlər üzrə ixtisaslaşmış ailə ferması. Üç nəsil boyu davamlı əkinçiliklə məşğuluq.",
    phone: "+994 55 123 45 67",
    farmName: "Quba Ferması",
    rating: 4.9,
    totalDeliveries: 48,
    memberSince: "2021",
    verified: true,
    image: "https://images.unsplash.com/photo-1726223210374-a7f8bc55b030?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200",
    products: [t('product.organicTomatoes'), t('product.sweetPeppers'), t('product.cucumbers'), "Soğan"],
    farmImages: [
      "https://images.unsplash.com/photo-1757332334678-e76d258c49c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200",
      "https://images.unsplash.com/photo-1775343963054-11247c9d4d30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200",
      "https://images.unsplash.com/photo-1725369865895-0dd4566c8864?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200",
    ]
  };

  const addToCart = () => {
    addCartItem({
      id: selectedProduct.id,
      productId: selectedProduct.productId,
      price: selectedProduct.price,
      unitKey: selectedProduct.unitKey,
      category: selectedProduct.category,
    }, quantity);
    setCartCount(getCartCount());
    toast.success(`${product.name} ${t('browse.inCart')}`);
    navigate('/customer/cart');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-28">
      <MobileHeader title={t('product.title')} showBack showCart cartCount={cartCount} accentColor="green" />

      {/* Product Image */}
      <div className="relative h-64 overflow-hidden border-b-4 border-green-200">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <div className="absolute bottom-4 left-4">
          <Badge className="bg-amber-100 text-amber-700 border-amber-300 font-semibold border shadow-md">
            {product.shelfLife}
          </Badge>
        </div>
      </div>

      {/* Product Info */}
      <div className="bg-white px-6 pt-5 pb-4 border-b border-gray-100">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h1 className="text-2xl font-semibold mb-2 text-gray-900">{product.name}</h1>
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium">{product.farm} • {product.location}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {product.certifications.map((cert) => (
            <Badge key={cert} className="bg-green-100 text-green-700 border-green-300 border font-semibold">
              <Award className="w-3 h-3 mr-1" />
              {cert}
            </Badge>
          ))}
        </div>

        <p className="text-gray-600 mb-4 leading-relaxed text-sm">{product.description}</p>

        <div className="grid grid-cols-2 gap-3">
          <Card className="p-3 bg-green-50 border-2 border-green-200">
            <div className="flex items-center gap-2 text-green-700 mb-1">
              <Calendar className="w-4 h-4" />
              <span className="text-xs font-semibold">{t('product.harvested')}</span>
            </div>
            <div className="text-sm font-semibold text-gray-900">{translateDemoText(product.harvestDate, language as Language)}</div>
          </Card>

          <Card className="p-3 bg-blue-50 border-2 border-blue-200">
            <div className="flex items-center gap-2 text-blue-700 mb-1">
              <Truck className="w-4 h-4" />
              <span className="text-xs font-semibold">{t('product.nextDelivery')}</span>
            </div>
            <div className="text-sm font-semibold text-gray-900">{translateDemoText("25 Mart", language as Language)}</div>
          </Card>
        </div>
      </div>

      {/* Farm Traceability */}
      <div className="bg-white px-6 py-5 border-b border-gray-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-green-100 rounded-xl p-2">
            <Leaf className="w-5 h-5 text-green-600" />
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-6 bg-green-500 rounded-full" />
            <h2 className="text-base font-semibold text-gray-900">{t('product.farmTraceability')}</h2>
          </div>
        </div>

        {/* Farmer Summary Card */}
        <Card className="p-4 bg-green-50 border-2 border-green-200 mb-3">
          <div className="flex items-start gap-3 mb-3">
            <div className="relative">
              <img
                src={farmerInfo.image}
                alt={farmerInfo.name}
                className="w-14 h-14 rounded-xl object-cover border-2 border-green-200"
              />
              {farmerInfo.verified && (
                <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-0.5 border border-white">
                  <ShieldCheck className="w-3 h-3 text-white" />
                </div>
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-gray-900">{farmerInfo.name} {farmerInfo.surname}</h3>
                {farmerInfo.verified && (
                  <Badge className="bg-green-600 text-white text-xs font-semibold border-0 px-2 py-0 flex items-center gap-1">
                    <ShieldCheck className="w-2.5 h-2.5" />
                    {t('product.farmerVerified')}
                  </Badge>
                )}
              </div>
              <p className="text-xs text-gray-500 mb-2">{farmerInfo.farmName} • {farmerInfo.location}</p>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span className="text-xs font-semibold text-gray-700">{farmerInfo.rating}</span>
                </div>
                <span className="text-xs text-gray-400">•</span>
                <span className="text-xs text-gray-500">{farmerInfo.totalDeliveries} {t('driver.deliveries')}</span>
                <span className="text-xs text-gray-400">•</span>
                <span className="text-xs text-gray-500">{t('product.farmerSince')} {farmerInfo.memberSince}</span>
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-3 leading-relaxed">{farmerInfo.bio}</p>
          
          <Button 
            variant="outline" 
            className="w-full border-2 border-green-300 text-green-700 hover:bg-green-100 font-semibold rounded-xl h-10 transition-all"
            onClick={() => setShowFarmerProfile(true)}
          >
            <User className="w-4 h-4 mr-2" />
            {t('product.viewFarmerProfile')}
            <ChevronRight className="w-4 h-4 ml-auto" />
          </Button>
        </Card>
      </div>

      {/* Delivery Journey */}
      <div className="bg-white px-6 py-5">
        <div className="flex items-center gap-2 mb-5">
          <div className="w-1.5 h-6 bg-blue-500 rounded-full" />
          <h2 className="text-base font-semibold text-gray-900">{t('product.deliveryJourney')}</h2>
        </div>
        
        <div className="space-y-4">
          <div className="flex gap-3">
            <div className="flex flex-col items-center">
              <div className="w-9 h-9 rounded-full bg-green-600 flex items-center justify-center text-white font-bold shadow-md text-sm">
                1
              </div>
              <div className="w-0.5 h-12 bg-green-300 mt-1"></div>
            </div>
            <div className="flex-1 pt-1 p-3 bg-green-50 rounded-xl border border-green-200">
              <h4 className="font-semibold mb-1 text-gray-900 text-sm">{t('product.step1Title')}</h4>
              <p className="text-xs text-gray-600">{t('product.step1Desc')} {product.location}</p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="flex flex-col items-center">
              <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold shadow-md text-sm">
                2
              </div>
              <div className="w-0.5 h-12 bg-blue-300 mt-1"></div>
            </div>
            <div className="flex-1 pt-1 p-3 bg-blue-50 rounded-xl border border-blue-200">
              <h4 className="font-semibold mb-1 text-gray-900 text-sm">{t('product.step2Title')}</h4>
              <p className="text-xs text-gray-600">{t('product.step2Desc')}</p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="flex flex-col items-center">
              <div className="w-9 h-9 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold shadow-md text-sm">
                3
              </div>
            </div>
            <div className="flex-1 pt-1 p-3 bg-emerald-50 rounded-xl border border-emerald-200">
              <h4 className="font-semibold mb-1 text-gray-900 text-sm">{t('product.step3Title')}</h4>
              <p className="text-xs text-gray-600">{t('product.step3Desc')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Farmer Profile Sheet (slide-up) */}
      {showFarmerProfile && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowFarmerProfile(false)} />
          <div className="relative bg-white rounded-t-3xl max-h-[88vh] overflow-y-auto">
            {/* Handle */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 bg-gray-200 rounded-full" />
            </div>
            
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
              <h3 className="text-base font-semibold text-gray-900">{t('product.farmerProfile')}</h3>
              <button
                onClick={() => setShowFarmerProfile(false)}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-all"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>

            <div className="px-5 py-4">
              {/* Farmer Header */}
              <div className="flex items-start gap-4 mb-5">
                <div className="relative">
                  <img
                    src={farmerInfo.image}
                    alt={farmerInfo.name}
                    className="w-20 h-20 rounded-2xl object-cover border-2 border-green-200 shadow-md"
                  />
                  {farmerInfo.verified && (
                    <div className="absolute -bottom-1.5 -right-1.5 bg-green-500 rounded-full p-1 border-2 border-white shadow-md">
                      <ShieldCheck className="w-3.5 h-3.5 text-white" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-gray-900 mb-0.5">{farmerInfo.name} {farmerInfo.surname}</h2>
                  <p className="text-sm text-gray-500 mb-2">{farmerInfo.farmName}</p>
                  {farmerInfo.verified && (
                    <Badge className="bg-green-100 text-green-800 border border-green-300 font-semibold text-xs flex items-center gap-1 w-fit">
                      <ShieldCheck className="w-3 h-3" />
                      {t('product.farmerVerified')}
                    </Badge>
                  )}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-2 mb-5">
                <div className="bg-amber-50 rounded-xl p-3 border border-amber-200 text-center">
                  <div className="flex items-center justify-center gap-0.5 mb-1">
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <span className="text-base font-bold text-gray-900">{farmerInfo.rating}</span>
                  </div>
                  <div className="text-xs text-gray-500">{t('farmer.profile.rating')}</div>
                </div>
                <div className="bg-green-50 rounded-xl p-3 border border-green-200 text-center">
                  <div className="text-base font-bold text-gray-900 mb-1">{farmerInfo.totalDeliveries}</div>
                  <div className="text-xs text-gray-500">{t('farmer.profile.deliveries')}</div>
                </div>
                <div className="bg-blue-50 rounded-xl p-3 border border-blue-200 text-center">
                  <div className="text-base font-bold text-gray-900 mb-1">{farmerInfo.experience}</div>
                  <div className="text-xs text-gray-500">{t('product.experience')}</div>
                </div>
              </div>

              {/* Bio */}
              <div className="mb-5">
                <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <div className="w-1 h-4 bg-green-500 rounded-full" />
                  {t('product.farmerBio')}
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed bg-gray-50 rounded-xl p-3 border border-gray-200">
                  {farmerInfo.bio}
                </p>
              </div>

              {/* Details */}
              <div className="space-y-2 mb-5">
                <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-3 border border-gray-200">
                  <MapPin className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <div>
                    <div className="text-xs text-gray-500">{t('product.farmerRegion')}</div>
                    <div className="text-sm font-semibold text-gray-900">{farmerInfo.location}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-3 border border-gray-200">
                  <Phone className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <div>
                    <div className="text-xs text-gray-500">{t('farmer.profile.phone')}</div>
                    <div className="text-sm font-semibold text-gray-900">{farmerInfo.phone}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-3 border border-gray-200">
                  <Calendar className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <div>
                    <div className="text-xs text-gray-500">{t('farmer.profile.since')}</div>
                    <div className="text-sm font-semibold text-gray-900">{farmerInfo.memberSince}</div>
                  </div>
                </div>
              </div>

              {/* Farm Products */}
              <div className="mb-5">
                <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <div className="w-1 h-4 bg-green-500 rounded-full" />
                  {t('product.farmerProducts')}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {farmerInfo.products.map((p, idx) => (
                    <Badge key={idx} className="bg-green-50 text-green-700 border border-green-200 font-medium">
                      {p}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Farm Images */}
              <div className="mb-5">
                <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <div className="w-1 h-4 bg-green-500 rounded-full" />
                  Ferma Şəkilləri
                </h4>
                <div className="flex gap-2">
                  {farmerInfo.farmImages.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`Farm ${idx + 1}`}
                      className="w-24 h-20 rounded-xl object-cover border-2 border-gray-200"
                    />
                  ))}
                </div>
              </div>

              <Button
                className="w-full bg-green-600 hover:bg-green-700 h-12 font-semibold rounded-xl shadow-md"
                onClick={() => setShowFarmerProfile(false)}
              >
                <CheckCircle2 className="w-4 h-4 mr-2" />
                {t('product.closeFarmerProfile')}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Price and Add to Cart - Fixed Bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t-4 border-green-400 p-4 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.12)]">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <div className="text-2xl font-bold text-gray-900 mb-0.5">₼{(product.price * quantity).toFixed(2)}</div>
            <div className="text-xs text-gray-500">{t('common.per')} {product.unit}</div>
          </div>

          <div className="flex items-center gap-2 bg-gray-100 rounded-xl p-2 border-2 border-gray-200">
            <Button 
              size="sm" 
              variant="ghost"
              className="h-9 w-9 p-0 hover:bg-red-100 hover:text-red-600 rounded-lg transition-all"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
            >
              <Minus className="w-4 h-4" />
            </Button>
            <span className="w-8 text-center font-bold text-gray-900 text-lg">{quantity}</span>
            <Button 
              size="sm" 
              variant="ghost"
              className="h-9 w-9 p-0 hover:bg-green-100 hover:text-green-600 rounded-lg transition-all"
              onClick={() => setQuantity(quantity + 1)}
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          <Button 
            className="bg-green-600 hover:bg-green-700 px-6 h-12 font-semibold rounded-xl shadow-md hover:shadow-lg transition-all hover:scale-[1.02]"
            onClick={addToCart}
          >
            {t('product.addToCart')}
          </Button>
        </div>
      </div>
    </div>
  );
}
