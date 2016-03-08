//Clear old count connections
Meteor.startup(function () {
    connectionsModel.remove({});
});