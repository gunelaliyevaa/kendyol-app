import type { Language } from "./productCatalog";
import { marketplaceAssumptions } from "./marketplaceAssumptions";

type Localized = Readonly<Record<Language, string>>;

export const farmerCollectionHub = {
  name: { az: "Şamaxı Rayon Mərkəzi", en: "Shamakhi District Hub", ru: "Центр района Шемаха" },
  address: { az: "Şamaxı şəhəri, M.Ə.Rəsulzadə küç. 18", en: "18 M.A. Rasulzade St, Shamakhi", ru: "г. Шемаха, ул. М.А. Расулзаде, 18" },
  pickupTime: "Bazar ertəsi, 18:00",
};

export const farmerCollectionOrders = [
  { id: "YGM-2603-01", farmer: "Rəna Əliyeva", phone: "+994501112233", product: { az: "Pomidor", en: "Tomatoes", ru: "Помидоры" }, quantity: "12 kq", status: "ready" },
  { id: "YGM-2603-02", farmer: "Vüqar Məmmədov", phone: "+994502223344", product: { az: "İspanaq", en: "Spinach", ru: "Шпинат" }, quantity: "8 dəstə", status: "ready" },
  { id: "YGM-2603-03", farmer: "Aynur Həsənova", phone: "+994503334455", product: { az: "Xiyar", en: "Cucumbers", ru: "Огурцы" }, quantity: "15 kq", status: "pending" },
];

export const routes = [
  {
    id: "ID-M001",
    batchId: "ID-B2603",
    routeDesc: marketplaceAssumptions.pilotRoute,
    driver: "Elvin Məmmədov",
    driverShort: "Elvin M.",
    vehicle: marketplaceAssumptions.pilotVehicle,
    plate: "10BH456",
    status: "in-progress",
    progress: 50,
    estimatedCompletion: "13:30",
    stops: [
      { location: { az: "Nəsimi Rayon Mərkəzi", en: "Nasimi District Hub", ru: "Центр района Насими" }, status: "completed", orders: 3, time: "12:00", address: "28 May küç. 15" },
      { location: { az: "Yasamal Mərkəzi", en: "Yasamal Hub", ru: "Центр Ясамала" }, status: "current", orders: 3, time: "12:45", address: "Əliağa Vahid küç. 8" },
      { location: { az: "Sabunçu Mərkəzi", en: "Sabunchu Hub", ru: "Центр Сабунчи" }, status: "pending", orders: 4, time: "13:30", address: "M. Müşfiq küç. 12" },
    ],
  },
  {
    id: "ID-M002",
    batchId: "ID-B2603",
    routeDesc: {
      az: "Suraxanı → Binəqədi → Qaradağ",
      en: "Surakhani → Binagadi → Garadagh",
      ru: "Сураханы → Бинагади → Гарадаг",
    },
    driver: "Fərid Axundov",
    driverShort: "Fərid A.",
    vehicle: "Yük maşını #8",
    plate: "77AZ112",
    status: "delayed",
    progress: 40,
    estimatedCompletion: "16:15",
    delay: { az: "M1 magistralında tıxac", en: "Traffic on M1 highway", ru: "Пробка на трассе M1" },
    stops: [
      { location: { az: "Suraxanı Mərkəzi", en: "Surakhani Hub", ru: "Центр Сураханы" }, status: "completed", orders: 32, time: "09:45", address: "Suraxanı yolu 44" },
      { location: { az: "Binəqədi Mərkəzi", en: "Binagadi Hub", ru: "Центр Бинагади" }, status: "current", orders: 25, time: "12:00", address: "Binəqədi şossesi 88" },
      { location: { az: "Qaradağ Mərkəzi", en: "Garadagh Hub", ru: "Центр Гарадага" }, status: "pending", orders: 20, time: "14:15", address: "Şüvəlan yolu 6" },
    ],
  },
  {
    id: "ID-M003",
    batchId: "ID-B2602",
    routeDesc: { az: "Səbail → Nizami", en: "Sabail → Nizami", ru: "Сабаил → Низами" },
    driver: "Rəmil Süleymanov",
    driverShort: "Rəmil S.",
    vehicle: "Mikroavtobus #7",
    plate: "33BX899",
    status: "completed",
    progress: 100,
    estimatedCompletion: "12:30",
    stops: [
      { location: { az: "Səbail Mərkəzi", en: "Sabail Hub", ru: "Центр Сабаила" }, status: "completed", orders: 18, time: "10:30", address: "Səbail küç. 3" },
      { location: { az: "Nizami Mərkəzi", en: "Nizami Hub", ru: "Центр Низами" }, status: "completed", orders: 16, time: "11:45", address: "Nizami küç. 22" },
    ],
  },
];

