import { createAsyncThunk, createSlice, createSelector } from '@reduxjs/toolkit';
import { FetchQuestions, FetchQuestionType } from '../api/questionApi';
import { message } from 'antd';

const initialState = {
  description: 'loading',
  surveys: [],
  code: 0,
  issue: '',
  filter: {}
};
export const getQuestionType = createAsyncThunk('', async () => {
  let response = await FetchQuestionType();
  return response;
});

export const getQuestions = createAsyncThunk('', async (data) => {
  let response = await FetchQuestions(data);
  return response;
});

export const questionSlice = createSlice({
  name: 'question',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getQuestionType.pending, (state) => {
        state.description = 'loading';
      })
      .addCase(getQuestionType.fulfilled, (state, action) => {
        let success = action.payload?.code === 1;
        let result = action.payload || {};
        if (success) {
          state.description = 'done';
          state.surveys = result.surveys || [];
        } else {
          state.description = 'error';
        }
      })
      .addCase(getQuestionType.rejected, (state, action) => {
        action.error && message.error(action.error.message);
        state.loading = false;
      });
  }
});
const getSurvey = createSelector([(state) => state.surveys], (survey) => survey);

const getType = createSelector([getSurvey], ({ surveys, description, code }) => ({
  surveys,
  description,
  code
}));
export const questionSelectors = { getSurvey, getType };
export default questionSlice.reducer;
