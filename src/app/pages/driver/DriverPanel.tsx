import { useState } from "react";
import { useNavigate } from "react-router";
import { MobileHeader } from "../../components/MobileHeader";
import { BottomNav } from "../../components/BottomNav";
import { Card } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Progress } from "../../components/ui/progress";
import {
  Clock,
  CheckCircle2,
  Navigation,
  Package,
  Phone,
  Route,
  CircleCheck,
  MessageSquareWarning,
  ExternalLink
} from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";
import { APPROVED_ROUTES_STORAGE_KEY, addDriverIssue, CLAIMED_ROUTE_STORAGE_KEY, DRIVER_ROUTE_STATUSES_STORAGE_KEY, usePersistentState } from "../../data/demoStore";
import { toast } from "sonner";
import { localize, routes as routesData, scheduledRoutes } from "../../data/logisticsData";
import type { Language } from "../../data/productCatalog";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../../components/ui/dialog";

export default function DriverPanel() {
  const { t, language } = useLanguage();
  const lang = language as Language;
  const navigate = useNavigate();
  const [claimedRoute] = usePersistentState<string | null>(CLAIMED_ROUTE_STORAGE_KEY, null);
  const [approvedRoutes] = usePersistentState<string[]>(APPROVED_ROUTES_STORAGE_KEY, []);
  const [routeStatuses, setRouteStatuses] = usePersistentState<Record<string, string>>(DRIVER_ROUTE_STATUSES_STORAGE_KEY, {});
  const [completedStops, setCompletedStops] = useState<number[]>([]);
  const [selectedStopIndex, setSelectedStopIndex] = useState(0);
  const [issueDialogOpen, setIssueDialogOpen] = useState(false);
  const [issueTypeKey, setIssueTypeKey] = useState("driver.issue.delay");
  const [issueMessage, setIssueMessage] = useState("");

  const approvedRouteId = approvedRoutes.at(-1);
  const panelRouteId = approvedRouteId ?? claimedRoute ?? routesData[0].id;
  const scheduledActiveRoute = scheduledRoutes.find(route => route.id === panelRouteId);
  const sharedActiveRoute = routesData.find(route => route.id === panelRouteId) ?? routesData[0];
  const routeStatus = routeStatuses[panelRouteId] ?? (scheduledActiveRoute ? "ready" : "in-progress");
  const activeStops = scheduledActiveRoute?.stopDetails ?? sharedActiveRoute.stops;
  const progress = routeStatus === "completed"
    ? 100
    : routeStatus === "ready"
      ? 0
      : Math.round((completedStops.length / activeStops.length) * 100);
  const myActiveRoute = {
    id: panelRouteId,
    routeDesc: localize(scheduledActiveRoute?.routeDesc ?? sharedActiveRoute.routeDesc, lang),
    progress,
    stops: activeStops.map((stop, index) => ({
      ...stop,
      name: localize(stop.location, lang),
      status: routeStatus === "completed" || index < completedStops.length
        ? "completed"
        : routeStatus === "in-progress" && index === completedStops.length
          ? "current"
          : "pending",
    })),
    estimatedCompletion: scheduledActiveRoute ? localize(scheduledActiveRoute.estimatedTime, lang) : sharedActiveRoute.estimatedCompletion,
    totalOrders: scheduledActiveRoute?.orders ?? sharedActiveRoute.stops.reduce((total, stop) => total + stop.orders, 0),
  };

  const submitIssue = () => {
    addDriverIssue({ routeId: myActiveRoute.id, typeKey: issueTypeKey, message: issueMessage.trim() });
    setIssueMessage("");
    setIssueDialogOpen(false);
    toast.success(t("driver.issueSent"));
  };
  const activeStopIndex = Math.min(completedStops.length, myActiveRoute.stops.length - 1);
  const routeCompleted = routeStatus === "completed" || completedStops.length >= myActiveRoute.stops.length;
  const completedOrders = myActiveRoute.stops
    .filter(stop => stop.status === "completed")
    .reduce((total, stop) => total + stop.orders, 0);
  const remainingOrders = Math.max(myActiveRoute.totalOrders - completedOrders, 0);
  const routeDistance = scheduledActiveRoute?.distance ?? "285 km";
  const selectedStop = myActiveRoute.stops[selectedStopIndex] ?? myActiveRoute.stops[activeStopIndex];
  const selectedStopMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${selectedStop.name}, ${selectedStop.address}`)}`;
  const markCurrentStopDelivered = () => {
    if (routeStatus === "ready") {
      setRouteStatuses(current => ({ ...current, [panelRouteId]: "in-progress" }));
    }
    setCompletedStops(previous => {
      if (previous.length >= myActiveRoute.stops.length) return previous;
      const next = [...previous, previous.length];
      setSelectedStopIndex(Math.min(next.length, myActiveRoute.stops.length - 1));
      if (next.length >= myActiveRoute.stops.length) {
        setRouteStatuses(current => ({ ...current, [panelRouteId]: "completed" }));
      }
      return next;
    });
    toast.success(t("driver.stopCompleted"));
  };
  const updateRouteStatus = (status: string) => {
    setRouteStatuses(current => ({ ...current, [panelRouteId]: status }));
    if (status === "ready") {
      setCompletedStops([]);
      setSelectedStopIndex(0);
    }
    if (status === "in-progress" && completedStops.length >= myActiveRoute.stops.length) {
      setCompletedStops([]);
      setSelectedStopIndex(0);
    }
    if (status === "completed") {
      setCompletedStops(myActiveRoute.stops.map((_, index) => index));
    }
    toast.success(t("driver.routeStatusUpdated"));
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <MobileHeader title={t('customer.home.title')} titlePath="/" profilePath="/driver/profile" accentColor="blue" />
      <Dialog open={issueDialogOpen} onOpenChange={setIssueDialogOpen}>
        <DialogContent className="rounded-2xl">
          <DialogHeader>
            <DialogTitle>{t("driver.reportIssue")}</DialogTitle>
            <DialogDescription>{t("driver.reportIssueDesc")}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-2">
            {["driver.issue.delay", "driver.issue.pickup", "driver.issue.vehicle"].map((typeKey) => (
              <button
                key={typeKey}
                type="button"
                onClick={() => setIssueTypeKey(typeKey)}
                className={`text-left rounded-xl border px-3 py-2.5 text-sm font-medium ${issueTypeKey === typeKey ? "border-red-300 bg-red-50 text-red-800" : "border-gray-200 bg-white text-gray-700"}`}
              >
                {t(typeKey)}
              </button>
            ))}
          </div>
          <textarea
            value={issueMessage}
            onChange={(event) => setIssueMessage(event.target.value)}
            placeholder={t("driver.issueNote")}
            className="min-h-24 w-full resize-none rounded-xl border border-gray-200 p-3 text-sm outline-none focus:border-red-300"
          />
          <Button onClick={submitIssue} className="w-full h-11 rounded-xl bg-red-600 hover:bg-red-700 font-semibold">
            <MessageSquareWarning className="w-4 h-4 mr-2" />
            {t("driver.sendIssue")}
          </Button>
        </DialogContent>
      </Dialog>

      {/* Active Route Summary */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white px-4 py-4">
        <div className="flex items-center justify-between gap-2 mb-3">
          <div>
            <div className="text-xs text-blue-100 font-medium">{t("driver.routeSummary")}</div>
            <div className="text-sm font-semibold mt-0.5">{myActiveRoute.id} · {myActiveRoute.routeDesc}</div>
          </div>
          <Badge className="bg-white/20 text-white border border-white/30 text-xs">
            {t(routeStatus === "completed" ? "driver.routeCompleted" : routeStatus === "ready" ? "driver.readyToStart" : "driver.inProgress")}
          </Badge>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: t('driver.completedStops'), value: `${myActiveRoute.stops.filter(stop => stop.status === "completed").length}/${myActiveRoute.stops.length}` },
            { label: t('driver.remainingOrders'), value: remainingOrders },
            { label: t('driver.distance'), value: routeDistance },
          ].map((stat, idx) => (
            <div key={idx} className="bg-white/15 rounded-xl p-2 text-center">
              <div className="text-base font-bold">{stat.value}</div>
              <div className="text-xs text-blue-100 font-medium leading-tight">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="w-1 h-5 bg-blue-500 rounded-full" />
          <h2 className="text-base font-semibold text-gray-900">{t('driver.activeDelivery')}</h2>
        </div>
      </div>

      <div className="px-4 pb-4">
          {claimedRoute ? (
            <>
              {/* Active Route Header */}
              <Card className="overflow-hidden border-2 border-blue-300 border-l-4 border-l-blue-500">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-3 border-b border-blue-100">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs text-blue-600 font-semibold uppercase tracking-wide">{t('admin.route.id')}</span>
                        <span className="font-bold text-gray-900">{myActiveRoute.id}</span>
                        <Badge className={`text-xs font-semibold ${routeStatus === "completed" ? "bg-green-600 text-white" : routeStatus === "ready" ? "bg-amber-500 text-white" : "bg-blue-600 text-white"}`}>
                          {t(routeStatus === "completed" ? "driver.routeCompleted" : routeStatus === "ready" ? "driver.readyToStart" : "driver.inProgress")}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-600 font-medium">{myActiveRoute.routeDesc}</p>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="text-xs text-gray-500 font-medium mb-1.5">{t("driver.changeRouteStatus")}</div>
                    <div className="grid grid-cols-3 gap-1.5">
                      {["ready", "in-progress", "completed"].map(status => (
                        <button
                          key={status}
                          type="button"
                          onClick={() => updateRouteStatus(status)}
                          className={`rounded-lg border px-2 py-2 text-xs font-semibold transition-colors ${routeStatus === status ? "border-blue-500 bg-blue-600 text-white" : "border-blue-100 bg-white text-gray-600"}`}
                        >
                          {t(status === "ready" ? "driver.readyToStart" : status === "in-progress" ? "driver.inProgress" : "driver.routeCompleted")}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mb-2">
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-gray-600 font-medium">{t('admin.routes.progress')}</span>
                      <span className="font-bold text-blue-700">{myActiveRoute.progress}% · {myActiveRoute.stops.filter(s => s.status === 'completed').length}/{myActiveRoute.stops.length} {t('driver.stops')}</span>
                    </div>
                    <Progress value={myActiveRoute.progress} className="h-2.5 [&>div]:bg-blue-500" />
                  </div>

                  <div className="flex items-center gap-2 text-xs text-blue-700 bg-blue-100 rounded-lg px-3 py-2">
                    <Clock className="w-3.5 h-3.5" />
                      <span className="font-medium">{t('admin.routes.estimatedCompletion')}: {myActiveRoute.estimatedCompletion} · {myActiveRoute.totalOrders} {t('driver.orders')}</span>
                  </div>
                </div>

                {/* Next Stop Highlight */}
                <div className="p-3 bg-white">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-sm font-semibold text-gray-800">{t('driver.nextStop')}</span>
                    <Badge className="bg-blue-100 text-blue-700 border border-blue-200 text-xs">{activeStopIndex + 1}/{myActiveRoute.stops.length}</Badge>
                  </div>
                  {routeStatus === "ready" ? (
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-3">
                      <div className="text-sm font-semibold text-amber-900">{t("driver.routeApprovedReady")}</div>
                      <div className="text-xs text-amber-700 mt-0.5">{t("driver.routeApprovedReadyDesc")}</div>
                      <Button onClick={() => updateRouteStatus("in-progress")} className="w-full mt-3 h-10 rounded-xl bg-amber-500 hover:bg-amber-600 font-semibold">
                        <Navigation className="w-4 h-4 mr-2" />
                        {t("driver.startDelivery")}
                      </Button>
                    </div>
                  ) : routeCompleted ? (
                    <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-xl p-3 mb-3">
                      <CheckCircle2 className="w-6 h-6 text-green-600" />
                      <div>
                        <div className="text-sm font-semibold text-green-900">{t("driver.routeCompleted")}</div>
                        <div className="text-xs text-green-700 mt-0.5">{t("driver.routeCompletedDesc")}</div>
                      </div>
                    </div>
                  ) : myActiveRoute.stops.filter(s => s.status === 'current').map((stop, idx) => {
                    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${stop.name}, ${stop.address}`)}`;
                    return (
                    <div key={idx} className="bg-blue-50 border border-blue-200 rounded-xl p-3 mb-3">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center shadow-md">
                          <Navigation className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-blue-900 mb-0.5">{stop.name}</h4>
                          <p className="text-xs text-blue-600 mb-2">{stop.address}</p>
                          <div className="flex items-center gap-3 text-xs">
                            <span className="bg-white rounded-lg px-2 py-1 border border-blue-200 font-medium text-blue-700">
                              <Package className="w-3 h-3 inline mr-1" />{stop.orders} {t('driver.orders')}
                            </span>
                            <span className="bg-white rounded-lg px-2 py-1 border border-blue-200 font-medium text-blue-700">
                              <Clock className="w-3 h-3 inline mr-1" />{stop.time}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-3">
                        <Button asChild className="flex-1 bg-blue-600 hover:bg-blue-700 h-10 font-semibold text-sm rounded-xl">
                          <a href={mapsUrl} target="_blank" rel="noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          {t('driver.navigationStart')}
                          </a>
                        </Button>
                        <Button variant="outline" onClick={() => { window.location.href = "tel:+994123456789"; }} className="h-10 px-3 border-2 border-blue-200 text-blue-700 hover:bg-blue-50 rounded-xl">
                          <Phone className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  )})}

                  {/* All Stops */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-1 h-5 bg-gray-300 rounded-full" />
                    <span className="text-sm font-semibold text-gray-700">{t('driver.routeStops')}</span>
                  </div>
                  <div className="space-y-2">
                    {myActiveRoute.stops.map((stop, idx) => (
                      <button key={idx} type="button" onClick={() => setSelectedStopIndex(idx)} className="w-full flex gap-2 text-left">
                        <div className="flex flex-col items-center shrink-0">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-sm text-xs font-bold ${
                            stop.status === 'completed' ? 'bg-green-500 text-white' :
                            stop.status === 'current' ? 'bg-blue-600 text-white ring-4 ring-blue-100' :
                            'bg-gray-200 text-gray-500'
                          }`}>
                            {stop.status === 'completed' ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                          </div>
                          {idx < myActiveRoute.stops.length - 1 && (
                            <div className={`w-0.5 h-7 mt-1 ${stop.status === 'completed' ? 'bg-green-300' : 'bg-gray-200'}`} />
                          )}
                        </div>
                        <div className={`flex-1 min-w-0 h-10 rounded-xl px-2.5 border flex items-center ${selectedStopIndex === idx ? 'bg-indigo-50 border-indigo-300' : stop.status === 'current' ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-100'}`}>
                          <div className="flex items-center justify-between w-full">
                            <h4 className={`text-sm font-medium truncate ${stop.status === 'current' ? 'text-blue-700' : stop.status === 'completed' ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
                              {stop.name}
                            </h4>
                            <div className="flex items-center gap-2 shrink-0 ml-2">
                              <span className="text-xs text-gray-500">{stop.time}</span>
                              <span className="text-xs font-medium text-gray-600">{stop.orders} {t('driver.orders')}</span>
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>

                  {routeStatus === "in-progress" && (
                    <div className="grid grid-cols-2 gap-2 mt-3">
                      <Button asChild variant="outline" className="h-10 rounded-xl border-blue-200 text-blue-700">
                        <a href={selectedStopMapsUrl} target="_blank" rel="noreferrer">
                          <Navigation className="w-4 h-4 mr-1.5" />
                          {t("driver.openSelected")}
                        </a>
                      </Button>
                      <Button disabled={routeCompleted} onClick={markCurrentStopDelivered} className="h-10 bg-green-600 hover:bg-green-700 font-semibold rounded-xl">
                        <CircleCheck className="w-4 h-4 mr-1.5" />
                        {t(routeCompleted ? "driver.routeCompleted" : 'driver.completeCurrent')}
                      </Button>
                    </div>
                  )}
                  <Button
                    variant="outline"
                    onClick={() => setIssueDialogOpen(true)}
                    className="w-full mt-2 border-2 border-red-200 text-red-700 hover:bg-red-50 h-10 font-semibold rounded-xl"
                  >
                    <MessageSquareWarning className="w-4 h-4 mr-2" />
                    {t("driver.reportIssue")}
                  </Button>
                </div>
              </Card>
            </>
          ) : (
            <Card className="p-8 text-center border-2 border-dashed border-blue-200">
              <Route className="w-14 h-14 mx-auto mb-4 text-blue-300" />
              <h3 className="text-lg font-semibold mb-2 text-gray-900">{t('driver.noRoutes')}</h3>
              <p className="text-sm text-gray-500 mb-4">{t('driver.noRoutesDesc')}</p>
              <Button onClick={() => navigate('/driver/routes')} className="bg-blue-600 hover:bg-blue-700">
                {t('driver.availableRoutes')}
              </Button>
            </Card>
          )}
      </div>

      <BottomNav type="driver" />
    </div>
  );
}
