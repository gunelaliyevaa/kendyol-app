import { MobileHeader } from "../../components/MobileHeader";
import { BottomNav } from "../../components/BottomNav";
import { Card } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { 
  TrendingUp,
  DollarSign,
  Clock,
  CheckCircle2,
  Calendar,
  Download
} from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";
import { getProductName, getUnitName, type Language } from "../../data/productCatalog";
import { toast } from "sonner";
import { translateDemoText } from "../../data/logisticsData";

export default function FarmerEarnings() {
  const { t, language } = useLanguage();
  const lang = language as Language;

  const stats = {
    totalEarnings: 1245.50,
    thisWeek: 245.00,
    pending: 245.00,
    paid: 1000.50
  };

  const transactions = [
    {
      id: "ÖD-2024-0098",
      date: "18 Mart 2026",
      deliveryDate: "20 Mart 2026",
      amount: 145.50,
      status: "paid",
      items: [
        { productId: "tomato", quantity: 20, price: 90.00 },
        { productId: "pepper", quantity: 15, price: 55.50 }
      ]
    },
    {
      id: "ÖD-2024-0089",
      date: "11 Mart 2026",
      deliveryDate: "13 Mart 2026",
      amount: 132.00,
      status: "paid",
      items: [
        { productId: "tomato", quantity: 18, price: 81.00 },
        { productId: "cucumber", quantity: 20, price: 51.00 }
      ]
    },
    {
      id: "ÖD-2024-0102",
      date: "23 Mart 2026",
      deliveryDate: "25 Mart 2026",
      amount: 245.00,
      status: "pending",
      items: [
        { productId: "tomato", quantity: 45, price: 202.50 },
        { productId: "pepper", quantity: 25, price: 42.50 }
      ]
    }
  ];

  const weeklyStats = [
    { week: 9, earnings: 198.00 },
    { week: 10, earnings: 156.00 },
    { week: 11, earnings: 188.50 },
    { week: 12, earnings: 245.00 },
  ];
  const maxWeeklyEarnings = Math.max(...weeklyStats.map((week) => week.earnings));
  const monthlyTotal = weeklyStats.reduce((sum, week) => sum + week.earnings, 0);

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <MobileHeader title={t('farmer.earnings.title')} showBack profilePath="/farmer/profile" accentColor="amber" />

      {/* Stats Overview */}
      <div className="bg-gradient-to-br from-green-600 to-emerald-700 text-white px-6 py-7">
        <div className="mb-6">
          <div className="text-green-100 text-sm font-medium mb-2">{t('farmer.earnings.total')}</div>
          <div className="text-4xl font-bold mb-4">₼{stats.totalEarnings.toFixed(2)}</div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Card className="bg-white/20 backdrop-blur-sm border-white/20 p-4 text-white border-2">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm text-green-100 font-medium">{t('farmer.earnings.thisWeek')}</span>
            </div>
            <div className="text-2xl font-bold">₼{stats.thisWeek.toFixed(2)}</div>
          </Card>

          <Card className="bg-white/20 backdrop-blur-sm border-white/20 p-4 text-white border-2">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4" />
              <span className="text-sm text-green-100 font-medium">{t('farmer.earnings.pending')}</span>
            </div>
            <div className="text-2xl font-bold">₼{stats.pending.toFixed(2)}</div>
          </Card>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <Tabs defaultValue="transactions">
          <TabsList className="w-full mb-4 bg-amber-50 p-1 rounded-xl border-2 border-amber-100">
            <TabsTrigger value="transactions" className="flex-1 rounded-lg data-[state=active]:bg-amber-600 data-[state=active]:text-white font-medium">
              {t('farmer.earnings.transactions')}
            </TabsTrigger>
            <TabsTrigger value="weekly" className="flex-1 rounded-lg data-[state=active]:bg-amber-600 data-[state=active]:text-white font-medium">
              {t('farmer.earnings.weeklyStats')}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="transactions" className="space-y-4 mt-0">
            {transactions.map((transaction) => (
              <Card key={transaction.id} className={`overflow-hidden border-2 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 ${
                transaction.status === 'paid' 
                  ? 'border-green-200 border-l-4 border-l-green-500' 
                  : 'border-amber-200 border-l-4 border-l-amber-500'
              }`}>
                <div className={`p-4 border-b-2 ${transaction.status === 'paid' ? 'bg-green-50 border-green-100' : 'bg-amber-50 border-amber-100'}`}>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold mb-1 text-gray-900">{transaction.id}</h3>
                      <div className="text-sm text-gray-600 font-medium">
                        {t('farmer.earnings.delivered')} {translateDemoText(transaction.deliveryDate, lang)}
                      </div>
                    </div>
                    {transaction.status === 'paid' ? (
                      <Badge className="bg-green-100 text-green-800 border border-green-300 font-semibold">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        {t('farmer.earnings.paid')}
                      </Badge>
                    ) : (
                      <Badge className="bg-amber-100 text-amber-800 border border-amber-300 font-semibold">
                        <Clock className="w-3 h-3 mr-1" />
                        {t('farmer.earnings.pendingBadge')}
                      </Badge>
                    )}
                  </div>
                  <div className="text-2xl font-bold text-gray-900">₼{transaction.amount.toFixed(2)}</div>
                </div>

                <div className="p-4 bg-white">
                  <h4 className="text-sm font-semibold mb-3 text-gray-700 flex items-center gap-2">
                    <div className="w-1 h-4 bg-amber-500 rounded-full" />
                    {t('farmer.earnings.itemsBreakdown')}
                  </h4>
                  <div className="space-y-2 bg-gray-50 rounded-xl p-3 border border-gray-200">
                    {transaction.items.map((item, idx) => (
                      <div key={idx} className={`flex justify-between text-sm py-2 ${idx !== transaction.items.length - 1 ? 'border-b border-gray-200' : ''}`}>
                        <div>
                          <div className="font-medium text-gray-900">{getProductName(item.productId, lang)}</div>
                          <div className="text-gray-500 text-xs">{item.quantity} {getUnitName(item.productId, lang)}</div>
                        </div>
                        <div className="font-semibold text-gray-900">₼{item.price.toFixed(2)}</div>
                      </div>
                    ))}
                  </div>

                  {transaction.status === 'paid' && (
                    <Button variant="outline" size="sm" onClick={() => toast.success(t('common.saved'))} className="w-full mt-3 border-2 border-green-200 text-green-700 hover:bg-green-50 hover:border-green-400 font-semibold transition-all rounded-xl h-10">
                      <Download className="w-4 h-4 mr-2" />
                      {t('farmer.earnings.downloadReceipt')}
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="weekly" className="space-y-3 mt-0">
            {[...weeklyStats].reverse().map((week) => (
              <Card key={week.week} className="p-4 border-2 border-green-200 border-l-4 border-l-green-500 hover:shadow-lg hover:bg-green-50 hover:-translate-y-0.5 transition-all duration-200 cursor-default">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-100 rounded-xl p-2 border border-green-200">
                      <Calendar className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{t('farmer.earnings.weekLabel')} {week.week}</h3>
                      <p className="text-sm text-gray-600">{t('farmer.earnings.march')}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-700">₼{week.earnings.toFixed(2)}</div>
                  </div>
                </div>
              </Card>
            ))}

            {/* Chart */}
            <Card className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200">
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-6 bg-green-500 rounded-full" />
                  <div>
                    <h3 className="font-semibold text-gray-900">{t('farmer.earnings.monthlyTrend')}</h3>
                    <p className="text-xs text-gray-500">{t('farmer.earnings.march')}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[11px] text-gray-500">{t('farmer.earnings.monthlyTotal')}</div>
                  <div className="text-lg font-bold text-green-700">₼{monthlyTotal.toFixed(2)}</div>
                </div>
              </div>
              <div className="h-48 flex items-end justify-between gap-3 border-b border-green-200 px-1">
                {weeklyStats.map((week, idx) => (
                  <div key={idx} className="h-full flex-1 flex flex-col items-center justify-end">
                    <div className="text-[11px] text-green-800 font-semibold mb-1">
                      ₼{week.earnings.toFixed(0)}
                    </div>
                    <div 
                      className="w-full max-w-12 bg-gradient-to-t from-green-600 to-emerald-400 rounded-t-lg shadow-sm"
                      style={{ height: `${Math.max(18, (week.earnings / maxWeeklyEarnings) * 74)}%` }}
                    ></div>
                    <div className="text-[11px] mt-1.5 text-gray-600 font-medium">{t('farmer.earnings.weekShort')} {week.week}</div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Payment Info */}
        <Card className="p-4 bg-blue-50 border-2 border-blue-300 border-l-4 border-l-blue-500 mt-4">
          <div className="flex items-start gap-3">
            <div className="bg-blue-100 rounded-xl p-2">
              <DollarSign className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-blue-900 font-semibold mb-1">{t('farmer.earnings.paymentSchedule')}</h3>
              <p className="text-sm text-blue-700 mb-2 leading-relaxed">
                {t('farmer.earnings.paymentDesc')}
              </p>
              <div className="text-xs text-blue-600 font-medium bg-blue-100 rounded-lg px-2 py-1 inline-block">
                {t('farmer.earnings.nextPayment')}
              </div>
            </div>
          </div>
        </Card>
      </div>

      <BottomNav type="farmer" />
    </div>
  );
}
