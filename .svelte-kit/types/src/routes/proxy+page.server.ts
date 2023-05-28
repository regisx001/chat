// @ts-nocheck
import { serializeNonPOJO } from "$lib/Utils/utils";
import type { PageServerLoad } from "./$types";



export const load = async ({ locals }: Parameters<PageServerLoad>[0]) => {


    try {
        const rooms = await locals.pb.collection("rooms").getList(1, 50)
        return {
            rooms: serializeNonPOJO(rooms)
        }
    } catch (error) {

    }
}