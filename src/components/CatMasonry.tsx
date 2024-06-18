import Masonry, { ResponsiveMasonry, ResponsiveMasonryProps } from "react-responsive-masonry"
import { CatImage } from "./CatImage"

type CatMasonryProps = Partial<ResponsiveMasonryProps> & {
    srcList: string[]
    altText: string
}

export default function CatMasonry(props: CatMasonryProps) {
    const {srcList, altText, ...rest} = props;

    const elems = srcList.map((src, i)=> {
        return <CatImage className="galleryImg" key={i} src={src} alt={altText} />
    })
    

    return <>
    <ResponsiveMasonry
            columnsCountBreakPoints={{ 300: 1, 500: 2, 750: 3, 1000: 4, 2000: 6 }}
            {...rest}
        >
            <Masonry>
                {elems}
            </Masonry>
        </ResponsiveMasonry>
    </>
}