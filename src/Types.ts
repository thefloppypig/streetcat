export type FolderMetaData = {
    dir: string[],
    files: string[]
}

export type FeederData = {
    __feeder: string,
    name: string,
    aka: string,
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
    unseeable?: boolean,
    type: CatType,
    colours: string[],
    features?: string[],
}

export type CatDataMap = Record<string, CatData>;

export type CatImgType = keyof CatData["img"]

export type MeowApiCatHouse = {
    name: string
    englishName?: string
    translatedName?: string
    images: string[]
    subscribeCount: number
    todayFeedCount: number
    todayShowCount: number
    catPresent: boolean
    lightTurnedOn: boolean
    deviceTemperatureCelsius: number
    stock: {
        kibble: string
        snack: string
    },
    hasSnacks: boolean
    viewers: {
        local: number
        jiemao: number
        purrrr: number
    }
}

export type MeowApiCatHouseSaved = {
    chineseName: string
    translatedName?: string
    images: string[]
    hasSnacks: boolean
}

export type FeederHashData = {
    hash: string,
    date: string
}