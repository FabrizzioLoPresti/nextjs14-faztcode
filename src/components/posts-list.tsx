import { Posts } from "@/types/types"
import PostCard from "./post-card"

type Props = {
  posts: Posts
}

const PostsList = ({posts}: Props) => {
  return (
    <div className="space-y-6">
      {
        posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))
      }
    </div>
  )
}

export default PostsList