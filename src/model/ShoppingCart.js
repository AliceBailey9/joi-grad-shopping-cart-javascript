import _ from "lodash";
import Order from "./Order.js";

export default class ShoppingCart {
  constructor(customer, products) {
    this.customer = customer;
    this.products = products;
  }
  //when creating products in test we put it into an array

  addProduct = (product) => {
    this.products.push(product);
  };

  removeProduct = (product) => {
    _.remove(this.products, product);
  };
  //_.remove(array, function)

  checkout = () => {
    let totalPrice = 0;
    let loyaltyPointsEarned = 0;
    // count of buy 2 get one free
    // price of 2 for 1 product

    this.products.forEach((product) => {
      let discount = 0;
      if (product.code.startsWith("DIS_10")) {
        discount = product.price * 0.1;
        loyaltyPointsEarned += product.price / 10;
      } else if (product.code.startsWith("DIS_15")) {
        discount = product.price * 0.15;
        loyaltyPointsEarned += product.price / 15;
      } else if (product.code.startsWith("DIS_20")) {
        discount = product.price * 0.2;
        loyaltyPointsEarned += product.price / 20;
      } else {
        loyaltyPointsEarned += product.price / 5;
      }

      //abstractoin
      //just over line
      //refactoring
      //4
      //robert martin, clean code
      //what to abstract a method

      totalPrice += product.price - discount;
    });

    //loyalty points round down if price cant be divided by code exactly?
    return new Order(totalPrice, loyaltyPointsEarned);
  };

  displaySummary = () => {
    return (
      "Customer: " +
      this.customer.name +
      "\n" +
      "Bought:  \n" +
      this.products.map((p) => "- " + p.name + ", " + p.price).join("\n")
    );
  };
}
