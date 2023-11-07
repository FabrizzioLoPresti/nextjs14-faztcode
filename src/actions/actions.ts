'use server'

import { revalidateTag } from 'next/cache'
import { type Post } from '@/types/types'

export const addPost = async (formData: FormData, id: number | undefined) => {
  const title = formData.get('title')?.toString()
  const body = formData.get('body')?.toString()

  if(!title || !body) return

  const newPost: Post = {
    title: title as string,
    body: body as string
  }

  if(!id) {
    const response = await fetch(`${process.env.NEXT_BACKEND_URL}/posts`, {
      method: 'POST',
      body: JSON.stringify(newPost),
      headers: {
        'Content-type': 'application/json'
      }
    })

    if(response.ok) {
      revalidateTag('posts')
    }
  } else {
    const response = await fetch(`${process.env.NEXT_BACKEND_URL}/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(newPost),
      headers: {
        'Content-type': 'application/json'
      }
    })

    if(response.ok) {
      revalidateTag(`posts`)
    }
  }
}

export const deletePost = async (id: number) => {
  try {
    const res = await fetch(`${process.env.NEXT_BACKEND_URL}/api/posts/${id}`, {
      method: 'DELETE'
    })
    if (!res.ok) return undefined
    const post = await res.json()
    revalidateTag('posts')
    return post
  } catch (error) {
    console.error(error)
  }
}