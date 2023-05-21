import { Route, Routes } from "react-router-dom";
import { useAppSelector, useAppDispatch } from './hooks/redux'
import { useEffect } from "react";
import { getAuth } from "./redux/slices/auth";
import { useLocation } from "react-router-dom";
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import Login from "./pages/Login";
import Footer from "./components/Footer";
import Perfil from "./pages/Perfil";
import Products from "./pages/Products";
import Categories from "./pages/Categories";
import Proveedores from "./pages/Proveedores";
import ProveedoresProduct from "./pages/ProveedoresProduct";
import Home from "./pages/Home";
function App() {
  const { token, auth } = useAppSelector((state: any) => state.auth)
  const dispatch = useAppDispatch()
  const location = useLocation()
  useEffect(() => {
    if (token) {
      dispatch(getAuth())
    }
  }, [token])
  return (
    <>
      {auth.id === "" ? (
        <Login />
      ) : (
        <>
          <ResponsiveAppBar />
          <Routes location={location} key={location.pathname}>
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/" element={<Home />} />
            <Route path="/productos" element={<Products />} />
            <Route path="/categorias" element={<Categories />} />
            <Route path="/proveedores" element={<Proveedores />} />
            <Route path="/proveedores/:id" element={<ProveedoresProduct />} />
          </Routes>
        </>
      )
      }
      <Footer />
    </>
  )
}

export default App
