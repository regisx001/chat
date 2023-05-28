// @ts-nocheck
import { redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load = async ({ locals }: Parameters<PageServerLoad>[0]) => {
    if (!locals.user) {
        throw redirect(300, "/login")
    }
}






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