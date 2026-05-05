import "./globals.css";
import Sidebar from "@/components/Sidebar";
import MobileHeader from "@/components/MobileHeader";

export const metadata = {
  title: "BuildBoard",
  description: "Track your builds. Ship with clarity.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-slate-100 md:flex">
          <Sidebar />

          <div className="flex-1">
            <MobileHeader />
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}