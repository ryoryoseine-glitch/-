import { ReactNode } from "react";

import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";

const AppShell = ({ children }: { children: ReactNode }) => {
  return (
    <div className="mx-auto flex min-h-screen max-w-6xl gap-6 px-4 py-4">
      <LeftSidebar />
      <main className="w-full max-w-2xl flex-1">{children}</main>
      <RightSidebar />
    </div>
  );
};

export default AppShell;
