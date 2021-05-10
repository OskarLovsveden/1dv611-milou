export default class Cookie {
    private key: string

    constructor (key: string) {
        this.key = key
    }

    get() : string | undefined {
        return document?.cookie?.split('; ')?.find(row => row?.startsWith(this.key + '='))?.split('=')[1]
    }

    set(value: string) : void {
        const d: Date = new Date();
        d.setTime(d.getTime() + (2 * 60 * 60 * 1000));
        const expires: string = 'expires=' + d.toUTCString();
        document.cookie = this.key + '=' + value + ';' + expires + ';secure;samesite=lax;';
    }

    delete() : void {
        document.cookie = this.key + '=;max-age=0'
    }
}