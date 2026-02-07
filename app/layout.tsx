import "./globals.css";

import AppShell from "@/components/layout/AppShell";
import StickyHeader from "@/components/layout/StickyHeader";
import { syncClerkUser } from "@/lib/auth";

export const metadata = {
  title: "AgroSNS",
  description: "農業資材・農薬レビュー × SNS"
};

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  if (process.env.DEMO_MODE === "true") {
    return (
      <html lang="ja">
        <body>
          <AppShell>
            <StickyHeader title="AgroSNS" />
            {children}
          </AppShell>
        </body>
      </html>
    );
  }

  const { ClerkProvider, auth } = await import("@clerk/nextjs");
  const { userId } = auth();
  if (userId) {
    await syncClerkUser(userId);
  }

  return (
    <ClerkProvider>
      <html lang="ja">
        <body>
          <AppShell>
            <StickyHeader title="AgroSNS" />
            {children}
          </AppShell>
        </body>
      </html>
    </ClerkProvider>
  );
};

export default RootLayout;
