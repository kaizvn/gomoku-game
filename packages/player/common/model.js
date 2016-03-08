/**
 * Created by HungNguyen on 8/21/15.
 */
var model = BaseModel.extendAndSetupCollection(COMPONENT_NAME);
Collection = model.collection;

///*SimpleSchema.messages({
//
// xInvalid: "Max salary must greater than min salary"
//});*/


model.appendSchema({
    playerId: {
        type: String
    },
    isOnline: {
        type: Boolean,
        defaultValue: false
    },
    info: {
        type: Object,
        blackbox: true,
        defaultValue: {}
    }
});


Player = model;
/**
 * PERMISSIONS AND HOOKS
 */



connectionsModel = new Meteor.Collection("connections");
