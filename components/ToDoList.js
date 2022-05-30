import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuth } from "../Auth";
import { db } from "../firebase";
import ToDo from "./ToDo";

const ToDoList = ({todosProps})=> {
  const [todos, setTodos] = useState([]);
  const {currentUser} = useAuth();

  useEffect(()=>{
    console.log('todosProps :>> ', todosProps);
    setTodos(JSON.parse(todosProps))
  },[])
  
  useEffect(() => {
    const collectionRef = collection(db, "todos");
    const q = query(collectionRef,where("email","==",currentUser?.email) ,orderBy("timestamp", "desc"));
    
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
