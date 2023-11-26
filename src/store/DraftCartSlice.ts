// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// interface ExpeditionState {
//   ID_Expedition: number;
//   Name_Exp: string;
//   DateStart: string;
//   DateEnd: string | null;
//   DateApproving: string | null;
//   Status: string;
//   Leader: string;
//   ModeratorId: number | null;
//   CreatorId: number | null;
//   Describe: string | null;
//   Objects: number[];
//   Archive: string | null;
// }

// const initialState: ExpeditionState = {
//   ID_Expedition: -1,
//   Name_Exp: 'Название экспедиции',
//   DateStart: '',
//   DateEnd: null,
//   DateApproving: null,
//   Status: 'in',
//   Leader: 'ФИО Лидера',
//   ModeratorId: null,
//   CreatorId: null,
//   Describe: '...',
//   Objects: [],
//   Archive: null,
// };

// const draftCartSlice = createSlice({
//   name: 'draftCart',
//   initialState,
//   reducers: {
//     setExpeditionsDraft(state, action: PayloadAction<ExpeditionState>) {
        
//         return action.payload; 
//       },

//   },
// });

// export const { setExpeditionsDraft } = draftCartSlice.actions;
// export default draftCartSlice.reducer;
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ExpeditionState {
  expedition: {
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
  } | null;
}

const initialState: ExpeditionState = {
  expedition: null,
};

const draftCartSlice = createSlice({
  name: 'draftCart',
  initialState,
  reducers: {
    setExpeditionsDraft(state, action: PayloadAction<ExpeditionState['expedition']>) {
      state.expedition = action.payload;
    },
    // Добавьте другие reducers, если это необходимо
  },
});

export const { setExpeditionsDraft } = draftCartSlice.actions;
export default draftCartSlice.reducer;

