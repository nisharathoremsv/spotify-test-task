import { configureStore } from '@reduxjs/toolkit'
import { reducer as counterReducer} from '../redux/reducers'

export const store = configureStore({
  reducer: {
    MusicLists: counterReducer,
  },
})