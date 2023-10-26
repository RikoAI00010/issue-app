import { NextRequest, NextResponse } from "next/server";
import {z} from 'zod'
import prisma from '@/prisma/client'
import { roleCheck } from "@/app/lib/apiRouteSession";
import { AccountRole, User } from "@prisma/client";
import { join } from "path";
import { stat, mkdir, writeFile } from "fs/promises";
import mime from "mime";

const createIssueSchema = z.object({
    firstName: z.string().min(1).max(255),
    lastName: z.string().min(1).max(255),
    email: z.string().min(1).max(255),
    pass: z.string().min(1).max(255),
    // role: z.nativeEnum(AccountRole)
})

export async function POST(request: NextRequest){

    if (await roleCheck('admin')) {
        return NextResponse.json('Brak uprawnień', {status: 401})
    }

    const formData = await request.formData();
    const file = formData.get("myfile") as File | null;
    const body = {
        firstName: formData.get("firstName") as string | null,
        lastName: formData.get("lastName") as string | null,
        email: formData.get("email") as string | null,
        pass: formData.get("pass") as string ,
        roleId: formData.get("roleId") as string ,
        companyId: formData.get("companyId") as string
    }

    if (!file) {
        return NextResponse.json(
            { error: "File blob is required." },
            { status: 400 }
        );
    }

    const validation = createIssueSchema.safeParse(body)
    if (!validation.success) {
        return NextResponse.json(validation.error.errors, {status: 400})
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const relativeUploadDir = `/uploads/avatars`
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
        const filename = `${file.name.replace(/\.[^/.]+$/, "")}-${uniqueSuffix}.${mime.getExtension(file.type)}`
        await writeFile(`${uploadDir}/${filename}`, buffer)

        const user = await prisma.user.create({
            data:{
                firstName: body.firstName,
                lastName: body.lastName,
                email: body.email,
                pass: body.pass,
                roleId: parseInt(body.roleId),
                companyId : parseInt(body.companyId),
                image: filename
            }
        })

        return NextResponse.json({userId: user.id}, {status: 201})
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