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

        if (data.get("message") === "") {
            return
        }

        data.append("writer", locals.user.id)
        data.append("user", JSON.stringify(locals.user))
        try {
            await locals.pb.collection("messages").create(data)
        } catch (error) {

        }

        return { success: true }
    }
};