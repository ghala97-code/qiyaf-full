import { ReactNode } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import authBgEmblem from '@/assets/auth-bg-emblem.png';

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  const { isRTL } = useLanguage();

  return (
    <div
      className="relative min-h-screen w-full overflow-hidden bg-black text-white"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Uploaded artwork — large bottom-right emblem with sweeping curves */}
      <img
        src={authBgEmblem}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center opacity-30 sm:opacity-95 sm:left-auto sm:right-0 sm:top-0 sm:inset-auto sm:h-full sm:w-[55%] sm:object-right select-none"
        style={{
          filter:
            'drop-shadow(0 20px 60px rgba(255,152,0,0.18)) drop-shadow(0 10px 40px rgba(17,197,217,0.18))',
        }}
      />

      {/* Left-column form layout (matches reference) */}
      <div className="relative z-10 flex min-h-screen items-center px-6 sm:px-12 lg:px-20 py-12">
        <div className="w-full max-w-[440px]">
          {children}
        </div>
      </div>

      {/* Tiny footer */}
      <div className="absolute bottom-6 left-6 right-6 z-10 flex items-center justify-between text-[11px] uppercase tracking-[0.25em] text-white/30">
        <span>© Qiyaf</span>
        <div className="flex items-center gap-3">
          <span>UAV</span>
          <span className="w-1 h-1 rounded-full bg-white/30" />
          <span>AI Vision</span>
          <span className="w-1 h-1 rounded-full bg-white/30" />
          <span>Solar</span>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
