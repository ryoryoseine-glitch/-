import type { Metadata } from 'next';
import './globals.css';
import { MockStoreProvider } from '@/app/_context/MockStore';

export const metadata: Metadata = {
  title: '農業レビューMVP',
  description: '地域タイムライン型レビューMVP'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <MockStoreProvider>
          <div className="mx-auto min-h-screen max-w-md bg-white">{children}</div>
        </MockStoreProvider>
      </body>
    </html>
  );
}
