import type { Metadata } from "next";
import LeadModal from "@/components/LeadModal";
import { LeadModalProvider } from "@/context/LeadModalContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "Asygnuz | Infraestructura de Growth Engineering",
  description:
    "Integramos Desarrollo de Software, Agentes de Inteligencia Artificial y Performance Marketing para crear sistemas de ventas inquebrantables. Para empresas B2B que hablan en serio.",
  keywords: [
    "Growth Engineering B2B",
    "Desarrollo de software y growth",
    "Ingeniería aplicada a las ventas",
    "automatización",
    "CRM",
  ],
  openGraph: {
    title: "Asygnuz | Growth Engineering",
    description:
      "No somos una agencia. Somos tu infraestructura de Growth Engineering.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "name": "Asygnuz",
        "url": "https://asygnuz.com",
        "logo": "https://asygnuz.com/logos/AsygnuzLogo1-010.png",
        "description": "Infraestructura de Growth Engineering integrando Software, IA y MarTech.",
        "slogan": "Ingeniería aplicada a las ventas"
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "¿Qué es el Growth Engineering y por qué supera al marketing tradicional?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "El Growth Engineering une desarrollo de software de alto rendimiento, IA autónoma y estrategias de adquisición técnicas. Supera al marketing tradicional porque no solo genera tráfico, sino que construye la infraestructura tecnológica necesaria para retener, calificar y convertir clientes de forma escalable."
            }
          },
          {
            "@type": "Question",
            "name": "¿Cómo integra Asygnuz tecnología y ventas en un solo sistema?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Construimos arquitecturas web ultrarrápidas (Software Core), implementamos agentes de IA para atención 24/7 (Autonomous AI), y orquestamos campañas de adquisición con tracking avanzado (Growth & MarTech) para crear un embudo unificado."
            }
          },
          {
            "@type": "Question",
            "name": "¿Qué tipo de empresas se benefician de esta infraestructura de crecimiento?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Empresas B2B, Clínicas de Alta Especialidad y Creadores High-Ticket que ya tienen un producto validado pero están perdiendo dinero por culpa de embudos lentos, seguimientos manuales o falta de trazabilidad en su inversión en marketing."
            }
          }
        ]
      }
    ]
  };

  return (
    <html lang="es" className="dark scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-black text-white antialiased">
        <LeadModalProvider>
          {children}
          <LeadModal />
        </LeadModalProvider>
      </body>
    </html>
  );
}
