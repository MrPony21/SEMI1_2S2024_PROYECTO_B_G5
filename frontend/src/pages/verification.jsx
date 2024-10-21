import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from "react-router-dom";
import { API_GATEWAY, API_BACKEND } from "../config";

export default function VerificationDialog( email ) {
  const [open, setOpen] = React.useState(true);
  const navigate = useNavigate()

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: async (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const codigo = formJson.codigo;
            console.log(codigo);
    
            
            //fetch para enviar el codigo
            const data = {
              username: email.email,
              code: codigo
            }
            console.log(data)
            try {
              const res = await fetch(`${API_BACKEND}/cognito/confirm`, {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(data),
              });
  
              if (res.status != 200 && res.status != 201) {
                  alert("El codigo ingresado es incorrecto")
                  return
              }
  
              const responseUpdate = await res.json()
              console.log(responseUpdate.message)
              alert("Codigo ingresado correctamente")
              navigate('/login')

          } catch (err) {
              let error = err
              console.error("Error al ingresar el codigo el usuario", error)
              console.log("Esto", error.error)
              return
          }




            handleClose();
          },
        }}
      >
        <DialogTitle>Ingresa codigo de verificacion</DialogTitle>
        <DialogContent>

          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="codigo"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button type="">Confirmar</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}