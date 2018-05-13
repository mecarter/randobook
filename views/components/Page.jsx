const React = require('react');

const Page = ({ children, title }) => (
  <html>
    <head>
      <title>{title}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link href="/styles.css" rel="stylesheet" type="text/css" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
    </head>
    <body>
      <div id="wrapper">
        <h1 id="logo">
          <span>Rando</span>book
        </h1>
        {children}
      </div>
      <footer id="footer">
        👨‍🎨 Designed &amp; built by <a href="//mecarter.com">Mark E. Carter</a>
        {' >>> '}
        ...Problems? Contact me on <a href="//twitter.com/markecarter">Twitter</a>
      </footer>
    </body>
  </html>
);

module.exports = Page;
