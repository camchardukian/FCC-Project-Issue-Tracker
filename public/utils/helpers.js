const Helper = {
  removeUndefinedAndEmptyStringValuesFromObj: obj => {
    Object.keys(obj).forEach(k => !obj[k] && obj[k] !== false && delete obj[k]);
    return obj;
  },
  checkIsEmptyObject: obj => {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  }
};
module.exports = Helper;
