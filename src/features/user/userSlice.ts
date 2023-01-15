import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface UserObjectType{
  id?: string,
  name?: string,
  email?:string,
  role?: string,
  isAdmin?:boolean,
  isActive?:boolean,
  token?:string,
}
interface InitialState{
  user: UserObjectType | null
}

export const userLogInAction = createAsyncThunk(
  'user/userLogIn',
  async (data: UserObjectType, _thunkAPI) =>{
    localStorage.setItem('user', JSON.stringify(data))
    return data
  }
)
export const userLogOutAction = createAsyncThunk(
  'user/userLogOut',
  async (_, _thunkAPI) =>{
    return localStorage.setItem('user', '')
  }
)

const userFromStorage = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null
const initialState: InitialState = {
  user: userFromStorage
}

const userSlice= createSlice({
  name: 'user',
  initialState,
  reducers:{},
  extraReducers:(builder) =>{

    builder
      .addCase(userLogInAction.fulfilled, (state: InitialState, action: PayloadAction<UserObjectType>) =>{
        state.user = action.payload
      })
      .addCase(userLogOutAction.fulfilled, (state: InitialState, action: PayloadAction) =>{
        state.user = null
      })
  }
})

export default userSlice.reducer