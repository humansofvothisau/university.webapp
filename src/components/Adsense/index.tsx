import React, { useEffect } from "react";
import { useLocation } from "react-router";

declare global {
  interface Window {
    adsbygoogle: any;
  }
}

const Adsense: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, [location.pathname]);

  return (
    <div key={location.pathname}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-3691095056782321"
        data-ad-slot="9074660262"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
};

export default Adsense;
