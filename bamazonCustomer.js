// Requiring all the dependencies
var inquirer = require('inquirer');
var mysql = require('mysql');

// Creating the MySQL connection parameters
var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,

    // Your username
    user: 'root',

    // Your password
    password: '',
    database: 'Bamazon'
});


function runBamazon() {
    productList();
}
runBamazon();

// askUserPreference will ask the user for the item and quantity 
function askUserPreference() {


    // Prompt the user to select an item
    inquirer.prompt([{
            type: 'input',
            name: 'item_id',
            message: 'Please enter the Item ID which you would like to purchase.',
            validate: checkUserInput,
            filter: Number
        },
        {
            type: 'input',
            name: 'quantity',
            message: 'How many do you need?',
            validate: checkUserInput,
            filter: Number
        }
    ]).then(function (input) {


        var item = input.item_id;
        var quantity = input.quantity;

        // Check the database to see and verify that the given item ID exists in the desired quantity
        var query = 'SELECT * FROM products WHERE ?';

        connection.query(query, {
            item_id: item
        }, function (err, result) {
            if (err) throw err;

            // If the user has selected an invalid item ID, result will be empty

            if (result.length === 0) {
                console.log('ERROR: Invalid Item ID. Please select a valid Item ID.');
                productList();

            } else {
                var productresult = result[0];


                // If the quantity requested by the user is in stock
                if (quantity <= productresult.stock_quantity) {
                    console.log('Thank you for your patience, the product you requested is available!Please stand by while we place your order!');

                    // Updating DB
                    var updatequery = 'UPDATE products SET stock_quantity = ' + (productresult.stock_quantity - quantity) + ' WHERE item_id = ' + item;

                    connection.query(updatequery, function (err, result) {
                        if (err) throw err;

                        console.log('Your order has been placed! Your total is $' + productresult.price * quantity);
                        console.log('Have a nice day!');
                        console.log("\n---------------------------------------------------------------------\n");

                        // End the database connection
                        connection.end();
                    })
                } else {
                    console.log('Sorry, the requested item is not available, your order can not be placed as is.');
                    console.log('Please modify your order.');
                    console.log("\n---------------------------------------------------------------------\n");

                    productList();
                }
            }
        })
    })
}

// productList will display the product list from the database
function productList() {

    // Construct the db query string
    query = 'SELECT * FROM products';

    // Make the db query
    connection.query(query, function (err, result) {
        if (err) throw err;

        console.log('Existing Inventory: ');
        console.log('...................\n');

        var finalMessage = '';
        for (var i = 0; i < result.length; i++) {
            finalMessage = '';
            finalMessage += 'Item ID: ' + result[i].item_id + '  //  ';
            finalMessage += 'Product Name: ' + result[i].product_name + '  //  ';
            finalMessage += 'Department: ' + result[i].department_name + '  //  ';
            finalMessage += 'Price: $' + result[i].price + '\n';

            console.log(finalMessage);
        }

        console.log("---------------------------------------------------------------------\n");

        //Prompt the user for item/quantity they would like to purchase
        askUserPreference();
    })
}

// Check to ensure input is a valid and as per expected resulttype
function checkUserInput(value) {
    var integer = Number.isInteger(parseFloat(value));
    var sign = Math.sign(value);

    if (integer && (sign === 1)) {
        return true;
    } else {
        return 'Please enter a whole non-zero number.';
    }
}