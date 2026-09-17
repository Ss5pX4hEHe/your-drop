'use client';
import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';

const ID = 112756963;
declare global { interface Window { ym?: (id: number, method: string, ...args: unknown[]) => void } }

/** Yandex.Metrika with SPA page hits on client-side navigation. */
export function Metrika() {
  const path = usePathname(); const search = useSearchParams();
  const first = useRef(true);
  useEffect(() => {
    if (first.current) { first.current = false; return; }
    const url = path + (search?.toString() ? `?${search}` : '');
    try { window.ym?.(ID, 'hit', url, { referer: document.referrer }); } catch {}
  }, [path, search]);
  return <>
    <Script id="yandex-metrika" strategy="afterInteractive">{`
      (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*new Date();
      for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
      k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
      (window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=${ID}', 'ym');
      ym(${ID}, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});
    `}</Script>
    <noscript><div><img src={`https://mc.yandex.ru/watch/${ID}`} style={{ position: 'absolute', left: -9999 }} alt="" /></div></noscript>
  </>;
}
