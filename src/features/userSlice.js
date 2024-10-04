import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  users: [],
  status: "idle",
  error: null,
};

export const fetchUsers = createAsyncThunk("fetchUser", async () => {
  try {
    const res = await axios.get("http://localhost:3000/users");
    if (res.status == 200) {
      return res.data;
    }
    return res.data;
  } catch (error) {
    console.log(error);
  }
});
export const deleteUsers = createAsyncThunk("deleteUser", async (id) => {
  try {
    const res = await axios.delete(`http://localhost:3000/users/${id}`);
    if (res.status == 200) {
      toast.success("User Deleted Successfully !!");
      return res.data;
    }
  } catch (error) {
    console.log(error);
  }
});
export const addUsers = createAsyncThunk("addUser", async (formData) => {
  try {
    const res = await axios.post(`http://localhost:3000/users`, formData);
    if (res.status == 201) {
      toast.success("User Inserted Successfully !!");
      return res.data;
    }
  } catch (error) {
    console.log(error);
  }
});

export const updateUsers = createAsyncThunk(
  "updateUser",
  async (formData) => {
    try {
      const res = await axios.patch(
        `http://localhost:3000/users/${formData.id}`,
        formData
      );
      if (res.status == 200) {
        toast.success("User Updated Successfully !!");
        return res.data;
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// Action creators are generated for each case reducer function
export const {} = userSlice.actions;

export default userSlice.reducer;
