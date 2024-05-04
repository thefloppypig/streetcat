import { CatWarningIcon } from "./CatWarningIcon";

export function CatWarningBox() {
    return (
        <div className="warningBox">
            <CatWarningIcon noTooltip /> This Cat's identity is currently not confirmed! Please check the Wiki page to make sure you have found the correct cat. If you know more about this cat or have pictures to add please contact me!
        </div>
    )
}