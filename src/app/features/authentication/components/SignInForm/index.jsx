"use client" 
import React, { useState } from 'react';
// import {forwardRef} from "react";
import Button from "../../../../components/Button";
import Input from "../../../../components/Input";
import Card from "../../../../components/Card";
import Image from 'next/image';
import logo from "../../../../../../public/assets/img/logo.png";
import { useForm } from "react-hook-form";
import { useRouter } from 'next/navigation';


const SignInForm = () => {
  const router = useRouter();
  const[message,setMessage] = useState("");
  const Token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MCwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNjkwMzE2MzQxLCJleHAiOjE2OTA5MjExNDEsImF1ZCI6IioiLCJpc3MiOiJjYXJfc2VydmljZSJ9.mMIJC7o2rf17opJtJfWM0X6Sfxd-0CUyz68zDHMzV-A";

  const {
    register,
    handleSubmit,
    formState: { errors },
    } = useForm({
     mode :"all"
    });

  const onSubmit = (data) => {
  fetch("http://157.175.56.75:7425/api/auth/admin/login", {
    method: "POST",
    headers: { Authorization: `Bearer ${Token}`,
              "Content-Type": "application/json"},
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      localStorage.setItem("Token", Token);
      if (response.statusCode >= 400){
        setMessage(response.message)
      }
      else if(response.statusCode < 400){ 
        {router.push("/dashboard/DashboardHome")}
      }
    })
    .catch((error) => {
      console.error(error);
    });
           

  }

  return (
      <div className="w-4/12 m-auto">
        <Card className={"flex justify-center  flex-wrap mt-20  m-auto"}>
          <div className='flex flex-col'>
          <Image src={logo} alt="logo image" width="160" height="160" className="m-auto"/>
            <h1 className="text-lg font-medium mb-5 ">Log In</h1>
          <form onSubmit={handleSubmit(onSubmit)}> 

            <Input 
              type="text"
              inputSize="small"
              className={"rounded mb-5 bg-slate-100"} 
              error = {false} 
              haveLabel = {true} 
              fullWidth = {true}
              label = "User Name"
              placeholder = "hannah.green@test.com"
              name = "username"
              register={register}
              errormessage = {message}
            />
            <Input 
              type="password"
              inputSize="small"
              className={"rounded mb-5 bg-slate-100"} 
              error = {false} 
              fullWidth = {true}
              haveLabel = {true} 
              label = "password"
              name = "password"
              register={register}
              errormessage = {message}
            />
            <p className="text-red-500">{errors.password?.message||errors.username?.message}</p>
            <Button
              className="bg-emerald-500 text-white"
              type = "submit"
              buttonSize = "small"
              fullWidth = {true}
              loading = {false}
            >
              log in
            </Button>
            </form>
          </div>
        </Card>
    </div>  
  )
}

export default SignInForm