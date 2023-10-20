import { NextRequest, NextResponse } from "next/server";
import {z} from 'zod'
import prisma from '@/prisma/client'

const createIssueSchema = z.object({
    title: z.string().min(1).max(255),
    description: z.string().min(1).max(255),
    status: z.string().min(1).max(255),
    registerBy: z.number().nullable(),
    asignedTo: z.number().nullable()
})

export async function POST(request: NextRequest){
    const body = await request.json()

    const validation = createIssueSchema.safeParse(body)
    if (!validation.success) {
        console.log(validation.error.errors);
        
        return NextResponse.json(validation.error.errors, {status: 400})
    }

    
    const newIssue = await prisma.issue.create({ 
        data: {
            title: body.title,
            description: body.description,
            registerBy: {
                connect: {
                    id: body.registerBy
                }
            },
            asignedTo: {
                connect: {
                    id: body.asignedTo
                }
            }
        }
    })
    return NextResponse.json(newIssue, {status: 201})
}

export async function GET(request: NextRequest){
    const allIssues = await prisma.issue.findMany()
    return NextResponse.json(allIssues, {status: 200})
}