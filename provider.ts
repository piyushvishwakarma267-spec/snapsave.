export type MediaItem={id:string;type:"image"|"video"|"audio";thumbnailUrl?:string;downloadUrl?:string;resolution?:string;fileType?:string;fileSize?:number;quality?:string};
export type ResolvedMedia={requestId:string;contentType:"reel"|"post"|"story"|"profile"|"unknown";items:MediaItem[];providerName:string};
export interface PublicMediaProvider{resolvePublicMedia(url:string):Promise<ResolvedMedia>;getDownload(mediaId:string,quality?:string):Promise<{url:string;expiresAt:Date}>}
export class NotConfiguredProvider implements PublicMediaProvider{async resolvePublicMedia():Promise<ResolvedMedia>{throw Error("NOT_CONFIGURED")}async getDownload():Promise<{url:string;expiresAt:Date}>{throw Error("NOT_CONFIGURED")}}
export function getMediaProvider():PublicMediaProvider{return new NotConfiguredProvider()}
