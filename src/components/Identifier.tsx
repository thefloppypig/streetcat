import { useState } from "react";
import { CatData, CatType } from "../Types";
import { Divider } from "./Divider";
import IdentifierTable from "./IdentifierTable";
import IdentifierTiles from "./IdentifierTiles";
import { SortCatData } from "../utils/utils";

const IdentifierViews = {
    all: "All",
    front: "Front Only",
    back: "Back Only",
    eating: "Eating Only",
}

type IdentifierViewType = keyof typeof IdentifierViews;

export type IdentifierProps = {
    catDataList: CatData[],
}

export default function Identifier(props: IdentifierProps) {

    const { catDataList } = props;

    const [filterType, setFilterType] = useState<CatType>(CatType.None)
    const [view, setView] = useState<IdentifierViewType>("all");

    if (catDataList) {
        const filteredList = filterType ? catDataList.filter((d) => d.type === filterType) : catDataList;
        const sortedFilteredList = filteredList.sort(SortCatData.Alphabetically);
        return (
            <>
                <div>
                    View:
                    {Object.entries(IdentifierViews).map(([k, v]) => {
                        return <span className="idRadio" key={v} onClick={() => setView(k as IdentifierViewType)}>
                            <input type="radio" radioGroup="filter" id={`radio-${k}`} value={k} checked={view === k} readOnly />
                            <label htmlFor={`radio-${k}`}>{v}</label>
                        </span>
                    })}
                </div>
                <div>
                    Filter:
                    {Object.entries(CatType).map(([k, v]) => {
                        return <span className="idRadio" key={v} onClick={() => setFilterType(v)}>
                            <input type="radio" radioGroup="filter" id={`radio-${v}`} value={v} checked={filterType === v} readOnly />
                            <label htmlFor={`radio-${v}`}>{k}</label>
                        </span>
                    })}
                </div>
                <Divider />
                {view === "all" ?
                    <IdentifierTable catDatList={sortedFilteredList} />
                    :
                    <IdentifierTiles key={view} tilesPerRow={3} which={view} catDatList={sortedFilteredList} />
                }
            </>
        )
    }
    else return <div>Loading...</div>
}
