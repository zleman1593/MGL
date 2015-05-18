//This stores the order and is updated as soon as a item value changes
Session.setDefault("currentOrder", []);
Session.setDefault("ordering", false);
Session.setDefault("showSuccess", false);
Session.setDefault("orderFrom", "Forgot to enter contact info");
Session.setDefault("toppings", {});


numberOfEntrees = 8;
numberOfSnacks = 3;
numberOfDesserts = 4;
numberOfBreakfastItems = 5;



Template.main.helpers({

    currentOrder: function() {

        return Session.get("currentOrder");

    },
    showOptions: function() {
        //Init the new tag inputs
        if (this.item === 'e2') {
            return Session.get("toppings")['e2']; //Turkey Sandwich
        } else if (this.item === 'e6') {
            return Session.get("toppings")['e6']; //Caesar Salad
        } else if (this.item === 'e7') {
            return Session.get("toppings")['e7']; //Mixed Green Salad
        } else if (this.item === 'b1') {
            return Session.get("toppings")['b1']; //The Carsini
        } else if (this.item === 'b0') {
            return Session.get("toppings")['b0']; //The Porterhouse
        } else if (this.item === 'b2') {
            return Session.get("toppings")['b2']; //
        } else if (this.item === 'b3') {
            return Session.get("toppings")['b3']; //
        } else
            return [];
    },

    ordering: function() {

        return Session.get("ordering");

    },
    showSuccess: function() {

        return Session.get("showSuccess");

    },

    cart: function() {
        var current = Session.get("currentOrder");
        if (!current) {
            return false;
        }
        var sum = 0;
        for (i = 0; i < current.length; i++) {

            sum = sum + parseInt(current[i].quant);

        }

        return (sum !== 0);

    },
    cartCount: function() {
        var current = Session.get("currentOrder");
        if (!current) {
            return 0;
        }
        var sum = 0;
        for (i = 0; i < current.length; i++) {
            if (!!current[i].quant) {

                sum = sum + parseInt(current[i].quant);
            }
        }
        return sum;
    }

});




Template.main.events({

    'click #submitOrder': function() {
        //Adds the  toppings to the vanilla menu items in the current order object
        addToppings();

        // Asynchronously send an email
        Meteor.call('sendEmail', $('#email').val(), $('#name').val(), $('#mods').val(), Session.get("currentOrder"), function(error, result) {
            if (!error) {
                reset();
                Session.set("showSuccess", true);
            } else {
                alert("There was an error submitting your order. Please try again");
            }
        });

    },

    'touchspin.on.stopspin': function(e) {
        Session.set("ordering", true);
        Session.set("showSuccess", false);

        var current = function() {
            var hold = [];
            for (i = 0; i < numberOfBreakfastItems; i++) {
                var itemName = $('#b' + i).prop('id');
                var quant = $('#b' + i).val();
                var newItem = {
                    'item': itemName,
                    'quant': quant,
                    'name': $('#b' + i).prop('name')
                };
                if (quant != 0) {
                    hold.push(newItem);
                }
            }

            for (i = 0; i < numberOfEntrees; i++) {
                var itemName = $('#e' + i).prop('id');
                var quant = $('#e' + i).val();
                var newItem = {
                    'item': itemName,
                    'quant': quant,
                    'name': $('#e' + i).prop('name')
                };
                if (quant != 0) {
                    hold.push(newItem);
                }
            }

            for (i = 0; i < numberOfSnacks; i++) {
                var itemName = $('#s' + i).prop('id');
                var quant = $('#s' + i).val();
                var newItem = {
                    'item': itemName,
                    'quant': quant,
                    'name': $('#s' + i).prop('name')
                };
                if (quant != 0) {
                    hold.push(newItem);
                }
            }

            for (i = 0; i < numberOfDesserts; i++) {
                var itemName = $('#d' + i).prop('id');
                var quant = $('#d' + i).val();
                var newItem = {
                    'item': itemName,
                    'quant': quant,
                    'name': $('#d' + i).prop('name')
                };
                if (quant != 0) {
                    hold.push(newItem);
                }
            }

            var quant = $('#water').val();
            var newItem = {
                'item': 'water',
                'quant': quant,
                'name': 'Extra water'
            };
            if (quant != 0) {
                hold.push(newItem);
            }


            return hold;
        }
        $("input[data-role=tagsinput], select[multiple][data-role=tagsinput]").tagsinput();
        Session.set("currentOrder", current());

    },
    'click .review': function(e) {
       
        $("input[data-role=tagsinput], select[multiple][data-role=tagsinput]").tagsinput();

    }





});



var reset = function() {
    Session.set("currentOrder", []);
    Session.set("toppings", {});
    Session.set("ordering", false);
    var hold = [];
    //Lunch
    for (i = 0; i < numberOfEntrees; i++) {
        var itemName = $('#e' + i).prop('name');
        $('#e' + i).val(0);

    }
    //Breakfast
    for (i = 0; i < numberOfBreakfastItems; i++) {
        var itemName = $('#e' + i).prop('name');
        $('#b' + i).val(0);

    }
    //Sides
    for (i = 0; i < numberOfSnacks; i++) {
        var itemName = $('#s' + i).prop('name');
        $('#s' + i).val(0);
    }
    //Desserts
    for (i = 0; i < numberOfDesserts; i++) {
        var itemName = $('#d' + i).prop('name');
        $('#d' + i).val(0);

    }

    $('#water').val(0);


}


