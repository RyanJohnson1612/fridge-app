const formatQueryString = (params) => {
  if (!params) return '';

  return Object.keys(params).reduce((prev, current) => {
    if(current !== 'search') {
      if (params[current].includes(',')) {
        prev += ` AND (${current} = '${params[current].replace(/,/g, `' OR ${current} = '`)}')`;
      } else {
        prev += ` AND (${current} = '${params[current]}')`;
      }
    } else {
      prev += ` AND (${current} LIKE '%${params[current].trim()}%')`;
    }
      return prev;

  }, '');
}

module.exports = formatQueryString;
