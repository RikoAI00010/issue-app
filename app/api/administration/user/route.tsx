import { NextRequest, NextResponse } from "next/server";
import {z} from 'zod'
import prisma from '@/prisma/client'
import { roleCheck } from "@/app/lib/apiRouteSession";
import { Role } from "@prisma/client";

const createIssueSchema = z.object({
    firstName: z.string().min(1).max(255),
    lastName: z.string().min(1).max(255),
    email: z.string().min(1).max(255),
    pass: z.string().min(1).max(255),
    role: z.nativeEnum(Role)
})

export async function POST(request: NextRequest){
    
    if (await roleCheck('admin')) {
        return NextResponse.json('Brak uprawnień', {status: 401})
    }

    try {
        const body = await request.json()
        const validation = createIssueSchema.safeParse(body)
        if (!validation.success) {
            console.log(validation.error.errors);
            return NextResponse.json(validation.error.errors, {status: 400})
        }

        const admin = await prisma.user.create({
            data:{
                firstName: body.firstName,
                lastName: body.lastName,
                email: body.email,
                pass: body.pass,
                role: body.role,
                companyId : body.companyId
            }
        })

        if (admin) {
            return NextResponse.json({userId: admin.id}, {status: 201})            
        } else {
            return NextResponse.json('ERROR', {status: 500})  
        }
        
    } catch (error) {
        return NextResponse.json(error, {status: 500}) 
    }
}

export async function GET(request: NextRequest){

    if (await roleCheck('admin')) {
        return NextResponse.json('Brak uprawnień', {status: 401})
    }

    return NextResponse.json('get employee', {status: 200})
}