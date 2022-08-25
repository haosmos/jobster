import { showLoading, hideLoading, getAllJobs } from '../allJobs/allJobsSlice';
import customFetch from '../../utils/axios';
import { logoutUser } from '../user/userSlice';
import { clearValues } from './jobSlice';

export const createJobThunk = async (job, thunkAPI) => {
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

export const deleteJobThunk = async (jobId, thunkAPI) => {
  thunkAPI.dispatch(showLoading());
  try {
    const resp = await customFetch.delete(`/jobs/${jobId}`, {
      headers: {
        authorization: `Bearer ${thunkAPI.getState().user.user.token}`
      },
    });
    thunkAPI.dispatch(getAllJobs())
  } catch (e) {
    thunkAPI.dispatch(hideLoading());
    return thunkAPI.rejectWithValue(e.response.data.msg);
  }
}

export const editJobThunk = async ({ jobId, job }, thunkAPI) => {
  try {
    const resp = await customFetch.patch(`/jobs/${jobId}`, job, {
      headers: {
        authorization: `Bearer ${thunkAPI.getState().user.user.token}`
      },
    });
    thunkAPI.dispatch(clearValues());
    return resp.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data.msg);
  }
}
