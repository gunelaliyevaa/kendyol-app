import { createBrowserRouter } from "react-router";
import Root from "./layouts/Root";
import CustomerHome from "./pages/customer/CustomerHome";
import BrowseProducts from "./pages/customer/BrowseProducts";
import ProductDetail from "./pages/customer/ProductDetail";
import Subscriptions from "./pages/customer/Subscriptions";
import Cart from "./pages/customer/Cart";
import OrderTracking from "./pages/customer/OrderTracking";
import FarmerDashboard from "./pages/farmer/FarmerDashboard";
import FarmerProducts from "./pages/farmer/FarmerProducts";
import FarmerEditProduct from "./pages/farmer/FarmerEditProduct";
import FarmerEarnings from "./pages/farmer/FarmerEarnings";
import FarmerDeliveries from "./pages/farmer/FarmerDeliveries";
import FarmerProfile from "./pages/farmer/FarmerProfile";
import FarmerAIAnalysis from "./pages/farmer/FarmerAIAnalysis";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminRoutes from "./pages/admin/AdminRoutes";
import AdminVehicles from "./pages/admin/AdminVehicles";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminStorage from "./pages/admin/AdminStorage";
import AdminAIRoutePlanner from "./pages/admin/AdminAIRoutePlanner";
import AdminProfile from "./pages/admin/AdminProfile";
import DriverPanel from "./pages/driver/DriverPanel";
import DriverRoutes from "./pages/driver/DriverRoutes";
import DriverProfile from "./pages/driver/DriverProfile";
import DriverCollections from "./pages/driver/DriverCollections";
import UserTypeSelector from "./pages/UserTypeSelector";
import UXDocumentation from "./pages/UXDocumentation";
import ScreenShowcase from "./pages/ScreenShowcase";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: UserTypeSelector },
      { path: "documentation", Component: UXDocumentation },
      { path: "screens", Component: ScreenShowcase },
      
      // Customer routes
      { path: "customer", Component: CustomerHome },
      { path: "customer/browse", Component: BrowseProducts },
      { path: "customer/product/:id", Component: ProductDetail },
      { path: "customer/subscriptions", Component: Subscriptions },
      { path: "customer/cart", Component: Cart },
      { path: "customer/tracking", Component: OrderTracking },
      
      // Farmer routes
      { path: "farmer", Component: FarmerDashboard },
      { path: "farmer/products", Component: FarmerProducts },
      { path: "farmer/products/:id/edit", Component: FarmerEditProduct },
      { path: "farmer/deliveries", Component: FarmerDeliveries },
      { path: "farmer/earnings", Component: FarmerEarnings },
      { path: "farmer/profile", Component: FarmerProfile },
      { path: "farmer/ai-analysis", Component: FarmerAIAnalysis },
      
      // Driver routes
      { path: "driver", Component: DriverPanel },
      { path: "driver/routes", Component: DriverRoutes },
      { path: "driver/profile", Component: DriverProfile },
      { path: "driver/collections", Component: DriverCollections },
      
      // Admin routes
      { path: "admin", Component: AdminDashboard },
      { path: "admin/orders", Component: AdminOrders },
      { path: "admin/routes", Component: AdminRoutes },
      { path: "admin/vehicles", Component: AdminVehicles },
      { path: "admin/storage", Component: AdminStorage },
      { path: "admin/ai-route-planner", Component: AdminAIRoutePlanner },
      { path: "admin/profile", Component: AdminProfile },
    ],
  },
]);
