import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
 
const SignUp = (props) => {
  const [pageTitle] = useState("Create your account");

  const { register, handleSubmit, formState: { errors } } = useForm({ mode: "onBlur"});
  const handleRegistration = (data) => console.log(data);
  const registerOptions = {   
    email: { required: "Email is required" },
    password: {
      required: "Password is required",
      minLength: {
        value: 8,
        message: "Password must have at least 8 characters"
      }
    }
  };

  return (
    <>
 
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <h2 className="text-center text-dark mt-5">{pageTitle}</h2>
            <div className="text-center mb-5 text-dark"></div>
            <div className="card my-5 bg-light">
              <form
                method="post"
                action="/#"
                className="card-body cardbody-color p-lg-5"
                onSubmit={handleSubmit(handleRegistration)}
              >
                <div className="text-center">
                  <img
                    src="https://cdn.pixabay.com/photo/2016/03/31/19/56/avatar-1295397__340.png"
                    className="img-fluid profile-image-pic img-thumbnail rounded-circle my-3"
                    width="200px"
                    alt="profile"
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="email"
                    name="email"
                    aria-describedby="emailHelp"
                    placeholder="Email"
                    {...register('email', registerOptions.email)}
                  />
                   <small className="text-danger">
                    {errors?.email && errors.email.message}
                  </small>
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    placeholder="password"
                    {...register('password', registerOptions.password)}
                  />
                   <small className="text-danger">
                    {errors?.password && errors.password.message}
                  </small>
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="confirmPassword"
                  />
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="btn btn-dark px-5 mb-5 w-100"
                  >
                    Sign Up 
                  </button>
                </div>
                <div
                  id="emailHelp"
                  className="form-text text-center mb-5 text-dark"
                >
                  Already registered?
                  <Link to="/sign-in" className="text-dark fw-bold m-1">
                    Sign In
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
