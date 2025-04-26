import React, { useEffect } from 'react'
import axios from 'axios'
import { useSelector,useDispatch } from 'react-redux';
import { setFeed } from '../utils/FeedSlice';
import ProfileCard from './ProfileCard';
function Feed() {
    const dispatch=useDispatch();
    useEffect(()=>{
        async function getfeed(params) {
            const res=await axios.get('http://localhost:3000/user/feed',{
                withCredentials:true
            });
            console.log(res?.data?.feed);
            
            dispatch(setFeed(res?.data?.feed))

        }
       getfeed()

    },[])
    const feed=useSelector(store=>store.feed.value);
    console.log(feed);
    if (!feed) {
        return <div className="text-white">Loading...</div>;
      }
      
    
  return (
    <div className='min-h-screen flex-wrap pt-30 gap-12 flex items-center justify-center bg-gray-950 text-white px-4'>

    
       {feed.map((user)=>{
            return <ProfileCard user={user} isEdit={false}></ProfileCard>
        })}
    



    </div>
  )
}

export default Feed