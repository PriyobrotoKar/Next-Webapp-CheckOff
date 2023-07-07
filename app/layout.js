import { AuthUserProvider } from "@/firebase/auth";
import "./globals.css";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "CheckOff",
  description:
    "CheckOff is a modern task management app with a user-friendly interface developed using React and Next JS. Tasks are stored and retrieved using a backend built with Next JS and Firebase. The app supports task creation, updating, and deletion, as well as organization through lists or tags. Users can create an account to sync their tasks across all devices.",
  keywords: ["Next.js", "React", "JavaScript", "Todo", "Todolist"],
  openGraph: {
    title: "CheckOff",
    description:
      "CheckOff is a modern task management app with a user-friendly interface developed using React and Next JS. Tasks are stored and retrieved using a backend built with Next JS and Firebase. The app supports task creation, updating, and deletion, as well as organization through lists or tags. Users can create an account to sync their tasks across all devices.",
    url: "https://check-off.vercel.app/",
    images: [
      {
        url: "https://nextjs.org/og.png",
        width: 800,
        height: 600,
      },
      {
        url: "https://nextjs.org/og-alt.png",
        width: 1800,
        height: 1600,
        alt: "My custom alt",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CheckOff",
    description:
      "CheckOff is a modern task management app with a user-friendly interface developed using React and Next JS. Tasks are stored and retrieved using a backend built with Next JS and Firebase. The app supports task creation, updating, and deletion, as well as organization through lists or tags. Users can create an account to sync their tasks across all devices.",
    images: ["https://nextjs.org/og.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AuthUserProvider>
        <body className={poppins.className}>{children}</body>
      </AuthUserProvider>
    </html>
  );
}
