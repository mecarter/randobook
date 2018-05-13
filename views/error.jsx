const React = require('react');

const Page = require('./components/Page');

const Error = (props) => (
  <Page title="Randobook - something went wrong.">
      <h1>An error has occurred</h1>
      <p>{props.message}</p>
  </Page>
);

module.exports = Error;
