import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";

export interface Product {
  id: string;
  nombre: string;
  precioCompra: number;
  precioVenta: number;
  medida: string;
  stock: number;
  imagen: string;
  categoriesId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductState {
  products: Product[];
  loading: boolean;
}

const initialState: ProductState = {
  products: [],
  loading: false,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setProducts, setLoading } = productsSlice.actions;

export default productsSlice.reducer;

export const getAllProducts = (): any => async (dispatch:any) => {
  dispatch(setLoading(true));
  const token = localStorage.getItem("token");
  try {
    axios
      .get("/products/all", { headers: { Authorization: token } })
      .then((res) => {
        dispatch(setProducts(res.data));
      })
      .catch((err) => {
        Swal.fire({
          icon: "warning",
          text: err.message,
        });
      });
  } catch (error: any) {
    console.log(error);
    Swal.fire({
      icon: "warning",
      text: error.message,
    });
  }
};

export const putProduct =
  (id: any, data:any): any => async (dispatch:any) => {
    dispatch(setLoading(true));
    const token = localStorage.getItem("token");
    console.log(id,data)
    try {
      axios
        .put(`/products/${id}`, data, { headers: { Authorization: token } })
        .then(() => {
          Swal.fire({
            icon: "success",
            text: "Producto modificado con exito",
          });
          dispatch(getAllProducts());
        })
        .catch((err) => {
          Swal.fire({
            icon: "warning",
            text: err.message,
          });
        });
    } catch (error: any) {
      console.log(error);
      Swal.fire({
        icon: "warning",
        text: error.message,
      });
    }
  };

  export const putStockProduct =
  (id: any, data:any): any => async (dispatch:any) => {
    dispatch(setLoading(true));
    const token = localStorage.getItem("token");
    try {
      axios
        .put(`/products/stock/${id}`, data, { headers: { Authorization: token } })
        .then(() => {
          Swal.fire({
            icon: "success",
            text: "Producto vendido con exito",
          });
          dispatch(getAllProducts());
        })
        .catch((err) => {
          Swal.fire({
            icon: "warning",
            text: err.message,
          });
        });
    } catch (error: any) {
      console.log(error);
      Swal.fire({
        icon: "warning",
        text: error.message,
      });
    }
  };

  export const postProduct =
  (data:any): any => async (dispatch:any) => {
    dispatch(setLoading(true));
    const token = localStorage.getItem("token");
    try {
      axios
        .post(`/products`, data, { headers: { Authorization: token } })
        .then(() => {
          Swal.fire({
            icon: "success",
            text: "Producto agregado con exito",
          });
          dispatch(getAllProducts());
        })
        .catch((err) => {
          Swal.fire({
            icon: "warning",
            text: err.message,
          });
        });
    } catch (error: any) {
      console.log(error);
      Swal.fire({
        icon: "warning",
        text: error.message,
      });
    }
  };

  export const deleteProduct =
  (id:any): any => async (dispatch:any) => {
    dispatch(setLoading(true));
    const token = localStorage.getItem("token");
    try {
      axios
        .delete(`/products/${id}`, { headers: { Authorization: token } })
        .then(() => {
          Swal.fire({
            icon: "success",
            text: "Producto eliminado con exito",
          });
          dispatch(getAllProducts());
        })
        .catch((err) => {
          Swal.fire({
            icon: "warning",
            text: err.message,
          });
        });
    } catch (error: any) {
      console.log(error);
      Swal.fire({
        icon: "warning",
        text: error.message,
      });
    }
  };

/*
export const putAuth = (user:any): Thunk => async (dispatch) => {
  dispatch(setLoadingAuth(true))
  const token = localStorage.getItem('token')
  try {
    axios.put(`/auth`, user , {headers: {'Authorization':token}})
    .then((res) => {
      dispatch(setAuth(res.data.auth))
      dispatch(setLoadingAuth(false))
      Swal.fire({
        icon: 'success',
        title: 'Datos actualizados',
        text:res.data.message,
        showConfirmButton: true,
        confirmButtonText: 'Continuar!',
      })
    })
    .catch(err=>{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.response.data.message,
        showClass: {
          popup: "active"
        }
      })
      dispatch(setLoadingAuth(false))
    })
  } catch (error) {
    console.log(error)
    dispatch(setLoadingAuth(false))
  }
}
*/
