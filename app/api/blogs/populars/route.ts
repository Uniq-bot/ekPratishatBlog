import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
const mostViewedBlogIds = await prisma.blogViews.groupBy({
  by: ["blogPostId"],
  _count: {
    blogPostId: true,
  },
  orderBy: {
    _count: {
      blogPostId: "desc",
    },
  },
  take: 10,
});

    const blogIds = mostViewedBlogIds.map((view) => view.blogPostId);
    const blogsDetInfo = await prisma.blogPost.findMany({
      where: {
        id: {
          in: blogIds,
        },
      },
      include: {
       
      },
    });

    const result = blogsDetInfo.map((blog) => {
      const viewCount =
        mostViewedBlogIds.find((view) => view.blogPostId === blog.id)?._count ||
        0;
      return {
        ...blog,
        viewCount,
      };
    });

    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      {
        message: err,
      },
      {
        status: 500,
      },
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { blogId, sessionId } = body;
    if (!blogId || !sessionId) {
      return NextResponse.json(
        {
          message: "blogId and sessionId are required",
        },
        {
          status: 400,
        },
      );
    }
    await prisma.blogViews.upsert({
      where: {
        blogPostId_sessionId: {
          blogPostId: blogId,
          sessionId,
        },
      },
      create: {
        blogPostId: blogId,
        sessionId,
      },
      update: {},
    });
    return NextResponse.json(
      {
        message: "View recorded successfully",
      },
      {
        status: 200,
      },
    );
  } catch (err) {
    return NextResponse.json(
      {
        message: err,
      },
      {
        status: 500,
      },
    );
  }
}
