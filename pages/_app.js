import '../styles/globals.css'
import 'primereact/resources/themes/lara-dark-teal/theme.css'
import "primereact/resources/primereact.min.css";     
import '/node_modules/primeflex/primeflex.css'
import "primeicons/primeicons.css";
import PrimeReact from 'primereact/api';
import { Ripple } from 'primereact/ripple';
PrimeReact.ripple = true;

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
