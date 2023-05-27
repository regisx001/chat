// @ts-nocheck
import { serializeNonPOJO } from "$lib/Utils/utils"
import type { Actions, PageServerLoad } from "./$types"



export const load = async ({ locals, params }: Parameters<PageServerLoad>[0]) => {
    const id = params.id


    try {
        const room = await locals.pb.collection("rooms").getOne(id, {
            expand: `messages(room).writer,host`
        })
        return {
            room: serializeNonPOJO(room),
            user: serializeNonPOJO(locals.user),
            id,
        }
    } catch (error) {
        console.log(error)
    }
    return {
    }
}




export const actions = {
    sendMessage: async ({ request, params, locals }: import('./$types').RequestEvent) => {
        let data = await request.formData()

        if (data.get("message") === "") {
            return
        }

        data.append("writer", locals.user.id)
        data.append("username", locals.user.username)
        data.append("user", JSON.stringify(locals.user))
        try {
            await locals.pb.collection("messages").create(data)
        } catch (error) {

        }

        return { success: true }
    }
};;null as any as Actions;