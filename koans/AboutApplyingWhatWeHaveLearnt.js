var _; // globals

describe("About Applying What We Have Learnt", function() {
  var products;

  beforeEach(function () { 
    products = [
       { name: "Sonoma", ingredients: ["artichoke", "sundried tomatoes", "mushrooms"], containsNuts: false },
       { name: "Pizza Primavera", ingredients: ["roma", "sundried tomatoes", "goats cheese", "rosemary"], containsNuts: false },
       { name: "South Of The Border", ingredients: ["black beans", "jalapenos", "mushrooms"], containsNuts: false },
       { name: "Blue Moon", ingredients: ["blue cheese", "garlic", "walnuts"], containsNuts: true },
       { name: "Taste Of Athens", ingredients: ["spinach", "kalamata olives", "sesame seeds"], containsNuts: true }
    ];
  });

  /*********************************************************************************/

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (imperative)", function () {
    var i,j,hasMushrooms, productsICanEat = [];

    for (i = 0; i < products.length; i+=1) {
        if (products[i].containsNuts === false) {
            hasMushrooms = false;
            for (j = 0; j < products[i].ingredients.length; j+=1) {
               if (products[i].ingredients[j] === "mushrooms") {
                  hasMushrooms = true;
               }
            }
            if (!hasMushrooms) productsICanEat.push(products[i]);
        }
    }

    expect(productsICanEat.length).toBe(1);
  });

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (functional)", function () {
       

      /* solve using filter() & all() / any() */
      var productsICanEat = _.filter(products, product => product['containsNuts'] === false && _(product['ingredients']).all(ingredient => ingredient !== 'mushrooms'));
      

      // return (_(products['ingredients']).all(ingredient => ingredient !== 'mushrooms') && product['containsNuts'] === false);
      expect(productsICanEat.length).toBe(1);
  });

  /*********************************************************************************/

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (imperative)", function () {
    var sum = 0;

    for(var i=1; i<1000; i+=1) {
      if (i % 3 === 0 || i % 5 === 0) {
        sum += i;
      }
    }
    
    expect(sum).toBe(233168);
  });

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (functional)", function () {
    var sum = _(_.range(1, 1000)).reduce((a, b) => b % 3 === 0 || b % 5 === 0 ? a + b : a, 0);    /* try chaining range() and reduce() */
    expect(233168).toBe(sum);
  });

  /*********************************************************************************/
   it("should count the ingredient occurrence (imperative)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    for (i = 0; i < products.length; i+=1) {
        for (j = 0; j < products[i].ingredients.length; j+=1) {
            ingredientCount[products[i].ingredients[j]] = (ingredientCount[products[i].ingredients[j]] || 0) + 1;
        }
    }

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  it("should count the ingredient occurrence (functional)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    ingredientCount = _(products).chain().map(product => product['ingredients']).flatten().reduce((acc, ingredient) => {
      acc[ingredient] = (acc[ingredient] || 0) + 1;
      return acc;
    }, ingredientCount).value();
    
    expect(ingredientCount['mushrooms']).toBe(2);
  });

  /*********************************************************************************/
  /* UNCOMMENT FOR EXTRA CREDIT */
  
  it("should find the largest prime factor of a composite number", function () {
    //This function accepts a number and return the largest prime factor within that number
    function largestPrimeFactor(num) {
      //Initialize an empty obj
      let primeObj = {};
      //Loop from 2 until num and add index as key and "true" as value
      for(let i = 2; i < num; i++) {
        primeObj[i] = true;
      }

      
      //Declare a value called limit, assign it the value of the square root of num
      let limit = Math.sqrt(num);
      //Loop from 2 until limit, increment by 1
      for(let i = 2; i < limit; i++) {
        //if the value of the key at current element is true
        if(primeObj[i] === true) {
          //create a nested loop, starting at the current element of i squared, runs until num, and increments by i
          for(let j = i * i; j < num; j+=i) {
            //change each of these values in the object to false
            delete primeObj[j];
          }
        }
      }          
      
      let primeFactors = [];
      for(let prime in primeObj) {
        if(num % prime === 0) primeFactors.push(prime);
      }
      
      return Math.max(...primeFactors);
    }

    let answer = largestPrimeFactor(1389);
    expect(answer).toBe(463);
  });

  it("should find the largest palindrome made from the product of two 3 digit numbers", function () {
    function largestPalindrome(digits) {

    }

    let answer = largestPalindrome();
    expect(answer).toBe(100);
  });

  it("should find the smallest number divisible by each of the numbers 1 to 20", function () {
      function smallestNumberDivisible(min, max) {

      }

      let answer = smallestNumberDivisible();
      expect(answer).toBe(100);
    
  });

  it("should find the difference between the sum of the squares and the square of the sums", function () {
    function differenceSumDifferenceSquare(num) {

    }

    let answer = differenceSumDifferenceSquare();
    expect(answer).toBe(100);
  });

  it("should find the 10001st prime", function () {
    function thousandthsFirstPrime() {

    }

    let answer = thousandthsFirstPrime();
    expect(answer).toBe(100);
  });
  
});
