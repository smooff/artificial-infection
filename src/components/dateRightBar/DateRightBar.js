import React from 'react';
import {useRecoilValue} from "recoil";

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
