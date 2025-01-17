  import type { Metadata } from 'next';
  import { Providers } from '@/app/providers';
  import './globals.css';
  import Navbar from '@/components/Navbar';

  export const metadata: Metadata = {
    title: 'Solude',
    description: 'Plataforma de saúde inovadora dedicada a aprimorar a gestão de saúde por meio de soluções baseadas em dados.'
  };

  function RootLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <html lang='pt-BR'>
        <body style={{ fontFamily: 'Inter, sans-serif' }}>
          <Providers>
            <Navbar />
            {children}
          </Providers>
        </body>
      </html>
    );
  }

  export default RootLayout;