import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import async from 'async';
import { toast } from 'react-toastify';
import customFetch from '../../utils/axios';
import { getUserFromLocalStorage } from '../../utils/LocalStorage';
import { logoutUser } from '../user/userSlice';

const initialState = {
  isLoading: false,
  position: '',
  company: '',
  jobLocation: '',
  jobTypeOptions: [ 'full-time', 'part-time', 'remote', 'internship' ],
  jobType: 'full-time',
  statusOptions: [ 'interview', 'declined', 'pending' ],
  status: 'pending',
  isEditing: false,
  editJobId: '',
};

export const createJob = createAsyncThunk(
    'job/createJob',
    async (job, thunkAPI) => {
      try {
        const resp = await customFetch.post('/jobs', job, {
          headers: {
            authorization: `Bearer ${thunkAPI.getState().user.user.token}`
          }
        });
        thunkAPI.dispatch(clearValues());
        console.log(resp.data);
        return resp.data;
      } catch (e) {
        if (e.response.status === 401) {
          thunkAPI.dispatch(logoutUser());
          return thunkAPI.rejectWithValue('Unauthorized! logout out... ');
        }
        return thunkAPI.rejectWithValue(e.response.data.msg);
      }
    }
);

const jobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {
    handleChange: (state, { payload: { name, value } }) => {
      state[name] = value;
    },
    clearValues: () => {
      return {
        ...initialState,
        jobLocation: getUserFromLocalStorage()?.location || '',
      };
    }
  },
  extraReducers: {
    [createJob.pending]: (state) => {
      state.isLoading = true;
    },
    [createJob.fulfilled]: (state) => {
      state.isLoading = false;
      toast.success('Job Created');
    },
    [createJob.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    }
    
  }
})

export const { handleChange, clearValues } = jobSlice.actions;
export default jobSlice.reducer;
