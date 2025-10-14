"use client"
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getAllPosts } from '@/lib/api'
import { is } from 'date-fns/locale'
import { Markdown } from '@/lib/markdown'

export default function HomePageComponent() {
   
     const {data,isLoading,isError,error}=useQuery({
        queryKey: ["posts", ],
      queryFn:async ()=>await getAllPosts(true) 
    })
   
  return (
    <div>
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error: {error.message}</p>}  
        { data && JSON.stringify(data[1], null, 2)}
       
      
    </div>
  )
}
