import { HTMLProps } from "react";


export function CatImage(props: HTMLProps<HTMLImageElement>) {
    return <img onClick={() => props.src && window.open(props.src)} loading="lazy" className='identifierImg' {...props} />
}