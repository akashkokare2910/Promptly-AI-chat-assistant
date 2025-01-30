import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/chat";

export const fetchChatResponse = createAsyncThunk(
  "chat/fetchChatResponse",
  async (userMessage, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, { message: userMessage });

      return { sender: "bot", text: response.data.text };
    } catch (error) {
      if (error.response) {
        return rejectWithValue(
          error.response.data || "Error fetching response"
        );
      }
      return rejectWithValue("Error fetching response. Try again later.");
    }
  }
);

// Slice to manage chat state
const chatSlice = createSlice({
  name: "chat",
  initialState: {
    messages: [],
    loading: false,
    error: null,
  },
  reducers: {
    addUserMessage: (state, action) => {
      state.messages.push({ sender: "user", text: action.payload });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChatResponse.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchChatResponse.fulfilled, (state, action) => {
        state.loading = false;
        state.messages.push(action.payload);
      })
      .addCase(fetchChatResponse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.messages.push({ sender: "bot", text: action.payload });
      });
  },
});

export const { addUserMessage } = chatSlice.actions;
export default chatSlice.reducer;
