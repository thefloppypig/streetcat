

export function possessive(name: string) {
    if (name.endsWith("s")) return `${name}'`;
    else return `${name}'s`;
}