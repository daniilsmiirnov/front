import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Expedition {
  ID_Expedition: number;
  Name_Exp: string;
  DateStart: string;
  DateEnd: string | null;
  DateApproving: string | null;
  Status: string;
  Leader: string;
  ModeratorId: number | null;
  CreatorId: number | null;
  Describe: string | null;
  Objects: number[]; // Массив идентификаторов объектов
  Archive: string | null;
}

interface ExpeditionsState {
  expeditions: Expedition[];
}

const initialState: ExpeditionsState = {
  expeditions: [],
};

const expeditionsSlice = createSlice({
  name: 'expeditions',
  initialState,
  reducers: {
    setExpeditions(state, action: PayloadAction<Expedition[]>) {
      state.expeditions = action.payload;
    },
    addExpedition(state, action: PayloadAction<Expedition>) {
      state.expeditions.push(action.payload);
    },
    removeExpedition(state, action: PayloadAction<number>) {
      state.expeditions = state.expeditions.filter(expedition => expedition.ID_Expedition !== action.payload);
    },
  },
});

export const { setExpeditions, addExpedition, removeExpedition } = expeditionsSlice.actions;
export default expeditionsSlice.reducer;
