import { TextField } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { object, string } from "yup";

// yup + React Hook Form の使い方サンプル
//
// それぞれいずれとも、公式ドキュメントが一番わかりやすくまとめられているので、
// 公式ドキュメントにも目を通すことをお勧めします。
// 
// yupのnpmパッケージ公式ページ： https://www.npmjs.com/package/yup
// React Hook Formの配布元公式ページ：https://react-hook-form.com/jp/get-started/

const schema = object().required().shape({
  // 文字列の値 かつ email用のフォーム かつ 必須バリデーション
  email: string().email()
    .required('Email is required'), // バリデーション定義メソッドの引数で、バリデーションエラー時のメッセージを指定できる。

  // 文字列の値 かつ 必須バリデーション かつ 最大文字数を50に設定
  password: string()
    .required('Password is required')
    .max(50, 'Password must be less than 50 characters'),
})

export const SampleYupForm: React.FC = () => {
  // React Hook Form を使用する
  const { register, handleSubmit, watch, formState } = useForm({
    resolver: yupResolver(schema)
  });
  const onSubmit = (data: unknown) => {
    console.log(data);
  };
  console.log(watch("example"));
  return (
    <div>
      <h3>[Sample] yup Form</h3>

      {/* ---- React Hook Form を使用（useForm）したことで得られた値を、実際にビューに適用していく ---- */}
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* 事前にスキーマ定義した email のフォームを登録 */}
        <div style={{marginBottom: 10}}><TextField {...register("email")} /></div>
        {/* 事前にスキーマ定義した email のバリデーションエラーを登録 */}
        <div style={{marginBottom: 10}}><span style={{color: 'red'}}>{
          formState.errors.email?.message as unknown as string
        }</span></div>
        {/* 事前にスキーマ定義した password のフォームを登録 */}
        <div style={{marginBottom: 10}}><TextField {...register("password")} /></div>
        {/* 事前にスキーマ定義した password のバリデーションエラーを登録 */}
        <div style={{marginBottom: 10}}><span style={{color: 'red'}}>{
          formState.errors.password?.message as unknown as string
        }</span></div>
        <div style={{marginBottom: 10}}><input type="submit" /></div>
      </form>
    </div>
  );
}
