export const customCircleMarker = (color1, color2, msg, sos) => {
    let html;

    if (sos) {
        // If there is an SOS render a warning SVG
        html = `
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="18" cy="18" r="12" fill="#FF0000" stroke="white" stroke-width="1"/>
            <rect x="16" y="11" width="4" height="8" fill="white"/>
            <rect x="16" y="22" width="4" height="3" fill="white"/>
        </svg>
        `;
    } else if(msg !== ''){
         // If there is a text message render a message SVG
        html = `
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" y="12" width="16" height="12" rx="2" fill="white" stroke="black" stroke-width="0.5"/>
            <path d="M11.5 13.5L18 17.5L24.5 13.5V15L18 19L11.5 15V13.5Z" fill="black" stroke="black" stroke-width="0.2"/>
        </svg>
        `;
    } else {
        // If there is no message render a regular circle marker
        html = `
        <svg width="36" height="36" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
            <g id="customCircleMarker" >
                <circle fill="${color1}" cx="18" cy="18" r="6"/>
                <circle fill="${color2}" cx="18" cy="18" r="5"/>
                <circle fill="${color1}" cx="18" cy="18" r="2.5"/>
                <circle fill="${color2}" cx="18" cy="18" r="1"/>
            </g>
        </svg>
        `;
    }

    return html;
}
