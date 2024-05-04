import { IoIosWarning } from "react-icons/io";

interface CatWarningIconProps {
    noTooltip?: boolean
}

export function CatWarningIcon(props: CatWarningIconProps) {
    if (props.noTooltip) return < IoIosWarning className="warning" />
    else return < IoIosWarning className="warning" data-tooltip-id="tooltip" data-tooltip-content="This cat's identity is not confirmed!" />
}