import { redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
    if (!locals.user) {
        throw redirect(300, "/login")
    }
}






export const actions: Actions = {
    createRoom: async ({ locals, request }) => {
        const data = await request.formData()

        data.append('host', locals.user.id)

        try {
            await locals.pb.collection("rooms").create(data)
        } catch (error) {

        }

        return { success: true }
    }
};