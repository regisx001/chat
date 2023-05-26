import { fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { registerSchema } from "$lib/Utils/schemas";

export const load: PageServerLoad = async ({ locals }) => {
    if (locals.user) {
        throw redirect(300, "/")
    }
}

export const actions: Actions = {
    register: async ({ request, locals }) => {
        const data = Object.fromEntries(await request.formData())

        console.log(data)
        const form = registerSchema.safeParse(data)

        if (form.success === false) {
            return fail(400, {
                form: form.error.flatten().fieldErrors
            })
        }

        if (data?.password !== data?.passwordConfirm) {
            return fail(400, {
                passwordConfirm: "Password not match"
            })
        }

        try {
            // @ts-ignore
            await locals.pb.collection('users').create(data)
            // @ts-ignore
            await locals.pb.collection("users").requestVerification(data.email)
        } catch (err) {
            console.log('Error: ', err);
        }

        return { success: true }
    }
};