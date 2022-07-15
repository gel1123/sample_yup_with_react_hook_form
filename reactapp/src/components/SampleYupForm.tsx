import { TextField } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { object, string } from "yup";

const schema = object().required().shape({
  email: string().email()
    .required('Email is required'),
  password: string()
    .required('Password is required')
    .max(50, 'Password must be less than 50 characters'),
})

export const SampleYupForm: React.FC = () => {
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{marginBottom: 10}}><TextField {...register("email")} /></div>
        <div style={{marginBottom: 10}}><span style={{color: 'red'}}>{
          formState.errors.email?.message as unknown as string
        }</span></div>
        <div style={{marginBottom: 10}}><TextField {...register("password")} /></div>
        <div style={{marginBottom: 10}}><span style={{color: 'red'}}>{
          formState.errors.password?.message as unknown as string
        }</span></div>
        <div style={{marginBottom: 10}}><input type="submit" /></div>
      </form>
    </div>
  );
}
