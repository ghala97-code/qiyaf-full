import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { LanguageProvider } from '@/contexts/LanguageContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import SignupForm from '@/components/SignupForm';
import LoginForm from '@/components/LoginForm';
import ForgotPasswordForm from '@/components/ForgotPasswordForm';
import Dashboard from '@/components/Dashboard';
import IntroPage from '@/components/IntroPage';
import LandingPage from '@/components/LandingPage';
import AuthLayout from '@/components/AuthLayout';

type AuthView = 'intro' | 'signup' | 'login' | 'forgot-password';

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [authView, setAuthView] = useState<AuthView>('intro');
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const auth = searchParams.get('auth');
    if (auth === 'login' || auth === 'signup') {
      setAuthView(auth);
      const next = new URLSearchParams(searchParams);
      next.delete('auth');
      setSearchParams(next, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  const handleSignup = (name: string, email: string) => {
    setUserName(name);
    setUserEmail(email);
    setIsLoggedIn(true);
  };

  const handleLogin = (name: string, email: string) => {
    setUserName(name);
    setUserEmail(email);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName('');
    setUserEmail('');
    setAuthView('intro');
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background">
        {!isLoggedIn ? (
          authView === 'intro' ? (
            <LandingPage
              onGetStarted={() => setAuthView('signup')}
              onLogin={() => setAuthView('login')}
            />
          ) : (
            <AuthLayout>
              <div className="absolute top-4 right-4 z-20">
                <LanguageSwitcher />
              </div>
              {authView === 'signup' && (
                <SignupForm
                  onSignup={handleSignup}
                  onSwitchToLogin={() => setAuthView('login')}
                />
              )}
              {authView === 'login' && (
                <LoginForm
                  onLogin={handleLogin}
                  onSwitchToSignup={() => setAuthView('signup')}
                  onForgotPassword={() => setAuthView('forgot-password')}
                />
              )}
              {authView === 'forgot-password' && (
                <ForgotPasswordForm
                  onBackToLogin={() => setAuthView('login')}
                />
              )}
            </AuthLayout>
          )
        ) : (
          <Dashboard
            userName={userName}
            userEmail={userEmail}
            onLogout={handleLogout}
          />
        )}
      </div>
    </LanguageProvider>
  );
};

export default Index;
