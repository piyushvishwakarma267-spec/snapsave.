import {validatePublicInstagramUrl,detectContentType} from "@/lib/url"; import {getMediaProvider} from "./provider";
export async function resolveMedia(input:string){const normalizedUrl=validatePublicInstagramUrl(input);const detected=detectContentType(normalizedUrl);const result=await getMediaProvider().resolvePublicMedia(normalizedUrl);return{normalizedUrl,detected,result}}
