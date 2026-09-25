import React, { useEffect } from 'react';
import { useApp } from '../../context/AppContext';

declare global {
  interface Window {
    adsbygoogle?: any[];
  }
}

const ADSENSE_CLIENT_ID = 'ca-pub-6821378339078973';

/**
 * GoogleAdSenseTracker ensures the Google AdSense script is active
 * and registers route changes across all pages of the Single Page Application (SPA).
 */
export const GoogleAdSenseTracker: React.FC = () => {
  const { currentRoute } = useApp();

  useEffect(() => {
    // 1. Ensure the script tag exists in <head>
    const existingScript = document.querySelector(
      `script[src*="pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}"]`
    );

    if (!existingScript) {
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`;
      script.crossOrigin = 'anonymous';
      document.head.appendChild(script);
    }

    // 2. On route change, notify Google AdSense Auto Ads engine for SPA navigation
    try {
      if (typeof window !== 'undefined' && window.adsbygoogle) {
        // Trigger auto ads recalculation/page change if available
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch {
      // Safe fallback if AdSense script is still loading or adblocker is active
    }
  }, [currentRoute]);

  return null;
};
