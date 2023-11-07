import { notFound } from 'next/navigation'
import { type Post } from '@/types/types'
import ComposePost from '@/components/compose-post'

type Props = {
  params: {
    id: string;
  }
}

const fetchPost = async (id: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_BACKEND_URL}/posts/${id}`)

    if(!res.ok) throw new Error('Error fetching post')

    const post: Post = await res.json()
    return post
  } catch (error) {
    console.error(error)
  }
}

export default async function EditPostPage({params: {id}}: Props) {
  const post = await fetchPost(id)
  if(!post) return notFound()

  return (
    <div className="mx-auto max-w-screen-xl h-screen flex justify-center">
      <ComposePost post={post} />
    </div>
  )
}