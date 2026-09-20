import {z} from "zod";
export const instagramUrlSchema=z.string().trim().url();
const HOSTS=new Set(["instagram.com","www.instagram.com"]);
function private4(h:string){const p=h.split(".").map(Number);if(p.length!==4||p.some(Number.isNaN))return false;const[a,b]=p;return a===10||a===127||(a===169&&b===254)||(a===172&&b>=16&&b<=31)||(a===192&&b===168)}
function private6(h:string){const x=h.toLowerCase();return x==="::1"||x.startsWith("fc")||x.startsWith("fd")||x.startsWith("fe80:")}
export function validatePublicInstagramUrl(input:string){const parsed=instagramUrlSchema.parse(input);const u=new URL(parsed);if(u.protocol!=="https:")throw Error("UNSUPPORTED_PROTOCOL");if(!HOSTS.has(u.hostname.toLowerCase()))throw Error("UNSUPPORTED_DOMAIN");if(u.username||u.password)throw Error("CREDENTIALS_IN_URL");if(private4(u.hostname)||private6(u.hostname))throw Error("PRIVATE_ADDRESS");const path=u.pathname.replace(/\/+$/g,"");if(!/^\/(reel|reels|p|tv|stories|[A-Za-z0-9._-]+)(?:\/[A-Za-z0-9._-]+)*$/.test(path))throw Error("UNSUPPORTED_PATH");return `https://www.instagram.com${path}`}
export function detectContentType(url:string){const p=new URL(url).pathname;if(/^\/reels?\//.test(p))return"reel";if(/^\/(p|tv)\//.test(p))return"post";if(/^\/stories\//.test(p))return"story";if(/^\/[^/]+\/?$/.test(p))return"profile";return"unknown"}
