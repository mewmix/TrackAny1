const xml2js = require('xml2js');

async function createGarminInsertStatement(deviceID, userID, result) {
    const parser = new xml2js.Parser();
    const rawData = await parser.parseStringPromise(result.data);
    const p = rawData.kml.Document[0].Folder[0].Placemark;

    let insertStatement = '';

    for (let i = 0; i < p.length - 1; i++) {

        let unix = Math.floor(new Date(p[i].TimeStamp[0].when[0]).getTime() / 1000);
        let lat = p[i].ExtendedData[0].Data[8].value[0];
        let lng = p[i].ExtendedData[0].Data[9].value[0];
        let alt = (p[i].Point[0].coordinates[0]).split(",")[2];
        let velocity = p[i].ExtendedData[0].Data[11].value[0];
        let heading = p[i].ExtendedData[0].Data[12].value[0];
        let message = p[i].ExtendedData[0].Data[15].value[0];
        let emergency = p[i].ExtendedData[0].Data[14].value[0];

        insertStatement = insertStatement.concat(`(${unix}, ${lat}, ${lng}, ${alt}, "${velocity}", "${heading}", "${message}", "${emergency}", ${deviceID}, ${userID}),`);
    }
    return insertStatement;
}

module.exports.createGarminInsertStatement = createGarminInsertStatement;