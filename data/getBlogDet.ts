import { prisma } from "@/libs/prisma"

export const getBlogDetails = async (slug: string) => {
    const blogDets= await prisma.blogPost.findUnique({
        where: { slug },
        include: { tags: true, category: true },
    })
    return blogDets;
}