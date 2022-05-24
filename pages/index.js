import { Alert, Container, Snackbar } from "@mui/material";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import ToDoForm from "../components/ToDoForm";
import ToDoList from "../components/ToDoList";
import styles from "../styles/Home.module.css";
import { ToDoContext } from "./ToDoContext";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [todo, setTodo] = useState({title:"",details:""});
  const [alertType, setAlertType] = useState("success");
  const [alertMessage, setalertMessage] = useState("");

  const showAlert = (type,message)=>{
    setAlertType(type);
    setalertMessage(message);
    setOpen(true)
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <ToDoContext.Provider value={{showAlert, todo, setTodo}}>
      <Container maxWidth="sm">
        <ToDoForm />
        <Snackbar anchorOrigin={{ vertical:'top', horizontal:'center' }} open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity={alertType}
            sx={{ width: "100%" }}
          >
            {alertMessage}
          </Alert>
        </Snackbar>
        <ToDoList />
      </Container>
    </ToDoContext.Provider>
  );
}
