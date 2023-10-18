import { getServerSession } from "next-auth/next"
import { options } from "../api/auth/[...nextauth]/options";

export const roleCheck = async ({role}: any) =>{
    const session = await getServerSession(options)
    if (session?.user.role != role) {
        return false
    }

    return true
}