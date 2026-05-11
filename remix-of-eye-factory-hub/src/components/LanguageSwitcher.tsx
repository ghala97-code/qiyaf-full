import { useLanguage } from '@/contexts/LanguageContext';

interface LanguageSwitcherProps {
  isInHeader?: boolean;
}

const LanguageSwitcher = ({ isInHeader = false }: LanguageSwitcherProps) => {
  const { language, toggleLanguage } = useLanguage();

  if (isInHeader) {
    return (
      <button
        onClick={toggleLanguage}
        className="p-2 text-muted-foreground hover:text-foreground transition-colors text-sm font-bold"
      >
        {language === 'en' ? 'ع' : 'EN'}
      </button>
    );
  }

  return (
    <button
      onClick={toggleLanguage}
      className="fixed top-5 right-5 text-xl font-bold text-foreground hover:text-primary transition-colors cursor-pointer z-50 bg-card/50 backdrop-blur-sm px-3 py-1 rounded-md"
    >
      {language === 'en' ? 'ع' : 'EN'}
    </button>
  );
};

export default LanguageSwitcher;
