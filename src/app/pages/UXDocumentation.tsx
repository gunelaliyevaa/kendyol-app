import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { 
  CheckCircle2,
  Users,
  ShoppingBag,
  Sprout,
  Settings,
  Clock,
  MapPin,
  TrendingDown,
  Leaf,
  ArrowLeft
} from "lucide-react";
import { useNavigate } from "react-router";

export default function UXDocumentation() {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gray-50 p-6 max-w-4xl mx-auto">
      <Button 
        variant="ghost" 
        className="mb-4"
        onClick={() => navigate('/')}
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Home
      </Button>
      
      <div className="mb-8">
        <h1 className="text-4xl mb-2">KəndYol</h1>
        <p className="text-xl text-gray-600">Farm-to-City Agricultural Marketplace</p>
        <p className="text-gray-500 mt-2">UX/UI Design Documentation</p>
      </div>

      {/* Core Concept */}
      <Card className="p-6 mb-6">
        <h2 className="text-2xl mb-4">Core Concept</h2>
        <p className="text-gray-700 mb-4">
          KəndYol is a batch-based logistics platform that connects rural farmers with urban customers. 
          Unlike daily delivery services, it aggregates orders and delivers in scheduled batches, reducing 
          costs and supporting sustainable farming practices.
        </p>
        
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h3 className="mb-3">Delivery Schedule Example</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-3">
              <Badge>Monday</Badge>
              <span>Order collection closes at 11:59 PM</span>
            </div>
            <div className="flex items-center gap-3">
              <Badge>Tuesday</Badge>
              <span>Products shipped from rural hubs to city</span>
            </div>
            <div className="flex items-center gap-3">
              <Badge>Wednesday</Badge>
              <span>Delivery to customers</span>
            </div>
          </div>
        </div>
      </Card>

      {/* User Types */}
      <Card className="p-6 mb-6">
        <h2 className="text-2xl mb-4">Three User Types</h2>
        
        <div className="space-y-4">
          <div className="flex items-start gap-4 p-4 bg-green-50 rounded-lg">
            <div className="bg-green-600 rounded-2xl p-3">
              <ShoppingBag className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg mb-2">1. Customers (Urban Users)</h3>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>• Browse products by shelf life (1-2, 3-5, 7-14 days)</li>
                <li>• Subscribe to weekly boxes (Vegetable, Dairy, Meat, Custom)</li>
                <li>• Track orders through batch delivery stages</li>
                <li>• Choose pickup points or home delivery</li>
                <li>• View farm traceability and transparency</li>
              </ul>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 bg-amber-50 rounded-lg">
            <div className="bg-amber-600 rounded-2xl p-3">
              <Sprout className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg mb-2">2. Farmers (Rural Producers)</h3>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>• Register and verify identity</li>
                <li>• Add products with categories and quantities</li>
                <li>• See aggregated upcoming demand</li>
                <li>• Deliver to collection points</li>
                <li>• Track earnings and payment history</li>
              </ul>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg">
            <div className="bg-blue-600 rounded-2xl p-3">
              <Settings className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg mb-2">3. Admin/Operators (Logistics)</h3>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>• Manage collection points and hubs</li>
                <li>• Monitor cold storage for sensitive goods</li>
                <li>• Group orders into batches</li>
                <li>• Plan and optimize delivery routes</li>
                <li>• Track real-time logistics status</li>
              </ul>
            </div>
          </div>
        </div>
      </Card>

      {/* UX Design Principles */}
      <Card className="p-6 mb-6">
        <h2 className="text-2xl mb-4">UX Design Principles</h2>
        
        <div className="space-y-4">
          <div>
            <h3 className="mb-2 flex items-center gap-2">
              <Clock className="w-5 h-5 text-green-600" />
              Emphasize Time-Based Logic
            </h3>
            <p className="text-sm text-gray-700 ml-7">
              Countdown timers and clear cutoff times help users understand the batch delivery model. 
              Next delivery dates are prominently displayed throughout the customer interface.
            </p>
          </div>

          <div>
            <h3 className="mb-2 flex items-center gap-2">
              <TrendingDown className="w-5 h-5 text-green-600" />
              Highlight Cost Savings
            </h3>
            <p className="text-sm text-gray-700 ml-7">
              Cost comparison with retail prices shows the value of batch delivery. Savings are 
              displayed in cart and subscription screens to reinforce the economic benefit.
            </p>
          </div>

          <div>
            <h3 className="mb-2 flex items-center gap-2">
              <Leaf className="w-5 h-5 text-green-600" />
              Build Trust Through Transparency
            </h3>
            <p className="text-sm text-gray-700 ml-7">
              Farm information, farmer profiles, and delivery journey visualization create trust. 
              Product traceability shows the complete path from farm to customer.
            </p>
          </div>

          <div>
            <h3 className="mb-2 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-green-600" />
              Simplify Logistics Understanding
            </h3>
            <p className="text-sm text-gray-700 ml-7">
              Visual progress indicators and step-by-step journey maps help users understand the 
              batch delivery process without overwhelming them with logistics complexity.
            </p>
          </div>
        </div>
      </Card>

      {/* Key Features */}
      <Card className="p-6 mb-6">
        <h2 className="text-2xl mb-4">Key Features Implemented</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="mb-3">Customer Features</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />
                <span>Countdown timer for order cutoff</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />
                <span>Subscription box management</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />
                <span>Products categorized by shelf life</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />
                <span>Delivery method selection</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />
                <span>Multi-stage order tracking</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />
                <span>Farm traceability information</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3">Farmer Features</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-600 mt-0.5" />
                <span>Product management dashboard</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-600 mt-0.5" />
                <span>Upcoming demand visibility</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-600 mt-0.5" />
                <span>Earnings and payment tracking</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-600 mt-0.5" />
                <span>Collection point information</span>
              </li>
            </ul>

            <h3 className="mb-3 mt-4">Admin Features</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5" />
                <span>Batch progress monitoring</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5" />
                <span>Route management and tracking</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5" />
                <span>Cold storage temperature monitoring</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5" />
                <span>Collection point status</span>
              </li>
            </ul>
          </div>
        </div>
      </Card>

      {/* User Flows */}
      <Card className="p-6 mb-6">
        <h2 className="text-2xl mb-4">Primary User Flows</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="mb-3 text-lg">Customer: Subscribe to Box</h3>
            <div className="flex flex-wrap gap-2 text-sm">
              <Badge>Home</Badge>
              <span>→</span>
              <Badge>Subscriptions</Badge>
              <span>→</span>
              <Badge>Select Box Type</Badge>
              <span>→</span>
              <Badge>Customize</Badge>
              <span>→</span>
              <Badge>Subscribe</Badge>
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-lg">Customer: One-time Purchase</h3>
            <div className="flex flex-wrap gap-2 text-sm">
              <Badge>Home/Browse</Badge>
              <span>→</span>
              <Badge>Product Detail</Badge>
              <span>→</span>
              <Badge>Add to Cart</Badge>
              <span>→</span>
              <Badge>Cart</Badge>
              <span>→</span>
              <Badge>Select Delivery</Badge>
              <span>→</span>
              <Badge>Checkout</Badge>
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-lg">Farmer: Add Product</h3>
            <div className="flex flex-wrap gap-2 text-sm">
              <Badge>Dashboard</Badge>
              <span>→</span>
              <Badge>Products</Badge>
              <span>→</span>
              <Badge>Add New</Badge>
              <span>→</span>
              <Badge>Enter Details</Badge>
              <span>→</span>
              <Badge>Confirm</Badge>
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-lg">Admin: Monitor Batch</h3>
            <div className="flex flex-wrap gap-2 text-sm">
              <Badge>Dashboard</Badge>
              <span>→</span>
              <Badge>View Progress</Badge>
              <span>→</span>
              <Badge>Routes</Badge>
              <span>→</span>
              <Badge>Track Delivery</Badge>
            </div>
          </div>
        </div>
      </Card>

      {/* Design System */}
      <Card className="p-6 mb-6">
        <h2 className="text-2xl mb-4">Design System</h2>
        
        <div className="space-y-4">
          <div>
            <h3 className="mb-2">Color Palette</h3>
            <div className="grid grid-cols-4 gap-3">
              <div className="text-center">
                <div className="w-full h-16 bg-green-600 rounded-lg mb-2"></div>
                <div className="text-xs">Primary Green</div>
              </div>
              <div className="text-center">
                <div className="w-full h-16 bg-amber-600 rounded-lg mb-2"></div>
                <div className="text-xs">Farmer Accent</div>
              </div>
              <div className="text-center">
                <div className="w-full h-16 bg-blue-600 rounded-lg mb-2"></div>
                <div className="text-xs">Admin Accent</div>
              </div>
              <div className="text-center">
                <div className="w-full h-16 bg-gray-900 rounded-lg mb-2"></div>
                <div className="text-xs">Text Primary</div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-2">Typography</h3>
            <p className="text-sm text-gray-700">
              System font stack with emphasis on readability. Clear hierarchy with headers, 
              body text, and supporting information clearly differentiated.
            </p>
          </div>

          <div>
            <h3 className="mb-2">Components</h3>
            <p className="text-sm text-gray-700">
              Consistent use of cards, badges, buttons, and progress indicators across all interfaces. 
              Mobile-first approach with touch-friendly targets (minimum 44px).
            </p>
          </div>
        </div>
      </Card>

      {/* Mobile-First Approach */}
      <Card className="p-6 mb-6">
        <h2 className="text-2xl mb-4">Mobile-First Design</h2>
        
        <ul className="space-y-3 text-sm">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />
            <span>
              <strong>Bottom navigation:</strong> Essential features accessible via persistent bottom nav
            </span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />
            <span>
              <strong>Thumb-friendly zones:</strong> Key actions placed in easy-to-reach areas
            </span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />
            <span>
              <strong>Card-based layout:</strong> Information grouped in scannable cards
            </span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />
            <span>
              <strong>Progressive disclosure:</strong> Complex information revealed through tabs and expandable sections
            </span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />
            <span>
              <strong>Fixed CTAs:</strong> Important actions like checkout pinned at screen bottom
            </span>
          </li>
        </ul>
      </Card>

      {/* Future Enhancements */}
      <Card className="p-6 mb-6">
        <h2 className="text-2xl mb-4">Future Enhancements</h2>
        
        <div className="space-y-2 text-sm">
          <p>• <strong>Notifications:</strong> Push alerts for order cutoffs and delivery updates</p>
          <p>• <strong>Real-time tracking:</strong> GPS tracking of delivery vehicles</p>
          <p>• <strong>Community features:</strong> Farmer stories, seasonal recipes, sustainability impact</p>
          <p>• <strong>Smart recommendations:</strong> AI-powered product suggestions based on purchase history</p>
          <p>• <strong>Flexible delivery windows:</strong> Allow customers to select preferred time slots</p>
          <p>• <strong>Multi-language support:</strong> Azerbaijani, Russian, English</p>
        </div>
      </Card>

      <div className="text-center text-gray-500 text-sm py-8">
        <p>KəndYol UX/UI Design • Mobile Agricultural Marketplace</p>
        <p className="mt-1">Designed for sustainable farm-to-city logistics</p>
      </div>
    </div>
  );
}