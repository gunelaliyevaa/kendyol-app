export type Language = 'az' | 'en' | 'ru';

export interface ProductCategory {
  id: string;
  names: Record<Language, string>;
  emoji: string;
}

export interface CatalogProduct {
  id: string;
  categoryId: string;
  names: Record<Language, string>;
  unitNames: Record<Language, string>;
  defaultUnit: string;
  image?: string;
}

export const categories: ProductCategory[] = [
  { id: 'vegetables', names: { az: 'Tərəvəzlər', en: 'Vegetables', ru: 'Овощи' }, emoji: '🥕' },
  { id: 'fruits',     names: { az: 'Meyvələr',   en: 'Fruits',     ru: 'Фрукты' }, emoji: '🍎' },
  { id: 'dairy',      names: { az: 'Süd məhsulları', en: 'Dairy', ru: 'Молочные' }, emoji: '🥛' },
  { id: 'eggs',       names: { az: 'Yumurta',    en: 'Eggs',       ru: 'Яйца' }, emoji: '🥚' },
  { id: 'greens',     names: { az: 'Göyərti',    en: 'Greens',     ru: 'Зелень' }, emoji: '🌿' },
  { id: 'berries',    names: { az: 'Giləmeyvə',  en: 'Berries',    ru: 'Ягоды' }, emoji: '🍓' },
  { id: 'meat',       names: { az: 'Ət',         en: 'Meat',       ru: 'Мясо' }, emoji: '🥩' },
];

