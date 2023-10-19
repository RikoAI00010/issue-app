import { NextRequest, NextResponse } from "next/server";
import {z} from 'zod'
import prisma from '@/prisma/client'
import { roleCheck } from "@/app/lib/apiRouteSession";

const createIssueSchema = z.object({
    title: z.string().min(1).max(255),
    description: z.string().min(1).max(255),
    status: z.string().min(1).max(255),
    registerBy: z.number().nullable(),
    asignedTo: z.number().nullable()
})

export async function POST(request: NextRequest){
    if (await roleCheck('admin')) {
        return NextResponse.json('Brak uprawnień', {status: 401})
    }
    
    return NextResponse.json('post employee', {status: 201})
}

export async function GET(request: NextRequest){

    if (await roleCheck('admin')) {
        return NextResponse.json('Brak uprawnień', {status: 401})
    }

    return NextResponse.json('get employee', {status: 200})
}