import path from 'path';
const fs = require('fs');

export default async function getAccountInfo(req, res) {
    try {
        const pathData = path.join(__dirname, '../../../../src/data/data.json');
        const data = fs.readFileSync(pathData, { encoding: 'utf8', flag: 'r' });
        const dataJson = JSON.parse(data)
        return res.status(200).json(dataJson);
    } catch (error) {
        console.error('Error in API:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
