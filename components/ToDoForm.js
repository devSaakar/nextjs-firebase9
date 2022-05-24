import { Button, TextField } from "@mui/material";
import { addDoc, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import React, { useContext, useEffect, useRef, useState } from "react";
import { db } from "../firebase";
import { ToDoContext } from "../pages/ToDoContext";

const ToDoForm = () => {
  const inputAreaRef = useRef();
  const { showAlert, todo, setTodo } = useContext(ToDoContext);

  const onSubmit = async () => {
      if(todo?.hasOwnProperty('timestamp')){
          const docRef = doc(db, "todos",todo.id);
          const todoUpdated = {...todo, timestamp: serverTimestamp()}
          updateDoc(docRef, todoUpdated);
          setTodo({ title: "", details: "" });
          showAlert("success", `Todo with id ${docRef.id} is updated successfully`);
      }else{
          const collectionRef = collection(db, "todos");
          const docRef = await addDoc(collectionRef, {
            ...todo,
            timestamp: serverTimestamp(),
          });
          setTodo({ title: "", details: "" });
          showAlert("success", `Todo with id ${docRef.id} is added successfully`);
      }
};

useEffect(() => {
    const checkIfClickedOutside = (e) => {
        if(!inputAreaRef.current.contains(e.target)){
            console.log('Outside Input Area');
            setTodo({ title: "", details: "" });
        }else{
            console.log('Inside Input Area');
        }
    }
        document.addEventListener("mousedown",checkIfClickedOutside);
        return ()=>{
            document.removeEventListener("mousedown",checkIfClickedOutside);
    };
  }, []);

  return (
    <div ref={inputAreaRef}>
        <pre>{JSON.stringify(todo,null,'\t')}</pre>
      {/*  learning1 <pre>{JSON.stringify(todo)}</pre> */}
      <TextField
        fullWidth
        label="title"
        margin="normal"
        value={todo.title}
        onChange={(e) => setTodo({ ...todo, title: e.target.value })}
      />
      <TextField
        fullWidth
        label="details"
        multiline
        maxRows={4}
        value={todo.details}
        onChange={(e) => setTodo({ ...todo, details: e.target.value })}
      />
      <Button variant="contained" sx={{ mt: 3 }} onClick={onSubmit}>
        {todo?.hasOwnProperty('timestamp')?'Update':'Add'}
      </Button>
    </div>
  );
};

export default ToDoForm;
