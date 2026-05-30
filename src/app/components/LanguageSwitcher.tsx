import { useLanguage } from '../contexts/LanguageContext';
import { Globe } from 'lucide-react';

const languageCycle: Record<string, string> = {
  az: 'en',
  en: 'ru',
  ru: 'az',
};

const languageLabels: Record<string, string> = {
  az: 'AZ',
  en: 'EN',
  ru: 'RU',
};

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  const handleClick = () => {
    const next = languageCycle[language] as 'az' | 'en' | 'ru';
    setLanguage(next);
  };

  return (
    <button
      onClick={handleClick}
      className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gray-100 hover:bg-green-100 hover:text-green-700 border-2 border-transparent hover:border-green-300 transition-all hover:scale-105 active:scale-95"
      aria-label="Switch language"
    >
      <Globe className="w-4 h-4 text-gray-600" />
      <span className="text-sm font-semibold text-gray-700">
        {languageLabels[language]}
      </span>
    </button>
  );
}
