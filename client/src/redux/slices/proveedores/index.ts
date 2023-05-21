import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";

export interface Proveedor {
  id: string;
  nombre: string;
  precio_sugerido: number;
  cantidad_productos: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProveedoresState {
  proveedores: Proveedor[];
  loading: boolean;
}

const initialState: ProveedoresState = {
  proveedores: [],
  loading: false,
};

const proveedoresSlice = createSlice({
  name: "proveedores",
  initialState,
  reducers: {
    setProveedores: (state, action: PayloadAction<Proveedor[]>) => {
      state.proveedores = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setProveedores, setLoading } = proveedoresSlice.actions;

export default proveedoresSlice.reducer;

export const getAllProveedores = (): any => async (dispatch: any) => {
  dispatch(setLoading(true));
  const token = localStorage.getItem("token");
  try {
    axios
      .get("/proveedores/all", { headers: { Authorization: token } })
      .then((res) => {
        dispatch(setProveedores(res.data));
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

export const putProveedor =
  (id: any, data: any): any =>
  async (dispatch: any) => {
    dispatch(setLoading(true));
    const token = localStorage.getItem("token");
    console.log(id, data);
    try {
      axios
        .put(`/proveedores/${id}`, data, { headers: { Authorization: token } })
        .then(() => {
          Swal.fire({
            icon: "success",
            text: "Proveedores modificado con exito",
          });
          dispatch(getAllProveedores());
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

export const postProveedor =
  (data: any): any =>
  async (dispatch: any) => {
    dispatch(setLoading(true));
    const token = localStorage.getItem("token");
    try {
      axios
        .post(`/proveedores`, data, { headers: { Authorization: token } })
        .then(() => {
          Swal.fire({
            icon: "success",
            text: "Proveedor agregado con exito",
          });
          dispatch(getAllProveedores());
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

export const deleteProveedor =
  (id: any): any =>
  async (dispatch: any) => {
    dispatch(setLoading(true));
    const token = localStorage.getItem("token");
    try {
      axios
        .delete(`/proveedores/${id}`, { headers: { Authorization: token } })
        .then(() => {
          Swal.fire({
            icon: "success",
            text: "Proveedor eliminado con exito",
          });
          dispatch(getAllProveedores());
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
export const aumentarProveedor =
  (values: any): any =>
  async (dispatch: any) => {
    dispatch(setLoading(true));
    const token = localStorage.getItem("token");
    try {
      axios
        .post(`/proveedores/precio`, values, {
          headers: { Authorization: token },
        })
        .then(() => {
          Swal.fire({
            icon: "success",
            text: "Proveedor aumentado con exito",
          });
          dispatch(getAllProveedores());
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
