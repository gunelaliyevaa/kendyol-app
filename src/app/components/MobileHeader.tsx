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
  showProfile = true,
  accentColor = "green"
}: MobileHeaderProps) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBackClick) {
      onBackClick();
    } else {
      navigate(-1);
    }
  };

  const handleProfile = () => {
    if (onProfileClick) {
      onProfileClick();
    } else {
      navigate(profilePath);
    }
  };

  const borderColors = {
    green: "border-b-[4px] border-green-500",
    amber: "border-b-[4px] border-amber-500",
    blue: "border-b-[4px] border-blue-500",
  };

  const titleAccent = {
    green: "text-green-700",
    amber: "text-amber-700",
    blue: "text-blue-700",
  };

  return (
    <header className={`sticky top-0 z-50 bg-white ${borderColors[accentColor]} shadow-md`}>
      {/* Top accent stripe */}
      <div className={`h-1 w-full ${
        accentColor === 'green' ? 'bg-gradient-to-r from-green-400 via-emerald-500 to-green-600' :
        accentColor === 'amber' ? 'bg-gradient-to-r from-amber-400 via-orange-500 to-amber-600' :
        'bg-gradient-to-r from-blue-400 via-indigo-500 to-blue-600'
      }`} />
      <div className="flex items-center justify-between px-4 py-3.5">
        <div className="flex items-center gap-3 flex-1">
          {showBack && (
            <button 
              onClick={handleBack} 
              className={`p-2 -ml-2 rounded-xl transition-all hover:scale-105 active:scale-95 ${
                accentColor === 'green' ? 'hover:bg-green-50 text-green-700' :
                accentColor === 'amber' ? 'hover:bg-amber-50 text-amber-700' :
                'hover:bg-blue-50 text-blue-700'
              }`}
              aria-label="Go back"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
          )}
          <h1 className={`text-xl font-semibold truncate ${titleAccent[accentColor]}`}>{title}</h1>
        </div>
        
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          
          {showCart && (
            <button 
              className={`p-2 relative rounded-xl transition-all hover:scale-105 active:scale-95 ${
                accentColor === 'green' ? 'hover:bg-green-50' : 'hover:bg-gray-50'
              }`}
              onClick={() => navigate('/customer/cart')}
              aria-label="Shopping cart"
            >
              <ShoppingCart className="w-6 h-6 text-gray-700" />
              {cartCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-6 min-w-6 flex items-center justify-center p-0 text-sm font-semibold bg-green-600 border-2 border-white">
                  {cartCount}
                </Badge>
              )}
            </button>
          )}
          {showProfile && (
            <button 
              className="p-2 hover:bg-gray-50 rounded-xl transition-all hover:scale-105 active:scale-95"
              onClick={handleProfile}
              aria-label="User profile"
            >
              <User className="w-6 h-6 text-gray-700" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
