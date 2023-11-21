// slices/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  Is_Super: boolean;
  id: number;
  username: string; // добавленное поле username
  password: string; // добавленное поле password
}

const initialState: UserState = {
  Is_Super:false,
  id: -1,
  username: '',
  password: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state, action: PayloadAction<{Is_Super:boolean; id:number; username: string; password: string }>) {
      state.Is_Super = action.payload.Is_Super;
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.password = action.payload.password;
    },

  },
});

export const { login } = userSlice.actions;
export default userSlice.reducer;
