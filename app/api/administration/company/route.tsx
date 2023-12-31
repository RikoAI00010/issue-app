import { NextRequest, NextResponse } from "next/server";
import {z} from 'zod'
import prisma from '@/prisma/client'
import { roleCheck } from "@/app/lib/apiRouteSession";
import { join } from "path";
import { stat, mkdir, writeFile } from "fs/promises";
import mime from "mime";

const createIssueSchema = z.object({
    name: z.string().min(1).max(255),
    password: z.string().min(1).max(255),
    email: z.string().email(),
    contact: z.string().min(1).max(255),
    contactPerson: z.string().min(1).max(255),
    isInternal: z.string()
})

export async function POST(request: NextRequest){
    let filename;


    if (await roleCheck('admin')) {
        return NextResponse.json('Brak uprawnień', {status: 401})
    }

    const formData = await request.formData();   
    const file = formData.get("image[]") as File | null;
    const body = {
        name: formData.get("name") as string | null,
        password: formData.get("password") as string | null,
        email: formData.get("email") as string | null,
        contact: formData.get("contact") as string ,
        contactPerson: formData.get("contactPerson") as string ,
        isInternal: formData.get("isInternal") as string,
        image: file?.name
    }   

    if (file) {
        const buffer = Buffer.from(await file.arrayBuffer())
        const relativeUploadDir = `/uploads/companyImages`
        const uploadDir = join(process.cwd(), "public", relativeUploadDir)
    
        try {
            await stat(uploadDir);
        } catch (e: any) {
            if (e.code === "ENOENT") {
                await mkdir(uploadDir, { recursive: true })
            } else {
                return NextResponse.json({ error: "Something went wrong." },{ status: 500 })
            }
        }

        try {
            const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`
            filename = `${file.name.replace(/\.[^/.]+$/, "")}-${uniqueSuffix}.${mime.getExtension(file.type)}`
            await writeFile(`${uploadDir}/${filename}`, buffer)
        } catch (error) {
            console.error(error);            
        }
    } else {
        filename = 'sample.png'        
    }

    const validation = createIssueSchema.safeParse(body)
    
    if (!validation.success) {
        return NextResponse.json(validation.error.errors, {status: 400})
    }   

    try {
        const company = await prisma.company.create({
            data:{
                name: body.name!,
                password: body.password,
                email: body.email,
                contact: body.contact,
                contactPerson: body.contactPerson,
                isInternal : body.isInternal == "true"? true : false,
                image: filename
            }
        })
        
        return NextResponse.json({companyId: company.id}, {status: 201})
    } catch (e) {
        console.error(e);
        
    return NextResponse.json({ error: "Something went wrong." },{ status: 500 })
    }
}

export async function GET(request: NextRequest){
    if (await roleCheck('admin')) {
        return NextResponse.json('Brak uprawnień', {status: 401})
    }
    return NextResponse.json({ info: "INFO" },{ status: 200 })
}