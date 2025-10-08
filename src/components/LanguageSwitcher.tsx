import i18n from "../i18n/i18n";

const LanguageSwitcher = () => {
  const changeLanguage = (lng: 'en' | 'fa') => {
    i18n.changeLanguage(lng);
    document.documentElement.dir = lng === 'fa' ? 'rtl' : 'ltr';
  };

  return (
    <>
      <button onClick={() => changeLanguage('en')}>English</button>
      <button onClick={() => changeLanguage('fa')}>فارسی</button>
    </>
  );
};

export default LanguageSwitcher;