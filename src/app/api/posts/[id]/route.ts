import { NextResponse } from 'next/server'
import { prisma } from '@/libs/prisma'

interface Params {
  params: {
    id: string
  }
}

export const GET = async (request: Request, { params: {id} }: Params) => {
  try {
    const { searchParams } = new URL(request.url)
    console.log(searchParams.get('search'))

    const post = await prisma.posts.findUnique({
      where: {
        id: Number(id)
      }
    })

    return NextResponse.json(post)
  } catch (error) {
    return NextResponse.error()
  }
}

export const PUT = async (request: Request, { params: {id} }: Params) => {
  try {
    const { title, body } = await request.json()

    const post = await prisma.posts.update({
      where: {
        id: Number(id)
      },
      data: {
        title,
        body
      }
    })

    return NextResponse.json(post)
  } catch (error) {
    return NextResponse.error()
  }
}

export const DELETE = async (request: Request, { params: {id} }: Params) => {
  try {
    const post = await prisma.posts.delete({
      where: {
        id: Number(id)
      }
    })

    return NextResponse.json(post)
  } catch (error) {
    return NextResponse.error()
  }
}