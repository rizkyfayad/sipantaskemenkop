import './globals.css';
import Sidebar from '@/components/Sidebar';
import { ThemeProvider } from '@/components/ThemeProvider';

export const metadata = {
  title: 'SI PANTAS UKK',
  description: 'Sistem Informasi Pengelolaan Administrasi dan Verifikasi UKK - Kementerian Koperasi dan UKM',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body style={{ margin: 0, padding: 0 }}>
        <ThemeProvider>
          <Sidebar />
          <main style={{
            minHeight: '100vh',
            width: '100%',
            overflowX: 'hidden',
          }}>
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
