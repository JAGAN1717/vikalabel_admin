import type { AppProps } from 'next/app';
import 'react-toastify/dist/ReactToastify.css';
import '@/assets/css/main.css';
import { UIProvider } from '@/contexts/ui.context';
import { SettingsProvider } from '@/contexts/settings.context';
import ErrorMessage from '@/components/ui/error-message';
import PageLoader from '@/components/ui/page-loader/page-loader';
import { ToastContainer } from 'react-toastify';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Hydrate } from 'react-query/hydration';
import { useSettingsQuery } from '@/data/settings';
import { ReactQueryDevtools } from 'react-query/devtools';
import { appWithTranslation } from 'next-i18next';
import { ModalProvider } from '@/components/ui/modal/modal.context';
import DefaultSeo from '@/components/ui/default-seo';
import ManagedModal from '@/components/ui/modal/managed-modal';
import { CartProvider } from '@/contexts/quick-cart/cart.context';
import { useState } from 'react';
import type { NextPageWithLayout } from '@/types';
import { useRouter } from 'next/router';
import PrivateRoute from '@/utils/private-route';
import { Config } from '@/config';
import { ArrowUp } from '@/components/icons/arrow-up';


const Noop: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <>{children}</>
);

if (typeof window !== "undefined") {
  // require("popper.js");
  require("bootstrap/dist/js/bootstrap");
}

const AppSettings: React.FC<{ children?: React.ReactNode }> = (props) => {
  const { query, locale } = useRouter();
  const { settings, loading, error } = useSettingsQuery({ language: locale! });
  if (loading) return <PageLoader />;
  if (error) return <ErrorMessage message={error.message} />;
  // TODO: fix it
  // @ts-ignore
  return <SettingsProvider initialValue={settings?.options} {...props} />;
};
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};
const CustomApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  const Layout = (Component as any).Layout || Noop;
  const authProps = (Component as any).authenticate;
  const [queryClient] = useState(() => new QueryClient());
  const getLayout = Component.getLayout ?? ((page) => page);

  if (typeof window === "undefined") {
    return null;
  }
  
  window.onscroll = function() {scrollFunction()};
  
  let mybutton = document.getElementById("myBtn");
  
  function scrollFunction() {
    if(mybutton){
      if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        // mybutton.style.display = "block";
                mybutton?.classList.add('block')
        mybutton?.classList.remove('hidden')
      } else {
        // mybutton.style.display = "none";
        mybutton?.classList.remove('block')
        mybutton?.classList.add('hidden')
      }
    }
}


  // function topFunction() {
  //   document.body.scrollTop = 0;
  //   document.documentElement.scrollTop = 0;
  // }

  function topFunction() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
  }

  const { locale } = useRouter();
  const dir = Config.getDirection(locale);
  return (
    <div dir={dir}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps?.dehydratedState}>
          <AppSettings>
            <UIProvider>
              <ModalProvider>
                <>
                  <CartProvider>
                    <DefaultSeo />
                    {authProps ? (
                      <PrivateRoute authProps={authProps}>
                        <Layout {...pageProps}>
                          <Component {...pageProps} />
                        </Layout>
                      </PrivateRoute>
                    ) : (
                      <Layout {...pageProps}>
                        <Component {...pageProps} />
                      </Layout>
                    )}
                    <ToastContainer autoClose={2000} theme="colored" />
                    <ManagedModal />
                  </CartProvider>
                </>
              </ModalProvider>
            </UIProvider>
          </AppSettings>
          {/* <ReactQueryDevtools /> */}
        </Hydrate>
      </QueryClientProvider>
      {
        window.location.pathname  != '/login' && 
          <button onClick={()=>topFunction()} id="myBtn" className='flex justify-content align-items-center fixed bg-accent rounded-full hidden bottom-3 right-0 h-12 p-5 w-12 ' title="Go to top">
          {/* <i className="fa fa-angle-double-up" aria-hidden="true"></i> */}
          {/* <img src='/image/up-arrows.png' className='' /> */}
          <ArrowUp className="text-light" />
         
          </button>
      }
    </div>
  );
};

export default appWithTranslation(CustomApp);
