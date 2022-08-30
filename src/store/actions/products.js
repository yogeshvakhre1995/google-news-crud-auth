import {
  CREATE_PRODUCT,
  RETRIEVE_PRODUCTS,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
  DELETE_ALL_PRODUCTS,
} from "./actionTypes";
import ProductDataService from "../services/ProductDataService";

export const createProduct = (data) => async (dispatch) => {
  try {
    const res = await ProductDataService.create(data);
    dispatch({
      type: CREATE_PRODUCT,     
      payload: res.data,
    });
    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};
export const retrieveProducts = () => async (dispatch) => {
  try {
    const res = await ProductDataService.getAll();
    dispatch({
      type: RETRIEVE_PRODUCTS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};
export const updateProduct = (id, data) => async (dispatch) => {
  try {
    const res = await ProductDataService.update(id, data);
    dispatch({
      type: UPDATE_PRODUCT,
      payload: data,
    });
    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};
export const deleteProduct = (id) => async (dispatch) => {
  try {
    await ProductDataService.delete(id);
    dispatch({
      type: DELETE_PRODUCT,
      payload: { id },
    });
  } catch (err) {
    console.log(err);
  }
};
export const deleteAllProducts = () => async (dispatch) => {
  try {
    const res = await ProductDataService.deleteAll();
    dispatch({
      type: DELETE_ALL_PRODUCTS,
      payload: res.data,
    });
    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};
export const findProductsByTitle = (title) => async (dispatch) => {
  try {
    const res = await ProductDataService.findByTitle(title);
    dispatch({
      type: RETRIEVE_PRODUCTS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};
