export type FeederData = {
    __feeder: string,
    name: string,
    id: string,
    list: string[],
}

export type CatData = {
    __feeder: string,
    __cat: string,
    name: string,
    img: {
        front?: string,
        back?: string,
        eating?: string,
    }
}