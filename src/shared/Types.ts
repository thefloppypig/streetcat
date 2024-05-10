export type FolderMetaData = {
    dir: string[],
    files: string[]
}

export type FeederData = {
    __feeder: string,
    name: string,
    id: string,//camera id
    wiki: string,//wiki link
}

export type FeederList = FeederData[]

export enum CatType {
    None = "",
    Orange = "orange",
    Brown = "brown",
    Calico = "calico",
    Tortie = "tortie",
    Black = "black",
    White = "white",
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
    unknown?: boolean,
    type: CatType,
    colours: string[],
    features?: string[],
}

export type CatImgType = keyof CatData["img"]