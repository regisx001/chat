// @ts-nocheck
import { serializeNonPOJO } from "$lib/Utils/utils"
import { redirect } from "@sveltejs/kit"
import type { Actions, PageServerLoad } from "./$types"



export const load = async ({ locals, params }: Parameters<PageServerLoad>[0]) => {
    if (!locals.user) {
        throw redirect(300, "/login")
    }
    const id = params.id


    try {
        const room = await locals.pb.collection("rooms").getOne(id, {
            expand: `messages(room).writer,host,participants`,
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
        const participants = String(data.get("participants")).split(",")
        data.delete("participants")

        if (data.get("message") === "") {
            return
        }



        data.append("writer", locals.user.id)
        data.append("username", locals.user.username)
        data.append("user", JSON.stringify(locals.user))

        try {
            await locals.pb.collection("messages").create(data)

            if (participants.includes(locals.user.id)) {
                console.log("")
            } else {
                await locals.pb.collection("rooms").update(params.id, {
                    participants: [...participants, locals.user.id]
                })
            }

        } catch (error) {

        }

        return { success: true }
    }
};;null as any as Actions;