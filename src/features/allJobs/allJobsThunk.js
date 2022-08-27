import { createAsyncThunk } from '@reduxjs/toolkit';
import customFetch from '../../utils/axios';

export const getAllJobsThunk = async (_, thunkAPI) => {
  const {
          page,
          search,
          searchStatus,
          searchType,
          sort
        } = thunkAPI.getState().allJobs;
  
  let url = `/jobs?status=${searchStatus}&jobType=${searchType}&sort=${sort}&page${page}`;
  
  if (search) {
    url = url + `&search=${search}`;
  }
  
  try {
    const resp = await customFetch(url)
    return resp.data;
  } catch (e) {
    return thunkAPI.rejectWithValue('There was an error');
  }
}

export const showStatsThunk = async (_, thunkAPI) => {
  try {
    const resp = await customFetch.get('/jobs/stats');
    return resp.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data.msg);
  }
}
