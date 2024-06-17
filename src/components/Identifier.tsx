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

export const IdentifierIconSizes = {
    large: "Large",
    medium: "Medium",
    small: "Small",
}

export type IdentifierIconSizesType = keyof typeof IdentifierIconSizes;

export type IdentifierProps = {
    catDataList: CatData[],
}

export default function Identifier(props: IdentifierProps) {

    const { catDataList } = props;

    const [filterType, setFilterType] = useState<CatType>(CatType.None)
    const [view, setView] = useState<IdentifierViewType>("all");
    const [iconSize, setIconSize] = useState<IdentifierIconSizesType>("large");

    if (catDataList) {
        const filteredList = filterType ? catDataList.filter((d) => d.type === filterType) : catDataList;
        const sortedFilteredList = filteredList.sort(SortCatData.Alphabetically);
        return (
            <>
                <div>
                    Filter:
                    {Object.entries(CatType).map(([k, v]) => {
                        return <span className="idRadio" key={v} onClick={() => setFilterType(v)}>
                            <input type="radio" radioGroup="filter" id={`radio-${v}`} value={v} checked={filterType === v} readOnly />
                            <label htmlFor={`radio-${v}`}>{k}</label>
                        </span>
                    })}
                </div>
                <div>
                    View:
                    <select value={view} onChange={(ev) => setView(ev.target.value as IdentifierViewType)}>
                        {Object.entries(IdentifierViews).map(([k, v]) => {
                            return <option className="idRadio" key={v} value={k}>{v}</option>
                        })}
                    </select>
                </div>
                <div>
                    Image Size:
                    <select value={iconSize} onChange={(ev) => setIconSize(ev.target.value as IdentifierIconSizesType)}>
                        {Object.entries(IdentifierIconSizes).map(([k, v]) => {
                            return <option className="idRadio" key={v} value={k}>{v}</option>
                        })}
                    </select>
                </div>
                <Divider />
                {view === "all" ?
                    <IdentifierTable catDatList={sortedFilteredList} iconSize={iconSize} />
                    :
                    <IdentifierTiles key={view} iconSize={iconSize} which={view} catDatList={sortedFilteredList} />
                }
            </>
        )
    }
    else return <div>Loading...</div>
}