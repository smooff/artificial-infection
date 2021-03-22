import React, {useEffect, useRef, useState} from 'react';



function DateRightBar(props) {
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() +props.days);

    return (
        <div>
            {tomorrow.toLocaleDateString()}
        </div>
    );
}

export default DateRightBar;