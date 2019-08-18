export function deepMerge(...args: any[]): object {

  let newObj = {};

  // Merge the object into the newObj object
  let merge = obj => {
    for (let prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        // If property is an object, merge properties
        if (Object.prototype.toString.call(obj[prop]) === '[object Object]') {
          newObj[prop] = deepMerge(newObj[prop], obj[prop]);
        } else {
          newObj[prop] = obj[prop];
        }
      }
    }
  };

  // Loop through each object and conduct a merge
  for (let arg of args) {
    merge(arg);
  }

  return newObj;
}

export function deepClone(initialObj) {

  if (initialObj === undefined) {
    return {};
  }

  return JSON.parse(JSON.stringify(initialObj));
}

export function isFunction(functionToCheck) {
  return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
}

export function convertToCSV(array) {
  // Use first element to choose the keys and the order
  const keys = Object.keys(array[0]);

  // Build header
  let result = keys.map(key => `"${key}"`).join(',') + '\n';

  // Add the rows
  array.forEach(obj => {
    keys.forEach((k, ix) => {
      if (ix) {
        result += ',';
      }
      result += `"${obj[k]}"`;
    });
    result += '\n';
  });

  return result;
}
