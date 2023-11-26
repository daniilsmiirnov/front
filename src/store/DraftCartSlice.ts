import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ExpeditionState {
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
  Objects: number[];
  Archive: string | null;
}

const initialState: ExpeditionState = {
  ID_Expedition: 0,
  Name_Exp: 'Название экспедиции',
  DateStart: '',
  DateEnd: null,
  DateApproving: null,
  Status: 'in',
  Leader: 'ФИО Лидера',
  ModeratorId: null,
  CreatorId: null,
  Describe: '...',
  Objects: [],
  Archive: null,
};

const draftCartSlice = createSlice({
  name: 'draftCart',
  initialState,
  reducers: {
    setExpeditionData(state, action: PayloadAction<ExpeditionState>) {
      return action.payload;
    },
    resetExpeditionData(state) {
      return initialState;
    },
    setExpeditionsDraft(state, action: PayloadAction<ExpeditionState[]>) {
      },
  },
});

export const { setExpeditionData, resetExpeditionData, setExpeditionsDraft } = draftCartSlice.actions;
export default draftCartSlice.reducer;
