import { ArrowLeft, ShoppingCart, User } from "lucide-react";
import { useNavigate } from "react-router";
import { Badge } from "./ui/badge";
import { LanguageSwitcher } from "./LanguageSwitcher";

interface MobileHeaderProps {
  title: string;
  showBack?: boolean;
  showCart?: boolean;
  cartCount?: number;
  onBackClick?: () => void;
  onProfileClick?: () => void;
  profilePath?: string;
  titlePath?: string;
  showProfile?: boolean;
  accentColor?: "green" | "amber" | "blue";
}

export function MobileHeader({
  title,
  showBack = false,
  showCart = false,
  cartCount = 0,
  onBackClick,
  onProfileClick,
  profilePath = "/customer/subscriptions?tab=profile",
  titlePath,
  showProfile = true,
  accentColor = "green",
}: MobileHeaderProps) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBackClick) onBackClick();
    else navigate(-1);
  };

  const handleProfile = () => {
    if (onProfileClick) onProfileClick();
    else navigate(profilePath);
  };

  const stripe = {
    green: "bg-gradient-to-r from-green-400 via-emerald-500 to-green-600",
    amber: "bg-gradient-to-r from-amber-400 via-orange-500 to-amber-600",
    blue: "bg-gradient-to-r from-blue-400 via-indigo-500 to-blue-600",
  };

  return (
    <header
      className="
        sticky top-0 z-50
        bg-white
        shadow-md
        border-b border-gray-100
      "
    >
      {/* MAIN ROW */}
      <div className="flex items-center justify-between px-4 py-3 gap-2">

        {/* LEFT */}
        <div className="flex items-center gap-2 flex-1 min-w-0">
          {showBack && (
            <button
              onClick={handleBack}
              className="p-2 rounded-xl hover:bg-gray-50 active:scale-95"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}

          {titlePath ? (
            <button
              type="button"
              onClick={() => navigate(titlePath)}
              className="truncate rounded-lg font-bold text-lg text-[#0F471A] hover:text-green-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
              aria-label={`${title}: rol seçiminə qayıt`}
            >
              {title}
            </button>
          ) : (
            <h2 className="font-bold text-lg text-[#0F471A] truncate">
              {title}
            </h2>
          )}
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-2 shrink-0">
          <LanguageSwitcher />

          {showCart && (
            <button
              className="p-2 relative rounded-xl hover:bg-gray-50"
              onClick={() => navigate("/customer/cart")}
            >
              <ShoppingCart className="w-5 h-5 text-gray-700" />

              {cartCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 min-w-5 px-1 text-xs bg-green-600 border-2 border-white">
                  {cartCount}
                </Badge>
              )}
            </button>
          )}

          {showProfile && (
            <button
              className="p-2 rounded-xl hover:bg-gray-50"
              onClick={handleProfile}
            >
              <User className="w-5 h-5 text-gray-700" />
            </button>
          )}
        </div>
      </div>

      {/* ACCENT STRIPE */}
      <div className={`h-1 w-full ${stripe[accentColor]}`} />
    </header>
  );
}
