import Head from 'next/head'
import { Fragment, useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import { RecoilRoot } from 'recoil'
import '../styles/globals.css'
import { useRouter } from 'next/router'
import {cookie} from '../apis/cookies'
import 'react-toastify/dist/ReactToastify.css';

function getRedirectedTo(authToken, pathname) {
  const loginRoutes = ['/login', '/verify-otp']
  if (authToken) {
    if (['/', ...loginRoutes].includes(pathname)) {
      return '/'
    }
    return pathname
  }
  
  if (loginRoutes.includes(pathname)) {
    return pathname
  }

  return '/login'
}

function MyApp({ Component, pageProps }) {
  const [isLoading , setIsLoading] = useState(true)

  const {isReady,pathname,push} = useRouter()

  const getLayout = Component.getLayout || ((page) => page)

  useEffect(() => {
    function loadPage() {
      const authToken = cookie.taAuthToken;
      const redirectTo = getRedirectedTo(authToken, pathname);
      if (redirectTo === pathname) {
          setIsLoading(false);
          return;
      }
      push(redirectTo);
    }
    loadPage();
  }, [pathname]);

  if(isLoading) return null

  return (
    <RecoilRoot>
      <Head>
        <link rel="icon" href="/svgs/logo.svg" />
          <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
          />
          <meta name="theme-color" content="#000000" />
          {/* <meta
              name="description"
              content="FunctionUp run a Placement Bootcamp, an intensive 4 months training program where you would be working on real-life projects for some top-tier startups. We will further help you get placed in a top-tier firm after the training is completed."
          /> */}
          <title>FunctionUp - Mentor&apos;s dashboard</title>
      </Head>
    {    
      getLayout(
        <Fragment>
            <Component {...pageProps} />
            <ToastContainer />
        </Fragment>
      )
    }
    </RecoilRoot>
  )
}

export default MyApp
