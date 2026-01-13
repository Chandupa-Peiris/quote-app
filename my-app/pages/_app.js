import Navibar from "@/components/Navbar";
import RouteGuard from "@/components/RouteGard";
import "@/styles/globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';


export default function App({ Component, pageProps }) {
  return (<> 
  <Navibar />
  <RouteGuard><Component {...pageProps} /></RouteGuard>
   
  </>
    
  )
}
