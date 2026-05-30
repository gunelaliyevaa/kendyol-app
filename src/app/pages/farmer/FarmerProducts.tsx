import { useState } from "react";
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
  CheckCircle2,
  AlertCircle,
  BrainCircuit
} from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";
import { categories, getProductsByCategory, getUnitName, type Language } from "../../data/productCatalog";
import { defaultFarmerProducts, FARMER_PRODUCTS_STORAGE_KEY, usePersistentState } from "../../data/demoStore";
import { toast } from "sonner";
import { useNavigate } from "react-router";

export default function FarmerProducts() {
  const { t, language } = useLanguage();
  const lang = language as Language;
  const navigate = useNavigate();
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState('vegetables');
  const [selectedProductId, setSelectedProductId] = useState('tomato');
  const productsInCategory = getProductsByCategory(selectedCategoryId);
  const [products] = usePersistentState(FARMER_PRODUCTS_STORAGE_KEY, defaultFarmerProducts);

  const [newProduct, setNewProduct] = useState({
    name: "",
    categoryId: "vegetables",
    productId: "tomato",
    category: "medium",
    price: "",
    available: "",
    unit: "kq",
    message: "",
    location: "Qəbələ"
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
    if (prod && newProduct.price && newProduct.available) {
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
            image: prod.image ?? "https://images.unsplash.com/photo-1557844352-761f2565b576?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200",
          }
        }
      });
    }
  };

  const activeProducts = products.filter(p => p.status !== 'inactive');
  const totalRevenue = products.reduce((sum, p) => sum + (Math.min(p.available, p.demand) * p.price), 0);

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <MobileHeader title={t('farmer.products.title')} showBack profilePath="/farmer/profile" accentColor="amber" />

      {/* Stats Header */}
      <div className="bg-white px-6 py-6 border-b-4 border-amber-100">
        <div className="grid grid-cols-3 gap-3">
          <Card className="p-4 text-center border-2 border-green-200 hover:shadow-md transition-all">
            <div className="text-2xl font-bold mb-1 text-green-700">{activeProducts.length}</div>
            <div className="text-xs text-gray-600 font-medium">{t('farmer.products.active')}</div>
          </Card>
          <Card className="p-4 text-center border-2 border-amber-200 hover:shadow-md transition-all">
            <div className="text-2xl font-bold mb-1 text-amber-700">₼{totalRevenue.toFixed(0)}</div>
            <div className="text-xs text-gray-600 font-medium">{t('farmer.products.expectedRevenue')}</div>
          </Card>
          <Card className="p-4 text-center border-2 border-blue-200 hover:shadow-md transition-all">
            <div className="text-2xl font-bold mb-1 text-blue-700">
              {products.reduce((sum, p) => sum + Math.min(p.available, p.demand), 0)}
            </div>
            <div className="text-xs text-gray-600 font-medium">{t('farmer.products.inDemand')}</div>
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

              <Button 
                className="w-full bg-amber-600 hover:bg-amber-700 h-12 text-base font-semibold rounded-xl" 
                onClick={continueToAnalysis}
              >
                <BrainCircuit className="w-5 h-5 mr-2" />
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

          <TabsContent value="all" className="space-y-3 mt-0">
            {products.map((product) => (
              <Card key={product.id} className={`overflow-hidden border-2 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 ${
                product.status === 'low-stock' 
                  ? 'border-amber-200 border-l-4 border-l-amber-500 hover:bg-amber-50' 
                  : 'border-green-200 border-l-4 border-l-green-500 hover:bg-green-50'
              }`}>
                <div className="flex gap-0">
                  <div className="w-24 flex-shrink-0">
                    <img
                      src={product.image}
                      alt={getProductsByCategory(product.categoryId).find(p => p.id === product.productId)?.names[lang] ?? product.productId}
                      className="w-24 h-full object-cover min-h-[80px]"
                    />
                  </div>
                  <div className="flex-1 p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{getProductsByCategory(product.categoryId ?? 'vegetables').find(p => p.id === product.productId)?.names[lang] ?? product.productId}</h3>
                        <div className="text-sm text-gray-600 font-medium">₼{product.price} / {getUnitName(product.productId, lang)}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        {product.status === 'active' ? (
                          <Badge className="bg-green-100 text-green-800 border border-green-300 font-semibold text-xs">
                            <CheckCircle2 className="w-3 h-3 mr-1" />{t('farmer.products.activeStatus')}
                          </Badge>
                        ) : product.status === 'low-stock' ? (
                          <Badge className="bg-amber-100 text-amber-800 border border-amber-300 font-semibold text-xs">
                            <AlertCircle className="w-3 h-3 mr-1" />{t('farmer.products.lowStock')}
                          </Badge>
                        ) : null}
                        <Button size="sm" variant="ghost" onClick={() => toast.info(t('common.detailsOpened'))} className="hover:bg-gray-100 rounded-xl transition-all h-7 w-7 p-0">
                          <Edit className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mb-2">
                      <div className="bg-gray-50 rounded-lg p-2 border border-gray-200">
                        <div className="text-xs text-gray-500 font-medium">{t('farmer.products.available')}</div>
                        <div className="text-sm font-semibold text-gray-900">{product.available} {getUnitName(product.productId, lang)}</div>
                      </div>
                      <div className="bg-green-50 rounded-lg p-2 border border-green-200">
                        <div className="text-xs text-gray-500 font-medium">{t('farmer.products.demand')}</div>
                        <div className="text-sm font-semibold text-green-700">{product.demand} {getUnitName(product.productId, lang)}</div>
                      </div>
                    </div>

                    {product.demand > 0 && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-2">
                        <div className="text-xs text-green-900 font-semibold">
                          {t('farmer.products.potential')} ₼{(Math.min(product.available, product.demand) * product.price).toFixed(2)}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="in-demand" className="space-y-3 mt-0">
            {products.filter(p => p.demand > 0).map((product) => (
              <Card key={product.id} className={`overflow-hidden border-2 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 ${
                product.status === 'low-stock' 
                  ? 'border-amber-200 border-l-4 border-l-amber-500 hover:bg-amber-50' 
                  : 'border-green-200 border-l-4 border-l-green-500 hover:bg-green-50'
              }`}>
                <div className="flex gap-0">
                  <div className="w-24 flex-shrink-0">
                    <img
                      src={product.image}
                      alt={getProductsByCategory(product.categoryId).find(p => p.id === product.productId)?.names[lang] ?? product.productId}
                      className="w-24 h-full object-cover min-h-[80px]"
                    />
                  </div>
                  <div className="flex-1 p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{getProductsByCategory(product.categoryId ?? 'vegetables').find(p => p.id === product.productId)?.names[lang] ?? product.productId}</h3>
                        <div className="text-sm text-gray-600 font-medium">₼{product.price} / {getUnitName(product.productId, lang)}</div>
                      </div>
                      {product.status === 'low-stock' ? (
                        <Badge className="bg-amber-100 text-amber-800 border border-amber-300 font-semibold text-xs">
                          <AlertCircle className="w-3 h-3 mr-1" />{t('farmer.products.lowStock')}
                        </Badge>
                      ) : (
                        <Badge className="bg-green-100 text-green-800 border border-green-300 font-semibold text-xs">
                          <CheckCircle2 className="w-3 h-3 mr-1" />{t('farmer.products.ready')}
                        </Badge>
                      )}
                    </div>

                    <div className="bg-gray-50 rounded-lg p-2 mb-2 border border-gray-200 space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-500 font-medium">{t('farmer.products.demand')}:</span>
                        <span className="font-semibold text-gray-900">{product.demand} {getUnitName(product.productId, lang)}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-500 font-medium">{t('farmer.products.stockAvailable')}</span>
                        <span className="font-semibold text-gray-900">{product.available} {getUnitName(product.productId, lang)}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs pt-1 border-t border-gray-200">
                        <span className="text-gray-500 font-medium">{t('farmer.products.canFulfill')}</span>
                        <span className="font-bold text-green-700">{Math.min(product.available, product.demand)} {getUnitName(product.productId, lang)}</span>
                      </div>
                    </div>

                    <div className="text-base font-bold text-gray-900 bg-green-50 rounded-lg p-2 text-center border border-green-200">
                      {t('farmer.products.revenue')} ₼{(Math.min(product.available, product.demand) * product.price).toFixed(2)}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>

      <BottomNav type="farmer" />
    </div>
  );
}
