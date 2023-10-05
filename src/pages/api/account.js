import { log } from 'console';
import path from 'path';
const fs = require('fs');

export default async function getAccountInfo(req, res) {
    const pathData = path.join(__dirname, '../../../../src/data/data.json');
    const data = fs.readFileSync(pathData, { encoding: 'utf8', flag: 'r' });
    const dataJson = JSON.parse(data)
    return res.status(200).json(dataJson);
}
