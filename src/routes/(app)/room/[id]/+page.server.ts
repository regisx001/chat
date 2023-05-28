import { serializeNonPOJO } from "$lib/Utils/utils"
import type { Actions, PageServerLoad } from "./$types"



export const load: PageServerLoad = async ({ locals, params }) => {
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




export const actions: Actions = {
    sendMessage: async ({ request, params, locals }) => {
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
};