const dateFormat = require('dateformat');

function formatFinalUrl(trkType, trkLink, currentUnixTime) {
    const miliSecInDay = 86400 * 1000;
    const daysAgo = miliSecInDay * 14;
    if (trkType === 'inreach') {
        const timeAgo = new Date(currentUnixTime - (daysAgo));
        dateFormat.masks.garmin = 'yyyy-mm-dd"T"HH:MM"Z"';
        const garminFormatedDate = dateFormat(timeAgo, 'garmin');
        return `${trkLink}?d1=${garminFormatedDate}`;
    } else {
        const timeAgo = new Date(currentUnixTime - (daysAgo));
        const spotFormatedDate = dateFormat(timeAgo, 'isoDateTime');
        return `${trkLink}/message.json?startDate=${spotFormatedDate}`;
    }
}

module.exports.formatFinalUrl = formatFinalUrl;