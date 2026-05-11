import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import qiyafLogo from "@/assets/qiyaf-logo-new.png";

interface LoginFormProps {
  onLogin: (name: string, email: string) => void;
  onSwitchToSignup: () => void;
  onForgotPassword: () => void;
}

const defaultUsers = [
  { email: "admin@eyefactory.com", password: "admin123", name: "Admin User" },
  { email: "user@eyefactory.com", password: "user123", name: "Test User" },
];

const LoginForm = ({ onLogin, onSwitchToSignup, onForgotPassword }: LoginFormProps) => {
  const { t, isRTL } = useLanguage();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const registeredUsers = JSON.parse(localStorage.getItem("eyefactory_users") || "[]");
    const allUsers = [...defaultUsers, ...registeredUsers];
    const user = allUsers.find(
      (u: { email: string; password: string }) =>
        u.email.toLowerCase() === email.toLowerCase() && u.password === password,
    );
    if (user) {
      onLogin(user.name, user.email);
    } else {
      setError(isRTL ? "البريد الإلكتروني أو كلمة المرور غير صحيحة" : "Invalid email or password");
    }
  };

  const handleGoogle = () => window.open("https://accounts.google.com", "_blank");
  const handleFacebook = () => window.open("https://www.facebook.com/login", "_blank");

  return (
    <div className="w-full" dir={isRTL ? "rtl" : "ltr"}>
      {/* 1. Logo — left aligned */}
      <div className={`mb-5 flex ${isRTL ? "justify-end" : "justify-start"}`}>
        <img src={qiyafLogo} alt="Qiyaf" className="h-48 md:h-56 w-auto object-contain -ml-2" />
      </div>

      {/* 2. Welcome title — left aligned, two lines */}
      <h1 className={`${isRTL ? "text-right" : "text-left"} text-3xl md:text-4xl font-bold tracking-tight leading-[1.15]`}>
        <span className="block text-white">{isRTL ? "مرحباً بعودتك إلى" : "Welcome back to"}</span>
        <span className="block">
          <span
            className="inline-block bg-clip-text text-transparent"
            style={{ backgroundImage: "linear-gradient(90deg, #11C5D9 0%, #4FB37A 50%, #FF9800 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
          >
            {isRTL ? "منصة قياف" : "Qiyaf Platform"}
          </span>
        </span>
      </h1>

      {/* 3. Subtitle — left aligned */}
      <p className={`mt-3 ${isRTL ? "text-right" : "text-left"} text-sm text-[#B5B5B5] leading-relaxed`}>
        {isRTL
          ? "سجّل الدخول لمتابعة مراقبة محطاتك الشمسية والوصول إلى رؤى الذكاء الاصطناعي."
          : "Sign in to continue monitoring your solar assets and accessing real-time AI insights."}
      </p>

      <form onSubmit={handleSubmit} className="mt-7 space-y-4">
        {/* 4. Email with label */}
        <div>
          <label className="block text-sm font-medium text-white/85 mb-2">
            {isRTL ? "البريد الإلكتروني" : "Email Address"}
          </label>
          <div className="relative">
            <Mail
              className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 ${isRTL ? "right-4" : "left-4"}`}
            />
            <Input
              type="email"
              placeholder={isRTL ? "أدخل بريدك الإلكتروني" : "Enter your email"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`input-premium h-12 rounded-xl text-white placeholder:text-white/35 ${isRTL ? "pr-12" : "pl-12"}`}
              required
            />
          </div>
        </div>

        {/* 5. Password with label */}
        <div>
          <label className="block text-sm font-medium text-white/85 mb-2">{isRTL ? "كلمة المرور" : "Password"}</label>
          <div className="relative">
            <Lock
              className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 ${isRTL ? "right-4" : "left-4"}`}
            />
            <Input
              type={showPassword ? "text" : "password"}
              placeholder={isRTL ? "أدخل كلمة المرور" : "Enter your password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`input-premium h-12 rounded-xl text-white placeholder:text-white/35 ${isRTL ? "pr-12 pl-12" : "pl-12 pr-12"}`}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className={`absolute top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors ${isRTL ? "left-4" : "right-4"}`}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {error && <p className="text-red-400 text-sm text-center">{error}</p>}

        {/* 6. Forgot password (disabled) */}
        <div className={`flex ${isRTL ? "justify-start" : "justify-end"}`}>
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

        {/* 7. Sign in button */}
        <button
          type="submit"
          className="btn-qiyaf-gradient relative overflow-hidden w-full h-[54px] rounded-xl font-semibold text-white text-base tracking-wide"
        >
          {isRTL ? "تسجيل الدخول" : "Sign In"}
        </button>
      </form>

      {/* 8. Divider */}
      <div className="mt-7">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10" />
          </div>
          <div className="relative flex justify-center text-[11px] uppercase tracking-[0.25em]">
            <span className="px-4 bg-black text-white/40">{isRTL ? "أو تابع باستخدام" : "or continue with"}</span>
          </div>
        </div>

        {/* 9. Social buttons: Google + Facebook */}
        <div className="grid grid-cols-2 gap-3 mt-5">
          <button
            type="button"
            onClick={handleGoogle}
            className="h-12 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/20 transition-all flex items-center justify-center gap-2 text-white/85 text-sm font-medium backdrop-blur-sm"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
            </svg>
            <span>Google</span>
          </button>
          <button
            type="button"
            onClick={handleFacebook}
            className="h-12 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/20 transition-all flex items-center justify-center gap-2 text-white/85 text-sm font-medium backdrop-blur-sm"
          >
            <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            <span>Facebook</span>
          </button>
        </div>
      </div>

      {/* 10. Bottom text */}
      <div className="mt-7 text-center">
        <span className="text-white/50 text-sm">{isRTL ? "ليس لديك حساب؟ " : "Don't have an account? "}</span>
        <button
          type="button"
          onClick={onSwitchToSignup}
          className="text-sm font-semibold text-gradient-orange hover:opacity-80 transition-opacity"
        >
          {isRTL ? "إنشاء حساب" : "Create Account"}
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
