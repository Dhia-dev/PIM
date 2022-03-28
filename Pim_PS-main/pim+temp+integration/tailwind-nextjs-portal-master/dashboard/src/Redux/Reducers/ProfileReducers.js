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

// ALL PRODUCTS
export const profileListReducer = (state = { profiles: [] }, action) => {
  switch (action.type) {
    case PROfile_LIST_REQUEST:
      return { loading: true, profiles: [] };
    case PROfile_LIST_SUCCESS:
      return { loading: false, profiles: action.payload };
    case PROfile_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// DELETE PRODUCT
export const profileDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PROfile_DELETE_REQUEST:
      return { loading: true };
    case PROfile_DELETE_SUCCESS:
      return { loading: false, success: true };
    case PROfile_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// DELETE PRODUCT
export const profileCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PROfile_CREATE_REQUEST:
      return { loading: true };
    case PROfile_CREATE_SUCCESS:
      return { loading: false, success: true, profiles: action.payload };
    case PROfile_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case PROfile_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

// EDIT PRODUCT
export const profileEditReducer = (
  state = { profiles: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case PROfile_EDIT_REQUEST:
      return { ...state, loading: true };
    case PROfile_EDIT_SUCCESS:
      return { loading: false, profiles: action.payload };
    case PROfile_EDIT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// UPDATE PRODUCT
export const profileUpdateReducer = (state = { profiles: {} }, action) => {
  switch (action.type) {
    case PROfile_UPDATE_REQUEST:
      return { loading: true };
    case PROfile_UPDATE_SUCCESS:
      return { loading: false, success: true, profiles: action.payload };
    case PROfile_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case PROfile_UPDATE_RESET:
      return { profiles: {} };
    default:
      return state;
  }
};
