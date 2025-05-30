import type { Metadata } from 'next'
import './globals.css'
import Clarity from '@microsoft/clarity';
import Script from "next/script";
export const metadata: Metadata = {
  title: 'হৃদয়ে নাম্বারস্কিলস',
  description: "Team Numberskills' desk Occupancy and Memories"
}
Clarity.init('rrn9qbf9m9');
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <Script id="microsoft-clarity-analytics">
  {`
      (function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window, document, "clarity", "script", "rrn9qbf9m9");
  `}
</Script>
      <body>{children}</body>
    </html>
  )
}
