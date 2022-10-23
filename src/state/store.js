import { configureStore } from '@reduxjs/toolkit'
import { shortLinksReducer } from './slices/shorLinksSlice'

export const store = configureStore({
  reducer: {
    shortLinks: shortLinksReducer,
  },
})