import path from 'path';

const fs = require('fs')
export default async function handler(req, res) {
    // lay du lieu tu file cu
    const pathData = path.join(__dirname, '../../../../src/data/data.json');
    const data = fs.readFileSync(pathData, { encoding: 'utf8', flag: 'r' });
    const dataJson = JSON.parse(data)


    // lay du lieu tu form body
    const dataCreate = req.body
    const dataCreateJSON = JSON.parse(dataCreate)

    // merge
    const newData = [...dataJson, ...dataCreateJSON]

    // write new data
    fs.writeFileSync(pathData, JSON.stringify(newData), { encoding: "utf8", flag: 'w+' })

    res.status(200).json({ message: "OK" })
}