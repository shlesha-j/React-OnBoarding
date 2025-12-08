import React from 'react'
import { useForm } from 'react-hook-form'
import "../userDetailsForm/userDetailsForm.css"
import { replace, useNavigate } from 'react-router-dom';


function UserDetailsForm() {
  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm({ mode: "onChange", });

  // const onSave = (data) => {
  //   console.log("data saved")
  // }
  const navigate = useNavigate();

  // const onSave = () => {
  //   const data = watch(); // get current form values
  //   localStorage.setItem("userDetails", JSON.stringify(data));
  //   alert("Data Saved!");
  // };
  // const onNext = () => {
  //   const data = watch();
  //   localStorage.setItem("userDetails", JSON.stringify(data));
  //   navigate("/next-page"); 
  // };

  return (
    <form onClick={handleSubmit}>
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
      <fieldset>
        <legend>Bank Details</legend>
        <div className="form-grp">
          <div className="label-wrap">
            <label>Account Number</label>
            <sup>*</sup>
          </div>
          <input
            type="text"
            maxLength={18}
            {...register("accNum", {
              required: "Account Number required",
              pattern: {
                value: /^[0-9]{9,18}$/,
                message: "Enter a valid 18-digit account number"
              }
            })}
            onInput={(e) => {
              e.target.value = e.target.value.replace(/\D/g, "");
            }} />
          {errors.accNum && (<p className='error'>{errors.accNum.message}</p>)}
        </div>
        <div className="form-grp">
          <div className="label-wrap">
            <label>Branch Name</label>
            <sup>*</sup>
          </div>
          <input type="text"
            {...register("branch", {
              required: "Branch Name required",
            })} />
          {errors.branch && (<p className='error'>{errors.branch.message}</p>)}
        </div>
        <div className="form-grp">
          <div className="label-wrap">
            <label>IFSC Code</label>
            <sup>*</sup>
          </div>
          <input
            type="text"
            maxLength={11}
            {...register("ifsc", {
              required: "IFSC Code required",
              pattern: {
                value: /^[A-Z]{4}0[A-Z0-9]{6}$/,
                message: "Enter a valid IFSC Code"
              }
            })}
            onInput={(e) => {
              e.target.value = e.target.value
                .toUpperCase()
                .replace(/[^A-Za-z0-9]/g, "")
            }}
          />
          {errors.ifsc && (<p className='error'>{errors.ifsc.message}</p>)}
        </div>
      </fieldset>
      <button type='button' onClick={handleSubmit(() => {
        const data = watch();
        localStorage.setItem("userDetails", JSON.stringify(data));
        alert("Data Saved!")
      })}>Save</button>
      <button type='button' onClick={handleSubmit(() => {
        const data = watch();
        localStorage.setItem("userDetails", JSON.stringify(data));
        navigate("/upload-docs")
      })}>Next</button>
    </form>
  )
}

export default UserDetailsForm