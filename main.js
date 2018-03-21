(function() {

  'use strict';

  // The JavaScript Array object is a global object that is used in the construction of arrays; which are high-level, list-like objects

  let cards = [
    {
      id: 1,
      name: 'card-one',
      img: './images/image1.jpg'
    }, {
      id: 2,
      name: 'card-two',
      img: './images/image2.jpg'
    }, {
      id: 3,
      name: 'card-three',
      img: './images/image3.jpg'
    }, {
      id: 4,
      name: 'card-four',
      img: './images/image4.jpg'
    }, {
      id: 5,
      name: 'card-five',
      img: './images/image5.jpg'
    }, {
      id: 6,
      name: 'card-six',
      img: './images/image6.jpg'
    }, {
      id: 7,
      name: 'card-seven',
      img: './images/image7.jpg'
    }, {
      id: 8,
      name: 'card-eight',
      img: './images/image8.jpg'
    }, {
      id: 9,
      name: 'card-nine',
      img: './images/image9.jpg'
    }, {
      id: 10,
      name: 'card-ten',
      img: './images/image10.jpg'
    }, {
      id: 11,
      name: 'card-eleven',
      img: './images/image11.jpg'
    }, {
      id: 12,
      name: 'card-twelve',
      img: './images/image12.jpg'
    }
  ]

  // Classes are in fact "special functions"
  // cleaner and more convenient syntax
  class Game {
    // The constructor method is a special method for creating and initializing an object created within a class
    constructor() {
      // double the cards (24 in total); using the jQuery library
      this.cardsArray = $.merge(cards, cards);
      // console.log(this.cardsArray);
      // shuffle the cards
      this.shuffleCards(this.cardsArray);
      this.setup();
    }

    setup() {
      this.guess = null;
      this.matches = 0;

      this.buildHTML(this.cardsArray);

      // $(".card") returns jQuery wrapped DOM elements - allows us to call jQuery methods
      this.$memoryCards = $(".playing-card");
      // console.log('cards', this.$memoryCards);

      this.$memoryCards.on("click", this.cardClicked.bind(this));

      this.$resetButton = $(".reset");
      this.$resetButton.on("click", this.reset.bind(this));

    }

    reset() {
      //// ADD RESET METHOD
      $('#modal').modal('hide');
			this.shuffleCards(this.cardsArray);
			this.setup();
    }

    shuffleCards(array) {
      let card,
        index;

      for (let i = 0; i < array.length; i++) {
        // Pick a random index
        index = Math.floor(Math.random() * i);

        card = array[i]; // pull card out of the array we passed in
        array[i] = array[index];
        array[index] = card;

        // let's walk through this using 0 for the value of i

        // card = array[i];  card is an object
        // card = {
        //   id: 1,
        //   name: 'card-one',
        //   img: './images/image1.jpg'}
        // };

        // array[i] = array[index];
        // the first card in the array is replaced with a random card from the array

        // put the first card back into the array at the random position - so we don't lose that card
        // array[index] = card;
      }
      // console.log(array);
      return array;
    }

    buildHTML(array) {
      // BUILD HTML

      // handlebars allows you to build templates
      // you can deliver a template to the browser by including it in a <script> tag
      // takes any HTML and Handlebars expression and compiles them to a JavaScript function
      // derived function takes one parameter, an object — your data — and it returns an HTML string with the object properties’ values inserted into the HTML

      var source = document.getElementById("card-template").innerHTML;
      var template = Handlebars.compile(source); // returns a function

      // console.log('template', template);

      var context = {
        cards
      };
      var html = template(context);
      $('.cards').html(html);
    }

    cardClicked(event) {
      // events bubbles up
      // console.log('event target', event.target);
      // console.log('event currentTarget', event.currentTarget);
      let $card = $(event.currentTarget);
      let id = $card.find(".front").attr("data-id");
      $card.toggleClass("selected");

      if(this.guess === null){
        this.guess = id;
      } else if (this.guess === id) {
        // add matched class to both cards
        let $match = $(".selected").not($(".matched"));
        $match.toggleClass("matched");
        // remove click event
        $match.off();
        this.guess = null;

        this.matches++;

        /// ADD MODAL TO POPUP /////////////////////////////////////////////////
        this.matches === 12 ? $('#modal').modal('show') : null;

      } else {
        let $mismatch = $(".selected").not($(".matched"));
        // $mismatch.toggleClass("selected");
        setTimeout(()=>{
          $mismatch.toggleClass("selected");
        }, 400)
        this.guess = null;
      }
    }
  }

  let game = new Game();

  // console.log('game', game);

})();
