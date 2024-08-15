if (process.env.NODE_ENV === 'Production') {
  module.exports = require('./prod_keys')
}else if(process.env.NODE_ENV === 'Testing'){
  module.exports = require('./test_keys')
}
else if(process.env.NODE_ENV === 'beta'){
  module.exports = require('./beta_keys')
}
 else {
  module.exports = require('./dev_keys')
}
