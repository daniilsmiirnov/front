import { createSlice, PayloadAction } from '@reduxjs/toolkit';
interface ObjectInt {
    ID_Object: number;
    Name_Obj: string;
    Region: string;
    Year: number;
    Opener: string;
    Status: string;
    Image_Url: string;
}
interface CreatorInt {
  id: number;
  username: string;
}

interface ModeratorInt {
  id: number;
  username: string;
}

// interface Expedition {
//   ID_Expedition: number;
//   Name_Exp: string;
//   DateStart: string;
//   DateEnd: string | null;
//   DateApproving: string | null;
//   Status: string;
//   Leader: string;
//   CreatorId: CreatorInt | null;
//   ModeratorId: ModeratorInt | null;
//   Describe: string | null;
//   Objects: ObjectInt[]; 
//   Archive: string | null;
// }
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
  Objects: ObjectInt[]; // Массив идентификаторов объектов
  Archive: string | null;
}
interface CartState {
  expedition: Expedition | null;
}

const initialState: CartState = {
  expedition: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Expedition>) {
      state.expedition = action.payload;
    },
    removeFromCart(state) {
      state.expedition = null;
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
