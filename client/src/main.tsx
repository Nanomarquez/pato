import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { HashRouter } from "react-router-dom";
import axios from "axios";
import { Provider } from 'react-redux'
import store from './redux/store'
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
  <HashRouter>
    <App />
  </HashRouter>
 </Provider>
  ,
)
