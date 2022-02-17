const formatQueryString = (params) => {
  if (!params) return '';

  return Object.keys(params).reduce((prev, current) => {
    if (params[current].includes(',')) {
      prev += ` AND (${current} = '${params[current].replace(/,/g, `' OR ${current} = '`)}')`;
    } else {
      prev += ` AND (${current} = '${params[current]}')`;
    }
    return prev;
  }, '');
}

module.exports = formatQueryString;
