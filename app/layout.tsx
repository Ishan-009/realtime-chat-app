import { TooltipProvider } from '@radix-ui/react-tooltip';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import SidebarWrapper from '../components/shared/sidebar/SidebarWrapper';
import { Toaster } from '../components/ui/sonner';
import { ThemeProvider } from '../components/ui/theme/theme-provider';
import { ConvexClientProvider } from '../providers/ConvexClientProvider';
import './globals.css';
const inter = Inter({ subsets: ['latin'] });
export const metadata: Metadata = {
  title: 'Chat App',
  description: 'Realtime chat app using Nextjs',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ConvexClientProvider>
            <TooltipProvider>
              <SidebarWrapper>{children}</SidebarWrapper>
            </TooltipProvider>
            <Toaster richColors></Toaster>
          </ConvexClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
