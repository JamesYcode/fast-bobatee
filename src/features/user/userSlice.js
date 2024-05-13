import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: '',
  status: 'idle',
  position: {},
  address: '',
  pickup: null,
  error: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateName(state, action) {
      state.username = action.payload;
    },
  },
});

export const { updateName } = userSlice.actions;

export default userSlice.reducer;
