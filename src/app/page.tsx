import PostsList from "@/components/posts-list"
import { Posts } from "@/types/types"

const fetchPosts = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_BACKEND_URL}/posts`, {
      cache: 'no-cache',
      next: {
        tags: ['posts'],
      }
    })
    
    if(!res.ok) throw new Error('Error fetching posts')
    const posts: Posts = await res.json()

    return posts
  } catch (error) {
    console.error(error)
  }
}

export default async function Home() {
  const posts = await fetchPosts()
  return (
    <main className="mx-auto max-w-7xl">
      <h1 className="text-4xl text-center">Posts</h1>
      {
        posts && posts.length > 0 ? (
          <PostsList posts={posts} />
        ) : (
          <p className="text-center">No posts found</p>
        )
      }
    </main>
  )
}
