import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { AlertTriangle, MapPin, Save, Trash2, X } from "lucide-react";
import { toast } from "sonner";
import { MobileHeader } from "../../components/MobileHeader";
import { BottomNav } from "../../components/BottomNav";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Textarea } from "../../components/ui/textarea";
import { useLanguage } from "../../contexts/LanguageContext";
import {
  getProductName,
  getUnitName,
  type Language,
} from "../../data/productCatalog";
import { customerProducts } from "../../data/customerProducts";
import {
  defaultFarmerProducts,
  FARMER_PRODUCTS_STORAGE_KEY,
  FARMER_PRODUCTS_UPDATED_EVENT,
  usePersistentState,
  type FarmerProduct,
} from "../../data/demoStore";

type ProductForm = {
  category: FarmerProduct["category"];
  price: string;
  available: string;
  message: string;
  location: string;
};

export default function FarmerEditProduct() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { t, language } = useLanguage();
  const lang = language as Language;

  const [products, setProducts] = usePersistentState(
    FARMER_PRODUCTS_STORAGE_KEY,
    defaultFarmerProducts
  );

  const product = products.find((item) => item.id === Number(id));
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const [form, setForm] = useState<ProductForm>(() => ({
    category: product?.category ?? "medium",
    price: String(product?.price ?? ""),
    available: String(product?.available ?? ""),
    message: product?.message ?? "",
    location: product?.location ?? "Qəbələ",
  }));

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <MobileHeader
          title={t("farmer.products.editTitle")}
          showBack
          profilePath="/farmer/profile"
          accentColor="amber"
        />

        <div className="p-4">
          <Card className="p-5 border-2 border-gray-200 text-center text-sm text-gray-600">
            {t("farmer.products.notFound")}
          </Card>
        </div>
      </div>
    );
  }

  const image = product.image.startsWith("data:")
    ? product.image
    : customerProducts.find((item) => item.productId === product.productId)
      ?.image ?? product.image;

  const unit = getUnitName(product.productId, lang);

  const productCode = String(product.productId)
    .replace(/[^a-zA-Z0-9]/g, "")
    .slice(0, 3)
    .toUpperCase()
    .padEnd(3, "X");

  const checksumSource = `${product.id}-${product.productId}-${product.category}`;
  const checksum = checksumSource
    .split("")
    .reduce((sum, char, index) => sum + char.charCodeAt(0) * (index + 1), 0)
    .toString(36)
    .toUpperCase()
    .padStart(4, "0")
    .slice(-4);

  const elanId = `ELN-${productCode}-${String(product.id).padStart(
    4,
    "0"
  )}-${checksum}`;

  const updateForm = <K extends keyof ProductForm>(
    key: K,
    value: ProductForm[K]
  ) => {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const saveProduct = () => {
    const price = Number(form.price);
    const available = Number(form.available);

    const updatedProduct: FarmerProduct = {
      ...product,
      category: form.category,
      price,
      available,
      message: form.message.trim(),
      location: form.location.trim(),
      status:
        product.status === "inactive"
          ? product.status
          : available < product.demand
            ? "low-stock"
            : "active",
    };

    const updatedProducts = products.map((item) =>
      item.id === product.id ? updatedProduct : item
    );

    localStorage.setItem(
      FARMER_PRODUCTS_STORAGE_KEY,
      JSON.stringify(updatedProducts)
    );

    setProducts(updatedProducts);
    window.dispatchEvent(new Event(FARMER_PRODUCTS_UPDATED_EVENT));

    toast.success(t("farmer.products.updated"));
    navigate("/farmer/products");
  };

  const deleteProduct = () => {
    const updatedProducts = products.filter((item) => item.id !== product.id);

    localStorage.setItem(
      FARMER_PRODUCTS_STORAGE_KEY,
      JSON.stringify(updatedProducts)
    );

    setProducts(updatedProducts);
    window.dispatchEvent(new Event(FARMER_PRODUCTS_UPDATED_EVENT));

    navigate("/farmer/products");
  };

  const isFormValid =
    Number(form.price) > 0 &&
    Number(form.available) >= 0 &&
    Boolean(form.location.trim());

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <MobileHeader
        title={t("farmer.products.editTitle")}
        showBack
        profilePath="/farmer/profile"
        accentColor="amber"
      />

      <div className="p-4 max-w-md mx-auto space-y-4">
        {/* Compact Header */}
        <Card className="p-3 border border-amber-200 bg-gradient-to-br from-white to-amber-50 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-amber-200 bg-amber-50 shrink-0">
              <img
                src={image}
                alt={getProductName(product.productId, lang)}
                className="w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-amber-300/10 pointer-events-none" />
            </div>

            <div className="min-w-0 flex-1">
              <h1 className="font-bold text-base text-gray-900 truncate">
                {getProductName(product.productId, lang)}
              </h1>

              <div className="mt-1">
                <span className="inline-flex max-w-full px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full text-xs font-semibold truncate">
                  Elan ID: {elanId}
                </span>
              </div>
            </div>
          </div>
        </Card>

        {/* Form */}
        {/* Form */}
        <Card className="p-4 border border-gray-200 bg-white shadow-sm">
          <div className="grid grid-cols-2 gap-x-3 gap-y-3">
            {/* Price */}
            <div className="h-[86px] min-w-0 flex flex-col">
              <Label
                htmlFor="edit-price"
                className="h-5 flex items-center text-xs font-medium text-gray-700"
              >
                {t("farmer.products.priceLabel")}
              </Label>

              <div className="relative mt-1 h-12 w-full">
                <Input
                  id="edit-price"
                  type="number"
                  min="0.01"
                  step="0.01"
                  inputMode="decimal"
                  value={form.price}
                  onChange={(event) => updateForm("price", event.target.value)}
                  className="h-12 w-full rounded-2xl border-2 border-gray-200 bg-white pr-10 text-sm focus-visible:border-amber-400 focus-visible:ring-amber-100"
                />

                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-gray-500">
                  ₼
                </span>
              </div>
            </div>

            {/* Location */}
            <div className="h-[86px] min-w-0 flex flex-col">
              <Label
                htmlFor="edit-location"
                className="h-5 flex items-center gap-1 text-xs font-medium text-gray-700"
              >
                <MapPin className="w-3 h-3 text-gray-500 shrink-0" />
                <span className="truncate">{t("ai.product.location")}</span>
              </Label>

              <Input
                id="edit-location"
                value={form.location}
                onChange={(event) => updateForm("location", event.target.value)}
                className="mt-1 h-12 w-full rounded-2xl border-2 border-gray-200 bg-white text-sm focus-visible:border-amber-400 focus-visible:ring-amber-100"
              />
            </div>

            {/* Category */}
            <div className="h-[86px] min-w-0 flex flex-col">
              <Label className="h-5 flex items-center text-xs font-medium text-gray-700">
                {t("farmer.products.categoryLabel")}
              </Label>

              <Select
                value={form.category}
                onValueChange={(value) =>
                  updateForm("category", value as ProductForm["category"])
                }
              >
                <SelectTrigger className="mt-1 h-12 w-full rounded-2xl border-2 border-gray-200 bg-white text-sm focus:border-amber-400 data-[size=default]:h-12">
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="sensitive">
                    {t("farmer.products.sensitive")}
                  </SelectItem>

                  <SelectItem value="medium">
                    {t("farmer.products.medium")}
                  </SelectItem>

                  <SelectItem value="durable">
                    {t("farmer.products.durable")}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Quantity */}
            <div className="h-[86px] min-w-0 flex flex-col">
              <Label
                htmlFor="edit-available"
                className="h-5 flex items-center text-xs font-medium text-gray-700"
              >
                {t("farmer.products.quantityLabel")}
              </Label>

              <div className="relative mt-1 h-12 w-full">
                <Input
                  id="edit-available"
                  type="number"
                  min="0"
                  step="1"
                  inputMode="numeric"
                  value={form.available}
                  onChange={(event) => updateForm("available", event.target.value)}
                  className="h-12 w-full rounded-2xl border-2 border-gray-200 bg-white pr-16 text-sm focus-visible:border-amber-400 focus-visible:ring-amber-100"
                />

                <span className="absolute right-3 top-1/2 -translate-y-1/2 max-w-[46px] truncate text-sm font-semibold text-gray-500">
                  {unit}
                </span>
              </div>
            </div>
          </div>

          {/* Message */}
          <div className="mt-1 flex flex-col">
            <Label
              htmlFor="edit-message"
              className="h-5 flex items-center text-xs font-medium text-gray-700"
            >
              {t("farmer.products.messageLabel")}
            </Label>

            <Textarea
              id="edit-message"
              value={form.message}
              onChange={(event) => updateForm("message", event.target.value)}
              placeholder={t("farmer.products.messagePlaceholder")}
              rows={3}
              className="mt-1 resize-none rounded-2xl border-2 border-gray-200 bg-white text-sm focus-visible:border-amber-400 focus-visible:ring-amber-100"
            />
          </div>
        </Card>

        {/* Buttons */}
        <Button
          onClick={saveProduct}
          disabled={!isFormValid}
          className="w-full h-11 bg-amber-600 hover:bg-amber-700 rounded-xl font-semibold"
        >
          <Save className="w-5 h-5 mr-2" />
          {t("farmer.products.save")}
        </Button>

        <Button
          onClick={() => setDeleteDialogOpen(true)}
          variant="outline"
          className="w-full h-11 border-2 border-red-200 text-red-700 hover:bg-red-50 hover:text-red-800 rounded-xl font-semibold"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          {t("farmer.products.delete")}
        </Button>
      </div>

      {/* Delete Modal */}
      {deleteDialogOpen && (
        <div className="fixed inset-0 z-[1000]">
          <div
            className="absolute inset-0 bg-black/45"
            onClick={() => setDeleteDialogOpen(false)}
          />

          <div className="absolute left-0 right-0 top-[72px] bottom-[calc(5.5rem+env(safe-area-inset-bottom))] flex items-center justify-center px-4">
            <div className="relative w-full max-w-[360px] rounded-2xl bg-white shadow-2xl border border-gray-100 overflow-hidden">
              <div className="px-4 pt-4 pb-3 border-b border-gray-100">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                      <AlertTriangle className="w-5 h-5 text-red-500" />
                    </div>

                    <h3 className="text-base font-semibold text-gray-900 leading-tight">
                      {t("farmer.products.deleteTitle")}
                    </h3>
                  </div>

                  <button
                    onClick={() => setDeleteDialogOpen(false)}
                    className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 shrink-0"
                  >
                    <X className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              </div>

              <div className="px-4 py-4">
                <p className="text-center text-xs text-gray-500 mb-4 leading-relaxed">
                  {t("farmer.products.deleteDesc")}
                </p>

                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    className="h-10 rounded-xl border-gray-200 text-gray-700"
                    onClick={() => setDeleteDialogOpen(false)}
                  >
                    {t("farmer.products.cancel")}
                  </Button>

                  <Button
                    className="h-10 rounded-xl bg-red-500 hover:bg-red-600 text-white"
                    onClick={deleteProduct}
                  >
                    {t("farmer.products.delete")}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <BottomNav type="farmer" />
    </div>
  );
}
