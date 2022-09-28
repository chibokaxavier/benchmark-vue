export interface Cookies{
    get(key:string): any
    set(key:string, value:any, expires?:any, path?:any, domain?:any, secure?:any, sameSite?:any): void
    remove(key:string, path?:any, domain?:any): void
}
