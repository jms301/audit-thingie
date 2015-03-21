Package.describe({
  name: 'tiro:auditexport',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0.4.2');
  api.use('standard-app-packages');
  api.use("contract");
  api.use("iron:router");
  api.use("pfafman:filesaver");
  api.addFiles('auditexport.html', 'client');
  api.addFiles('setup.js');
  api.addFiles('server.js', 'server');
  api.addFiles('auditexport.js', 'client');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('tiro:auditexport');
  api.addFiles('auditexport-tests.js');
});
