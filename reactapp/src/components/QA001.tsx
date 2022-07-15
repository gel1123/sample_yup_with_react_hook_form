import axios from "axios";
import { useEffect, useState } from "react";
import {
  Button,
  Container,
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
  }[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const getTodos = async () => {
    try {
      // -------- sigの環境にはAPIサーバなしなので、ダミーにしてます（ここから）------------
      // const result = await axios.get("http://localhost:8888/api/rest/tasks", {
      //   headers: { "x-hasura-admin-secret": "secret" },
      // });
      // setTodos(result.data.tasks);
      setTodos([...todos, {
        id: "test_data_id",
        name: "TODO名",
        description: "ここに説明を書く"
      }]);
      // console.log(result.data.tasks);
      // -------- sigの環境にはAPIサーバなしなので、ダミーにしてます（ここまで）------------
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getTodos();
  }, []);

  const handleSaveTodo = async () => {
    try {

      // -------- sigの環境にはAPIサーバなしなので、ダミーにしてます（ここから）------------
      // const url = "http://localhost:8888/api/rest/tasks";
      // const res = await axios.post(
      //   url,
      //   {
      //     name,
      //     description
      //   },
      //   {
      //     headers: { "x-hasura-admin-secret": "secret" }
      //   }
      // );
      // console.log(res.data);
      // setTodos([...todos, {
      //   name: res.data.name,
      //   description: res.data.description
      // }])
      setTodos([...todos, {name, description}]);
      // -------- sigの環境にはAPIサーバなしなので、ダミーにしてます（ここまで）------------
      getTodos();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTodo = (id: string) => {
    // -------- sigの環境にはAPIサーバなしなので、ダミーにしてます（ここから）------------
    // axios
    //   .delete(`http://localhost:8888/api/rest/tasks/${id}`, {
    //     headers: { "x-hasura-admin-secret": "secret" },
    //   })
    //   .then((response) => {
    //     getTodos();
    //     console.log("set");
    //   })
    //   .catch((data) => {
    //     console.log(data);
    //   });
    setTodos(todos.filter(todo => todo.id !== id));
    // -------- sigの環境にはAPIサーバなしなので、ダミーにしてます（ここまで）------------
  }

  return (
    <>
      <Container component="main" maxWidth="xs">
        <form onSubmit={handleSaveTodo}>
          <Input
            type="text"
            name="name"
            value={name}
            placeholder="Enter name"
            onChange={(event) => setName(event.target.value)}
          />
          <TextField
            type="text"
            name="description"
            value={description}
            placeholder="Enter description"
            onChange={(event) => setDescription(event.target.value)}
          />
          <Button type="submit" variant="contained" color="primary">
            作成
          </Button>
        </form>
        <List style={{ marginTop: "48px" }} component="ul">
          {todos.map((todo) => (
            <ListItem key={todo.id} component="li">
              <Checkbox
                value="primary"
                onChange={() => deleteTodo(todo.id as string)}
              />
              <ListItemText>
                Name:[{todo.name}] Description:[{todo.description}]
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