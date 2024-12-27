import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createMenuItem,
  deleteMenuItem,
  fetchMenuData,
  fetchMenuDataParentId,
  updateMenuItem,
} from "../Helper";
import { AppDispatch } from "./store";

interface ImenuState {
  menu: any;
  editParent: string;
}

const initialState: ImenuState = {
  menu: [],
  editParent:""
};
const selectedCategoriesSlice = createSlice({
  name: "selectedCategories",
  initialState,
  reducers: {
    addCategory: (state, action: PayloadAction<any[]>) => {
      state.menu = action.payload;
    },
    addParent: (state, action: PayloadAction<string>) => {
      state.editParent = action.payload;
    },
  },
});
export const { addCategory,addParent } = selectedCategoriesSlice.actions;
export default selectedCategoriesSlice.reducer;

export const fetchData = () => async (dispatch: AppDispatch) => {
  try {
    const data = await fetchMenuData();
    dispatch(addCategory(data));
  } catch (err) {
    console.error("Error fetching data:", err);
  }
};

export const postData = (formData) => async (dispatch: AppDispatch) => {
  try {
    const newMenuItem = {
      name: formData?.name,
      parentId: formData?.menuId || undefined,
    };
    await createMenuItem(newMenuItem);
    await dispatch(fetchData());
  } catch (err) {
  } finally {
  }
};

export const editData = (formData) => async (dispatch: AppDispatch) => {
  try {
    const newMenuItem = {
      name: formData?.name,
    };
    await updateMenuItem(formData?.menuId, newMenuItem);
    await dispatch(fetchData());
  } catch (err) {
  } finally {
  }
};

export const deleteData = (formData) => async (dispatch: AppDispatch) => {
  try {
    await deleteMenuItem(formData);
    await dispatch(fetchData());
  } catch (err) {
  } finally {
  }
};

export const getParentIdData = (formData) => async (dispatch: AppDispatch) => {
  try {
    const data = await fetchMenuDataParentId(formData);
    if(data){
      dispatch(addParent(data?.name));
    }
  } catch (err) {
  } finally {
  }
};
