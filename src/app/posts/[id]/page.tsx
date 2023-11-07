import { Suspense } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { type Post } from '@/types/types'
import Home from '@/app/page'
import DeleteButton from '@/components/delete-button'

type Props = {
  params: {
    id: string;
  };
};

const fetchPost = async (id: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_BACKEND_URL}/posts/${id}?search=prueba123`, {
      cache: 'no-cache',
      next: {
        tags: ['post'],
      },
    });

    if(!res.ok) throw new Error('Error fetching post');

    const post = await res.json();
    return post;
  } catch (error) {
    console.error(error);
  }
}

export default async function PostPage({ params: { id } }: Props) {
  const post = await fetchPost(id)
  if(!post) return notFound()

  return (
    <div className="mx-auto max-w-screen-xl">
      <section className="mb-10 pb-5 border-b border-b-slate-600">
        <h2 className="font-bold text-2xl">{post?.title}</h2>
        <p className="text-gray-500">{post?.body}</p>
        <div className="flex flex-col gap-4 w-fit mt-3">
          <div className="space-x-4">
            <Link
              href={`/edit/${post?.id}`}
              className="bg-amber-500 px-4 py-2 text-white"
            >
              Editar
            </Link>
            <DeleteButton id={post?.id} />
          </div>
          <Link href="/">Volver</Link>
        </div>
      </section>
      <h3 className="font-bold text-2xl">Otras publicaciones</h3>
      <Suspense fallback={<div>Loading...</div>}>
        <Home />
      </Suspense>
    </div>
  )
}