export const catalogProducts: CatalogProduct[] = [
  // Vegetables
  { id: 'tomato',    categoryId: 'vegetables', names: { az: 'Pomidor',    en: 'Tomatoes',   ru: 'Помидоры'  }, unitNames: { az: 'kq', en: 'kg', ru: 'кг' }, defaultUnit: 'kg', image: 'https://images.unsplash.com/photo-1757332334678-e76d258c49c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=300' },
  { id: 'cucumber',  categoryId: 'vegetables', names: { az: 'Xiyar',      en: 'Cucumbers',  ru: 'Огурцы'    }, unitNames: { az: 'kq', en: 'kg', ru: 'кг' }, defaultUnit: 'kg', image: 'https://images.unsplash.com/photo-1725369865895-0dd4566c8864?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=300' },
  { id: 'pepper',    categoryId: 'vegetables', names: { az: 'Bibər',      en: 'Peppers',    ru: 'Перец'     }, unitNames: { az: 'kq', en: 'kg', ru: 'кг' }, defaultUnit: 'kg', image: 'https://images.unsplash.com/photo-1775343963054-11247c9d4d30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=300' },
  { id: 'potato',    categoryId: 'vegetables', names: { az: 'Kartof',     en: 'Potatoes',   ru: 'Картофель' }, unitNames: { az: 'kq', en: 'kg', ru: 'кг' }, defaultUnit: 'kg', image: 'https://images.unsplash.com/photo-1744659751904-3b2e5c095323?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=300' },
  { id: 'onion',     categoryId: 'vegetables', names: { az: 'Soğan',      en: 'Onion',      ru: 'Лук'       }, unitNames: { az: 'kq', en: 'kg', ru: 'кг' }, defaultUnit: 'kg' },
  { id: 'carrot',    categoryId: 'vegetables', names: { az: 'Kök',        en: 'Carrot',     ru: 'Морковь'   }, unitNames: { az: 'kq', en: 'kg', ru: 'кг' }, defaultUnit: 'kg' },
  { id: 'eggplant',  categoryId: 'vegetables', names: { az: 'Badımcan',   en: 'Eggplant',   ru: 'Баклажан'  }, unitNames: { az: 'kq', en: 'kg', ru: 'кг' }, defaultUnit: 'kg' },
  { id: 'cabbage',   categoryId: 'vegetables', names: { az: 'Kələm',      en: 'Cabbage',    ru: 'Капуста'   }, unitNames: { az: 'kq', en: 'kg', ru: 'кг' }, defaultUnit: 'kg' },
  { id: 'zucchini',  categoryId: 'vegetables', names: { az: 'Qabaq',      en: 'Zucchini',   ru: 'Кабачок'   }, unitNames: { az: 'kq', en: 'kg', ru: 'кг' }, defaultUnit: 'kg' },

  // Fruits
  { id: 'apple',       categoryId: 'fruits', names: { az: 'Alma',    en: 'Apple',        ru: 'Яблоко'   }, unitNames: { az: 'kq', en: 'kg', ru: 'кг' }, defaultUnit: 'kg' },
  { id: 'pear',        categoryId: 'fruits', names: { az: 'Armud',   en: 'Pear',         ru: 'Груша'    }, unitNames: { az: 'kq', en: 'kg', ru: 'кг' }, defaultUnit: 'kg' },
  { id: 'peach',       categoryId: 'fruits', names: { az: 'Şaftalı', en: 'Peach',        ru: 'Персик'   }, unitNames: { az: 'kq', en: 'kg', ru: 'кг' }, defaultUnit: 'kg' },
  { id: 'cherry',      categoryId: 'fruits', names: { az: 'Gilas',   en: 'Cherry',       ru: 'Черешня'  }, unitNames: { az: 'kq', en: 'kg', ru: 'кг' }, defaultUnit: 'kg' },
  { id: 'apricot',     categoryId: 'fruits', names: { az: 'Ərik',    en: 'Apricot',      ru: 'Абрикос'  }, unitNames: { az: 'kq', en: 'kg', ru: 'кг' }, defaultUnit: 'kg' },
  { id: 'grape',       categoryId: 'fruits', names: { az: 'Üzüm',   en: 'Grape',        ru: 'Виноград' }, unitNames: { az: 'kq', en: 'kg', ru: 'кг' }, defaultUnit: 'kg' },
  { id: 'pomegranate', categoryId: 'fruits', names: { az: 'Nar',     en: 'Pomegranate',  ru: 'Гранат'   }, unitNames: { az: 'ədəd', en: 'pcs', ru: 'шт.' }, defaultUnit: 'pcs' },

  // Dairy
  { id: 'milk',           categoryId: 'dairy', names: { az: 'Süd',          en: 'Milk',          ru: 'Молоко'  }, unitNames: { az: 'L', en: 'L', ru: 'л' }, defaultUnit: 'L', image: 'https://images.unsplash.com/photo-1709177068446-d5c0f6d25c48?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=300' },
  { id: 'yogurt',         categoryId: 'dairy', names: { az: 'Qatıq',        en: 'Yogurt',        ru: 'Йогурт'  }, unitNames: { az: 'q', en: 'g', ru: 'г' }, defaultUnit: 'g' },
  { id: 'butter',         categoryId: 'dairy', names: { az: 'Kərə yağı',    en: 'Butter',        ru: 'Масло'   }, unitNames: { az: 'q', en: 'g', ru: 'г' }, defaultUnit: 'g' },
  { id: 'cheese',         categoryId: 'dairy', names: { az: 'Pendir',       en: 'Cheese',        ru: 'Сыр'     }, unitNames: { az: 'q', en: 'g', ru: 'г' }, defaultUnit: 'g' },
  { id: 'sour_cream',     categoryId: 'dairy', names: { az: 'Qaymaq',       en: 'Sour Cream',    ru: 'Сметана' }, unitNames: { az: 'q', en: 'g', ru: 'г' }, defaultUnit: 'g' },
  { id: 'cottage_cheese', categoryId: 'dairy', names: { az: 'Süzmə',        en: 'Cottage Cheese',ru: 'Творог'  }, unitNames: { az: 'q', en: 'g', ru: 'г' }, defaultUnit: 'g' },

  // Eggs
  { id: 'chicken_eggs', categoryId: 'eggs', names: { az: 'Kənd yumurtası',    en: 'Farm Eggs', ru: 'Деревенские яйца'     }, unitNames: { az: 'ədəd', en: 'piece', ru: 'шт.' }, defaultUnit: 'piece', image: 'https://images.unsplash.com/photo-1585355611266-f01530088d60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=300' },
  { id: 'quail_eggs',   categoryId: 'eggs', names: { az: 'Bildirçin yumurtası', en: 'Quail Eggs',   ru: 'Перепелиные яйца' }, unitNames: { az: 'düjün', en: 'dozen', ru: 'десяток' }, defaultUnit: 'dozen' },

  // Greens
  { id: 'spinach',   categoryId: 'greens', names: { az: 'İspanaq',   en: 'Spinach',  ru: 'Шпинат'   }, unitNames: { az: 'dəstə', en: 'bunch', ru: 'пучок' }, defaultUnit: 'bunch', image: 'https://images.unsplash.com/photo-1634731201932-9bd92839bea2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=300' },
  { id: 'parsley',   categoryId: 'greens', names: { az: 'Cəfəri',    en: 'Parsley',  ru: 'Петрушка' }, unitNames: { az: 'dəstə', en: 'bunch', ru: 'пучок' }, defaultUnit: 'bunch' },
  { id: 'dill',      categoryId: 'greens', names: { az: 'Şüyüd',     en: 'Dill',     ru: 'Укроп'    }, unitNames: { az: 'dəstə', en: 'bunch', ru: 'пучок' }, defaultUnit: 'bunch' },
  { id: 'cilantro',  categoryId: 'greens', names: { az: 'Koriander', en: 'Cilantro', ru: 'Кинза'    }, unitNames: { az: 'dəstə', en: 'bunch', ru: 'пучок' }, defaultUnit: 'bunch' },
  { id: 'basil',     categoryId: 'greens', names: { az: 'Reyhan',    en: 'Basil',    ru: 'Базилик'  }, unitNames: { az: 'dəstə', en: 'bunch', ru: 'пучок' }, defaultUnit: 'bunch' },
  { id: 'mint',      categoryId: 'greens', names: { az: 'Nanə',      en: 'Mint',     ru: 'Мята'     }, unitNames: { az: 'dəstə', en: 'bunch', ru: 'пучок' }, defaultUnit: 'bunch' },

  // Berries
  { id: 'strawberry', categoryId: 'berries', names: { az: 'Çiyələk',    en: 'Strawberry', ru: 'Клубника' }, unitNames: { az: 'kq', en: 'kg', ru: 'кг' }, defaultUnit: 'kg', image: 'https://images.unsplash.com/photo-1710528184650-fc75ae862c13?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=300' },
  { id: 'raspberry',  categoryId: 'berries', names: { az: 'Moruq',      en: 'Raspberry',  ru: 'Малина'   }, unitNames: { az: 'kq', en: 'kg', ru: 'кг' }, defaultUnit: 'kg' },
  { id: 'blackberry', categoryId: 'berries', names: { az: 'Böyürtkən',  en: 'Blackberry', ru: 'Ежевика'  }, unitNames: { az: 'kq', en: 'kg', ru: 'кг' }, defaultUnit: 'kg' },

  // Meat
  { id: 'chicken', categoryId: 'meat', names: { az: 'Toyuq əti', en: 'Chicken', ru: 'Курица'   }, unitNames: { az: 'kq', en: 'kg', ru: 'кг' }, defaultUnit: 'kg' },
  { id: 'beef',    categoryId: 'meat', names: { az: 'Mal əti',   en: 'Beef',    ru: 'Говядина' }, unitNames: { az: 'kq', en: 'kg', ru: 'кг' }, defaultUnit: 'kg' },
  { id: 'lamb',    categoryId: 'meat', names: { az: 'Quzu əti',  en: 'Lamb',    ru: 'Баранина' }, unitNames: { az: 'kq', en: 'kg', ru: 'кГ' }, defaultUnit: 'kg' },
];

export function getProductName(productId: string, lang: Language): string {
  const product = catalogProducts.find(p => p.id === productId);
  return product ? product.names[lang] : productId;
}

export function getCategoryName(categoryId: string, lang: Language): string {
  const category = categories.find(c => c.id === categoryId);
  return category ? category.names[lang] : categoryId;
}

export function getProductsByCategory(categoryId: string): CatalogProduct[] {
  return catalogProducts.filter(p => p.categoryId === categoryId);
}

export function getUnitName(productId: string, lang: Language): string {
  const product = catalogProducts.find(p => p.id === productId);
  return product ? product.unitNames[lang] : 'kg';
}
