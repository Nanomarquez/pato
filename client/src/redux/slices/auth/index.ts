import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import Swal from 'sweetalert2'

export interface Auth {
  id: string
  email: string
  password: string
  rol: string
  isBanned: boolean
  createdAt: string
  updatedAt: string
}


export interface AuthState {
  auth: Auth
  token: string | null
  loading: boolean
}

const initialState: AuthState = {
  auth:{
    id: '',
    email: '',
    password:'',
    rol: '',
    isBanned: false,
    createdAt: '',
    updatedAt: ''
  },
  token:
      localStorage.getItem('token') !== undefined
        ? localStorage.getItem('token')
        : null,
  loading: false
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state,action: PayloadAction<Auth>) => {
      state.auth = action.payload
    },
    setToken: (state,action: PayloadAction<string | null>) => {
      state.token = action.payload
    },
    setLoadingAuth: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    }
  }
})

export const { setAuth, setToken , setLoadingAuth} = authSlice.actions

export default authSlice.reducer

export const login = (auth:any): any => async (dispatch:any) => {
  dispatch(setLoadingAuth(true))
  try {
    axios.post('/auth/signin', auth)
    .then((res) => {
      dispatch(setAuth(res.data.auth))
      dispatch(setToken(res.data.token))
      localStorage.setItem('token', res.data.token)
      dispatch(setLoadingAuth(false))
      Swal.fire({
        icon: 'success',
        title: 'Bienvenido',
      })
    })
    .catch(err=>{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.response.data.message,
      })
      dispatch(setLoadingAuth(false))
    })
  } catch (error) {
    console.log(error)
    dispatch(setLoadingAuth(false))
  }
}

export const logout = (): any => async (dispatch:any) => {
  dispatch(setLoadingAuth(true))
  try {
    Swal.fire({
      icon: 'success',
      title: 'Hasta pronto',
    })
    localStorage.removeItem('token')
    dispatch(setAuth(initialState.auth))
    dispatch(setToken(null))
    dispatch(setLoadingAuth(false))
  } catch (error) {
    console.log(error)
    dispatch(setLoadingAuth(false))
  }
}

export const putAuth = (user:any): any => async (dispatch:any) => {
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

export const getAuth = ():any => async (dispatch:any) => {
  dispatch(setLoadingAuth(true))
  const token = localStorage.getItem('token')
  try {
    axios.get('/auth',{headers:{'Authorization': token}})
    .then((res) => {
      dispatch(setAuth(res.data.auth))
      dispatch(setLoadingAuth(false))
    })
    .catch(err=>{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err?.response?.data?.message,
      })
      dispatch(logout())
      dispatch(setLoadingAuth(false))
    })
  } catch (error) {
    console.log(error)
    dispatch(logout())
    dispatch(setLoadingAuth(false))
  }
}
