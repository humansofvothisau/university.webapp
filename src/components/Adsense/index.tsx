import React, { useEffect } from "react";

declare global {
  interface Window {
    adsbygoogle: any;
  }
}

const Adsense: React.FC = () => {
  useEffect(() => {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  });
  return (
    <>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-3691095056782321"
        data-ad-slot="9074660262"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </>
  );
};

export default Adsense;
