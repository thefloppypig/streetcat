import { CatUnseeableIcon } from "./CatUnseeableIcon";

export function CatUnseeableBox() {
    return (
        <div className="errorBox">
            <CatUnseeableIcon noTooltip /> This cat is not currently active at the feeder.
        </div>
    )
}