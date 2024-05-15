const prefix = "streetcat"

export function getLocalStorage(key: string) {
    return localStorage.getItem(`${prefix}.${key}`)
}

export function setLocalStorage(key: string, value: string) {
    return localStorage.setItem(`${prefix}.${key}`, value);
}
