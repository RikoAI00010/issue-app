import { NextRequest, NextResponse } from "next/server";
import {z} from 'zod'
import prisma from '@/prisma/client'
import { getServerSession } from "next-auth/next"
import { options } from "../../auth/[...nextauth]/options";


const createIssueSchema = z.object({
    title: z.string().min(1).max(255),
    description: z.string().min(1).max(255),
    status: z.string().min(1).max(255),
    registerBy: z.number().nullable(),
    asignedTo: z.number().nullable()
})

export async function POST(request: NextRequest){
    console.log(request.cookies);
    
    return NextResponse.json('post employee', {status: 201})
}

export async function GET(request: NextRequest){
    const session = await getServerSession(options)
    // console.log(session);
    // console.log(request.cookies.getAll());

    if (session?.user.role != 'admin') {
        console.log('Brak uprawnień');
        return NextResponse.json('Brak uprawnień', {status: 401})
        
    }
    console.log('get employee');
    return NextResponse.json('get employee', {status: 200})
}