export function log(level:"info"|"warn"|"error",event:string,data:Record<string,unknown>={}){const safe={level,event,...data,at:new Date().toISOString()};console[level](JSON.stringify(safe))}
