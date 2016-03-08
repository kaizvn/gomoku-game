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
    player01: {
        type: String,
        optional: true,
        defaultValue: ''
    },
    player02: {
        type: String,
        optional: true,
        defaultValue: ''
    },
    turn01: {
        type: Boolean,
        defaultValue: true
    },
    gameStatus: {
        type: String,
        defaultValue: 'Ready'
    },
    winner: {
        type: String,
        optional: true,
        defaultValue: ''
    },
    boardMap: {
        type: [[]],
        defaultValue: []
    },

    history: {
        type: [Object],
        defaultValue: []
    }
});

Room = model;
/**
 * PERMISSIONS AND HOOKS
 */

