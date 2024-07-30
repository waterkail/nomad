
import React, { useEffect, useState } from 'react';



import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Layout from '@/components/Layout';
import Modal from '@/components/DialogsModal';
import ModalContextProvider from '@/context/modalContext';
import darkModeStore from '@/context/themeContext';
import LoadingScreen from '@/components/LoadingScreen';
import { useRouter } from 'next/router';



export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient());
  const { isDarkMode } = darkModeStore();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);
  
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    handleComplete(); // initial load

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router.events]);


  const renderContent = () => {
    switch (pageProps.layoutType) {
      case 'removeLayout':
        return <Component {...pageProps} />;
      default:
        return (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        );
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={pageProps.dehydratedState}>
        <ModalContextProvider>
          {loading && <LoadingScreen />}
          {renderContent()}
          <Modal />
        </ModalContextProvider>
      </HydrationBoundary>

      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
