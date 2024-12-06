import { readFile, readFileSync } from 'fs';

export default async function readCSV(path) {
  const result = [];
  const fileData = readFileSync(path, 'utf-8', (err, fileData) => {
    if (err) console.error(err);
    return fileData;
  });
  const lines = fileData.split('\n');
  lines.forEach((line) => {
    if (line === '') return;

    result.push(line.split(','));
  });
  return result.slice(1);
}
