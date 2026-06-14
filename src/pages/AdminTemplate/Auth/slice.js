import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services/api";

// Khi reload page => xuống localStorage lấy data nạp trở lại
const data = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const initialState = {
  loading: false,
  data,
  error: null,
};

export const authLogin = createAsyncThunk(
  "authLogin",
  async (user, { rejectWithValue }) => {
    try {
      const response = await api.post("QuanLyNguoiDung/DangNhap", user);

      const userData = response.data.content;
      /**
       * Check role co phải là KhachHang => chặn & thông báo lỗi
       */
      if (userData.maLoaiNguoiDung === "KhachHang") {
        return rejectWithValue({
          response: {
            data: {
              content: "Bạn k có quyền truy cập!",
            },
          },
        });
      }

      localStorage.setItem("user", JSON.stringify(userData));

      return userData;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const authSlice = createSlice({
  initialState,
  name: "authSlice",
  reducers: {
    clearAuth: (state) => {
      state.loading = false;
      state.data = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(authLogin.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(authLogin.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });

    builder.addCase(authLogin.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const actLogout = () => {
  return (dispatch) => {
    // Xóa thông tin user khỏi localStorage
    localStorage.removeItem("user");
    dispatch(authSlice.actions.clearAuth());
  };
};

export default authSlice.reducer;
