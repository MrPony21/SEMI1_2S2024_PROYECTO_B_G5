import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import RatingComponent from "./rating";

export default function Dialog_comment() {
  const [open, setOpen] = React.useState(false);
   const [fullWidth, setFullWidth] = React.useState(true);
   const [rating, setRating] = React.useState(2);
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const comentario = formJson.comentario;
    console.log(comentario, rating); 
    handleClose(); 
    //aqui faltaria agregar la peticion al server para enviar el cometnario
  }

  return (
    <React.Fragment>
      <button class="button-comment" onClick={handleClickOpen}>Comentar</button>
      <Dialog
         fullWidth={fullWidth}
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: handleSubmit, 
        }}
      >
        <DialogTitle>Deja un comentario <RatingComponent readonly={false} setRating={setRating}></RatingComponent> </DialogTitle>
        <DialogContent>
         <TextField
          id="outlined-multiline-flexible"
          placeholder='Comentario'
          multiline
          maxRows={4}
          fullWidth
          name="comentario" 
        />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button type="submit">Comentar</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}