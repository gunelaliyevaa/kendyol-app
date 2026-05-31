import { useEffect, useState, type ElementType, type MouseEvent } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { MobileHeader } from "../../components/MobileHeader";
import { BottomNav } from "../../components/BottomNav";
import { Card } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "../../components/ui/tabs";
import {
  Search,
  Plus,
  MapPin,
  ShoppingCart,
  User,
  ShieldCheck
} from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";
import { toast } from "sonner";
import { customerProducts } from "../../data/customerProducts";
import {
  addCartItem,
  CART_STORAGE_KEY,
  defaultCartItems,
  getCartCount,
  readStoredValue,
  type CartItem
} from "../../data/demoStore";

type Product = {
  id: number;
  name: string;
  price: number;
  unit: string;
  category: string;
  farm: string;
  farmerName: string;
  farmerVerified: boolean;
  location: string;
  shelfLife: string;
  shelfColor: string;
  cardBorder: string;
  hoverBg: string;
  inStock: boolean;
  image: string;
};

function formatPrice(price: number) {
  return Number.isInteger(price) ? price.toFixed(0) : price.toFixed(1);
}

function getShelfAccent(category: string) {
  if (category === "sensitive") {
    return {
      border: "border-red-100",
      badge: "bg-red-50 text-red-700 border-red-200",
      glow: "from-red-500/20"
    };
  }

  if (category === "medium") {
    return {
      border: "border-amber-100",
      badge: "bg-amber-50 text-amber-700 border-amber-200",
      glow: "from-amber-500/20"
    };
  }

  return {
    border: "border-green-100",
    badge: "bg-green-50 text-green-700 border-green-200",
    glow: "from-green-500/20"
  };
}

