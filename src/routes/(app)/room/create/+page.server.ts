import type { Actions } from "@sveltejs/kit";







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