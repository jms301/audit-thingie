Package.describe({
  name: 'contract',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'Provides the contract feature.',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0.3.1');
  api.use('standard-app-packages');
  api.use('less');
  api.use('twbs:bootstrap');
  api.use('iron:router');
  api.use('aslagle:reactive-table@0.3.21');
  api.use('changelog');

  api.addFiles('contract.less', 'client');
  api.addFiles('contract.html', 'client');
  api.addFiles('setup.js');
  api.addFiles('server.js', 'server');
  api.addFiles('contract.js', 'client');

  api.export('Contracts');
  api.export('KeyFFTypes');
  api.export('KeyFacFigs');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('contract');
  api.addFiles('contract-tests.js');
});
