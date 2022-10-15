/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import formatter from '../../utils/formatter';

export const userSlice = createSlice({
  name: 'counter',
  initialState: {
    seed: '',
    address: '',
    publicKey: '',
    contacts: [],
    inbox: [],
  },
  reducers: {
    updateUser: (state, action) => {
      const { payload } = action;
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      if (payload.seed) state.seed = payload.seed;
      if (payload.address) state.address = payload.address;
      if (payload.publicKey) state.publicKey = payload.publicKey;
      if (payload.contacts) state.contacts = payload.contacts;
      if (payload.inbox) state.inbox = formatter.inbox(payload.inbox, state.address);
    },
    updateContacts: (state, action) => {
      state.contacts = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateUser, updateContacts } = userSlice.actions;

export default userSlice.reducer;
