// This generates HTML for a custom leaflet marker.
// It takes the users name, status, & profile picture
// It will render 1 of 2 markers depending upon whether the profile picture URL exists
// We can change the marker background to grey, blue, yellow, or red depending upon the status
export const customMarker = (fName, lName, status, pic) => {
    let html;
    let markerColor = '';
    let initials = `${fName[0]}${lName[0]}`;
    let textBackground = '#222222';
    let textColor = 'white';

    switch (status) {
        case 'inactive':
            markerColor = '#424242' // Grey
            break;
        case 'active':
            markerColor = '#2196F3' // Blue
            break;
        case 'help':
            markerColor = '#FFFF00' // Yellow
            break;
        case 'sos':
            markerColor = '#D32F2F' // Red
            break;
        default:
            markerColor = '#2196F3' // Blue
    }

    if (!pic || pic === '' || pic === null || pic == undefined) { // If there is no profile pic, render user initials
        html = `
            <svg width="54" height="60" viewBox="0 0 54 60" xmlns="http://www.w3.org/2000/svg">
                <g id="marker" fill="${markerColor}">
                    <circle cx="27" cy="27" r="27"/>
                    <polygon points="18,52 36,52 27,60"/>
                </g>
                <circle cx="27" cy="27" r="25" fill="${textBackground}"/>
                <text style="font-size:24px; text-transform:uppercase; font-family: Roboto Mono;" fill="${textColor}"  x="13" y="36">
                    ${initials}
                </text>
            </svg>
        `;
        return html;
    } else { // If there is a profile picture, render user initials as well as a profile pic
        html = `
            <svg width="54" height="60" viewBox="0 0 54 60" xmlns="http://www.w3.org/2000/svg">
                <g id="marker" fill="${markerColor}">
                    <circle cx="27" cy="27" r="27"/>
                    <polygon points="18,52 36,52 27,60"/>
                </g>
                <circle cx="27" cy="27" r="25" fill="${textBackground}"/>
                <text style="font-size:24px; text-transform:uppercase; font-family: Roboto Mono;" fill="${textColor}"  x="13" y="36">
                    ${initials}
                </text>
                <clipPath id="pictureCircle">
                    <circle cx="27" cy="27" r="25" fill="#FFFFFF"/>
                </clipPath>
                <image clip-path="url(#pictureCircle)" href="${pic}" x="2" y="2" width="50" height="50" r="5"/>
            </svg>
        `;
        return html;
    }
}