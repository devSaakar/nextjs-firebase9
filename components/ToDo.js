import React, { useContext } from "react";
import moment from "moment";
import { IconButton, ListItem, ListItemText } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { ToDoContext } from "../pages/ToDoContext";
import { useRouter } from "next/router";

const ToDo = ({ id, title, timestamp, details }) => {
  const { showAlert,todo, setTodo } = useContext(ToDoContext);
  const router = useRouter();

  const deleteTodo = async (id, e) => {
    e.stopPropagation();
    const docRef = doc(db, "todos", id);
    await deleteDoc(docRef);
    showAlert("error", `To do with id ${id} has been deleted successfully`);
  };

  const seeMore = (id,e)=>{
    e.stopPropagation();
    router.push(`/todos/${id}`)
  }
  return (
    <div>
      <ListItem
        onClick={()=>{setTodo({ id, title, timestamp, details })}}
        sx={{ mt: 3, boxShadow: 3 }}
        style={{ backgroundColor: "#FAFAFA" }}
        secondaryAction={
          <>
            <IconButton onClick={(e) => deleteTodo(id, e)}>
              <DeleteIcon />
            </IconButton>
            <IconButton onClick={(e) => seeMore(id, e)} >
              <MoreVertIcon/>
            </IconButton>
          </>
        }
      >
        <ListItemText
          primary={title}
          secondary={moment(timestamp).format("h:mm:ss a,MMM Do YY")}
        />
      </ListItem>
    </div>
  );
};

export default ToDo;
