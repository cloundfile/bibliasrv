import './globals.css';
import AccessibilityProvider from '@/components/AccessibilityProvider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Bíblia Sagrada — ARC',
  description: 'Leia a Bíblia Sagrada online. Tradução Revisada e Corrigida. Interface acessível para todos.',
  keywords: ['bíblia', 'sagrada', 'ARC', 'Revisada e Corrigida', 'bíblia online', 'versículos'],
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" data-font-size="medium" data-high-contrast="false">
      <body>
        <AccessibilityProvider>
          <a href="#main-content" className="skip-link">
            Pular para o conteúdo principal
          </a>
          <Header />
          <main id="main-content" role="main" style={{ flex: 1 }}>
            {children}
          </main>
          <Footer />
        </AccessibilityProvider>
      </body>
    </html>
  );
}
