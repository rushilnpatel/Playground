export function formatNumber(value: number, decimals: number = 1): string {

  if (value === undefined || value === null || value <= 0) {
    return '0';
  }

  const dm = decimals + 1 || 3;
  const sizes = ['', 'K', 'M', 'B'];
  const i = Math.floor(Math.log(value) / Math.log(1000));

  return `${parseFloat((value / Math.pow(1000, i)).toFixed(dm))}${sizes[i]}`;
}

export function formatBytes(bytes: number, decimals: number = 1, abbreviation: boolean = true): string {

  const byteAbbreviation = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
  const byteNotAbbreviation = ['Bytes', 'KBytes', 'MBytes', 'GBytes', 'TBytes', 'PBytes'];
  const kiloByte = 1024;

  if (bytes === undefined || bytes === null || bytes <= 0) {
    return abbreviation ? '0 B' : '0 Bytes';
  }

  const dm = decimals + 1 || 3;
  const sizes = abbreviation ? byteAbbreviation : byteNotAbbreviation;
  const i = Math.floor(Math.log(bytes) / Math.log(kiloByte));

  return parseFloat((bytes / Math.pow(kiloByte, i)).toFixed(dm)) + ' ' + sizes[i];
}
