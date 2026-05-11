import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { 
  User, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Bell, 
  Save, 
  AlertTriangle,
  Cloud,
  Snowflake,
  Bug,
  CheckCircle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SettingsTabProps {
  userName: string;
  userEmail: string;
  onUpdateProfile: (name: string, email: string) => void;
}

const SettingsTab = ({ userName, userEmail, onUpdateProfile }: SettingsTabProps) => {
  const { isRTL } = useLanguage();
  const { toast } = useToast();
  
  // Personal Data State
  const [name, setName] = useState(userName);
  const [email, setEmail] = useState(userEmail);
  
  // Password Change State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  
  // Notification Settings State
  const [notifications, setNotifications] = useState({
    damageAlerts: true,
    weatherAlerts: true,
    snowCoverage: true,
    birdDroppings: false,
    dustAccumulation: true,
    maintenanceReminders: true,
  });
  
  const [notificationFrequency, setNotificationFrequency] = useState<'instant' | 'daily' | 'weekly'>('instant');

  // Translations
  const t = {
    settings: isRTL ? 'الإعدادات' : 'Settings',
    personalData: isRTL ? 'الحساب الشخصي' : 'Personal Account',
    updatePersonalInfo: isRTL ? 'تحديث معلوماتك الشخصية' : 'Update your personal information',
    fullName: isRTL ? 'الاسم الكامل' : 'Full Name',
    emailAddress: isRTL ? 'البريد الإلكتروني' : 'Email Address',
    saveChanges: isRTL ? 'حفظ التغييرات' : 'Save Changes',
    changePassword: isRTL ? 'تغيير كلمة المرور' : 'Change Password',
    passwordSecurity: isRTL ? 'أمان كلمة المرور' : 'Password Security',
    currentPassword: isRTL ? 'كلمة المرور الحالية' : 'Current Password',
    newPassword: isRTL ? 'كلمة المرور الجديدة' : 'New Password',
    confirmNewPassword: isRTL ? 'تأكيد كلمة المرور الجديدة' : 'Confirm New Password',
    updatePassword: isRTL ? 'تحديث كلمة المرور' : 'Update Password',
    passwordMismatch: isRTL ? 'كلمة المرور الجديدة غير متطابقة' : 'New passwords do not match',
    passwordTooShort: isRTL ? 'كلمة المرور يجب أن تكون 8 أحرف على الأقل' : 'Password must be at least 8 characters',
    wrongCurrentPassword: isRTL ? 'كلمة المرور الحالية غير صحيحة' : 'Current password is incorrect',
    notificationSettings: isRTL ? 'إعدادات الإشعارات' : 'Notification Settings',
    chooseNotifications: isRTL ? 'اختر نوع الإشعارات التي تريد تلقيها' : 'Choose the types of notifications you want to receive',
    damageAlerts: isRTL ? 'تنبيهات الأضرار' : 'Damage Alerts',
    damageAlertsDesc: isRTL ? 'تلقي إشعارات عند اكتشاف أضرار في الألواح' : 'Get notified when panel damage is detected',
    weatherAlerts: isRTL ? 'تنبيهات الطقس' : 'Weather Alerts',
    weatherAlertsDesc: isRTL ? 'تنبيهات حول الظروف الجوية المؤثرة' : 'Alerts about weather conditions affecting panels',
    snowCoverage: isRTL ? 'التغطية الثلجية' : 'Snow Coverage',
    snowCoverageDesc: isRTL ? 'إشعارات عند تراكم الثلج على الألواح' : 'Notifications when snow accumulates on panels',
    birdDroppings: isRTL ? 'فضلات الطيور' : 'Bird Droppings',
    birdDroppingsDesc: isRTL ? 'تنبيهات عند اكتشاف فضلات الطيور' : 'Alerts when bird droppings are detected',
    dustAccumulation: isRTL ? 'تراكم الغبار' : 'Dust Accumulation',
    dustAccumulationDesc: isRTL ? 'إشعارات عند تراكم الغبار على الألواح' : 'Notifications when dust accumulates on panels',
    maintenanceReminders: isRTL ? 'تذكيرات الصيانة' : 'Maintenance Reminders',
    maintenanceRemindersDesc: isRTL ? 'تذكيرات دورية للصيانة الوقائية' : 'Periodic reminders for preventive maintenance',
    notificationFrequency: isRTL ? 'تكرار الإشعارات' : 'Notification Frequency',
    instant: isRTL ? 'فوري' : 'Instant',
    daily: isRTL ? 'يومي' : 'Daily',
    weekly: isRTL ? 'أسبوعي' : 'Weekly',
    saveNotificationSettings: isRTL ? 'حفظ إعدادات الإشعارات' : 'Save Notification Settings',
    profileUpdated: isRTL ? 'تم تحديث الملف الشخصي بنجاح' : 'Profile updated successfully',
    passwordUpdated: isRTL ? 'تم تغيير كلمة المرور بنجاح' : 'Password changed successfully',
    notificationsUpdated: isRTL ? 'تم حفظ إعدادات الإشعارات' : 'Notification settings saved',
  };

  const handleSaveProfile = () => {
    onUpdateProfile(name, email);
    toast({
      title: t.profileUpdated,
      duration: 3000,
    });
  };

  const handleChangePassword = () => {
    setPasswordError('');
    
    // Validate current password (simulated - in real app would check with backend)
    if (currentPassword !== 'admin123' && currentPassword !== 'user123') {
      setPasswordError(t.wrongCurrentPassword);
      return;
    }
    
    // Validate new password length
    if (newPassword.length < 8) {
      setPasswordError(t.passwordTooShort);
      return;
    }
    
    // Validate password match
    if (newPassword !== confirmPassword) {
      setPasswordError(t.passwordMismatch);
      return;
    }
    
    // Success
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    toast({
      title: t.passwordUpdated,
      duration: 3000,
    });
  };

  const handleSaveNotifications = () => {
    toast({
      title: t.notificationsUpdated,
      duration: 3000,
    });
  };

  const notificationOptions = [
    { key: 'damageAlerts', label: t.damageAlerts, desc: t.damageAlertsDesc, icon: AlertTriangle },
    { key: 'weatherAlerts', label: t.weatherAlerts, desc: t.weatherAlertsDesc, icon: Cloud },
    { key: 'snowCoverage', label: t.snowCoverage, desc: t.snowCoverageDesc, icon: Snowflake },
    { key: 'birdDroppings', label: t.birdDroppings, desc: t.birdDroppingsDesc, icon: Bug },
    { key: 'dustAccumulation', label: t.dustAccumulation, desc: t.dustAccumulationDesc, icon: Cloud },
    { key: 'maintenanceReminders', label: t.maintenanceReminders, desc: t.maintenanceRemindersDesc, icon: CheckCircle },
  ];

  return (
    <div className="space-y-6" dir={isRTL ? 'rtl' : 'ltr'}>
      <h1 className="text-2xl font-bold text-foreground">{t.settings}</h1>
      
      {/* Personal Data Section */}
      <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.01] backdrop-blur-sm shadow-[0_0_30px_rgba(0,108,158,0.06)] hover:shadow-[0_0_40px_rgba(34,211,238,0.12)] transition p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
            <User className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">{t.personalData}</h2>
            <p className="text-sm text-muted-foreground">{t.updatePersonalInfo}</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">{t.fullName}</Label>
            <div className="relative">
              <User className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground ${isRTL ? 'right-3' : 'left-3'}`} />
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`${isRTL ? 'pr-10' : 'pl-10'}`}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">{t.emailAddress}</Label>
            <div className="relative">
              <Mail className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground ${isRTL ? 'right-3' : 'left-3'}`} />
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`${isRTL ? 'pr-10' : 'pl-10'}`}
              />
            </div>
          </div>
          
          <Button onClick={handleSaveProfile} className="gap-2">
            <Save className="w-4 h-4" />
            {t.saveChanges}
          </Button>
        </div>
      </div>

      {/* Password Change Section */}
      <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.01] backdrop-blur-sm shadow-[0_0_30px_rgba(0,108,158,0.06)] hover:shadow-[0_0_40px_rgba(34,211,238,0.12)] transition p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
            <Lock className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">{t.changePassword}</h2>
            <p className="text-sm text-muted-foreground">{t.passwordSecurity}</p>
          </div>
        </div>
        
        <div className="space-y-4">
          {/* Current Password */}
          <div className="space-y-2">
            <Label htmlFor="currentPassword">{t.currentPassword}</Label>
            <div className="relative">
              <Lock className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground ${isRTL ? 'right-3' : 'left-3'}`} />
              <Input
                id="currentPassword"
                type={showCurrentPassword ? 'text' : 'password'}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className={`${isRTL ? 'pr-10 pl-10' : 'pl-10 pr-10'}`}
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className={`absolute top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground ${isRTL ? 'left-3' : 'right-3'}`}
              >
                {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>
          
          {/* New Password */}
          <div className="space-y-2">
            <Label htmlFor="newPassword">{t.newPassword}</Label>
            <div className="relative">
              <Lock className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground ${isRTL ? 'right-3' : 'left-3'}`} />
              <Input
                id="newPassword"
                type={showNewPassword ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className={`${isRTL ? 'pr-10 pl-10' : 'pl-10 pr-10'}`}
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className={`absolute top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground ${isRTL ? 'left-3' : 'right-3'}`}
              >
                {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>
          
          {/* Confirm New Password */}
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">{t.confirmNewPassword}</Label>
            <div className="relative">
              <Lock className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground ${isRTL ? 'right-3' : 'left-3'}`} />
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`${isRTL ? 'pr-10 pl-10' : 'pl-10 pr-10'}`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className={`absolute top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground ${isRTL ? 'left-3' : 'right-3'}`}
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>
          
          {/* Password Error */}
          {passwordError && (
            <p className="text-red-500 text-sm">{passwordError}</p>
          )}
          
          <Button onClick={handleChangePassword} className="gap-2">
            <Lock className="w-4 h-4" />
            {t.updatePassword}
          </Button>
        </div>
      </div>

      {/* Notification Settings Section */}
      <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.01] backdrop-blur-sm shadow-[0_0_30px_rgba(0,108,158,0.06)] hover:shadow-[0_0_40px_rgba(34,211,238,0.12)] transition p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
            <Bell className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">{t.notificationSettings}</h2>
            <p className="text-sm text-muted-foreground">{t.chooseNotifications}</p>
          </div>
        </div>
        
        <div className="space-y-4">
          {/* Notification Types */}
          <div className="space-y-3">
            {notificationOptions.map((option) => (
              <div 
                key={option.key}
                className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <option.icon className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-foreground">{option.label}</p>
                    <p className="text-xs text-muted-foreground">{option.desc}</p>
                  </div>
                </div>
                <Switch
                  checked={notifications[option.key as keyof typeof notifications]}
                  onCheckedChange={(checked) => 
                    setNotifications(prev => ({ ...prev, [option.key]: checked }))
                  }
                />
              </div>
            ))}
          </div>
          
          {/* Notification Frequency */}
          <div className="space-y-3 pt-4 border-t border-border">
            <Label>{t.notificationFrequency}</Label>
            <div className="flex gap-2">
              {(['instant', 'daily', 'weekly'] as const).map((freq) => (
                <Button
                  key={freq}
                  variant={notificationFrequency === freq ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setNotificationFrequency(freq)}
                >
                  {freq === 'instant' ? t.instant : freq === 'daily' ? t.daily : t.weekly}
                </Button>
              ))}
            </div>
          </div>
          
          <Button onClick={handleSaveNotifications} className="gap-2">
            <Save className="w-4 h-4" />
            {t.saveNotificationSettings}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SettingsTab;
