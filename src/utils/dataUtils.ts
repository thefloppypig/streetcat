const prefix = "streetcat"

export function getLocalStorage(key: string) {
    return globalThis.localStorage?.getItem(`${prefix}.${key}`)
}

export function setLocalStorage(key: string, value: string) {
    return globalThis.localStorage?.setItem(`${prefix}.${key}`, value);
}