export const scheduledRoutes = [
  {
    id: "ID-M004",
    routeDesc: { az: "Şamaxı → Bakı (Pilot)", en: "Shamakhi → Baku (Pilot)", ru: "Шемаха → Баку (Пилот)" },
    date: { az: "Sabah", en: "Tomorrow", ru: "Завтра" },
    driver: { az: "Təyin edilməyib", en: "Unassigned", ru: "Не назначен" },
    stops: 4,
    orders: 25,
    distance: "285 km",
    estimatedTime: { az: "4s 30d", en: "4h 30m", ru: "4ч 30м" },
    stopDetails: [
      { location: { az: "Yasamal Mərkəzi", en: "Yasamal Hub", ru: "Центр Ясамала" }, orders: 6, time: "12:45", address: "Əliağa Vahid küç. 8" },
      { location: { az: "Nəsimi Rayon Mərkəzi", en: "Nasimi District Hub", ru: "Центр района Насими" }, orders: 7, time: "13:20", address: "28 May küç. 15" },
      { location: { az: "Sabunçu Mərkəzi", en: "Sabunchu Hub", ru: "Центр Сабунчи" }, orders: 6, time: "14:10", address: "M. Müşfiq küç. 12" },
      { location: { az: "Xətai Mərkəzi", en: "Khatai Hub", ru: "Центр Хатаи" }, orders: 6, time: "15:00", address: "Xocalı prospekti 24" },
    ],
    area: { az: "Bakı", en: "Baku", ru: "Баку" },
    ai: { score: 94, cost: "₼126", time: { az: "4s 30d", en: "4h 30m", ru: "4ч 30м" }, finding: { az: "Şamaxı sifarişlərini bir həftəlik partiyada toplamaq Ford Transit tutumundan tam istifadə edir və şəhərdaxili dayanacaqları birləşdirir.", en: "Grouping Shamakhi orders into one weekly batch uses the Ford Transit capacity fully and combines city stops.", ru: "Объединение заказов из Шемахи в одну недельную партию полностью использует вместимость Ford Transit и объединяет городские остановки." } },
  },
  {
    id: "ID-M005",
    routeDesc: { az: "Lənkəran → Salyan → Bakı (Cənub)", en: "Lankaran → Salyan → Baku (South)", ru: "Ленкорань → Сальян → Баку (Юг)" },
    date: { az: "Sabah", en: "Tomorrow", ru: "Завтра" },
    driver: { az: "Təyin edilməyib", en: "Unassigned", ru: "Не назначен" },
    stops: 4,
    orders: 65,
    distance: "55 km",
    estimatedTime: { az: "4s 10d", en: "4h 10m", ru: "4ч 10м" },
    stopDetails: [
      { location: { az: "Lənkəran Mərkəzi", en: "Lankaran Hub", ru: "Центр Ленкорани" }, orders: 18, time: "09:30", address: "H. Aslanov küç. 14" },
      { location: { az: "Salyan Mərkəzi", en: "Salyan Hub", ru: "Центр Сальяна" }, orders: 16, time: "10:45", address: "Heydər Əliyev prospekti 31" },
      { location: { az: "Qaradağ Mərkəzi", en: "Garadagh Hub", ru: "Центр Гарадага" }, orders: 15, time: "12:30", address: "Lökbatan qəsəbəsi 6" },
      { location: { az: "Yasamal Mərkəzi", en: "Yasamal Hub", ru: "Центр Ясамала" }, orders: 16, time: "13:40", address: "Əliağa Vahid küç. 8" },
    ],
    area: { az: "Cənub Bakı", en: "South Baku", ru: "Южный Баку" },
    ai: { score: 88, cost: "₼104", time: { az: "4s 10d", en: "4h 10m", ru: "4ч 10м" }, finding: { az: "Daha ucuz variantdır, amma soyuducu məhsullar üçün 45 dəqiqə əlavə risk yaradır.", en: "Cheaper option, but adds 45 minutes of risk for chilled products.", ru: "Более дешёвый вариант, но добавляет 45 минут риска для охлаждённых товаров." } },
  },
];

