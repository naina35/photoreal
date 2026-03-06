import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import api from '../../services/api'

interface ProfileState{
    //username,bio,pfp,
    profile:Profile|null
    loading:boolean
    error:string|null
}
interface Profile{
    username:string
    bio:string|null
    pfp:string|null

}
export const getProfile=createAsyncThunk<Profile>(
    'profile/get',
    async(_,thunkAPI)=>{
        try{
            const res=await api.get('users/profile')
            return res.data
        }
        catch(err:any){
            return thunkAPI.rejectWithValue(err.response.data.message)
        }
    }
)

export const updateProfile=createAsyncThunk<Profile,Partial<Profile>>(
    'profile/update',
    async(profileData,thunkAPI)=>{
        try{
            const res=await api.patch('users/profile',profileData)
            return res.data
        }
        catch(err:any){
            return thunkAPI.rejectWithValue(err.response.data.message)
        }
    }
)

const initialState:ProfileState={
    profile:null,
    loading:false,
    error:null,
}
const profileSlice=createSlice({
    name:'profile',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
            .addCase(getProfile.pending,(state)=>{
                state.loading=true
                state.error=null
            })
            .addCase(getProfile.rejected,(state,action)=>{
                state.loading=false
                state.error=action.payload as string
            })
            .addCase(getProfile.fulfilled,(state,action:PayloadAction<Profile>)=>{
                state.loading=false
                state.profile=action.payload
            })
            .addCase(updateProfile.pending,(state)=>{
                state.loading=true
                state.error=null
            })
            .addCase(updateProfile.rejected,(state,action)=>{
                state.loading=false
                state.error=action.payload as string
            })
            .addCase(updateProfile.fulfilled,(state,action:PayloadAction<Profile>)=>{
                state.loading=false
                state.profile=action.payload
            })
    }
})

export default profileSlice.reducer