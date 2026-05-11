import { useLanguage } from '@/contexts/LanguageContext';
import heroVideo from '@/assets/hero-intro.mp4';
import qiyafLogo from '@/assets/qiyaf-logo-new.png';

interface IntroPageProps {
  onStart: () => void;
}

const IntroPage = ({ onStart }: IntroPageProps) => {
  const { language } = useLanguage();
  
  const buttonText = language === 'ar' ? 'ابدأ الآن' : 'Start Now';

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background">
      {/* Background video */}
      <video
        src={heroVideo}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Logo positioned at top-center (transparent, no background) */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20">
        <img
          src={qiyafLogo}
          alt="Qiyaf"
          className="h-96 md:h-[28rem] w-auto object-contain drop-shadow-2xl"
        />
      </div>

      {/* Content at the bottom */}
      <div className="relative z-10 flex flex-col items-center justify-end min-h-screen px-8 pb-24">
        <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight text-center drop-shadow-lg px-4">
          Qiyaf
        </h1>
        <p className="text-white/95 text-lg md:text-xl mb-10 text-center max-w-xl drop-shadow-md">
          Smart Vision from the UAV powered Solar Panel Inspection
        </p>
        <button
          onClick={onStart}
          className="py-3 px-10 bg-accent text-accent-foreground font-bold text-lg rounded-xl shadow-lg hover:bg-accent/90 transition-all duration-300 flex items-center gap-3"
        >
          <span>{buttonText}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`w-5 h-5 ${language === 'ar' ? 'rotate-180' : ''}`}
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default IntroPage;