export const localize = (value: Localized, lang: Language) => value[lang];

const demoTextTranslations: Record<string, Partial<Record<Language, string>>> = {
  "25 Mart": { en: "25 March", ru: "25 марта" },
  "25 Mart 2026": { en: "25 March 2026", ru: "25 марта 2026" },
  "25 Aprel 2026": { en: "25 April 2026", ru: "25 апреля 2026" },
  "23 Mart 2026": { en: "23 March 2026", ru: "23 марта 2026" },
  "22 Mart 2026": { en: "22 March 2026", ru: "22 марта 2026" },
  "20 Mart 2026": { en: "20 March 2026", ru: "20 марта 2026" },
  "18 Mart 2026": { en: "18 March 2026", ru: "18 марта 2026" },
  "13 Mart 2026": { en: "13 March 2026", ru: "13 марта 2026" },
  "11 Mart 2026": { en: "11 March 2026", ru: "11 марта 2026" },
  "23 Mart, 20:00": { en: "23 March, 20:00", ru: "23 марта, 20:00" },
  "24 Mart, 10:00": { en: "24 March, 10:00", ru: "24 марта, 10:00" },
  "24 Mart, 16:00": { en: "24 March, 16:00", ru: "24 марта, 16:00" },
  "15 dəq əvvəl": { en: "15 min ago", ru: "15 мин назад" },
  "20 dəq əvvəl": { en: "20 min ago", ru: "20 мин назад" },
  "10 dəq əvvəl": { en: "10 min ago", ru: "10 мин назад" },
  "1 dəq əvvəl": { en: "1 min ago", ru: "1 мин назад" },
  "2 dəq əvvəl": { en: "2 min ago", ru: "2 мин назад" },
  "12 dəq əvvəl": { en: "12 min ago", ru: "12 мин назад" },
  "30 dəq əvvəl": { en: "30 min ago", ru: "30 мин назад" },
  "1 saat əvvəl": { en: "1 hour ago", ru: "1 час назад" },
  "İndi": { en: "Now", ru: "Сейчас" },
  "Yaşıl göyərti": { en: "Leafy greens", ru: "Листовая зелень" },
  "Giləmeyvə": { en: "Berries", ru: "Ягоды" },
  "Təzə süd məhsulları": { en: "Fresh dairy", ru: "Свежие молочные продукты" },
  "Otlar": { en: "Herbs", ru: "Травы" },
  "Pomidor": { en: "Tomatoes", ru: "Помидоры" },
  "Bibər": { en: "Peppers", ru: "Перец" },
  "Xiyar": { en: "Cucumbers", ru: "Огурцы" },
  "Meyvələr": { en: "Fruits", ru: "Фрукты" },
  "Kartof": { en: "Potatoes", ru: "Картофель" },
  "Soğan": { en: "Onions", ru: "Лук" },
  "Kök tərəvəzlər": { en: "Root vegetables", ru: "Корнеплоды" },
  "Yumurta": { en: "Eggs", ru: "Яйца" },
  "Müxtəlif": { en: "Various", ru: "Разные" },
  "Mikroavtobus": { en: "Minibus", ru: "Микроавтобус" },
  "25 sifariş/gün": { en: "25 orders/day", ru: "25 заказов/день" },
  "Yük maşını": { en: "Truck", ru: "Грузовик" },
  "Refrijerator": { en: "Refrigerated van", ru: "Рефрижератор" },
  "Anbar mərkəzi, Bakı": { en: "Warehouse hub, Baku", ru: "Складской центр, Баку" },
  "Xətai Mərkəzinə yaxın": { en: "Near Khatai Hub", ru: "Рядом с центром Хатаи" },
  "M1 magistralı, Binəqədi": { en: "M1 highway, Binagadi", ru: "Трасса M1, Бинагади" },
  "Nizami Mərkəzi — Tamamlandı": { en: "Nizami Hub - Completed", ru: "Центр Низами - завершено" },
  "M1 magistralında tıxac": { en: "Traffic on M1 highway", ru: "Пробка на трассе M1" },
};

export const translateDemoText = (value: string, lang: Language) =>
  lang === "az" ? value : demoTextTranslations[value]?.[lang] ?? value;
