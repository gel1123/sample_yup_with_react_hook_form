import { TextField } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";

export const AppForm: React.FC = () => {
  const { register, handleSubmit, watch, formState } = useForm();
  const onSubmit = (data: unknown) => {
    console.log(data);
  };
  console.log(watch("example"));
  return (
    <div>
      <h3>AppForm</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{marginBottom: 10}}><TextField defaultValue="test" {...register("example")} /></div>
        <div style={{marginBottom: 10}}><TextField {...register("exampleRequired", {required: true})} /></div>
        <div style={{marginBottom: 10}}>{formState.errors.exampleRequired && <span style={{color: 'red'}}>This field is required.</span>}</div>
        <div style={{marginBottom: 10}}><input type="submit" /></div>
      </form>
    </div>
  );
}
