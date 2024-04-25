export type FolderMetaData = {
    dir: string[],
    files: string[]
}

export type FeederData = {
    __feeder: string,
    name: string,
    id: string,
}

export enum CatType {
    None = "",
    Orange = "orange",
    Brown = "brown",
    Black = "black",
    White = "white",
    Calico = "calico",
    Tortie = "tortie",
}

export type CatData = {
    __feeder: string,
    __cat: string,
    name: string,
    img: {
        front?: string,
        back?: string,
        eating?: string,
    },
    type: CatType,
    colours: string[],
}