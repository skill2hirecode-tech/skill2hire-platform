'use client';

import { useState, useEffect } from 'react';
import { Cookie, X } from 'lucide-react';
import Cookies from 'js-cookie';

export default function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    const consent = Cookies.get('cookie-consent');
    if (!consent) {
      setShowConsent(true);
    }
  }, []);

  const acceptCookies = () => {
    Cookies.set('cookie-consent', 'accepted', { expires: 365 });
    setShowConsent(false);
  };

  const declineCookies = () => {
    Cookies.set('cookie-consent', 'declined', { expires: 365 });
    setShowConsent(false);
  };

  if (!showConsent) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-navy text-white p-4 md:p-6 shadow-lg z-50 animate-fade-in">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-start space-x-4 flex-1">
            <Cookie className="flex-shrink-0 mt-1" size={24} />
            <div>
              <h3 className="font-bold text-lg mb-1">Cookie Consent</h3>
              <p className="text-sm text-gray-300">
                We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. 
                By clicking "Accept All", you consent to our use of cookies. Read our{' '}
                <a href="/privacy" className="text-secondary hover:underline">
                  Privacy Policy
                </a>{' '}
                and{' '}
                <a href="/cookies" className="text-secondary hover:underline">
                  Cookie Policy
                </a>
                .
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3 flex-shrink-0">
            <button
              onClick={declineCookies}
              className="px-4 py-2 border border-white/30 rounded-lg hover:bg-white/10 transition-colors text-sm font-medium"
            >
              Decline
            </button>
            <button
              onClick={acceptCookies}
              className="px-6 py-2 bg-secondary hover:bg-secondary-600 rounded-lg transition-colors text-sm font-medium"
            >
              Accept All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
