// @ts-nocheck
import { fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { loginSchema } from "$lib/Utils/schemas";

export const load = async ({ locals }: Parameters<PageServerLoad>[0]) => {
    if (locals.user) {
        throw redirect(300, "/")
    }
    return {}
}

export const actions = {
    login: async ({ request, locals }: import('./$types').RequestEvent) => {
        const body = Object.fromEntries(await request.formData())

        const form = loginSchema.safeParse(body)

        if (form.success === false) {
            return fail(400, {
                form: form.error.flatten().fieldErrors
            })
        }

        try {
            // @ts-ignore
            await locals.pb.collection('users').authWithPassword(body.email, body.password);
            if (!locals.pb?.authStore?.model?.verified) {
                locals.pb.authStore.clear();
                return fail(400, {
                    notVerified: true
                })
            }
        } catch (err) {
            console.log('Error: ', err);
            return fail(400, {
                credentials: "credentials"
            })
        }

        return { success: true }
        // throw redirect(300, '/')

    }
};;null as any as Actions;