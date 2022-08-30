import React, { useState } from "react";
import PageTitle from "../../components/PageTitle/PageTitle";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { actionCreators } from "../../store/action-creators";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { useNavigate } from "react-router-dom";
//import AlertMessage from "../../components/AlertMessage/AlertMessage";
const schema = yup
  .object({
    title: yup.string().required(),
    description: yup.string().required(),
  })
  .required();

const PoductCreate = () => {
  const [pageTitle] = useState("Product Create");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { createProduct } = bindActionCreators(actionCreators, dispatch);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    //console.log(data)
    createProduct(data)
      .then((data) => {
        console.log(data);
        if (data.success) {
          console.log(data.message);
          navigate("/products");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
      <PageTitle title={pageTitle} />
      <div className="container my-5">
        <div className="row">
          <h2>Product Create</h2>
          <form onSubmit={handleSubmit(onSubmit)} method="post">
            <div className="mb-3 mt-3">
              <label forhtml="title">Title:</label>
              <input
                type="text"
                className="form-control"
                id="title"
                placeholder="Enter title"
                name="title"
                {...register("title")}
              />
              <p className="text-danger">{errors.title?.message}</p>
            </div>
            <div className="mb-3">
              <label forhtml="pwd">Discription:</label>
              <input
                type="text"
                className="form-control"
                id="description"
                placeholder="Enter description"
                name="description"
                {...register("description")}
              />
              <p className="text-danger">{errors.description?.message}</p>
            </div>
            <button type="submit" className="m-auto m-1 btn btn-primary">
              Submit
            </button>
            <button type="reset" className="m-atuo m-1 btn btn-secondary">
              Reset
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default PoductCreate;