//When order chnages this is re run to shoe proper toppings 
Tracker.autorun(function(c) {
    var meals = {};
    var multipleOrdersOfSameItem = {};

    meals['b0'] = _.find(Session.get("currentOrder"), function(item) {
        return item.item === 'b0';
    });

    meals['b1'] = _.find(Session.get("currentOrder"), function(item) {
        return item.item === 'b1';
    });

      meals['b2'] = _.find(Session.get("currentOrder"), function(item) {
        return item.item === 'b2';
    });

    meals['b3'] = _.find(Session.get("currentOrder"), function(item) {
        return item.item === 'b3';
    });

    meals['e2'] = _.find(Session.get("currentOrder"), function(item) {
        return item.item === 'e2';
    });

    meals['e6'] = _.find(Session.get("currentOrder"), function(item) {
        return item.item === 'e6';
    });

    meals['e7'] = _.find(Session.get("currentOrder"), function(item) {
        return item.item === 'e7';
    });



    if (!!meals['e2']) {
        multipleOrdersOfSameItem['e2'] = [];
        for (i = 0; i < meals['e2'].quant; i++) {
            multipleOrdersOfSameItem['e2'].push({
                toppings: toppings(meals['e2'].item),
                id: 'P' + i
            });
        }
    }


    if (!!meals['e6']) {
        multipleOrdersOfSameItem['e6'] = [];
        for (i = 0; i < meals['e6'].quant; i++) {
            multipleOrdersOfSameItem['e6'].push({
                toppings: toppings(meals['e6'].item),
                id: 'M' + i
            });
        }
    }


    if (!!meals['e7']) {
        multipleOrdersOfSameItem['e7'] = [];
        for (i = 0; i < meals['e7'].quant; i++) {
            multipleOrdersOfSameItem['e7'].push({
                toppings: toppings(meals['e7'].item),
                id: 'M' + i
            });
        }
    }

  for (j = 0; j < numberOfBreakfastItems; j++) {
     breakfastID = 'b' + j;
        if (!!meals[breakfastID]) {
        multipleOrdersOfSameItem[breakfastID] = [];
        for (i = 0; i < meals[breakfastID].quant; i++) {
            multipleOrdersOfSameItem[breakfastID].push({
                toppings: toppings(meals[breakfastID].item),
                id: 'M' + i
            });
        }
    }
}


    Session.set("toppings", multipleOrdersOfSameItem);

});


getToppingSelections = function() {
    toppings = {};
    for (var item in Session.get("toppings")) {

        sameToppings = [];

        for (i = 0; i < item.length; i++) {

            var id = item[i].id;
            console.log(id);
            sameToppings.push($("#" + id).val());

        }

        console.log(id);
        toppings[id] = sameToppings;
    }
    return toppings;
}

addToppings = function() {
    var toppings = getToppingSelections();

    var food = Session.get("currentOrder");

    for (i = 0; i < food.length; i++) {
        if (food[i].item === 'e2') {
            food[i].topping = toppings['e2'];
        } else if (food[i].item === 'e3') {
            food[i].topping = toppings['e3'];
        } else if (food[i].item === 'e7') {
            food[i].topping = toppings['e7'];
        }
    }

    Session.set("currentOrder", food);
}



var toppings = function(meal) {
    toppingString = '';
    console.log(meal.length);
    switch (meal) { //(parseInt(meal.slice(1, 2))
        case 'b0':
        case 'b1':
            toppingString = 'On Everything Bagel, On Plain Bagel, Extra Egg ($1), Extra Meat ($1)';
            break;
        case 'e2':
            toppingString = 'Wheat Bread, Wrap, Tomato, Pickles, Lettuce, Onion, Sprouts, Hot peppers, Cheddar, Swiss cheese, Mayo, Mustard, Pesto, Bacon ($1)';
            break;
        case 'b2':
        case 'b3':
              toppingString = 'Extra Egg ($1), Extra Meat ($1)';
              break;
        case 'e6':
        case 'e7':
            toppingString = 'Add Chicken ($2), Add Salmon ($2)';
            break;

        default:
            toppingString = 'Error';

    }
    return toppingString;
}



Template.main.rendered = function() {

    //All breakfast
    for (i = 0; i < numberOfBreakfastItems; i++) {
        $('#b' + i).TouchSpin({
            initval: 0,
            min: 0,
        });
    }

    //All Entrees
    for (i = 1; i < numberOfEntrees; i++) {
        $('#e' + i).TouchSpin({
            initval: 0,
            min: 0,
        });
    }

    $("input[name='Hummus']").TouchSpin({
        initval: 0,
        min: 0,
    });

    $("input[name='Vegetable platter']").TouchSpin({
        initval: 0,
        min: 0,
    });

    $("input[name='Slaw']").TouchSpin({
        initval: 0,
        min: 0,
    });

    $("input[name='Health gorp']").TouchSpin({
        initval: 0,
        min: 0,
    });

    $("input[name='Brownie']").TouchSpin({
        initval: 0,
        min: 0,
    });
    $("input[name='Dark Chocolate acai berries']").TouchSpin({
        initval: 0,
        min: 0,
    });
    $("input[name='Dark Chocolate Carmel sea salt']").TouchSpin({
        initval: 0,
        min: 0,
    });
    $("input[name='Extra water']").TouchSpin({
        initval: 0,
        min: 0,
    });
};

Template.option.rendered = function() {

    // $("input[data-role=tagsinput], select[multiple][data-role=tagsinput]").tagsinput();

}
