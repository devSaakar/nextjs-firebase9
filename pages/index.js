import {
  Alert,
  Avatar,
  Box,
  Container,
  IconButton,
  Snackbar,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useAuth } from "../Auth";
import ToDoForm from "../components/ToDoForm";
import ToDoList from "../components/ToDoList";
import { auth, db } from "../firebase";
import { ToDoContext } from "../context/ToDoContext";

import nookies from "nookies";
import { verifyIdToken } from "../firebaseAdmin";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import AnimationGraph from '../images/graph_animation.gif';
import Image from "next/image";

export default function Home({ todosProps }) {
  const { currentUser } = useAuth();

  const [open, setOpen] = useState(false);
  const [todo, setTodo] = useState({ title: "", details: "" });
  const [alertType, setAlertType] = useState("success");
  const [alertMessage, setalertMessage] = useState("");

  const showAlert = (type, message) => {
    setAlertType(type);
    setalertMessage(message);
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <ToDoContext.Provider value={{ showAlert, todo, setTodo }}>
      <Container maxWidth="sm">
        <Image src={AnimationGraph} />
        <Box sx={{ display: "flex", justifyContent: "space-between" }} mt={3}>
          <Typography variant="h5">{currentUser.displayName}</Typography>
          <IconButton onClick={() => auth.signOut()}>
            <Avatar src={currentUser.photoURL} sx={{ width: 60, height: 60 }} />
          </IconButton>
        </Box>
        <ToDoForm />
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity={alertType}
            sx={{ width: "100%" }}
          >
            {alertMessage}
          </Alert>
        </Snackbar>
        <ToDoList todosProps={todosProps} />
      </Container>
    </ToDoContext.Provider>
  );
}

export async function getStaticProps(context) {
  try {
    const cookies = nookies.get(context);
    const token = await verifyIdToken(cookies.token);
    const { email } = token;
    const collectionRef = collection(db, "todos");
    const q = query(
      collectionRef,
      where("email", "==", email),
      orderBy("timestamp", "desc")
    );
    const querySnapshot = await getDocs(q);
    let todos = [];
    console.log("querySnapshot :>> ", querySnapshot);
    querySnapshot.forEach((doc) =>
      todos.push({
        ...doc.data(),
        id: doc.id,
        timestamp: doc.data().timestamp.toDate().getTime(),
      })
    );
    return {
      props: {
        todosProps: JSON.stringify(todos) || [],
      },
    };
  } catch (error) {
    return { props: {} };
  }
}
