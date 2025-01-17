'use client';

import { ENV } from '@/constants/env';
import Script from 'next/script';

const TinybirdScript = () => {
  /* <script async src="https://us.umami.is/script.js" data-website-id="cabb0777-5ca8-4451-a484-8a2cc191450e"></script> */
  if (ENV.isProd) {
    return (
      <Script
        strategy="lazyOnload"
        src="https://unpkg.com/@tinybirdco/flock.js"
        data-host="https://api.tinybird.co"
        data-token="p.eyJ1IjogIjZhNTRjM2NmLTlhMDYtNGE0Mi04ODQzLWIyYmMxOGVkZmVlOSIsICJpZCI6ICIzOWUwOTg3OS03NGI3LTRjNjYtOWYxZi0yOGY1ZmE2N2U1ODkiLCAiaG9zdCI6ICJldV9zaGFyZWQifQ._M_tCmySZ4raos65WLsYjJm3C879zHqagasGQQhjgVc"
        onLoad={() => {
          console.log('Tinybird script loaded');
        }}
        onError={(e: Error) => {
          console.error('Tinybird script failed to load', e);
        }}
      />
    );
  }
  return null;
};

export default TinybirdScript;
