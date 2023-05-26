import { toastStore, type ToastSettings } from '@skeletonlabs/skeleton';
import Pocketbase from "pocketbase"



export const defaultUrl = "http://127.0.0.1:8090"
export const pb_client = new Pocketbase(defaultUrl)

export function serializeNonPOJO(obj: any) {
    return structuredClone(obj)
}

export let images: string[] = [
    "https://images.squarespace-cdn.com/content/v1/6220db66cbb54578a5da18aa/662c9854-80c3-44cb-80b3-3e65ed518f1e/My_Life_as_an_Internet_Novel_1_koyohan.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNSjFIlwF-yKntQd6GtdFm34W1rihuMTArMQ&usqp=CAU",
    "https://stylecaster.com/wp-content/uploads/2021/01/bridgerton-book-1.jpg?w=394",
    "https://www.allfreenovel.com/Images/StudyNovels/StudyNovels_202127_231110_747.jpg"
]

export function getAvatarUrl(user: any) {
    if (!user) {
        return false
    }
    if (!user.avatar) {
        return false
    }
    return `${defaultUrl}/api/files/${user.collectionId}/${user.id}/${user.avatar}`
}

export function getCoverUrl(user: any) {
    if (!user) {
        return false
    }
    if (!user.cover) {
        return false
    }
    return `${defaultUrl}/api/files/${user.collectionId}/${user.id}/${user.cover}`
}

export function getFileUrl(collectionId: string, recordId: string, filename: string) {
    return `${defaultUrl}/api/files/${collectionId}/${recordId}/${filename}`
}

// export function getAvatarUrl(user:any) {
//     return `${defaultUrl}/api/files/${user.collectionId}/${user.recordId}/${user.filename}`
// }

export function triggerToast(message: string, background = 'variant-filled-secondary') {
    const t: ToastSettings = {
        message,
        background
    };
    toastStore.trigger(t);
}