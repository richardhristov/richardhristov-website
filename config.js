const config = {
  domain: 'richardhristov.com',
  name: 'Richard Hristov',
  description: 'Test',
  contactEmail: 'richardhristov@gmail.com',
};
config.url = `https://${config.domain}`;
config.title = `${config.name}, web developer`;
config.site = {
  url: config.url,
  title: config.title,
  author: config.name,
};

module.exports = config;
