import Papa from 'papaparse';
export default file => new Promise((complete, error) => Papa.parse(file, { complete, error, skipEmptyLines: true }));
