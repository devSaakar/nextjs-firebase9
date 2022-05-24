import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import ToDo from "./ToDo";

const ToDoList = ()=> {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    const collectionRef = collection(db, "todos");

    const q = query(collectionRef, orderBy("timestamp", "desc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      console.log("querySnapshot :>> ", querySnapshot);
      setTodos(
        querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
          timestamp: doc.data().timestamp?.toDate().getTime(),
        }))
      );
    });
    return unsubscribe;
  }, []);
  return (
    <div>
      {todos.map((todo) => (
        <ToDo
          key={todo.id}
          id ={todo.id}
          title={todo.title}
          details={todo.details}
          timestamp={todo.timestamp}
        />
      ))}
    </div>
  );
}

export default ToDoList;
