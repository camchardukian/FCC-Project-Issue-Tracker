const Helper = {
  removeUndefinedAndEmptyStringValuesFromObj: obj => {
    Object.keys(obj).forEach(k => !obj[k] && obj[k] !== false && delete obj[k]);
    return obj;
  }
};

module.exports = Helper;
