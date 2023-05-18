import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { useAppDispatch } from '../hooks/redux';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import Swal from 'sweetalert2'
import { putAuth } from '../redux/slices/auth';
export default function SignIn() {
  const dispatch = useAppDispatch()
  const [see, setSee] = React.useState(false)
  const [seeVerify, setSeeVerify] = React.useState(false)
  const [seeActual, setSeeActual] = React.useState(false)
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data.get('newEmail'))
    if (data.get('newEmail') !== data.get('verifyEmail')) {
      Swal.fire({
        icon: 'warning',
        title: 'Los emails no coinciden',
      })
      return
    }
    if (data.get('newPassword') !== data.get('verifyPassword')) {
      Swal.fire({
        icon: 'warning',
        title: 'Las contraseñas no coinciden',
      })
      return
    }
    Swal.fire({
      icon: 'info',
      title: 'Estas seguro?',
      text: "Guarda esta información antes de continuar",
      showConfirmButton: true,
      confirmButtonText: 'Continuar!',
    })
      .then(res => {
        if (res.isConfirmed) {
          console.log(data.get('actPassword'))
          dispatch(putAuth({ email: data.get('actEmail'), password: data.get('actPassword'), newEmail: data.get('newEmail'), newPassword: data.get('newPassword') }))
        }
      })
    // dispatch(login({ email: data.get('email'), password: data.get('password') }, navigate))
  };

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100vw',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding:5
      }}
    >
      <Avatar sx={{ bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Modificar
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <div className='flex w-full sm:flex-row flex-col gap-3'>

          <div className="w-full">

            <TextField
              margin="normal"
              fullWidth
              id="newEmail"
              label="Nuevo Email"
              name="newEmail"
            />
            <TextField
              margin="normal"
              fullWidth
              id="verifyEmail"
              label="Verificar Email"
              name="verifyEmail"
            />
            <TextField
              margin="normal"
              fullWidth
              id="actEmail"
              label="Actual Email"
              name="actEmail"
            />
          </div>
          <div className="w-full">

            <div className="relative">
              <TextField
                margin="normal"
                fullWidth
                name="newPassword"
                label="Nueva password"
                type={!see ? "password" : "text"}
                id="newPassword"
              />
              <p className="absolute text-2xl right-5 top-8 cursor-pointer" onClick={() => setSee(!see)}>
                {see ? <AiFillEyeInvisible /> : <AiFillEye />}

              </p>
            </div>
            <div className="relative">
              <TextField
                margin="normal"

                fullWidth

                name="verifyPassword"
                label="Verify Password"
                type={!seeVerify ? "password" : "text"}
                id="verifyPassword"
              />
              <p className="absolute text-2xl right-5 top-8 cursor-pointer" onClick={() => setSeeVerify(!seeVerify)}>
                {seeVerify ? <AiFillEyeInvisible /> : <AiFillEye />}

              </p>
            </div>
            <div className="relative">
              <TextField
                margin="normal"
                fullWidth
                autoComplete='current-password'
                name="actPassword"
                label="Actual Password"
                type={!seeActual ? "password" : "text"}
                id="actualPassword"
              />
              <p className="absolute text-2xl right-5 top-8 cursor-pointer" onClick={() => setSeeActual(!seeActual)}>
                {seeActual ? <AiFillEyeInvisible /> : <AiFillEye />}

              </p>
            </div>
          </div>
        </div>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2, ml: "auto", mr: "auto" }}
        >
          Enviar
        </Button>
      </Box>
    </Box>
  );
}