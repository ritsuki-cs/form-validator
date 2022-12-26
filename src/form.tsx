import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface FormInputs {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export function Form() {
  const { register, handleSubmit, getValues, formState: { errors } } = useForm<FormInputs>()
  const onSubmit: SubmitHandler<FormInputs> = data => console.log(data)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Register With Us</h2>
      <div className={errors.name ? "form-element error" : "form-element"}>
        <label htmlFor="name">Username</label>
        <input {...register("name", {
          required: "Username is required",
          minLength: {
            value: 3,
            message: "Username must be at least 3 characters"
          },
          maxLength: {
            value: 15,
            message: "Username must be less than 15 characters"
          }
        })} placeholder="Enter username" id="name" />
        <small>{errors.name && errors.name.message}</small>
      </div>
      <div className={errors.email ? "form-element error" : "form-element"}>
        <label htmlFor="email">Email</label>
        <input {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^[a-zA-Z0-9_+-]+(.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/,
            message: "Email is not valid"
          }
        })} placeholder="Enter email" id="email" />
        <small>{errors.email && errors.email.message}</small>
      </div>
      <div className={errors.password ? "form-element error" : "form-element"}>
        <label htmlFor="password">Password</label>
        <input {...register("password", {
          required: "Password is required",
          minLength: {
            value: 6,
            message: "Password must be at least 6 characters"
          },
          maxLength: {
            value: 25,
            message: "Password must be less than 25 characters"
          }
        })} placeholder="Enter password" id="password" />
        <small>{errors.password && errors.password.message}</small>
      </div>
      <div className={errors.password_confirmation ? "form-element error" : "form-element"}>
        <label htmlFor="password-confirmation">Confirm Password</label>
        <input {...register("password_confirmation", {
          required: "Confirmation password is required",
          validate: value => value === getValues("password") || "Passwords do not match"
        })} placeholder="Enter password again" id="password-confirmation" />
        <small>{errors.password_confirmation && errors.password_confirmation.message}</small>
      </div>
      <input type="submit" className="btn-submit" value={"Submit"} />
    </form>
  )
}