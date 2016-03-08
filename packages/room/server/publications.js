/**
 * Created by HungNguyen on 8/21/15.
 */


var publications = {
    info: function (id) {
        return (id) ? Collection.find({_id: id}) : [];
    },
    list: function () {
        return Collection.find({}, {fields: {boardMap: 0, history: 0, turn01: 0}});
    }
};

_.each(publications, (func, name) => {
    Meteor.publish([COMPONENT_NAME, name].join('.'), func);
});