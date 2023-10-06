import path from 'path';

const fs = require('fs')
export default async function handler(req, res) {
    try {
        const pathData = path.join(__dirname, '../../../../src/data/data.json');
        const data = fs.readFileSync(pathData, { encoding: 'utf8', flag: 'r' });
        const dataJson = JSON.parse(data)

        const dataCreate = req.body
        const dataCreateJSON = JSON.parse(dataCreate)

        const newData = { ...dataJson, ...dataCreateJSON }

        fs.writeFileSync(pathData, JSON.stringify(newData), { encoding: "utf8", flag: 'w+' })
        res.status(200).json({ message: "OK" })
    } catch (error) {
        console.error('Error in API:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}