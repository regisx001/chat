import { serializeNonPOJO } from "$lib/Utils/utils";
import type { PageServerLoad } from "./$types";



export const load: PageServerLoad = async ({ locals }) => {


    try {
        const rooms = await locals.pb.collection("rooms").getList(1, 50)
        return {
            rooms: serializeNonPOJO(rooms)
        }
    } catch (error) {

    }
}