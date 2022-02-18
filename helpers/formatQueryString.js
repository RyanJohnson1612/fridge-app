const moment = require('moment');

const formatQueryString = (params) => {
  if (!params) return '';

  return Object.keys(params).reduce((prev, current) => {
    console.log(current)
    if(current !== 'search' && current !== 'expiresIn') {
      if (params[current].includes(',')) {
        prev += ` AND (${current} = '${params[current].replace(/,/g, `' OR ${current} = '`)}')`;
      } else {
        prev += ` AND (${current} = '${params[current]}')`;
      }
    } else if (current === 'search'){
      prev += ` AND (UPPER(${current}) LIKE UPPER('%${params[current].trim()}%'))`;
    }
    // else if (current === 'expiresIn') {
    //   const days = params[current].split(',')
    //   prev += ` AND (expiry BETWEEN '${moment().add(Number(days[0]), 'days').format('YYYY-MM-DD')}' AND '${moment().add(Number(days[1]), 'days').format('YYYY-MM-DD')}')`
    // }
      return prev;

  }, '');
}

module.exports = formatQueryString;
