

import { ReactNode } from "react";
import Providers from "./store/Provider";
import { Sidebar } from "./Sidebar";

interface ClientLayoutProps {
  children: ReactNode;
}

export default function ClientLayout({ children }: any) {
  return (
    <Providers>
      <div className="flex h-screen bg-background">
        <Sidebar />
        <main className="flex-1 h-full overflow-auto">{children}</main>
      </div>
    </Providers>
  );
}