function ProductCard({
  product,
  quantity,
  onOpen,
  onAdd
}: {
  product: Product;
  quantity: number;
  onOpen: () => void;
  onAdd: (event: MouseEvent<HTMLButtonElement>) => void;
}) {
  const accent = getShelfAccent(product.category);

  return (
    <Card
      onClick={onOpen}
      className={`group overflow-hidden cursor-pointer bg-white border ${accent.border} rounded-xl shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 active:scale-[0.99]`}
    >
      <div className="relative h-24 sm:h-28 overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        <div
          className={`absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t ${accent.glow} to-transparent`}
        />

        <Badge
          className={`absolute top-1.5 left-1.5 text-[10px] px-1.5 py-0.5 font-semibold border shadow-sm ${accent.badge}`}
        >
          {product.shelfLife}
        </Badge>

        {quantity > 0 && (
          <div className="absolute top-1.5 right-1.5 rounded-full bg-green-600 text-white text-[10px] font-bold px-1.5 py-0.5 shadow-md flex items-center gap-1">
            <ShoppingCart className="w-3 h-3" />
            {quantity}
          </div>
        )}
      </div>

      <div className="px-2.5 pt-0.5 pb-2.5">
        <h4 className="text-[13px] sm:text-sm font-semibold text-gray-900 leading-tight truncate">
          {product.name}
        </h4>

        <div className="mt-1 flex items-center gap-1 text-[11px] text-gray-500 min-w-0">
          <User className="w-3 h-3 text-gray-400 shrink-0" />
          <span className="truncate">{product.farmerName}</span>

          {product.farmerVerified && (
            <ShieldCheck className="w-3 h-3 text-green-600 shrink-0" />
          )}

          <span className="text-gray-300 shrink-0">•</span>

          <MapPin className="w-3 h-3 text-gray-400 shrink-0" />
          <span className="truncate">{product.location}</span>
        </div>

        <div className="mt-2 flex items-center justify-between gap-2">
          <div className="flex items-baseline gap-1 min-w-0">
            <span className="text-base font-bold text-gray-900">
              ₼{formatPrice(product.price)}
            </span>
            <span className="text-[11px] text-gray-500 truncate">
              / {product.unit}
            </span>
          </div>

          <Button
            size="sm"
            className="h-8 w-8 p-0 bg-green-600 hover:bg-green-700 rounded-lg shadow-sm hover:shadow-md hover:scale-105 transition-all duration-150 shrink-0"
            onClick={onAdd}
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}

export default function BrowseProducts() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [cartItems, setCartItems] = useState<Record<number, number>>(() =>
    Object.fromEntries(
      readStoredValue<CartItem[]>(CART_STORAGE_KEY, defaultCartItems).map(item => [
        item.id,
        item.quantity
      ])
    )
  );
  const [totalCartItems, setTotalCartItems] = useState(getCartCount);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const syncCart = () => {
      const storedCart = readStoredValue<CartItem[]>(CART_STORAGE_KEY, defaultCartItems);

      setCartItems(
        Object.fromEntries(storedCart.map(item => [item.id, item.quantity]))
      );

      setTotalCartItems(storedCart.reduce((sum, item) => sum + item.quantity, 0));
    };

    window.addEventListener("kendyol-cart-updated", syncCart);

    return () => window.removeEventListener("kendyol-cart-updated", syncCart);
  }, []);

  const products: Product[] = [
    {
      id: 1,
      name: t("product.organicTomatoes"),
      price: 4.5,
      unit: t("product.kg"),
      category: "medium",
      farm: "Quba Ferması",
      farmerName: "Ramiz Məmmədov",
      farmerVerified: true,
      location: "Quba Rayonu",
      shelfLife: t("category.mediumDays"),
      shelfColor: "bg-amber-100 text-amber-700 border-amber-300",
      cardBorder: "border-l-4 border-l-amber-400",
      hoverBg: "hover:bg-amber-50 hover:border-l-amber-500",
      inStock: true,
      image:
        "https://images.unsplash.com/photo-1561136594-7f68413baa99?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dG9tYXRvJTIwaGFydmVzdHxlbnwwfHwwfHx8MA%3D%3D"
    },
    {
      id: 2,
      name: t("product.freshSpinach"),
      price: 3.2,
      unit: t("product.bunch"),
      category: "sensitive",
      farm: "Yaşıl Vadi",
      farmerName: "Aynur Hüseynova",
      farmerVerified: true,
      location: "Şamaxı",
      shelfLife: t("category.sensitiveDays"),
      shelfColor: "bg-red-100 text-red-700 border-red-300",
      cardBorder: "border-l-4 border-l-red-400",
      hoverBg: "hover:bg-red-50 hover:border-l-red-500",
      inStock: true,
      image:
        "https://images.unsplash.com/photo-1576045057995-568f588f82fb?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3BpbmFjaHxlbnwwfHwwfHx8MA%3D%3D"
    },
    {
      id: 3,
      name: t("product.freeRangeEggs"),
      price: 0.7,
      unit: t("product.piece"),
      category: "durable",
      farm: "Dağ Quşçuluğu",
      farmerName: "Tural Əliyev",
      farmerVerified: true,
      location: "Qəbələ",
      shelfLife: t("category.durableDays"),
      shelfColor: "bg-green-100 text-green-700 border-green-300",
      cardBorder: "border-l-4 border-l-green-500",
      hoverBg: "hover:bg-green-50 hover:border-l-green-600",
      inStock: true,
      image:
        "https://images.unsplash.com/photo-1585355611266-f01530088d60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=300"
    },
    {
      id: 4,
      name: t("product.sweetPeppers"),
      price: 5.5,
      unit: t("product.kg"),
      category: "medium",
      farm: "Quba Ferması",
      farmerName: "Ramiz Məmmədov",
      farmerVerified: true,
      location: "Quba Rayonu",
      shelfLife: t("category.mediumDays"),
      shelfColor: "bg-amber-100 text-amber-700 border-amber-300",
      cardBorder: "border-l-4 border-l-amber-400",
      hoverBg: "hover:bg-amber-50 hover:border-l-amber-500",
      inStock: true,
      image:
        "https://images.unsplash.com/photo-1669863347362-1630fe821708?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHN3ZWV0JTIwcGVwcGVyfGVufDB8fDB8fHww"
    },
    {
      id: 5,
      name: t("product.freshButter"),
      price: 12.0,
      unit: "500q",
      category: "sensitive",
      farm: "Süd Ferması",
      farmerName: "Leyla Quliyeva",
      farmerVerified: false,
      location: "İsmayıllı",
      shelfLife: t("category.sensitiveDays"),
      shelfColor: "bg-red-100 text-red-700 border-red-300",
      cardBorder: "border-l-4 border-l-red-400",
      hoverBg: "hover:bg-red-50 hover:border-l-red-500",
      inStock: true,
      image:
        "https://media.istockphoto.com/id/1316327431/photo/homemade-purified-butter-ghee-in-jar-and-wooden-spoon.jpg?s=612x612&w=0&k=20&c=RGvFhBm583Or6clB3mjR21NMm_p1e145WMHcv_WLOKU="
    },
    {
      id: 6,
      name: t("product.potatoes"),
      price: 2.8,
      unit: t("product.kg"),
      category: "durable",
      farm: "Lənkəran Ferması",
      farmerName: "Vüsal Nəsirov",
      farmerVerified: true,
      location: "Lənkəran",
      shelfLife: t("category.durableDays"),
      shelfColor: "bg-green-100 text-green-700 border-green-300",
      cardBorder: "border-l-4 border-l-green-500",
      hoverBg: "hover:bg-green-50 hover:border-l-green-600",
      inStock: true,
      image:
        "https://images.unsplash.com/photo-1744659751904-3b2e5c095323?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=300"
    },
    {
      id: 7,
      name: t("product.strawberries"),
      price: 15.0,
      unit: t("product.kg"),
      category: "sensitive",
      farm: "Giləmeyvə Bağı",
      farmerName: "Tural Əliyev",
      farmerVerified: true,
      location: "Qəbələ",
      shelfLife: t("category.sensitiveDays"),
      shelfColor: "bg-red-100 text-red-700 border-red-300",
      cardBorder: "border-l-4 border-l-red-400",
      hoverBg: "hover:bg-red-50 hover:border-l-red-500",
      inStock: true,
      image:
        "https://media.istockphoto.com/id/2214139908/photo/containers-filled-with-ripe-strawberries-awaiting-purchase.jpg?s=612x612&w=0&k=20&c=bjI0ht4tIDDR37HM7QMHmASFw2dDc7aHAHR1jbt9nNI="
    },
    {
      id: 8,
      name: t("product.cucumbers"),
      price: 3.5,
      unit: t("product.kg"),
      category: "medium",
      farm: "Yaşıl Vadi",
      farmerName: "Aynur Hüseynova",
      farmerVerified: true,
      location: "Şamaxı",
      shelfLife: t("category.mediumDays"),
      shelfColor: "bg-amber-100 text-amber-700 border-amber-300",
      cardBorder: "border-l-4 border-l-amber-400",
      hoverBg: "hover:bg-amber-50 hover:border-l-amber-500",
      inStock: true,
      image:
        "https://img.freepik.com/premium-photo/many-green-ripe-cucumbers-box_457211-14126.jpg"
    }
  ];

  const filteredProducts = products
    .filter(product => selectedCategory === "all" || product.category === selectedCategory)
    .filter(product =>
      searchQuery === "" ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.farm.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.farmerName.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const addToCart = (productId: number) => {
    const product = customerProducts.find(item => item.id === productId);
    if (!product) return;

    addCartItem({
      id: product.id,
      productId: product.productId,
      price: product.price,
      unitKey: product.unitKey,
      category: product.category
    });

    setCartItems(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1
    }));

    setTotalCartItems(getCartCount());
    toast.success(`${t(product.nameKey)} ${t("browse.inCart")}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <MobileHeader
        title={t("browse.title")}
        showBack
        showCart
        cartCount={totalCartItems}
        accentColor="green"
      />

      {/* Search and Filter */}
      <div className="bg-white px-3 pt-3 pb-2 border-b border-green-100 sticky top-[57px] z-40 shadow-sm">
        <div className="relative mb-2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />

          <Input
            placeholder={t("browse.searchPlaceholder")}
            className="h-10 pl-9 pr-3 border border-gray-200 focus:border-green-400 rounded-xl bg-gray-50 focus:bg-white text-sm"
            value={searchQuery}
            onChange={event => setSearchQuery(event.target.value)}
          />
        </div>

        <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
          <TabsList className="w-full grid grid-cols-4 bg-green-50 p-1 rounded-xl border border-green-100 h-9">
            <TabsTrigger
              value="all"
              className="text-[10px] sm:text-xs rounded-lg data-[state=active]:bg-green-600 data-[state=active]:text-white"
            >
              {t("browse.allProducts")}
            </TabsTrigger>

            <TabsTrigger
              value="sensitive"
              className="text-[10px] sm:text-xs rounded-lg data-[state=active]:bg-red-500 data-[state=active]:text-white"
            >
              1-2 {t("browse.days")}
            </TabsTrigger>

            <TabsTrigger
              value="medium"
              className="text-[10px] sm:text-xs rounded-lg data-[state=active]:bg-amber-500 data-[state=active]:text-white"
            >
              3-5 {t("browse.days")}
            </TabsTrigger>

            <TabsTrigger
              value="durable"
              className="text-[10px] sm:text-xs rounded-lg data-[state=active]:bg-green-500 data-[state=active]:text-white"
            >
              7-14 {t("browse.days")}
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Products Grid */}
      <div className="px-3 py-3">
        <div className="flex items-center justify-between gap-3 mb-2 px-1">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-1 h-4 bg-green-500 rounded-full shrink-0" />
            <p className="text-xs text-gray-700 font-semibold">
              {filteredProducts.length} {t("browse.available")}
            </p>
          </div>

          {searchQuery && (
            <Button
              variant="ghost"
              size="sm"
              className="h-7 px-2 text-xs text-gray-500 hover:text-green-700 hover:bg-green-50"
              onClick={() => setSearchQuery("")}
            >
              Clear
            </Button>
          )}
        </div>

        <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              quantity={cartItems[product.id] || 0}
              onOpen={() => navigate(`/customer/product/${product.id}`)}
              onAdd={event => {
                event.stopPropagation();
                addToCart(product.id);
              }}
            />
          ))}
        </div>
      </div>

      <BottomNav type="customer" />
    </div>
  );
}