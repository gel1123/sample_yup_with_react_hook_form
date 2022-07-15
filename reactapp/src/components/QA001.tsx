import axios from "axios";
import { useEffect, useState } from "react";
import {
  Button,
  Container,
  CssBaseline,
  List,
  ListItem,
  ListItemText,
  Input,
  ListItemSecondaryAction,
  Checkbox,
  TextField
  } from "@mui/material";

export const QA001 = () => {
  const [todos, setTodos] = useState<{
    id?: string;
    name: string;
    description: string;
  }[]>([{
    id: "test_data_id",
    name: "TODO名",
    description: "ここに説明を書く"
  }]);
  const [newTodo, setNewTodo] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const getTodos = async () => {
    try {
      const result = await axios.get('http://localhost:8888/api/rest/tasks',
    {
      headers: { "x-hasura-admin-secret": "secret" }
    }
      )
      setTodos(result.data.tasks);
      console.log(result.data.tasks);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getTodos();
  }, []);

  const handleSaveTodo = async () => {
    try {
      const url = "http://localhost:8888/api/rest/tasks";
      const res = await axios.post(
        url,
        {
          name,
          description
        },
        {
          headers: { "x-hasura-admin-secret": "secret" }
        }
      );
      console.log(res.data);
      setTodos([...todos, {
        name: res.data.name,
        description: res.data.description
      }])
      getTodos();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTodo = (id: string) => {
    axios.delete(`http://localhost:8888/api/rest/tasks/${id}`,
    {
      headers: { "x-hasura-admin-secret": "secret" }
    })
    .then(response => {
      getTodos();
      console.log("set")
    }).catch(data =>  {
      console.log(data)
    })
  }

  return (
    <>
    <Container component='main' maxWidth='xs'>
        <form onSubmit={handleSaveTodo}>
          <Input
              type="text"
              name="name"
              value={name}
              placeholder="Enter name"
              onChange={event => setName(event.target.value)}
          />
          <TextField
              type="text"
              name="description"
              value={description}
              placeholder="Enter description"
              onChange={event => setDescription(event.target.value)}
          />
          <Button
            type="submit"
            variant='contained'
            color='primary'>
              作成
          </Button>
        </form>
      <List
        style={{marginTop: '48px'}}
        component='ul'
      >
        {todos.map(todo => (
          <ListItem key={todo.id} component='li' >
            <Checkbox
              value='primary'
              onChange={() => deleteTodo(todo.id as string)}
            />
            <ListItemText>
              Name:[{todo.name}]
              Description:[{todo.description}]
            </ListItemText>
            <ListItemSecondaryAction>
              <form>
                <Input
                  type="text"
                  name="issue"
                  // value={updateissue}
                  // onChange={event => handleUpdate(event)}
                />
                <Button
                  type="submit"
                  // onClick={() => updateIssue(item.id)}
                >
                  更新
                </Button>
              </form>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Container>
  </>
  );
}