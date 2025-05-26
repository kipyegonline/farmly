"use client"
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getAllPosts } from '@/lib/api'
import { is } from 'date-fns/locale'

export default function HomePageComponent() {
   
     const {data,isLoading,isError,error}=useQuery({
        queryKey: ["posts", ],
      queryFn:async ()=>await getAllPosts(true) 
    })
    console.log("data",data,isLoading,isError,error)
  return (
    <div>
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error: {error.message}</p>}  
        {data && data.map((post:any) => (
          <div key={post.slug}>
            <h2>{post.title}</h2>
            <p>{post.excerpt}</p>
            <img src={post.coverImage.url} alt={post.title} />
          </div>
        ))}
      
    </div>
  )
}
