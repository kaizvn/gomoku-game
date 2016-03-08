/**
 * Created by HungNguyen on 3/7/16.
 */


if (Meteor.isClient) {
    Meteor.startup(function () {
        var playerId = localStorage.getItem('playerId');
        Meteor.subscribe('player.connect', playerId);
    });
}