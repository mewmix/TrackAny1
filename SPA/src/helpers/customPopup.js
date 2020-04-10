export const customPopup = (fName, lName, data) => {
    let { alt, elevation, heading, velocity, lat, lng, unixTime, txtMsg, isEmergency } = data;

    alt = parseFloat(alt);
    elevation = parseFloat(elevation);
    let agl = alt - elevation;  // Subtract users altitude from ground elevation

    let conversionFactor = 3.2808;
    let feetASL = Math.round(alt * conversionFactor);
    let feetAGL = Math.round(agl * conversionFactor);
    let feetElevation = Math.round(elevation * conversionFactor);
    let metersASL = Math.round(alt);
    let metersAGL = Math.round(agl);
    let metersElevation = Math.round(elevation);

    // Remove insignificant trailing zeros from lat, lng
    lat = parseFloat(lat).toString();
    lng = parseFloat(lng).toString();

    if (txtMsg !== '') {
        txtMsg = `
        <br>
        <b>Text Msg: </b>${txtMsg}
        <br>`;
    }
    if (velocity !== '') {
        velocity = `<li><b>Speed: </b>${velocity}</li>`;
    }
    if (heading !== '') {
        heading = `<li><b>Heading: </b>${heading}</li>`;
    }

    let html = `
            <b style="font-size: 20px;">${fName} ${lName}</b>
            <br>
            ${moment.unix(unixTime).format('MMM Do YYYY, h:mm a')}
            <br>
            <hr>
            ${txtMsg}
            <br>
            <ul style="list-style: none; padding-left: 0;">
                <li><b>Last Update: </b>${moment.unix(unixTime).fromNow()}</li>
                <li><b>ASL: </b>${metersASL}m (${feetASL}ft)</li>
                <li><b>AGL: </b>${metersAGL}m (${feetAGL}ft)</li>
                <li><b>Elevation: </b>${metersElevation}m (${feetElevation}ft)</li>
                ${velocity}
                ${heading}
                <li><b>Lat: </b>${lat}</li>
                <li><b>Lng: </b>${lng}</li>
            </ul>
            <br>
            <a target="_blank" href="https://www.google.com/maps/search/?api=1&query=${lat},${lng}" style="font-size: 16px;">Google Maps</a>
            <br>
            <a target="_blank" href="https://www.windy.com/${lat}/${lng}?${lat},${lng},12" style="font-size: 16px;">Windy Weather</a>
        `;

    return html;
}
