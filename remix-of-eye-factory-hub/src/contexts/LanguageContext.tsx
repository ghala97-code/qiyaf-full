import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'ar';

interface Translations {
  createAccount: string;
  joinEyeFactory: string;
  fullName: string;
  email: string;
  password: string;
  signUp: string;
  orContinueWith: string;
  google: string;
  facebook: string;
  alreadyHaveAccount: string;
  logIn: string;
  forgotPassword: string;
  welcomeBack: string;
  dontHaveAccount: string;
  // Dashboard
  dashboard: string;
  liveFeedRGB: string;
  uploadSolarPanel: string;
  settings: string;
  projectName: string;
  category: string;
  // Dashboard Tab
  overview: string;
  totalInspected: string;
  passedPanels: string;
  defectivePanels: string;
  conformanceRate: string;
  detailedReports: string;
  recentScans: string;
  minAgo: string;
  // Live Feed Tab
  realTimeAlerts: string;
  serialNumber: string;
  inspectionTime: string;
  healthScore: string;
  defectiveType: string;
  // Supported defect classes (5 total)
  dust: string;
  cracks: string;
  clean: string;
  snowCoverage: string;
  birdDroppings: string;
  passedPanel: string;
  defectivePanel: string;
  // Upload Tab
  uploadFiles: string;
  dropFilesHere: string;
  supportedFormat: string;
  or: string;
  browseFiles: string;
  upload: string;
  analysisResults: string;
  // Profile
  profile: string;
  logout: string;
  // Notifications
  notifications: string;
  newAlert: string;
  // Greeting
  goodMorning: string;
  goodAfternoon: string;
  goodEvening: string;
  live: string;
}

const translations: Record<Language, Translations> = {
  en: {
    createAccount: 'Create an Account',
    joinEyeFactory: 'Join Qiyaf to monitor your UAV',
    fullName: 'Enter your full name',
    email: 'Enter your email',
    password: 'Create a password',
    signUp: 'Sign Up',
    orContinueWith: 'Or continue with',
    google: 'Google',
    facebook: 'Facebook',
    alreadyHaveAccount: 'Already have an account?',
    logIn: 'Log In',
    forgotPassword: 'Forgot Password?',
    welcomeBack: 'Welcome back to Qiyaf',
    dontHaveAccount: "Don't have an account?",
    // Dashboard
    dashboard: 'Dashboard',
    liveFeedRGB: 'Live Feed (RGB)',
    uploadSolarPanel: 'Upload Solar Panel Image',
    settings: 'Settings',
    projectName: 'Qiyaf',
    category: 'Solar Panel Surface Inspection',
    // Dashboard Tab
    overview: 'Overview',
    totalInspected: 'Total Inspected',
    passedPanels: 'Passed Panels',
    defectivePanels: 'Defective Panels',
    conformanceRate: 'Conformance Rate',
    detailedReports: 'Detailed Reports',
    recentScans: 'Recent Scans',
    minAgo: 'min ago',
    // Live Feed Tab
    realTimeAlerts: 'Real-time Alerts',
    serialNumber: 'Serial Number',
    inspectionTime: 'Inspection Time',
    healthScore: 'Health Score',
    defectiveType: 'Defective Type',
    dust: 'Dust',
    cracks: 'Cracks',
    clean: 'Clean',
    snowCoverage: 'Snow',
    birdDroppings: 'Bird Droppings',
    passedPanel: 'Passed Panel',
    defectivePanel: 'Defective Panel',
    // Upload Tab
    uploadFiles: 'Upload Files',
    dropFilesHere: 'Drop files here',
    supportedFormat: 'Supported format: PNG, JPG',
    or: 'OR',
    browseFiles: 'Browse files',
    upload: 'Upload',
    analysisResults: 'Analysis Results',
    // Profile
    profile: 'Profile',
    logout: 'Logout',
    // Notifications
    notifications: 'Notifications',
    newAlert: 'New Alert',
    goodMorning: 'Good morning',
    goodAfternoon: 'Good afternoon',
    goodEvening: 'Good evening',
    live: 'LIVE',
  },
  ar: {
    createAccount: 'إنشاء حساب',
    joinEyeFactory: 'انضم إلى Qiyaf لمراقبة طائرتك',
    fullName: 'أدخل اسمك الكامل',
    email: 'أدخل بريدك الإلكتروني',
    password: 'أنشئ كلمة مرور',
    signUp: 'التسجيل',
    orContinueWith: 'أو تابع باستخدام',
    google: 'جوجل',
    facebook: 'فيسبوك',
    alreadyHaveAccount: 'لديك حساب بالفعل؟',
    logIn: 'تسجيل الدخول',
    forgotPassword: 'نسيت كلمة المرور؟',
    welcomeBack: 'مرحباً بعودتك إلى Qiyaf',
    dontHaveAccount: 'ليس لديك حساب؟',
    // Dashboard
    dashboard: 'لوحة التحكم',
    liveFeedRGB: 'البث المباشر (RGB)',
    uploadSolarPanel: 'رفع صورة لوحة شمسية',
    settings: 'الإعدادات',
    projectName: 'Qiyaf',
    category: 'فحص سطح الألواح الشمسية',
    // Dashboard Tab
    overview: 'نظرة عامة',
    totalInspected: 'إجمالي المفحوص',
    passedPanels: 'الألواح السليمة',
    defectivePanels: 'الألواح المعيبة',
    conformanceRate: 'معدل المطابقة',
    detailedReports: 'تقارير مفصلة',
    recentScans: 'الفحوصات الأخيرة',
    minAgo: 'دقيقة',
    // Live Feed Tab
    realTimeAlerts: 'تنبيهات فورية',
    serialNumber: 'الرقم التسلسلي',
    inspectionTime: 'وقت الفحص',
    healthScore: 'درجة الصحة',
    defectiveType: 'نوع العيب',
    dust: 'غبار',
    cracks: 'تشققات',
    clean: 'نظيف',
    snowCoverage: 'ثلج',
    birdDroppings: 'فضلات الطيور',
    passedPanel: 'لوحة سليمة',
    defectivePanel: 'لوحة معيبة',
    // Upload Tab
    uploadFiles: 'رفع الملفات',
    dropFilesHere: 'أسقط الملفات هنا',
    supportedFormat: 'الصيغ المدعومة: PNG, JPG',
    or: 'أو',
    browseFiles: 'تصفح الملفات',
    upload: 'رفع',
    analysisResults: 'نتائج التحليل',
    // Profile
    profile: 'الملف الشخصي',
    logout: 'تسجيل الخروج',
    // Notifications
    notifications: 'الإشعارات',
    newAlert: 'تنبيه جديد',
    goodMorning: 'صباح الخير',
    goodAfternoon: 'مساء الخير',
    goodEvening: 'مساء الخير',
    live: 'مباشر',
  },
};

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: Translations;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'ar' : 'en'));
  };

  const value: LanguageContextType = {
    language,
    toggleLanguage,
    t: translations[language],
    isRTL: language === 'ar',
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
