import { redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";


export const load: PageServerLoad = async ({ }) => {
    throw redirect(300, "/")
}


export const actions: Actions = {
    default({ locals }) {
        locals.pb.authStore.clear();
        locals.user = undefined;

        throw redirect(303, '/login');
    }
};