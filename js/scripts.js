// Back End Logic
function Order(bagel, spread, egg, meat, cheese, quantity, price) {
  this.bagel = bagel;
  this.spread = spread;
  this.egg = egg;
  this.meat = meat;
  this.cheese = cheese;
  this.quantity = quantity;
  this.price = price
};

function Cart(item1, totalCost) {
  this.item1 = item1
  this.totalCost = totalCost
};

Order.prototype.sendToReceipt = function() {
  $("#receiptItems").append(
    "<li>$1.25..." + this.bagel + " bagel</li>");
  if (this.spread != 'none') {
    $("#receiptItems").append(
      "<li>$0.25...spread: " + this.spread + "</li>")
    }
  if (this.egg != 'none') {
    $("#receiptItems").append(
      "<li>$0.50...egg: " + this.egg + "</li>")
  }
  if (this.meat != 'none') {
    $("#receiptItems").append(
      "<li>$1.00...meat: " + this.meat + "</li>")
  }
  if (this.cheese != 'none') {
    $("#receiptItems").append(
      "<li>$0.75...cheese: " + this.cheese + "</li>")
  }
  $("#receiptItems").append(
    "<p><b>Quantity: x" + this.quantity + "</b></p>" +
    "<p><b>Price: $" + this.price +"</b></p>"
  );
};

Order.prototype.determinePrice = function() {
  if (this.spread != 'none') {
    this.price += 0.25
  }
  if (this.egg != 'none') {
    this.price += 0.5
  }
  if (this.meat != 'none') {
    this.price += 1
  }
  if (this.cheese != 'none') {
    this.price += 0.75
  }
  this.price *= this.quantity;
}

var total = 0;
// Front End Logic
$("#order").submit(function(event) {
  event.preventDefault();

  var bagel = $(".bagel label input:checked").val();
  var spread = $(".spread label input:checked").val();
  var egg = $(".egg label input:checked").val();
  var meat = $(".meat label input:checked").val();
  var cheese = $(".cheese label input:checked").val();
  var quantity = parseInt($("#bagelQuantity").val());
  var price = 1.25;

  console.log(bagel)
  console.log(spread)
  console.log(egg)
  console.log(meat)
  console.log(cheese)
  console.log(quantity)
  console.log(price)

  var newOrder = new Order(bagel, spread, egg, meat, cheese, quantity, price);
  newOrder.determinePrice();
  console.log(newOrder)
  total += newOrder.price;
  console.log("total: " + total)

  newOrder.sendToReceipt();
  $("#total").text("TOTAL: $" + total)
  $("#confirm").show();
});
