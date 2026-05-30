import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { MobileHeader } from "../../components/MobileHeader";
import { BottomNav } from "../../components/BottomNav";
import { Card } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Search, Plus, MapPin, ShoppingCart, User, ShieldCheck } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";
import { toast } from "sonner";
import { customerProducts } from "../../data/customerProducts";
import { addCartItem, CART_STORAGE_KEY, defaultCartItems, getCartCount, readStoredValue, type CartItem } from "../../data/demoStore";

export default function BrowseProducts() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [cartItems, setCartItems] = useState<Record<number, number>>(() =>
    Object.fromEntries(readStoredValue<CartItem[]>(CART_STORAGE_KEY, defaultCartItems).map(item => [item.id, item.quantity]))
  );
  const [totalCartItems, setTotalCartItems] = useState(getCartCount);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const syncCart = () => {
      const storedCart = readStoredValue<CartItem[]>(CART_STORAGE_KEY, defaultCartItems);
      setCartItems(Object.fromEntries(storedCart.map(item => [item.id, item.quantity])));
      setTotalCartItems(storedCart.reduce((sum, item) => sum + item.quantity, 0));
    };

    window.addEventListener("kendyol-cart-updated", syncCart);
    return () => window.removeEventListener("kendyol-cart-updated", syncCart);
  }, []);

  const products = [
    {
      id: 1,
      name: t('product.organicTomatoes'),
      price: 4.5,
      unit: t('product.kg'),
      category: "medium",
      farm: "Quba Ferması",
      farmerName: "Ramiz Məmmədov",
      farmerVerified: true,
      location: "Quba Rayonu",
      shelfLife: t('category.mediumDays'),
      shelfColor: "bg-amber-100 text-amber-700 border-amber-300",
      cardBorder: "border-l-4 border-l-amber-400",
      hoverBg: "hover:bg-amber-50 hover:border-l-amber-500",
      inStock: true,
      image: "https://images.unsplash.com/photo-1757332334678-e76d258c49c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=300",
    },
    {
      id: 2,
      name: t('product.freshSpinach'),
      price: 3.2,
      unit: t('product.bunch'),
      category: "sensitive",
      farm: "Yaşıl Vadi",
      farmerName: "Aynur Hüseynova",
      farmerVerified: true,
      location: "Şamaxı",
      shelfLife: t('category.sensitiveDays'),
      shelfColor: "bg-red-100 text-red-700 border-red-300",
      cardBorder: "border-l-4 border-l-red-400",
      hoverBg: "hover:bg-red-50 hover:border-l-red-500",
      inStock: true,
      image: "https://images.unsplash.com/photo-1634731201932-9bd92839bea2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=300",
    },
    {
      id: 3,
      name: t('product.freeRangeEggs'),
      price: 0.7,
      unit: t('product.piece'),
      category: "durable",
      farm: "Dağ Quşçuluğu",
      farmerName: "Tural Əliyev",
      farmerVerified: true,
      location: "Qəbələ",
      shelfLife: t('category.durableDays'),
      shelfColor: "bg-green-100 text-green-700 border-green-300",
      cardBorder: "border-l-4 border-l-green-500",
      hoverBg: "hover:bg-green-50 hover:border-l-green-600",
      inStock: true,
      image: "https://images.unsplash.com/photo-1585355611266-f01530088d60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=300",
    },
    {
      id: 4,
      name: t('product.sweetPeppers'),
      price: 5.5,
      unit: t('product.kg'),
      category: "medium",
      farm: "Quba Ferması",
      farmerName: "Ramiz Məmmədov",
      farmerVerified: true,
      location: "Quba Rayonu",
      shelfLife: t('category.mediumDays'),
      shelfColor: "bg-amber-100 text-amber-700 border-amber-300",
      cardBorder: "border-l-4 border-l-amber-400",
      hoverBg: "hover:bg-amber-50 hover:border-l-amber-500",
      inStock: true,
      image: "https://images.unsplash.com/photo-1775343963054-11247c9d4d30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=300",
    },
    {
      id: 5,
      name: t('product.freshButter'),
      price: 12.0,
      unit: "500q",
      category: "sensitive",
      farm: "Süd Ferması",
      farmerName: "Leyla Quliyeva",
      farmerVerified: false,
      location: "İsmayıllı",
      shelfLife: t('category.sensitiveDays'),
      shelfColor: "bg-red-100 text-red-700 border-red-300",
      cardBorder: "border-l-4 border-l-red-400",
      hoverBg: "hover:bg-red-50 hover:border-l-red-500",
      inStock: true,
      image: "https://images.unsplash.com/photo-1709177068446-d5c0f6d25c48?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=300",
    },
    {
      id: 6,
      name: t('product.potatoes'),
      price: 2.8,
      unit: t('product.kg'),
      category: "durable",
      farm: "Lənkəran Ferması",
      farmerName: "Vüsal Nəsirov",
      farmerVerified: true,
      location: "Lənkəran",
      shelfLife: t('category.durableDays'),
      shelfColor: "bg-green-100 text-green-700 border-green-300",
      cardBorder: "border-l-4 border-l-green-500",
      hoverBg: "hover:bg-green-50 hover:border-l-green-600",
      inStock: true,
      image: "https://images.unsplash.com/photo-1744659751904-3b2e5c095323?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=300",
    },
    {
      id: 7,
      name: t('product.strawberries'),
      price: 15.0,
      unit: t('product.kg'),
      category: "sensitive",
      farm: "Giləmeyvə Bağı",
      farmerName: "Tural Əliyev",
      farmerVerified: true,
      location: "Qəbələ",
      shelfLife: t('category.sensitiveDays'),
      shelfColor: "bg-red-100 text-red-700 border-red-300",
      cardBorder: "border-l-4 border-l-red-400",
      hoverBg: "hover:bg-red-50 hover:border-l-red-500",
      inStock: true,
      image: "https://images.unsplash.com/photo-1710528184650-fc75ae862c13?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=300",
    },
    {
      id: 8,
      name: t('product.cucumbers'),
      price: 3.5,
      unit: t('product.kg'),
      category: "medium",
      farm: "Yaşıl Vadi",
      farmerName: "Aynur Hüseynova",
      farmerVerified: true,
      location: "Şamaxı",
      shelfLife: t('category.mediumDays'),
      shelfColor: "bg-amber-100 text-amber-700 border-amber-300",
      cardBorder: "border-l-4 border-l-amber-400",
      hoverBg: "hover:bg-amber-50 hover:border-l-amber-500",
      inStock: true,
      image: "https://images.unsplash.com/photo-1725369865895-0dd4566c8864?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=300",
    },
  ];

  const filteredProducts = products
    .filter(p => selectedCategory === 'all' || p.category === selectedCategory)
    .filter(p => searchQuery === '' || p.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const addToCart = (productId: number) => {
    const product = customerProducts.find(item => item.id === productId);
    if (!product) return;

    addCartItem({
      id: product.id,
      productId: product.productId,
      price: product.price,
      unitKey: product.unitKey,
      category: product.category,
    });
    setCartItems(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1
    }));
    setTotalCartItems(getCartCount());
    toast.success(`${t(product.nameKey)} ${t('browse.inCart')}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <MobileHeader title={t('browse.title')} showBack showCart cartCount={totalCartItems} accentColor="green" />

      {/* Search and Filter */}
      <div className="bg-white px-4 pt-4 pb-3 border-b-4 border-green-100 sticky top-[57px] z-40 shadow-sm">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input 
            placeholder={t('browse.searchPlaceholder')}
            className="pl-10 border-2 border-gray-200 focus:border-green-400 rounded-xl"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>

        <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
          <TabsList className="w-full grid grid-cols-4 bg-green-50 p-1 rounded-xl border-2 border-green-100">
            <TabsTrigger value="all" className="text-xs rounded-lg data-[state=active]:bg-green-600 data-[state=active]:text-white">
              {t('browse.allProducts')}
            </TabsTrigger>
            <TabsTrigger value="sensitive" className="text-xs rounded-lg data-[state=active]:bg-red-500 data-[state=active]:text-white">
              1-2 {t('browse.days')}
            </TabsTrigger>
            <TabsTrigger value="medium" className="text-xs rounded-lg data-[state=active]:bg-amber-500 data-[state=active]:text-white">
              3-5 {t('browse.days')}
            </TabsTrigger>
            <TabsTrigger value="durable" className="text-xs rounded-lg data-[state=active]:bg-green-500 data-[state=active]:text-white">
              7-14 {t('browse.days')}
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Products Grid */}
      <div className="p-4">
        <div className="flex items-center gap-2 mb-4 px-1">
          <div className="w-1 h-5 bg-green-500 rounded-full" />
          <p className="text-sm text-gray-700 font-medium">
            {filteredProducts.length} {t('browse.available')}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {filteredProducts.map((product) => (
            <Card 
              key={product.id}
              className={`overflow-hidden transition-all duration-200 border-2 ${product.cardBorder} ${product.hoverBg} hover:shadow-xl hover:-translate-y-1 cursor-pointer`}
            >
              <div 
                className="relative h-36 overflow-hidden"
                onClick={() => navigate(`/customer/product/${product.id}`)}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2">
                  <Badge className={`text-xs border ${product.shelfColor} shadow-sm`}>
                    {product.shelfLife}
                  </Badge>
                </div>
              </div>
              
              <div className="p-3">
                <h4 className="text-sm font-semibold mb-1 text-gray-900 line-clamp-1">{product.name}</h4>

                {/* Farmer Info */}
                <div className="flex items-center gap-1 mb-1">
                  <div className="flex items-center gap-1 bg-gray-50 rounded-lg px-2 py-1 border border-gray-100">
                    <User className="w-3 h-3 text-gray-500 flex-shrink-0" />
                    <span className="text-xs text-gray-600 truncate max-w-[80px]">{product.farmerName}</span>
                    {product.farmerVerified && (
                      <ShieldCheck className="w-3 h-3 text-green-500 flex-shrink-0" />
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-1 text-xs text-gray-400 mb-2">
                  <MapPin className="w-3 h-3" />
                  <span className="truncate">{product.location}</span>
                </div>

                <div className="flex items-end justify-between">
                  <div>
                    <div className="text-base font-bold text-gray-900">₼{product.price}</div>
                    <div className="text-xs text-gray-400">{t('browse.per')} {product.unit}</div>
                  </div>
                  
                  <Button 
                    size="sm" 
                    className="h-8 w-8 p-0 bg-green-600 hover:bg-green-700 hover:scale-110 transition-all duration-150 rounded-xl shadow-md"
                    onClick={() => addToCart(product.id)}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                {cartItems[product.id] > 0 && (
                  <div className="mt-2 text-xs text-center bg-green-100 text-green-800 py-1.5 rounded-lg border border-green-200 font-medium flex items-center justify-center gap-1">
                    <ShoppingCart className="w-3 h-3" />
                    {cartItems[product.id]} {t('browse.inCart')}
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>

      <BottomNav type="customer" />
    </div>
  );
}
