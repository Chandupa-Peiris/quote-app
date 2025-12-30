import Navibar from "@/components/Navbar";
import "@/styles/globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';


export default function App({ Component, pageProps }) {
  return (<> 
  <Navibar />
  <Component {...pageProps} />
   
  </>
    
  )
}
