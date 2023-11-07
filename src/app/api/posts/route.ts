import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export const GET = async () => {
  try {
    const posts = await prisma.posts.findMany({
      orderBy: {
        createdAt: "desc"
      }
    })

    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.error();
  }
}

export const POST = async (request: Request) => {
  try {
    const { title, body } = await request.json()

    const post = await prisma.posts.create({
      data: {
        title,
        body
      }
    })

    // return NextResponse.redirect(`/posts/${post.id}`);
    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.error();
  }
}