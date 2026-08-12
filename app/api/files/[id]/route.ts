import { prisma } from "@/libs/prisma";


type params = {
  params: Promise<{ id: string }>;
};


export async function GET(
  req: Request,
  { params }: params
) {
  const { id } = await params;

  const res=await prisma.blogPost.findUnique({
    where:{
        id:id
    },
    include:{
        files:true
    }
  })
  console.log(res)

  return Response.json({ id });
}