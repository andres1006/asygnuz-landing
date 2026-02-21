import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Asygnuz | Ingeniería de Crecimiento para Empresas High-Ticket",
  description:
    "Deja de perder dinero por embudos lentos y seguimientos manuales. Construimos la Infraestructura de Adquisición que tu negocio necesita para escalar de forma predecible.",
  keywords: [
    "ingeniería de crecimiento",
    "landing pages",
    "embudos de venta",
    "B2B",
    "high-ticket",
    "automatización",
    "CRM",
    "tracking",
    "core web vitals",
  ],
  openGraph: {
    title: "Asygnuz | Ingeniería de Crecimiento",
    description:
      "Tu marketing genera clics. Nuestra ingeniería genera clientes recurrentes.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
