Package.describe({
    name: 'gomoku:room',
    version: '0.0.1',
    // Brief, one-line summary of the package.
    summary: '',
    // URL to the Git repository containing the source code for this package.
    git: '',
    // By default, Meteor will default to using README.md for documentation.
    // To avoid submitting documentation, set this field to null.
    documentation: 'README.md'
});

Package.onUse(function (api) {
    api.versionsFrom('1.2.1');
    api.use([
        "socialize:user-model@0.1.4",
        "stevezhu:lodash",
        "ecmascript",
        "gomoku:player"
    ]);
    api.addFiles('room.js');

    api.addFiles(['common/config.js', 'common/model.js', 'common/extends.js']);
    api.addFiles(['server/publications.js', 'server/methods.js', 'server/startup.js'], ['server']);

    api.export(['Player', 'Room']);


});

Package.onTest(function (api) {
    api.use('ecmascript');
    api.use('tinytest');
    api.use('room');
    api.addFiles('room-tests.js');
});
