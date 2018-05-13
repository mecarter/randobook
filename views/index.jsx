const React = require('react');

const Page = require('./components/Page');

const Index = ({ loggedIn }) => (
  <Page title="Randobook - A random book from your Goodreads to-read shelf, every month.">
    {!loggedIn &&
      <React.Fragment>
        <div id="description">
          <p>Get a monthly random selection from your Goodreads &ldquo;to-read&rdquo; shelf.</p>
          <p>Buy it from Powell's books, one of the leading independent bookstores in the US.</p>
          <p>Get reading.</p>
        </div>
        <a id="login-button" href="/user/login">Login with your Goodreads account</a>
      </React.Fragment>
    }
    {loggedIn && 
      <React.Fragment>
        <div id="app" />
        <script src="/randobook.js" />
      </React.Fragment>
    }
  </Page>
);

module.exports = Index;
