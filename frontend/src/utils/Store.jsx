import {configureStore} from '@reduxjs/toolkit'
import user from './userSlice'
import login from './loginSlice';
import feed from './FeedSlice'
const store=configureStore({
    reducer:{
        user:user,
        login:login,
        feed:feed,
    }

})
export default store;