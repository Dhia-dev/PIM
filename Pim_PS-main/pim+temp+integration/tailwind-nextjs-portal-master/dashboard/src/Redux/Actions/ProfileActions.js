import {
  PROfile_CREATE_FAIL,
  PROfile_CREATE_REQUEST,
  PROfile_CREATE_RESET,
  PROfile_CREATE_SUCCESS,
  PROfile_DELETE_FAIL,
  PROfile_DELETE_REQUEST,
  PROfile_DELETE_SUCCESS,
  PROfile_EDIT_FAIL,
  PROfile_EDIT_REQUEST,
  PROfile_EDIT_SUCCESS,
  PROfile_LIST_FAIL,
  PROfile_LIST_REQUEST,
  PROfile_LIST_SUCCESS,
  PROfile_UPDATE_FAIL,
  PROfile_UPDATE_REQUEST,
  PROfile_UPDATE_RESET,
  PROfile_UPDATE_SUCCESS,
} from "../Constants/ProfileConstants";


import axios from "axios";
import { logout } from "./userActions";

export const listProducts = () => async (dispatch, getState) => {
  try {
    dispatch({ type: PROfile_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/profile/all`, config);

    dispatch({ type: PROfile_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: PROfile_LIST_FAIL,
      payload: message,
    });
  }
};

// DELETE PRODUCT
export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: PROfile_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/profile/${id}`, config);

    dispatch({ type: PROfile_DELETE_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: PROfile_DELETE_FAIL,
      payload: message,
    });
  }
};

// CREATE PRODUCT
export const createProfile =
 (address, city, email, universty, country,postalcode,about) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: PROfile_CREATE_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `/api/profile/`,
        { address, city, email, universty, country,postalcode,about },
        config
      );

      dispatch({ type: PROfile_CREATE_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: PROfile_CREATE_FAIL,
        payload: message,
      });
    }
  };

// EDIT PRODUCT
export const editProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: PROfile_EDIT_REQUEST });
    const { data } = await axios.get(`/api/products/${id}`);
    dispatch({ type: PROfile_EDIT_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: PROfile_EDIT_FAIL,
      payload: message,
    });
  }
};

// UPDATE PRODUCT
export const updateProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({ type: PROfile_UPDATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/products/${product._id}`,
      product,
      config
    );

    dispatch({ type: PROfile_UPDATE_SUCCESS, payload: data });
    dispatch({ type: PROfile_EDIT_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: PROfile_UPDATE_FAIL,
      payload: message,
    });
  }
};
