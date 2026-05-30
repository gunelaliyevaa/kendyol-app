import { useNavigate } from "react-router";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function ScreenShowcase() {
  const navigate = useNavigate();

  const screens = {
    customer: [
      { name: "Home", path: "/customer", description: "Dashboard with countdown, subscriptions preview, categories" },
      { name: "Browse Products", path: "/customer/browse", description: "Filterable product grid by shelf life" },
      { name: "Product Detail", path: "/customer/product/1", description: "Product info, farm traceability, delivery journey" },
      { name: "Subscriptions", path: "/customer/subscriptions", description: "Manage subscription boxes, customize items" },
      { name: "Cart", path: "/customer/cart", description: "Cart with delivery options and savings display" },
      { name: "Order Tracking", path: "/customer/tracking", description: "Multi-stage delivery tracking" },
    ],
    farmer: [
      { name: "Dashboard", path: "/farmer", description: "Stats, pickup details, quick actions" },
      { name: "Products", path: "/farmer/products", description: "Product management, add product, demand visibility" },
      { name: "Deliveries", path: "/farmer/deliveries", description: "Delivered products, buyers and assigned drivers" },
      { name: "Earnings", path: "/farmer/earnings", description: "Transaction history, payment tracking" },
      { name: "Profile", path: "/farmer/profile", description: "Farmer profile information and editing" },
      { name: "AI Product Analysis", path: "/farmer/ai-analysis", description: "Second step after adding a product: photo quality, freshness risk, and sale-readiness analysis" },
    ],
    driver: [
      { name: "Dashboard", path: "/driver", description: "Active delivery workflow and driver profile" },
      { name: "Available Routes", path: "/driver/routes", description: "Routes available for drivers to claim" },
    ],
    admin: [
      { name: "Dashboard", path: "/admin", description: "Operations overview, batch progress, alerts" },
      { name: "Orders", path: "/admin/orders", description: "Order log with route and batch IDs" },
      { name: "Routes", path: "/admin/routes", description: "Active and scheduled delivery routes" },
      { name: "Vehicles", path: "/admin/vehicles", description: "Drivers, vehicles, availability and GPS tracking" },
      { name: "Storage", path: "/admin/storage", description: "Cold storage monitoring, temperature tracking" },
      { name: "AI Route Planner", path: "/admin/ai-route-planner", description: "Compare and approve freshness-aware weekly route recommendations" },
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <Button 
          variant="ghost" 
          className="mb-4"
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <div className="mb-8">
          <h1 className="text-4xl mb-2">KəndYol Screen Map</h1>
          <p className="text-gray-600">Complete interface overview for all user types</p>
        </div>

        {/* Driver Screens */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-indigo-600 rounded-xl p-2">
              <span className="text-white text-sm px-2">Driver</span>
            </div>
            <h2 className="text-2xl">Driver Interface</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {screens.driver.map((screen) => (
              <Card 
                key={screen.path}
                className="p-6 cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => navigate(screen.path)}
              >
                <Badge className="mb-3 bg-indigo-600">Screen</Badge>
                <h3 className="text-lg mb-2">{screen.name}</h3>
                <p className="text-sm text-gray-600">{screen.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Customer Screens */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-green-600 rounded-xl p-2">
              <span className="text-white text-sm px-2">Customer</span>
            </div>
            <h2 className="text-2xl">Customer Interface</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {screens.customer.map((screen) => (
              <Card 
                key={screen.path}
                className="p-6 cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => navigate(screen.path)}
              >
                <Badge className="mb-3 bg-green-600">Screen</Badge>
                <h3 className="text-lg mb-2">{screen.name}</h3>
                <p className="text-sm text-gray-600">{screen.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Farmer Screens */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-amber-600 rounded-xl p-2">
              <span className="text-white text-sm px-2">Farmer</span>
            </div>
            <h2 className="text-2xl">Farmer Interface</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {screens.farmer.map((screen) => (
              <Card 
                key={screen.path}
                className="p-6 cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => navigate(screen.path)}
              >
                <Badge className="mb-3 bg-amber-600">Screen</Badge>
                <h3 className="text-lg mb-2">{screen.name}</h3>
                <p className="text-sm text-gray-600">{screen.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Admin Screens */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-blue-600 rounded-xl p-2">
              <span className="text-white text-sm px-2">Admin</span>
            </div>
            <h2 className="text-2xl">Admin Interface</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {screens.admin.map((screen) => (
              <Card 
                key={screen.path}
                className="p-6 cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => navigate(screen.path)}
              >
                <Badge className="mb-3 bg-blue-600">Screen</Badge>
                <h3 className="text-lg mb-2">{screen.name}</h3>
                <p className="text-sm text-gray-600">{screen.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Summary */}
        <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50">
          <h3 className="text-xl mb-4">Design Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl mb-2">20</div>
              <div className="text-sm text-gray-600">Total Screens</div>
            </div>
            <div>
              <div className="text-3xl mb-2">4</div>
              <div className="text-sm text-gray-600">User Types</div>
            </div>
            <div>
              <div className="text-3xl mb-2">100%</div>
              <div className="text-sm text-gray-600">Mobile-First</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
