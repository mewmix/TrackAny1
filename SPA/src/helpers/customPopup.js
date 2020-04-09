// Will need to import moment.js to adjust the timestamp

export const customPopup = (fName, lName, data) => {
    let { alt, elevation, heading, velocity, lat, lng } = data;
    let agl = parseInt(alt) - parseInt(elevation);  // Subtract users altitude from ground elevation 

    // Set AGL to 0 if it turns out to be a negative number. You shouldn't be underground.
    if (agl < 0) {
        agl = 0;
    }

    let html = `
            <b style="font-size: 20px;">${fName} ${lName}</b>
            <br>
            <br>
            <b>Last Update: </b>10 min ago
            <br>  
            <b>Altitude: </b>${parseInt(alt)}m
            <br>  
            <b>AGL: </b>${agl}m
            <br>
            <b>Speed: </b>${velocity}
            <br>
            <b>Heading: </b>${heading}
            <br>
            <b>Lat: </b>${lat}
            <br>
            <b>Lng: </b>${lng}
            <br>
            <a target="_blank" href="https://www.google.com/maps/search/?api=1&query=${lat},${lng}">Google Maps</a>
            <br>
            <button onclick="copyText('${lat}, ${lng}')">Copy Coordinates To Clipboard</button>
        `;

    return html;
}