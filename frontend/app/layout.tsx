import type { Metadata } from "next";
import { Josefin_Sans } from "next/font/google";
import "./globals.css";
import "./styles/embla.css";

const josefinSans = Josefin_Sans({
  variable: "--font-josefin-sans",
  subsets: ["latin"],
  display: "swap",
});


export const metadata: Metadata = {
  title: "🛰️ NASA HUNCH Norway",
  description:
      "Empowering students through hands-on engineering, innovation, and collaboration inspired by NASA HUNCH.",

  openGraph: {
    title: "🛰️ NASA HUNCH Norway",
    description:
        "Empowering students through hands-on engineering, innovation, and collaboration inspired by NASA HUNCH.",
    type: "website",
    images: [
      {
        url: "/NasaHunchOG.png",
        width: 1200,
        height: 630,
        alt: "NASA HUNCH Norway",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "NASA HUNCH Norway",
    description:
        "Empowering students through hands-on engineering, innovation, and collaboration inspired by NASA HUNCH.",
    images: ["/NasaHunchOG.png"],
  },
};

const themeScript = `
  try {
    if (localStorage.getItem("nasa-hunch-theme") === "light") {
      document.documentElement.classList.add("light");
    }
  } catch {}
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${josefinSans.variable} dark h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="mx-auto min-h-full w-full max-w-[100rem] bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
