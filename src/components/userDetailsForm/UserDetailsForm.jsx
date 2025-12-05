import React from 'react'
import { useForm } from 'react-hook-form'
import "../userDetailsForm/userDetailsForm.css"
function UserDetailsForm() {
  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm({ mode: "onChange", });
  const onSubmit = (data) => {
    console.log("User Data submitted:", data)
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset>
        <legend>Personal Data:</legend>
        <div className="form-grp">
          <div className="label-wrap">
            <label>Name</label>
            <sup>*</sup>
          </div>
          <input
            {...register("name", {
              required: "Name is required",
            })} />
          {errors.name && (
            <p className='error'>{errors.name.message}</p>
          )}
        </div>
        <div className="form-grp">
          <div className="label-wrap">
            <label>Email Id</label>
            <sup>*</sup>
          </div>
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^@]+@[^@]+\.[^@]+$/,
                message: "Invalid email"
              }
            })} />
          {errors.email && (
            <p className='error'>{errors.email.message}</p>
          )}
        </div>
        <div className="form-grp">
          <div className="label-wrap">
            <label>DOB</label>
            <sup>*</sup>
          </div>
          <input type="date"
            {...register("dob", {
              required: "DOB required",
            })
            } />
          {errors.dob && (
            <p className='error'>{errors.dob.message}</p>
          )}
        </div>
        <div className="form-grp gender-form-grp">
          <div className="label-wrap">
            <label>Gender</label>
            <sup>*</sup>
          </div>
          <div className='radio-grp'>
            <input type="radio" id='male' />
            <label>Male</label>
          </div>
          <div className='radio-grp'>
            <input type="radio" id='female' />
            <label>Female</label>
          </div>
        </div>
        <div className="form-grp">
          <div className="label-wrap">
            <label>Address</label>
            <sup>*</sup>
          </div>
          <input type="text"
            {...register("address", {
              required: "Address required",
            })
            } />
          {errors.address && (<p className='error'>{errors.address.message}</p>)}
        </div>
        <div className="form-grp">
          <div className="label-wrap">
            <label>Mobile Number</label>
            <sup>*</sup>
          </div>

          <input
            type="text"
            maxLength={10}
            {...register("mobile", {
              required: "Mobile Number required",
              pattern: {
                value: /^[6-9]\d{9}$/,
                message: "Enter a valid 10-digit mobile number"
              }
            })}
            onInput={(e) => {
              e.target.value = e.target.value.replace(/\D/g, "");
            }}
          />
          {errors.mobile && (<p className='error'>{errors.mobile.message}</p>)}
        </div>

      </fieldset>
      <fieldset>
        <legend>Nominee Details</legend>
        <div className="form-grp">
          <div className="label-wrap">
            <label>Nominee Name</label>
            <sup>*</sup>
          </div>
          <input
            {...register("nomName", {
              required: "Name is required",
            })} />
          {errors.nomName && (
            <p className='error'>{errors.nomName.message}</p>
          )}
        </div>
        <div className="form-grp">
          <div className="label-wrap">
            <label>Relationship</label>
            <sup>*</sup>
          </div>

          <select
            {...register("relation", {
              required: "Relationship is required",
            })}
            defaultValue="" // ensures placeholder shows initially
          >
            <option value="" disabled>
              Select Relationship
            </option>
            <option value="father">Father</option>
            <option value="mother">Mother</option>
            <option value="husband">Husband</option>
            <option value="wife">Wife</option>
            <option value="son">Son</option>
            <option value="daughter">Daughter</option>
            <option value="guardian">Guardian</option>
          </select>

          {errors.relation && (
            <p className="error">{errors.relation.message}</p>
          )}
        </div>

        <div className="form-grp">
          <div className="label-wrap">
            <label>Mobile Number</label>
            <sup>*</sup>
          </div>
          <input
            type="text"
            maxLength={10}
            {...register("NomMobile", {
              required: "Mobile Number required",
              pattern: {
                value: /^[6-9]\d{9}$/,
                message: "Enter a valid 10-digit mobile number"
              }
            })}
            onInput={(e) => {
              e.target.value = e.target.value.replace(/\D/g, "");
            }}
          />
          {errors.NomMobile && (<p className='error'>{errors.NomMobile.message}</p>)}
        </div>
      </fieldset>
      <button type='submit'>Upload Doc</button>
            
    </form>
  )
}

export default UserDetailsForm