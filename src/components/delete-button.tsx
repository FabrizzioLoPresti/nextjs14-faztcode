'use client';

import { useRouter } from 'next/navigation';
// import { deletePost } from "@/actions/actions";

type Props = {
  id: string;
};

const deletePost = async (id: string) => {
  try {
    const res = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
      cache: 'no-cache',
      next: {
        tags: ['post'],
      },
    });

    if(!res.ok) throw new Error('Error deleting post');

    const post = await res.json();
    return post;
  } catch (error) {
    console.error(error);
  }
}

const DeleteButton = ({ id }: Props) => {
  const router = useRouter();
  return (
    <button 
      type="button" 
      className="bg-red-500 px-4 py-2 text-white"
      onClick={async () => {
        await deletePost(id);
        router.push('/');
        router.refresh();
      }}
    >
      Eliminar
    </button>
  );
};

export default DeleteButton;
