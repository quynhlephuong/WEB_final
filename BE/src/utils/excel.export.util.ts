export function parseCellReference(cellRef: string): [string, number] {
  const match = cellRef.match(/^([A-Z]+)(\d+)$/);
  if (!match) {
    throw new Error('Invalid cell reference');
  }
  return [match[1], parseInt(match[2], 10)];
}

export function getColumnLetter(columnNumber: number): string {
  if (columnNumber < 0) {
    throw new Error('Column number cannot be negative');
  }

  let temp = columnNumber;
  let letter = '';
  while (temp >= 0) {
    letter = String.fromCharCode((temp % 26) + 65) + letter;
    temp = Math.floor(temp / 26) - 1;
  }
  return letter;
}
