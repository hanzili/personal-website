import "@mantine/core/styles.css";
import "./globals.css";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { Shell } from "@/components/Shell";

export const metadata = {
  title: "Hanzi Li",
  description: "my personal website!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider><Shell>{children}</Shell></MantineProvider>
      </body>
    </html>
  );
}
