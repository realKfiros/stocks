import { StyledComponentsRegistry } from "@/lib/registry";
import { GlobalStyle } from "@/lib/global_style";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "STOCKS ‼️",
  description: "Trying to predict the stock market",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <html lang="en">
    <body className={inter.className}>
      <StyledComponentsRegistry>
        <GlobalStyle />
        {children}
      </StyledComponentsRegistry>
    </body>
  </html>;
}
