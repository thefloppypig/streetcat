import { FiXOctagon } from "react-icons/fi";

interface CatUnseeableIconProps {
    noTooltip?: boolean
}

export function CatUnseeableIcon(props: CatUnseeableIconProps) {
    if (props.noTooltip) return < FiXOctagon className="error" />
    else return < FiXOctagon className="error" data-tooltip-id="tooltip" data-tooltip-content="Unseeable cat!" />
}