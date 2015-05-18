/**
 * Created by root on 1/2/15.
 */
// In your server code: define a method that the client can call
Meteor.methods({
    sendEmail: function (email2, name2,comments2, orderInfo) {
        var adminEmail = 'missoulaguidelunches@gmail.com';//'zleman1593@gmail.com';
        //check([from], [String]);

        // Let other method calls from the same client start running,
        // without waiting for the email sending to complete.
        this.unblock();

        var html = SSR.render("emailText", {allInfo:[{order: orderInfo},{email: email2},{name: name2},{comments: comments2}]});
        var htmlConfirm = SSR.render("emailConfirm", {allInfo:[{order: orderInfo},{email: email2},{name: name2},{comments: comments2}]});
        Email.send({
            to: adminEmail,
            from: adminEmail,
            subject: 'Order from: ' + name2,
            html: html
        });
//Confirmation email
        Email.send({
            to: email2,
            from: adminEmail,
            subject: 'Your MGL Order Confirmation',
            html: htmlConfirm
        });

var orderDetails = {allInfo:[{order: orderInfo},{email: email2},{name: name2}]}
        orderDetails._id = Orders.insert(orderDetails);


        return orderDetails._id;
    }



});



SSR.compileTemplate('emailText', Assets.getText('order.html'));

Template.emailText.helpers({
    time: function() {
        return new Date().toString();
    },

    personName: function() {
        return this[2].name;
    },

    email: function() {
        return this[1].email;
    },
    order: function() {
        return this[0].order;
    },

     comments: function() {
        return this[3].comments;
    },

    topping: function() {
        return this.topping;
    },
});


SSR.compileTemplate('emailConfirm', Assets.getText('emailConfirm.html'));

Template.emailConfirm.helpers({
    time: function() {
        return new Date().toString();
    },

    personName: function() {
        return this[2].name;
    },

    email: function() {
        return this[1].email;
    },
    order: function() {
        return this[0].order;
    },
      comments: function() {
        return this[3].comments;
    },


    topping: function() {
        return this.topping;
    },
});