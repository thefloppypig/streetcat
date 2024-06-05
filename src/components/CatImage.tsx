import React from "react";
import { HTMLProps } from "react";

export function CatImage(props: HTMLProps<HTMLImageElement>) {
    return <a href={`/image?file=${props.src}`} className={props.className} ><img loading="lazy" {...props} /></a>
}