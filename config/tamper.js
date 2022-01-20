const config = {
  name: 'monkey',
  version: '0.0.1',
  description: 'hello monkey!',
  author: 'binyellow',
  grant: ['GM_xmlhttpRequest', 'GM_setValue', 'GM_getValue', 'unsafeWindow'],
  match: ['*'],
  require: [
    'https://cdn.bootcdn.net/ajax/libs/react/17.0.2/umd/react.production.min.js',
    'https://cdn.bootcdn.net/ajax/libs/react-dom/17.0.2/umd/react-dom.production.min.js',
  ],
};

module.exports = config;
