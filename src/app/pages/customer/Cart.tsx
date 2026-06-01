import { useState } from "react";
import { useNavigate } from "react-router";
import { MobileHeader } from "../../components/MobileHeader";
import { Card } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";
import { Label } from "../../components/ui/label";
import { Separator } from "../../components/ui/separator";
import { Progress } from "../../components/ui/progress";
import {
  Minus,
  Plus,
  Trash2,
  MapPin,
  Home,
  Calendar,
  ShoppingBag,
  AlertCircle,
  CheckCircle2
} from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";
import { CART_STORAGE_KEY, defaultCartItems, usePersistentState } from "../../data/demoStore";
import { getProductName } from "../../data/productCatalog";
import { marketplaceAssumptions } from "../../data/marketplaceAssumptions";
import { customerProducts } from "../../data/customerProducts";

const MIN_ORDER = marketplaceAssumptions.minimumOrder;
const DELIVERY_FEE = marketplaceAssumptions.deliveryFee;
const FREE_DELIVERY_THRESHOLD = marketplaceAssumptions.freeDeliveryThreshold;

export default function Cart() {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const [deliveryMethod, setDeliveryMethod] = useState("pickup");
  const [cartItems, setCartItems] = usePersistentState(CART_STORAGE_KEY, defaultCartItems);

  const updateQuantity = (id: number, delta: number) => {
    setCartItems(prev => prev.map(item =>
      item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item
    ).filter(item => item.quantity > 0));
  };

  const removeItem = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = deliveryMethod === "home" && subtotal < FREE_DELIVERY_THRESHOLD ? DELIVERY_FEE : 0;
  const total = subtotal + deliveryFee;

  const minOrderProgress = Math.min((subtotal / MIN_ORDER) * 100, 100);
  const amountNeeded = Math.max(0, MIN_ORDER - subtotal);
  const meetsMinOrder = subtotal >= MIN_ORDER;

  const handleCheckout = () => {
    if (!meetsMinOrder) return;
    navigate('/customer/tracking');
  };
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <MobileHeader title={t('cart.title')} showBack accentColor="green" />

      {cartItems.length === 0 ? (
        <div className="p-8 text-center">
          <div className="w-24 h-24 bg-green-50 border-4 border-green-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-12 h-12 text-green-400" />
          </div>
          <h2 className="text-xl font-semibold mb-2 text-gray-900">{t('cart.empty')}</h2>
          <p className="text-gray-600 mb-6">{t('cart.emptyDesc')}</p>
          <Button
            onClick={() => navigate('/customer/browse')}
            className="bg-green-600 hover:bg-green-700 px-8"
          >
            {t('cart.browseProducts')}
          </Button>
        </div>
      ) : (
        <>
          {/* SCROLLABLE CONTENT */}
          <div className="flex-1 overflow-y-auto pb-6">

            {/* Delivery Info */}
            <div className="px-4 pt-4">
              <Card className="p-4 bg-green-50 border-2 border-green-300 border-l-4 border-l-green-500">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="text-green-900 font-semibold mb-0.5 text-sm">
                      {t('cart.nextDelivery')}
                    </h3>
                    <p className="text-xs text-green-700">{t('cart.orderCutoff')}</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Minimum Order Progress */}
            <div className="px-4 pt-3">
              <Card
                className={`p-4 border-2 transition-all ${meetsMinOrder
                  ? 'border-green-300 bg-green-50'
                  : 'border-amber-300 bg-amber-50'
                  }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {meetsMinOrder ? (
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-amber-600" />
                    )}

                    <span
                      className={`text-sm font-semibold ${meetsMinOrder ? 'text-green-800' : 'text-amber-800'
                        }`}
                    >
                      {meetsMinOrder
                        ? t('cart.minOrder')
                        : `${t('cart.addMoreFor')} ₼${amountNeeded.toFixed(
                          2
                        )} ${t('cart.moreNeeded')}`}
                    </span>
                  </div>

                  <span
                    className={`text-sm font-bold ${meetsMinOrder ? 'text-green-700' : 'text-amber-700'
                      }`}
                  >
                    ₼{subtotal.toFixed(2)} / ₼{MIN_ORDER}
                  </span>
                </div>

                <Progress
                  value={minOrderProgress}
                  className={`h-2.5 ${meetsMinOrder
                    ? '[&>div]:bg-green-500'
                    : '[&>div]:bg-amber-500'
                    }`}
                />

                {!meetsMinOrder && (
                  <p className="text-xs text-amber-600 mt-2 font-medium">
                    {t('cart.minOrderNote')}
                  </p>
                )}
              </Card>
            </div>

            {/* Cart Items */}
            <div className="px-4 pt-4 pb-2">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1.5 h-6 bg-green-500 rounded-full" />
                <h2 className="text-base font-semibold text-gray-900">
                  {t('cart.items')} ({cartItems.length})
                </h2>
              </div>

              <div className="space-y-3">
                {cartItems.map((item) => {
                  const product = customerProducts.find(productItem => productItem.productId === item.productId);
                  return (
                  <Card
                    key={item.id}
                    className="p-4 border-2 border-gray-200 hover:border-green-300 hover:shadow-md transition-all"
                  >
                    <div className="flex gap-3">
                      <img
                        src={product?.image}
                        alt={getProductName(item.productId, language)}
                        className="w-16 h-16 rounded-xl object-cover object-center flex-shrink-0 border-2 border-green-200 bg-green-50"
                      />

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <h3 className="font-semibold text-sm truncate text-gray-900">
                              {getProductName(item.productId, language)}
                            </h3>
                            <div className="text-xs text-gray-500 font-medium">
                              ₼{item.price} / {t(item.unitKey)}
                            </div>
                          </div>

                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-red-400 p-1.5 hover:bg-red-50 rounded-lg"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 bg-gray-100 rounded-xl p-1 border">
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-7 w-7 p-0"
                              onClick={() => updateQuantity(item.id, -1)}
                            >
                              <Minus className="w-3 h-3" />
                            </Button>

                            <span className="w-7 text-center font-semibold text-gray-900 text-sm">
                              {item.quantity}
                            </span>

                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-7 w-7 p-0"
                              onClick={() => updateQuantity(item.id, 1)}
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>

                          <div className="text-base font-bold text-gray-900">
                            ₼{(item.price * item.quantity).toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                  );
                })}
              </div>
            </div>

            {/* Delivery Method */}
            <div className="px-4 py-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1.5 h-6 bg-green-500 rounded-full" />
                <h2 className="text-base font-semibold text-gray-900">{t('cart.deliveryMethod')}</h2>
              </div>
              <RadioGroup value={deliveryMethod} onValueChange={setDeliveryMethod}>
                {/* Pickup */}
                <Card
                  className={`p-4 mb-2 border-2 cursor-pointer transition-all ${deliveryMethod === 'pickup'
                    ? 'border-green-400 bg-green-50'
                    : 'border-gray-200 hover:border-green-300'
                    }`}
                >
                  <div className="flex items-start gap-3">
                    <RadioGroupItem value="pickup" id="pickup" className="mt-1" />
                    <Label htmlFor="pickup" className="flex-1 cursor-pointer">
                      <div className="flex items-start gap-3">
                        <div className="bg-green-100 rounded-xl p-2">
                          <MapPin className="w-4 h-4 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold mb-0.5 text-gray-900 text-sm">{t('cart.pickup')}</h3>
                          <p className="text-xs text-gray-500 mb-1.5">{t('cart.pickupDesc')}</p>
                          <Badge className="bg-green-100 text-green-700 border-green-300 font-semibold text-xs">
                            {t('cart.free')}
                          </Badge>
                        </div>
                      </div>
                    </Label>
                  </div>
                </Card>

                {/* Home */}
                <Card
                  className={`p-4 border-2 cursor-pointer transition-all ${deliveryMethod === 'home'
                    ? 'border-blue-400 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                    }`}
                >
                  <div className="flex items-start gap-3">
                    <RadioGroupItem value="home" id="home" className="mt-1" />
                    <Label htmlFor="home" className="flex-1 cursor-pointer">
                      <div className="flex items-start gap-3">
                        <div className="bg-blue-100 rounded-xl p-2">
                          <Home className="w-4 h-4 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold mb-0.5 text-gray-900 text-sm">{t('cart.homeDelivery')}</h3>
                          <p className="text-xs text-gray-500 mb-1.5">{t('cart.homeDeliveryDesc')}</p>
                          <Badge className="bg-blue-100 text-blue-700 border-blue-300 font-semibold text-xs">
                            {subtotal >= FREE_DELIVERY_THRESHOLD ? t('cart.free') : `₼${DELIVERY_FEE.toFixed(2)}`}
                          </Badge>
                        </div>
                      </div>
                    </Label>
                  </div>
                </Card>
              </RadioGroup>
            </div>

          </div>

          {/* STICKY BOTTOM SUMMARY (FIXED PROPERLY) */}
          <div className="sticky bottom-0 z-40 w-full bg-white border-t-4 border-green-400 shadow-[0_-4px_20px_rgba(0,0,0,0.12)]">
            <div className="p-4 max-w-[430px] mx-auto">
              <div className="space-y-1.5 mb-3">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>{t('cart.subtotal')}</span>
                  <span className="font-medium text-gray-900">
                    ₼{subtotal.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between text-sm text-gray-600">
                  <span>{t('cart.delivery')}</span>
                  <span className="font-medium text-gray-900">
                    {deliveryFee === 0
                      ? t('cart.free')
                      : `₼${deliveryFee.toFixed(2)}`}
                  </span>
                </div>

                <Separator className="bg-green-200" />

                <div className="flex justify-between text-lg font-bold text-gray-900">
                  <span>{t('cart.total')}</span>
                  <span>₼{total.toFixed(2)}</span>
                </div>
              </div>

              <Button
                className={`w-full h-12 text-base font-semibold rounded-xl ${meetsMinOrder
                  ? 'bg-green-600 hover:bg-green-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                onClick={handleCheckout}
                disabled={!meetsMinOrder}
              >
                {t('cart.checkout')}
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
