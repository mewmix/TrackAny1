export const customCircleMarker = (color1, color2) => {
    let html = `
        <svg width="36" height="36" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
            <g id="customCircleMarker" >
                <circle fill="${color1}" cx="18" cy="18" r="6"/>
                <circle fill="${color2}" cx="18" cy="18" r="5"/>
                <circle fill="${color1}" cx="18" cy="18" r="2.5"/>
                <circle fill="${color2}" cx="18" cy="18" r="1"/>
            </g>
        </svg>
`;

    return html;
}
