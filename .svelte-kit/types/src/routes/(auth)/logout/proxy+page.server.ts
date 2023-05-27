// @ts-nocheck
import { redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";


export const load = async ({ locals }: Parameters<PageServerLoad>[0]) => {
    throw redirect(300, "/")
}


export const actions = {
    default({ locals }) {
        locals.pb.authStore.clear();
        locals.user = undefined;

        throw redirect(303, '/login');
    }
};;null as any as Actions;