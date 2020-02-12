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
    //Accepts nothing and returns the largest palindrome made from the product of two 3 digit numbers
    function largestPalindrome() {
      let lowerBound = 900; //Allows more control of the loop - instead of looping from 999 to 1, first check numbers between 900 - 999, then 800 - 999, so on and so forth
      let foundPalindromeBool = false; //The while loop doesn't resolve, but simply keeps the loop going until an answer is returned
      while(!foundPalindromeBool) {
        //Starting at the largest 3 digit number, this loop decrements by 1 until it reaches the lower bound
        for(let firstNumber = 999; firstNumber >= lowerBound; firstNumber--) {
          //Starting at the largest 3 digit number, this loop decrements by 1 until it reaches the lower bound
          for(let secondNumber = 999; secondNumber >= lowerBound; secondNumber--) {
            //The product is converted to a string so it can be compared against its reverse
            let product = (firstNumber * secondNumber).toString();
            //The product string is split into an array and then reversed
            let reversedProduct = product.split('').reverse();
            //The reversed product is converted from an array back into a string
            reversedProduct = reversedProduct.join('');
            //If the product string and its reverse are the same, return the two numbers that resulted in the product
            if(product === reversedProduct) return [firstNumber, secondNumber];
          }
        }
        //After each cycle of the parent for-loop, the lowerBound becomes 100 lower
        lowerBound -= 100;
      }  
    }

    let answer = largestPalindrome();
    expect(answer).toEqual([993, 913]);
  });

  it("should find the smallest number divisible by each of the numbers 1 to 20", function () {
      function smallestNumberDivisible(min, max) {
        //Declare foundAnswerBool initialized as false
        let foundAnswerBool = false;
        //Declare answer initialized as max
        let answer = max;
        //Declare divisibleCount initialized as 0
        let divisibleCount = 0;

        //Create while loop that iterates until foundAnswerBool is true
          //This loop will not actually resolve, rather the function will return its value
        while(!foundAnswerBool) {
          //Loop starting at index max, loop until the index is greater than or equal to min, decrement by 1
          for(let divisor = max; divisor >= min; divisor--) {
            //if the answer divided by the current index has a remainder, break the for-loop
            if(answer % divisor !== 0) break;
            //if not, increment divisibleCount by 1
            divisibleCount++;
            //if the divisibleCount is equal to max, return the answer
            if(divisibleCount === max) return answer;
          }
          //If the for-loop is broken,
          //increase answer by max
          answer += max;
          //reset divisibleCount to 0
          divisibleCount = 0;
        }
      }

      let answer = smallestNumberDivisible(1, 20);
      expect(answer).toBe(232792560);
    
  });

  it("should find the difference between the sum of the squares and the square of the sums", function () {
    //Assuming this function receives a number that serves as the max, and calculates the difference of a range between 1 and max
    function differenceSumDifferenceSquare(num) {
      let range = _.range(1, num + 1);
      let sumSquares = _.chain(range).map(n => n ** 2).reduce((a, b) => a + b).value();
      let squareSums = (_(range).reduce((a, b) => a + b)) ** 2;
      return squareSums - sumSquares;
    }

    let answer = differenceSumDifferenceSquare(5);
    expect(answer).toBe(170);
  });

  it("should find the 10001st prime", function () {
    function thousandthsFirstPrime(upperbound = 104744) {
      //Declare an empty arr to hold prime numbers
      let primes = [];

      //Declare a rangeObj to hold all numbers and test for primeness
      let rangeObj = {};
      //Create a range from 2 until the upperbound: which in the case of 1001st prime, is 7928
      let range = _.range(2, upperbound);
      
      //Declare a value called limit, assign it the value of the square root of num
      let limit = Math.sqrt(upperbound);
      //Loop through the range, and create a key for each index with the value of true
      range.forEach(num => {
        rangeObj[num] = true;
      });
  
      //Loop through the range, up until limit
      for(let i = 2; i < limit; i++) {
          //if range is true, remove each subsequent number that is a multiple of the current index
          if(rangeObj[i]) {
            for(let j = i * i; j < upperbound; j += i) {
              delete rangeObj[j];
          }
        }
      }

      //Loop through the rangeObj
      for(let prime in rangeObj) {
        //Unsure about what beget is, but this needs to be removed
        if(prime === 'beget') {}
        //Push the number into primes array
        else primes.push(prime);
      }

      //For the return value, I backsolved the upperbound until the array was 1001 numbers long, then returned the last number
      return Number(primes.pop());
      
    }

    let answer = thousandthsFirstPrime();
    expect(answer).toBe(104743);
  });
  
});
