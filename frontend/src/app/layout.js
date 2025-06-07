import "./globals.css";
import Navbar from "@/components/Navbar";
import Contact from "@/components/Contact";
import SessionWrapper from "./SessionWrapper";
import { AppProvider } from "@/context/AppContext";

export const metadata = {
  title: "חנות ירקות",
  description: "חנות אונליין למשלוחים מהירים",
};

export default function RootLayout({ children }) {
  return (
    <html lang="he" dir="rtl">
      <body>
        <SessionWrapper>
          <AppProvider>
            <Navbar />
  <main className="min-h-[850px] bg-[#F6E8CA]">
              {children}
            </main>            <Contact />
          </AppProvider>
        </SessionWrapper>
      </body>
    </html>
  );
}
