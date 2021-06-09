import React from 'react';
import {useRecoilValue} from "recoil";

/**
 * Renders a DateRightBar component.
 * Component is used to display date (game time)
 * @param props
 * @param props.dateState - containes actual value of game time
 * @returns {JSX.Element}
 * @constructor
 * @component
 */
function DateRightBar({dateState}) {
    const days = useRecoilValue(dateState);

    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + days);

    return (
        <div>
            {tomorrow.toLocaleDateString()}
        </div>
    );
}

export default DateRightBar;
