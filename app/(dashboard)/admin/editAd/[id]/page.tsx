import Advertisement from '@/components/admin/Advertisement';
import { prisma } from '@/libs/prisma';
import React from 'react'


interface Props {
  params: Promise<{ id: string }>;
}


const page = async  ({params}: Props) => {
    const { id } = await params;
    const editAd= await prisma.advertisement.findUnique({
        where:{ id }
        })
        if(!editAd) return <div>Ad not found</div>
  return (
    <div>
        <Advertisement editAd={editAd} />
    </div>
  )
}

export default page