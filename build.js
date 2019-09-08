const metalsmith = require('metalsmith');
const metalsmithServe = require('metalsmith-serve');
const metalsmithIgnore = require('metalsmith-ignore');
const metalsmithCollections = require('metalsmith-collections');
const metalsmithPagination = require('metalsmith-pagination');
const metalsmithInPlace = require('metalsmith-in-place');
const metalsmithPermalinks = require('metalsmith-permalinks');
const metalsmithCanonical = require('metalsmith-canonical');
const metalsmithExcerpts = require('metalsmith-excerpts');
const metalsmithKeymaster = require('metalsmith-keymaster');
const metalsmithLayouts = require('metalsmith-layouts');
const metalsmithFeed = require('metalsmith-feed');
const metalsmithDebug = require('metalsmith-debug');
const metalsmithHtmlMinifier = require('metalsmith-html-minifier');
const metalsmithSass = require('metalsmith-sass');
const metalsmithUglify = require('metalsmith-uglify');
const striptags = require('striptags');

const config = require('./config');

metalsmith(__dirname)
  .metadata({
    config,
    site: config.site,
    currentYear: (new Date()).getFullYear(),
  })
  .source('./src')
  .destination('./build')
  .clean(true)
  .use(metalsmithServe({
    port: 8000,
  }))
  .use(metalsmithIgnore([
    'drafts/*',
    'img/*.psd',
  ]))
  .use(metalsmithCollections({
    posts: {
      pattern: 'posts/*.md',
      sortBy: 'date',
      reverse: true,
    },
  }))
  .use(metalsmithPagination({
    'collections.posts': {
      layout: 'blog-index.njk',
      first: 'blog/index.html',
      path: 'blog/page/:num/index.html',
      pageMetadata: {
        title: 'Blog',
      },
    },
  }))
  .use(metalsmithDebug())
  .use(metalsmithInPlace({
    engineOptions: {
      html: true,
    },
  }))
  .use(metalsmithPermalinks({
    relative: 'folder',
    linksets: [
      {
        match: {
          collection: 'posts',
        },
        pattern: 'blog/p/:slug',
      },
    ],
  }))
  .use(metalsmithCanonical({
    hostname: config.url,
    omitIndex: true,
  }))
  .use(metalsmithExcerpts())
  .use(metalsmithKeymaster({
    from: f => striptags(f.excerpt || ''),
    to: 'excerpt',
  }))
  .use(metalsmithLayouts())
  .use(metalsmithFeed({
    collection: 'posts',
  }))
  .use(metalsmithHtmlMinifier())
  .use(metalsmithSass({
    outputDir: 'css/',
  }))
  .use(metalsmithUglify({
    concat: {
      file: 'js/scripts.min.js',
    },
    removeOriginal: true,
  }))
  .build(function(err) {
    if (err) {
      throw err;
    }
  });
