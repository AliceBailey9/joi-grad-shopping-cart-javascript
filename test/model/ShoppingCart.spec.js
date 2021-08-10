import Customer from "../../src/model/Customer.js";
import Product from "../../src/model/Product.js";
import ShoppingCart from "../../src/model/ShoppingCart.js";

describe("Shopping cart should checkout", () => {
  it("Should calculate correct total and loyalty points for 10% discounted products", () => {
    const customer = new Customer("Test customer");
    const products = [new Product(100, "DIS_10_TestProduct", "Test product")];
    const shoppingCart = new ShoppingCart(customer, products);

    const order = shoppingCart.checkout();

    // expect(shoppingCart.customer.name).toBe("Test customer");
    // expect(shoppingCart.customer).toEqual({ name: "Test customer" });
    // expect(shoppingCart.customer).toEqual(new Customer("Test customer"));
    expect(order.totalPrice).toBe(90);
    expect(order.loyaltyPoints).toBe(10);
  });

  it("Should calculate correct total and loyalty points for 15% discounted products", () => {
    const customer = new Customer("Test customer");
    const products = [new Product(150, "DIS_15_TestProduct", "Test product")];
    const shoppingCart = new ShoppingCart(customer, products);

    const order = shoppingCart.checkout();

    expect(order.totalPrice).toBe(127.5);
    expect(order.loyaltyPoints).toBe(10);
  });

  it("Should calculate correct total and loyalty points for 20%  discounted products", () => {
    const customer = new Customer("Test customer");
    const products = [new Product(100, "DIS_20_TestProduct", "Test product")];
    const shoppingCart = new ShoppingCart(customer, products);
    let expectedPrice = products[0].price * 0.8;
    const order = shoppingCart.checkout();
    expect(order.totalPrice).toBe(expectedPrice);
    expect(order.loyaltyPoints).toBe(5);
  });

  it("Should calculate correct total and loyalty points for non discounted products", () => {
    const customer = new Customer("Test customer");
    const products = [new Product(100, "TestProduct", "Test product")];
    const shoppingCart = new ShoppingCart(customer, products);

    const order = shoppingCart.checkout();

    expect(order.totalPrice).toBe(100);
    expect(order.loyaltyPoints).toBe(20);
  });

  it("if two products with 2 for 1 code are purchased at checkout then price of one product is removed from the totalPrice", () => {
    const customer = new Customer("Test customer");
    const products = [
      new Product(100, "BULK_BUY_2_GET_1_TestProduct", "Test product"),
    ];
    const shoppingCart = new ShoppingCart(customer, products);
    shoppingCart.addProduct(
      new Product(100, "BULK_BUY_2_GET_1_TestProduct2", "Test product2")
    );

    const order = shoppingCart.checkout();
    expect(order.totalPrice).toBe(100);
  });
});

describe("Shopping cart should modify products", () => {
  it("Should add another product to the cart", () => {
    const customer = new Customer("Test Customer");
    const products = [new Product(100, "TestProductOne", "Test Product One")];
    const shoppingCart = new ShoppingCart(customer, products);

    shoppingCart.addProduct(
      new Product(200, "TestProductTwo", "Test Product Two")
    );

    expect(shoppingCart.products).toEqual([
      new Product(100, "TestProductOne", "Test Product One"),
      new Product(200, "TestProductTwo", "Test Product Two"),
    ]);

    // expect(shoppingCart.products).toEqual([
    //   { price: 100, code: "TestProductOne", name: "Test Product One" },
    //   { price: 200, code: "TestProductTwo", name: "Test Product Two" },
    // ]);
  });

  it("Should remove a product from the cart", () => {
    const customer = new Customer("Test Customer");
    const products = [
      new Product(100, "TestProductOne", "Test Product One"),
      new Product(200, "TestProductTwo", "Test Product Two"),
    ];
    const shoppingCart = new ShoppingCart(customer, products);

    shoppingCart.removeProduct(
      new Product(200, "TestProductTwo", "Test Product Two")
    );

    expect(shoppingCart.products).toEqual([
      new Product(100, "TestProductOne", "Test Product One"),
    ]);
    console.log(shoppingCart.displaySummary());
  });
});
