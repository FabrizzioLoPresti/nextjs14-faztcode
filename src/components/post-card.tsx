import Link from "next/link";
import { Post } from "@/types/types";

type Props = {
  post: Post;
};

const PostCard = ({ post }: Props) => {
  return (
    <Link
      href={`/posts/${post.id}`}
      key={post.id}
      className="block border-b border-b-slate-700 pb-4"
    >
      <h4 className="text-lg font-bold">{post.title}</h4>
      <p className="text-gray-500">{post.body}</p>
      <p className="text-gray-600">
        Created at:{" "}
        {post?.createdAt != null &&
          new Date(post?.createdAt).toLocaleDateString()}
      </p>
    </Link>
  );
};

export default PostCard;
