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
  const fstEvaluatorPaths = [...loginRoutes,'/check-fst-assignment','/fst-assignment','/fst-question-details']
  const prepaidTaPaths = [...loginRoutes,'/','/upcoming-sessions','/unchecked-questions','/question-details','/meeting-calender']
  const roles = JSON.parse(localStorage.getItem('taRoles') || "[]")
  const isPrepaidTa = roles.includes("prepaid-ta")
  const isFstEvaluator = roles.includes("fst-evaluator")
  const isFstTa = roles.includes("fst-ta")
  const fstTaPaths = [...loginRoutes,'/upcoming-sessions','/meeting-calender']

  if (authToken) {
    if(loginRoutes.includes(pathname)){
      if(isPrepaidTa) return '/'
      if(isFstEvaluator) return '/fst-assignment'
      if(isFstTa) return '/meeting-calender'
    }
    if(isPrepaidTa && isFstTa && (prepaidTaPaths.includes(pathname) || fstTaPaths.includes(pathname))){ // If fst and prepaid TA and pathname includes fst or prepaidTaPaths
      return pathname
    }
    if(isPrepaidTa && isFstEvaluator && (prepaidTaPaths.includes(pathname) || fstEvaluatorPaths.includes(pathname))){ //if prepaidTa and fst evaluator and pathname includes any one of them
      return pathname
    }
    if(isPrepaidTa && prepaidTaPaths.includes(pathname)) { //If prepaid ta and pathname includes prepaidTaPaths
      return pathname
    }
    if(isFstTa && fstTaPaths.includes(pathname)){ // If fstTa and pathname includes fstTaPaths
      return pathname
    }
    if(isFstEvaluator && fstEvaluatorPaths.includes(pathname)){ // If fstEvaluator and pathname includes fstEvaluators
      return pathname
    }
    if (!isPrepaidTa && !isFstTa && (prepaidTaPaths.includes(pathname) || fstTaPaths.includes(pathname)) ) { //If fst evaluator and trying to access fstTaPath or prepaidTaPath then return to fst-assignment
      return '/fst-assignment'
    }
    if (isPrepaidTa && (fstEvaluatorPaths.includes(pathname) || fstTaPaths.includes(pathname))) {  //If Prepaid TA and trying to access fst evaluators or ta path, send to home page
      return "/"
    }
    if (!isPrepaidTa && !isFstEvaluator && (prepaidTaPaths.includes(pathname) || fstEvaluatorPaths.includes(pathname))) { //If fst TA and trying to access fst evaluators or ta path, send to meetings page
      return '/meeting-calender'
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
