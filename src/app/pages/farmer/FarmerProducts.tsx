import { useRef, useState } from "react";
import { MobileHeader } from "../../components/MobileHeader";
import { BottomNav } from "../../components/BottomNav";
import { Card } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Label } from "../../components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { 
  Plus,
  Edit,
  TrendingUp,
  Package,
  Camera,
  ImagePlus,
  MapPin
} from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";
import { categories, getProductsByCategory, getUnitName, type Language } from "../../data/productCatalog";
import { defaultFarmerProducts, FARMER_PRODUCTS_STORAGE_KEY, usePersistentState, type FarmerProduct } from "../../data/demoStore";
import { customerProducts } from "../../data/customerProducts";
import { useLocation, useNavigate } from "react-router";
import { farmerCollectionHub, localize } from "../../data/logisticsData";

export default function FarmerProducts() {
  const { t, language } = useLanguage();
  const lang = language as Language;
  const navigate = useNavigate();
  const routeLocation = useLocation();
  const restoredDraft = (routeLocation.state as { draftProduct?: Partial<FarmerProduct>; reopenAddDialog?: boolean } | null);
  const photoInputRef = useRef<HTMLInputElement>(null);
  const [showAddDialog, setShowAddDialog] = useState(Boolean(restoredDraft?.reopenAddDialog));
  const [selectedCategoryId, setSelectedCategoryId] = useState(restoredDraft?.draftProduct?.categoryId ?? 'vegetables');
  const [selectedProductId, setSelectedProductId] = useState(restoredDraft?.draftProduct?.productId ?? 'tomato');
  const productsInCategory = getProductsByCategory(selectedCategoryId);
  const [products] = usePersistentState(FARMER_PRODUCTS_STORAGE_KEY, defaultFarmerProducts);

  const [newProduct, setNewProduct] = useState({
    name: "",
    categoryId: restoredDraft?.draftProduct?.categoryId ?? "vegetables",
    productId: restoredDraft?.draftProduct?.productId ?? "tomato",
    category: restoredDraft?.draftProduct?.category ?? "medium",
    price: restoredDraft?.draftProduct?.price ? String(restoredDraft.draftProduct.price) : "",
    available: restoredDraft?.draftProduct?.available ? String(restoredDraft.draftProduct.available) : "",
    unit: restoredDraft?.draftProduct?.unit ?? "kq",
    message: restoredDraft?.draftProduct?.message ?? "",
    location: restoredDraft?.draftProduct?.location ?? "Qəbələ",
    image: restoredDraft?.draftProduct?.image ?? ""
  });

  const handleCategoryChange = (catId: string) => {
    setSelectedCategoryId(catId);
    const prods = getProductsByCategory(catId);
    const firstProd = prods[0];
    setSelectedProductId(firstProd?.id ?? '');
    setNewProduct(prev => ({
      ...prev,
      categoryId: catId,
      productId: firstProd?.id ?? '',
      unit: firstProd?.unitNames[lang] ?? 'kq'
    }));
  };

  const handleProductChange = (prodId: string) => {
    setSelectedProductId(prodId);
    const prod = productsInCategory.find(p => p.id === prodId);
    setNewProduct(prev => ({
      ...prev,
      productId: prodId,
      unit: prod?.unitNames[lang] ?? 'kq'
    }));
  };

  const continueToAnalysis = () => {
    const prod = getProductsByCategory(selectedCategoryId).find(p => p.id === selectedProductId);
    if (prod && newProduct.price && newProduct.available && newProduct.image) {
      navigate("/farmer/ai-analysis", {
        state: {
          draftProduct: {
            productId: prod.id,
            categoryId: selectedCategoryId,
            category: newProduct.category,
            price: parseFloat(newProduct.price),
            available: parseInt(newProduct.available),
            unit: prod.unitNames[lang],
            message: newProduct.message,
            location: newProduct.location,
            image: newProduct.image,
          }
        }
      });
    }
  };

  const handlePhoto = (file?: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const image = new Image();
      image.onload = () => {
        const maxSize = 720;
        const scale = Math.min(1, maxSize / Math.max(image.width, image.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(image.width * scale);
        canvas.height = Math.round(image.height * scale);
        canvas.getContext("2d")?.drawImage(image, 0, 0, canvas.width, canvas.height);
        setNewProduct(current => ({ ...current, image: canvas.toDataURL("image/jpeg", 0.72) }));
      };
      image.src = String(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const activeProducts = products.filter(p => p.status !== 'inactive');
  const totalRevenue = products.reduce((sum, p) => sum + (Math.min(p.available, p.demand) * p.price), 0);
  const renderProductCard = (product: FarmerProduct, demandView = false) => {
    const unit = getUnitName(product.productId, lang);
    const revenue = (Math.min(product.available, product.demand) * product.price).toFixed(2);
    const image = product.image.startsWith("data:")
      ? product.image
      : customerProducts.find(item => item.productId === product.productId)?.image ?? product.image;

    return (
      <Card key={product.id} className={`p-2 rounded-xl border-2 transition-all duration-200 hover:shadow-md ${
        product.status === 'low-stock'
          ? 'border-amber-200 hover:bg-amber-50'
          : 'border-green-200 hover:bg-green-50'
      }`}>
        <div className="flex gap-2.5">
          <img
            src={image}
            alt={getProductsByCategory(product.categoryId).find(p => p.id === product.productId)?.names[lang] ?? product.productId}
            className="w-20 h-20 object-cover rounded-xl flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-1">
              <div className="min-w-0">
                <h3 className="text-sm font-semibold text-gray-900 truncate">
                  {getProductsByCategory(product.categoryId ?? 'vegetables').find(p => p.id === product.productId)?.names[lang] ?? product.productId}
                </h3>
                <div className="text-xs text-gray-600 font-medium">₼{product.price} / {unit}</div>
              </div>
              <Button size="sm" variant="ghost" onClick={() => navigate(`/farmer/products/${product.id}/edit`)} className="hover:bg-gray-100 rounded-lg h-7 w-7 p-0 flex-shrink-0">
                <Edit className="w-3.5 h-3.5" />
              </Button>
            </div>

            <div className="flex items-center flex-wrap gap-x-2 gap-y-1 mt-1.5">
              <Badge className={`text-[10px] px-1.5 py-0 border ${
                product.status === 'low-stock'
                  ? 'bg-amber-100 text-amber-800 border-amber-300'
                  : 'bg-green-100 text-green-800 border-green-300'
              }`}>
                {product.status === 'low-stock' ? t('farmer.products.lowStock') : t(demandView ? 'farmer.products.ready' : 'farmer.products.activeStatus')}
              </Badge>
              <span className="text-[11px] text-gray-600">
                {t('farmer.products.available')}: <strong>{product.available} {unit}</strong>
              </span>
              <span className="text-[11px] text-gray-600">
                {t('farmer.products.demand')}: <strong>{product.demand} {unit}</strong>
              </span>
            </div>

            <div className="mt-1.5 text-xs font-semibold text-green-800">
              {demandView ? `${t('farmer.products.canFulfill')} ${Math.min(product.available, product.demand)} ${unit} · ` : ''}
              {t(demandView ? 'farmer.products.revenue' : 'farmer.products.potential')} ₼{revenue}
            </div>
          </div>
        </div>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <MobileHeader title={t('farmer.products.title')} profilePath="/farmer/profile" accentColor="amber" />

      {/* Stats Header */}
      <div className="bg-white px-4 py-4 border-b-4 border-amber-100">
        <div className="grid grid-cols-3 gap-3">
          <Card className="aspect-square p-2 flex flex-col items-center justify-center gap-2 text-center border-2 border-green-200 hover:shadow-md transition-all">
            <div className="text-2xl font-bold leading-none text-green-700">{activeProducts.length}</div>
            <div className="text-sm leading-tight text-gray-600 font-medium">{t('farmer.products.active')}</div>
          </Card>
          <Card className="aspect-square p-2 flex flex-col items-center justify-center gap-2 text-center border-2 border-amber-200 hover:shadow-md transition-all">
            <div className="text-2xl font-bold leading-none text-amber-700">₼{totalRevenue.toFixed(0)}</div>
            <div className="text-sm leading-tight text-gray-600 font-medium">{t('farmer.products.expectedRevenue')}</div>
          </Card>
          <Card className="aspect-square p-2 flex flex-col items-center justify-center gap-2 text-center border-2 border-blue-200 hover:shadow-md transition-all">
            <div className="text-2xl font-bold leading-none text-blue-700">
              {products.reduce((sum, p) => sum + Math.min(p.available, p.demand), 0)}
            </div>
            <div className="text-sm leading-tight text-gray-600 font-medium">{t('farmer.products.inDemand')}</div>
          </Card>
        </div>
      </div>

      {/* Add Product Button */}
      <div className="p-4">
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button className="w-full mb-4 bg-amber-600 hover:bg-amber-700 h-12 text-base font-semibold rounded-xl shadow-md hover:shadow-lg transition-all hover:scale-[1.01]">
              <Plus className="w-5 h-5 mr-2" />
              {t('farmer.products.addNew')}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t('farmer.products.addTitle')}</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              {/* Category selector */}
              <div>
                <Label htmlFor="category-select">{t('catalog.category')}</Label>
                <Select value={selectedCategoryId} onValueChange={handleCategoryChange}>
                  <SelectTrigger className="border-2 border-gray-200 rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(cat => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.emoji} {cat.names[lang]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Product selector filtered by category */}
              <div>
                <Label htmlFor="product-select">{t('catalog.product')}</Label>
                <Select value={selectedProductId} onValueChange={handleProductChange}>
                  <SelectTrigger className="border-2 border-gray-200 rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {getProductsByCategory(selectedCategoryId).map(prod => (
                      <SelectItem key={prod.id} value={prod.id}>
                        {prod.names[lang]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="shelf">{t('farmer.products.categoryLabel')}</Label>
                <Select 
                  value={newProduct.category}
                  onValueChange={(value) => setNewProduct({...newProduct, category: value})}
                >
                  <SelectTrigger className="border-2 border-gray-200 rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sensitive">{t('farmer.products.sensitive')}</SelectItem>
                    <SelectItem value="medium">{t('farmer.products.medium')}</SelectItem>
                    <SelectItem value="durable">{t('farmer.products.durable')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="price">{t('farmer.products.priceLabel')}</Label>
                  <Input 
                    id="price"
                    type="number"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                    placeholder="4.50"
                    className="border-2 border-gray-200 focus:border-amber-400 rounded-xl"
                  />
                </div>
                <div>
                  <Label>{t('farmer.products.unitLabel')}</Label>
                  <div className="border-2 border-gray-200 rounded-xl px-3 py-2 bg-gray-50 text-sm font-medium text-gray-700">
                    {getProductsByCategory(selectedCategoryId).find(p => p.id === selectedProductId)?.unitNames[lang] ?? 'kq'}
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="available">{t('farmer.products.quantityLabel')}</Label>
                <Input 
                  id="available"
                  type="number"
                  value={newProduct.available}
                  onChange={(e) => setNewProduct({...newProduct, available: e.target.value})}
                  placeholder="50"
                  className="border-2 border-gray-200 focus:border-amber-400 rounded-xl"
                />
              </div>

              <div>
                <Label htmlFor="message">{t('farmer.products.messageLabel')}</Label>
                <Textarea
                  id="message"
                  value={newProduct.message}
                  onChange={(e) => setNewProduct({...newProduct, message: e.target.value})}
                  placeholder={t('farmer.products.messagePlaceholder')}
                  className="border-2 border-gray-200 focus:border-amber-400 rounded-xl min-h-20"
                />
              </div>

              <div>
                <Label htmlFor="product-location">{t('ai.product.location')}</Label>
                <Input
                  id="product-location"
                  value={newProduct.location}
                  onChange={(e) => setNewProduct({...newProduct, location: e.target.value})}
                  placeholder="Qəbələ"
                  className="border-2 border-gray-200 focus:border-amber-400 rounded-xl"
                />
              </div>

              <div>
                <Label>{t('ai.product.photo')} *</Label>
                <input
                  ref={photoInputRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  className="hidden"
                  onChange={event => handlePhoto(event.target.files?.[0])}
                />
                <button
                  type="button"
                  onClick={() => photoInputRef.current?.click()}
                  className="mt-1 w-full overflow-hidden rounded-xl border-2 border-dashed border-amber-300 bg-amber-50 text-amber-800"
                >
                  {newProduct.image ? (
                    <img src={newProduct.image} alt={t('ai.product.photo')} className="h-28 w-full object-cover" />
                  ) : (
                    <span className="flex h-24 flex-col items-center justify-center gap-1 text-sm font-medium">
                      <ImagePlus className="h-6 w-6" />
                      {t('ai.product.addPhoto')}
                    </span>
                  )}
                </button>
                {!newProduct.image && <p className="mt-1 text-xs text-amber-700">{t('ai.product.photoRequired')}</p>}
              </div>

              <Button 
                className="w-full bg-amber-600 hover:bg-amber-700 h-12 text-base font-semibold rounded-xl" 
                onClick={continueToAnalysis}
                disabled={!newProduct.price || !newProduct.available || !newProduct.image}
              >
                <Camera className="w-5 h-5 mr-2" />
                {t('ai.product.continue')}
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Products List */}
        <Tabs defaultValue="all">
          <TabsList className="w-full mb-4 bg-amber-50 p-1 rounded-xl border-2 border-amber-100">
            <TabsTrigger value="all" className="flex-1 rounded-lg data-[state=active]:bg-amber-600 data-[state=active]:text-white font-medium">
              {t('farmer.products.allTab')}
            </TabsTrigger>
            <TabsTrigger value="in-demand" className="flex-1 rounded-lg data-[state=active]:bg-amber-600 data-[state=active]:text-white font-medium">
              {t('farmer.products.inDemandTab')}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-2 mt-0">
            {products.map(product => renderProductCard(product))}
          </TabsContent>

          <TabsContent value="in-demand" className="space-y-2 mt-0">
            <Card className="p-3 border-2 border-amber-200 border-l-4 border-l-amber-500 bg-amber-50">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 text-amber-700 shrink-0" />
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">{t("farmer.products.hubDemandTitle")}</h3>
                  <p className="text-xs text-gray-600 mt-1 leading-relaxed">{t("farmer.products.hubDemandDesc")}</p>
                  <p className="text-xs font-semibold text-amber-800 mt-1">{localize(farmerCollectionHub.name, lang)} · {localize(farmerCollectionHub.address, lang)}</p>
                </div>
              </div>
            </Card>
            {products.filter(p => p.demand > 0).map(product => renderProductCard(product, true))}
          </TabsContent>
        </Tabs>
      </div>

      <BottomNav type="farmer" />
    </div>
  );
}
