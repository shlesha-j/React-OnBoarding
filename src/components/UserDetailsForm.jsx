import React from 'react'
import { useForm } from 'react-hook-form'

function UserDetailsForm() {
  const {register, handleSubmit, formState: {errors}, reset, watch} = useForm({mode:"onChange",});
  const onSubmit = (data) => {
    console.log("User Data submitted:", data)
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-grp">
        <label>Name</label>
        <input 
          {...register("name", {
            required: "Name is required",
          })} />
          {errors.name && (
            <p>{errors.name.message }</p>
          )}
      </div>
      <div className="form-grp">
        <label>Email Id</label>
        <input 
        {...register("email",{
          required: "Email is required",
          pattern: { 
            value: /^[^@]+@[^@]+\.[^@]+$/, 
            message: "Invalid email" }
        })}/>
        {errors.email && (
          <p>{errors.email.message}</p>
        )}
      </div>
      <div className="form-grp">
        <label>DOB</label>
        <input type="date" 
        {...register("dob", {
          required: "DOB required",
        })            
        }/>
        {errors.dob && (
            <p>{errors.dob.message }</p>
          )}
      </div>
      <button type='submit'>Upload Doc</button>
    </form>
  )
}

export default UserDetailsForm