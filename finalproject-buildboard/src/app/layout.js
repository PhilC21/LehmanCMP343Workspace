import "./globals.css";
import Sidebar from "@/components/Sidebar";

export const metadata = {
  title: "BuildBoard",
  description: "Track your builds. Ship with clarity.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* App shell: sidebar on the left, page content on the right */}
        <div className="flex">
          <Sidebar />
          {children}
        </div>
      </body>
    </html>
  );
}