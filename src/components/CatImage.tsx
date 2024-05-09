import { HTMLProps } from "react";
import { Link } from "react-router-dom";


export function CatImage(props: HTMLProps<HTMLImageElement>) {
    return <Link to={`/image?file=${props.src}`} className={props.className} ><img loading="lazy" {...props} /></Link>
}