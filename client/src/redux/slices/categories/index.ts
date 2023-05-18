import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";

export interface Category {
  id: string;
  nombre: string;
  cantidad_productos: number
  createdAt: string;
  updatedAt: string;
}

export interface CategoriesState {
  categories: Category[];
  loading: boolean;
}

const initialState: CategoriesState = {
  categories: [],
  loading: false,
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<Category[]>) => {
      state.categories = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setCategories, setLoading } = categoriesSlice.actions;

export default categoriesSlice.reducer;

export const getAllCategories = (): any => async (dispatch:any) => {
  dispatch(setLoading(true));
  const token = localStorage.getItem("token");
  try {
    axios
      .get("/categories/all", { headers: { Authorization: token } })
      .then((res) => {
        dispatch(setCategories(res.data));
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

export const putCategory =
  (id: any, data:any): any => async (dispatch:any) => {
    dispatch(setLoading(true));
    const token = localStorage.getItem("token");
    console.log(id,data)
    try {
      axios
        .put(`/categories/${id}`, data, { headers: { Authorization: token } })
        .then(() => {
          Swal.fire({
            icon: "success",
            text: "Categoria modificado con exito",
          });
          dispatch(getAllCategories());
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

  export const postCategory =
  (data:any): any => async (dispatch:any) => {
    dispatch(setLoading(true));
    const token = localStorage.getItem("token");
    try {
      axios
        .post(`/categories`, data, { headers: { Authorization: token } })
        .then(() => {
          Swal.fire({
            icon: "success",
            text: "Categoria agregado con exito",
          });
          dispatch(getAllCategories());
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

  export const deleteCategory =
  (id:any): any => async (dispatch:any) => {
    dispatch(setLoading(true));
    const token = localStorage.getItem("token");
    try {
      axios
        .delete(`/categories/${id}`, { headers: { Authorization: token } })
        .then(() => {
          Swal.fire({
            icon: "success",
            text: "Categoria eliminado con exito",
          });
          dispatch(getAllCategories());
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
