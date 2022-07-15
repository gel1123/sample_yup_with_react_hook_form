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
import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { object, string } from "yup";

// 「TODOを新規作成するフォーム」のスキーマを yup で定義する。
const createFormSchema = object().required().shape({
  name: string().required('name is required'), // TODO名のinputタグのモデル。値は文字列であり、必須バリデーションを要する。
  description: string().required('description is required'), // TODOの説明のinputタグのモデル。値は文字列であり、必須バリデーションを要する。
})

// JSXを返す関数コンポーネントであることを型（React.FC）で明示すべき.
export const QA001: React.FC = () => {
  // 「TODOを新規作成するフォーム」をReact Hook Form で作成する。
  // その際、バリデーションやinput情報を yup に移譲するために、リゾルバに yupリゾルバを渡している。
  // yupリゾルバは、yupリゾルバ自身を作成するときに、引数に「フォームのスキーマ」を渡すことで、
  // 事前にスキーマとして定義した通りの挙動をするフォームを生成することができる。
  const createForm = useForm({resolver: yupResolver(createFormSchema)});

  /**
   * useState([]) では unknown型の配列になり、
   * その後の操作での型を保証できないので良くない。
   * 
   * state定義時に、どんな値を入れるかを型として明示する必要がある。
   * 下記のように useState<型>() でstateの型を定義できる
   */
  const [todos, setTodos] = useState<{
    id: string;
    name: string;
    description: string;
  }[]>([]);
  const getTodos = async () => {
    try {
      // -------- sigの環境にはAPIサーバなしなので、ダミーにしてます（ここから）------------
      // const result = await axios.get("http://localhost:8888/api/rest/tasks", {
      //   headers: { "x-hasura-admin-secret": "secret" },
      // });
      // setTodos(result.data.tasks);
      // console.log(result.data.tasks);
      // -------- sigの環境にはAPIサーバなしなので、ダミーにしてます（ここまで）------------
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getTodos();
  }, []);

  // 「TODOを新規作成するフォーム」のsubmit時に呼ばれる関数。
  // React Hook Form を介してinputごとの値が渡されるので、その型を明示している。
  const handleSaveTodo = async (args: FieldValues) => {
    try {
      // argsの中に入っているプロパティを展開して変数に格納する.
      // その際、FieldValuesの型情報を as で補足している。
      const {name, description} = args as {name: string, description: string};
      // TODOリストのIDは暫定的にランダム文字列にする
      const id = Math.random().toString(36).substring(2, 12);

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
      // -------- sigの環境にはAPIサーバなしなので、ダミーにしてます（ここまで）------------
      
      setTodos([...todos, {id, name, description}]);
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
        {/* 新規作成フォームの React Hook Form を登録する（onSubmitもReact Hook Formを仲介させる） */}
        <form onSubmit={createForm.handleSubmit(handleSaveTodo)}>
          <Input type="text" {...createForm.register("name")} />
          {/* React Hook Form の useForm() 時に定義したバリデーション失敗時のエラーメッセージ */}
          <div style={{marginBottom: 10}}><span style={{color: 'red'}}>{
            createForm.formState.errors.name?.message as unknown as string
          }</span></div>

          <TextField type="text" {...createForm.register("description")} />
          {/* React Hook Form の useForm() 時に定義したバリデーション失敗時のエラーメッセージ */}
          <div style={{marginBottom: 10}}><span style={{color: 'red'}}>{
            createForm.formState.errors.description?.message as unknown as string
          }</span></div>

          <Button type="submit" variant="contained" color="primary">作成</Button>
        </form>
        <List style={{ marginTop: "48px" }} component="ul">
          {todos.map((todo) => {
            // ---- TODOごとにフォームとバリデーションを都度生成する ----
            
            // 「TODOを更新するフォーム」のスキーマを yup で定義する（ここではTODOの内容のみを編集できるフォームを作る想定でコード書いています）
            const updateFormSchema = object().required().shape({
              issue: string().required('issue is required'), // TODOの説明のinputタグのモデル。必須バリデーションを施す。
            });
            // フックは関数コンポーネントの初期化時にしかコールできないので、TODOごとに専用の関数コンポーネントを作ってやる
            // ※propsなどを理解したら、この関数コンポーネントは別ファイルに分離すべきだが、ここでは説明のために１ファイルでまとめている。
            const Todo: React.FC = () => {
              // useForm（上記で言うところの「フック」）をしたいがために、Todoを一つずつ関数コンポーネントに分離している。
              const updateForm = useForm({resolver: yupResolver(updateFormSchema)});
              const update = (data: FieldValues) => {
                const {issue} = data as {issue: string};
                console.log({issue});
                // TODO これで更新する際の input の情報を得られたので、
                // あとはバックエンドの実装に合わせて好きなように更新処理を書いてください
                // （残りをどう書くかは、バックエンドの実装によるので割愛します）
              }
              return <ListItem component="li">
                <Checkbox
                  value="primary"
                  onChange={() => deleteTodo(todo.id as string)}
                />
                <ListItemText>
                  Name:[{todo.name}] Description:[{todo.description}]
                </ListItemText>
                <ListItemSecondaryAction>
                  <form onSubmit={updateForm.handleSubmit(update)}>
                    <Input type="text" {...updateForm.register("issue")}/>
                    {/* React Hook Form の useForm() 時に定義したバリデーション失敗時のエラーメッセージ */}
                    <div style={{marginBottom: 10}}><span style={{color: 'red'}}>{
                      updateForm.formState.errors.issue?.message as unknown as string
                    }</span></div>
                    <Button type="submit">更新</Button>
                  </form>
                </ListItemSecondaryAction>
              </ListItem>;
            }
            // 上記で定義したTODOの関数コンポーネントを返す
            return <Todo key={todo.id} />;
          })}
        </List>
      </Container>
    </>
  );
}