export const numberInputs = input => Object.keys(input).reduce((acc, val) => { acc[val] = +input[val]; return acc; }, {});
