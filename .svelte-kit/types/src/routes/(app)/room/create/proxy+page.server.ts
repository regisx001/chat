// @ts-nocheck
import type { Actions } from "@sveltejs/kit";







export const actions = {
    createRoom: async ({ locals, request }: import('./$types').RequestEvent) => {
        const data = await request.formData()

        data.append('host', locals.user.id)

        try {
            await locals.pb.collection("rooms").create(data)
        } catch (error) {

        }

        return { success: true }
    }
};;null as any as Actions;