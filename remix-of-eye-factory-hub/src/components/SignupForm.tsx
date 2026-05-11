import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { User, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import qiyafLogo from '@/assets/qiyaf-logo-new.png';

interface SignupFormProps {
  onSignup: (name: string, email: string) => void;
  onSwitchToLogin: () => void;
}

const SignupForm = ({ onSignup, onSwitchToLogin }: SignupFormProps) => {
  const { t, isRTL } = useLanguage();
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Load existing users from localStorage
    const existingUsers = JSON.parse(localStorage.getItem('eyefactory_users') || '[]');

    // Check if email already exists
    if (existingUsers.find((u: { email: string }) => u.email === email)) {
      setError(isRTL ? 'هذا البريد الإلكتروني مسجل بالفعل' : 'This email is already registered');
      return;
    }

    // Save new user
    const newUser = { name: fullname, email, password };
    existingUsers.push(newUser);
    localStorage.setItem('eyefactory_users', JSON.stringify(existingUsers));

    onSignup(fullname, email);
  };

  const handleGoogleLogin = () => {
    window.open('https://accounts.google.com', '_blank');
  };

  const handleFacebookLogin = () => {
    window.open('https://www.facebook.com/login', '_blank');
  };

  return (
    <div
      className="w-full"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Logo */}
      <div className={`mb-6 flex ${isRTL ? 'justify-end' : 'justify-start'}`}>
        <img
          src={qiyafLogo}
          alt="Qiyaf"
          className="h-48 md:h-56 w-auto object-contain -ml-2"
        />
      </div>

      {/* Header */}
      <div className={`mb-8 ${isRTL ? 'text-right' : 'text-left'}`}>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight leading-[1.15]">
          <span className="block text-white">{isRTL ? "أنشئ حسابك في" : "Create your account on"}</span>
          <span className="block">
            <span
              className="inline-block bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(90deg, #11C5D9 0%, #4FB37A 50%, #FF9800 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
            >
              {isRTL ? "منصة قياف" : "Qiyaf Platform"}
            </span>
          </span>
        </h2>
        <p className="text-white/55 mt-2">{t.joinEyeFactory}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name Input */}
        <div className="relative">
          <User className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 ${isRTL ? 'right-4' : 'left-4'}`} />
          <Input
            type="text"
            placeholder={t.fullName}
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            className={`input-premium h-14 rounded-xl text-white placeholder:text-white/35 ${isRTL ? 'pr-12' : 'pl-12'}`}
            required
          />
        </div>

        {/* Email Input */}
        <div className="relative">
          <Mail className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 ${isRTL ? 'right-4' : 'left-4'}`} />
          <Input
            type="email"
            placeholder={t.email}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`input-premium h-14 rounded-xl text-white placeholder:text-white/35 ${isRTL ? 'pr-12' : 'pl-12'}`}
            required
          />
        </div>

        {/* Password Input */}
        <div className="relative">
          <Lock className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 ${isRTL ? 'right-4' : 'left-4'}`} />
          <Input
            type={showPassword ? 'text' : 'password'}
            placeholder={t.password}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`input-premium h-14 rounded-xl text-white placeholder:text-white/35 ${isRTL ? 'pr-12 pl-12' : 'pl-12 pr-12'}`}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 hover:text-white transition-colors ${isRTL ? 'left-4' : 'right-4'}`}
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <p className="text-red-400 text-sm text-center">{error}</p>
        )}

        {/* Forgot Password Link (disabled, matches login color) */}
        <div className={`flex ${isRTL ? 'justify-start' : 'justify-end'}`}>
          <button
            type="button"
            disabled
            aria-disabled="true"
            onClick={(e) => e.preventDefault()}
            className="text-sm text-[#11C5D9] opacity-60 cursor-not-allowed pointer-events-none"
          >
            {t.forgotPassword}
          </button>
        </div>

        <button
          type="submit"
          className="btn-qiyaf-gradient relative overflow-hidden w-full h-[58px] rounded-xl font-semibold text-white text-base tracking-wide"
        >
          {isRTL ? "إنشاء حساب جديد" : "Create New Account"}
        </button>
      </form>

      <div className="mt-7">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase tracking-[0.25em]">
            <span className="px-4 bg-black text-white/40">{t.orContinueWith}</span>
          </div>
        </div>

        <div className="flex gap-3 mt-5">
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="group flex-1 h-12 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/20 transition-all flex items-center justify-center gap-2 text-white/85 text-sm font-medium backdrop-blur-sm"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            </svg>
            {t.google}
          </button>
          <button
            type="button"
            onClick={handleFacebookLogin}
            className="group flex-1 h-12 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/20 transition-all flex items-center justify-center gap-2 text-white/85 text-sm font-medium backdrop-blur-sm"
          >
            <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            {t.facebook}
          </button>
        </div>
      </div>

      {/* Already have an account */}
      <div className="mt-7 text-center">
        <span className="text-white/50 text-sm">{t.alreadyHaveAccount} </span>
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="text-sm font-semibold bg-gradient-to-r from-[#11C5D9] to-[#FF9800] bg-clip-text text-transparent hover:opacity-80 transition-opacity"
        >
          {t.logIn}
        </button>
      </div>
    </div>
  );
};

export default SignupForm;
