'use client';
import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

const ID = 112576963;
declare global { interface Window { ym?: (id: number, method: string, ...args: unknown[]) => void } }

/** Yandex.Metrika: loads the tag and reports SPA route changes as page views. */
export function Metrika() {
  const path = usePathname();
  const first = useRef(true);
  useEffect(() => {
    if (first.current) { first.current = false; return; }
    try { window.ym?.(ID, 'hit', location.href, { referer: document.referrer }); } catch {}
  }, [path]);
  return <>
    <Script id="ym-init" strategy="afterInteractive">{`(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*new Date();for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return;}}k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})(window,document,"script","https://mc.yandex.ru/metrika/tag.js?id=${ID}","ym");ym(${ID},"init",{ssr:true,webvisor:true,clickmap:true,accurateTrackBounce:true,trackLinks:true});`}</Script>
    <noscript><div><img src={`https://mc.yandex.ru/watch/${ID}`} style={{ position: 'absolute', left: -9999 }} alt="" /></div></noscript>
  </>;
}
