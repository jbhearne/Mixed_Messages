const { Console } = require('console');
const fs = require('fs');

const allQuotes = fs.readFileSync('quotes.txt', 'utf-8'); //creates a large string from .txt file

const quotes = {
    whole: [],
    start: [],
    end: [],
    person: [],
    cut: [],
    variation1: [],
    variation2: [],
    variation3: [],
    cutOrder(randOrNum) {
        //Adjusts "cut" array to vary the order of keywords either randomly or by set number. This will change how quotes are parsed using parseQuote.
        let shifter = 0;
        if (randOrNum === 'r' || randOrNum === 'random') {
            shifter = Math.floor(Math.random() * this.cut.length);
        } else {
            shifter = randOrNum;
        }
        for (let i = 0; i < shifter; i++) {
            this.cut.push(this.cut.shift());
        }
    },
    parseWhole(str) {return str.split('\n')}, //Returns the individual lines of text from a larger block of quotes.
    parseQuote(str) { 
        //Cuts original quote into 3 parts and stores them in 3 different arrays.
        
        let cutIndex = 0;
        let endIndex = 0;
        const endTerm = '" -';
        let started = '';
        let ended = '';
        let personed = '';
        
        for (let i = 0; i < this.cut.length; i++) {
            if (str.includes(this.cut[i])) {
                cutIndex = str.indexOf(this.cut[i]) + this.cut[i].length;
                started = str.slice(0, cutIndex);
                break;
            } else if (i === this.cut.length - 1) {
                cutIndex = str.indexOf(' ', Math.floor(str.length / 2) - 10) + 1;
                started = str.slice(0, cutIndex);
                break; 
            }
        }
        if (str.includes(endTerm, cutIndex)) {
            endIndex = str.indexOf(endTerm, cutIndex);
            ended = str.slice(cutIndex, endIndex);
            personed = str.slice(endIndex, str.length);
        } else {
            console.log('Not formatted in famous quote language.');
        }
        
        this.start.push(started);
        this.end.push(ended);
        this.person.push(personed);
    },
    chooseQuote(arr, randOrDex) {
        //returns a single string quote sellected randomly from array or as chosen by index
        quoteIndex = 0;
        if (randOrDex === 'r' || randOrDex === 'random'){
            quoteIndex = Math.floor(Math.random() * arr.length);
        } else {
           quoteIndex = randOrDex;
        }
        return arr.splice(quoteIndex, 1)[0]; //note: index [0] used to convert the single ellement array to a string.
    }, 
    randParse(arr1, arr2, arr3) {
        //Randomizes 3 original quotes to create 3 new quotes each quote containing a differnt part of the original.
        //Then assigns them to arrays (variation#) so that the matched indexes will always provide complimentary quotes.
        //Returns the same value as variation1.
        let startNum = Math.floor(Math.random() * arr1.length);
        let endNum = Math.floor(Math.random() * arr2.length);
        let personNum = Math.floor(Math.random() * arr3.length);

        if (startNum < (arr1.length - 1)) {
            if (startNum === endNum) {
                endNum++;
            }
            if (startNum === personNum) {
                personNum++;
            }
        } else {
            if (startNum === endNum) {
                endNum--
            }
            if (startNum === personNum) {
                personNum--;
            }
        }
        if (endNum < (arr2.length - 2)) {
            if (endNum === personNum) {
            personNum++
            }
            if (personNum === startNum) {
            personNum++;
            }
        } else {
            if (endNum === personNum) {
                personNum--;
            }
            if (personNum === startNum) {
                personNum--;
            }
            if (personNum < 0) {
                personNum = arr3.length - 1;
            }
        }
        this.variation1.push(arr1[startNum] + arr2[endNum] + arr3[personNum]);
        this.variation2.push(arr1[endNum] + arr2[personNum] + arr3[startNum]);
        this.variation3.push(arr1[personNum] + arr2[startNum] + arr3[endNum]);
        return arr1[startNum] + arr2[endNum] + arr3[personNum];
    },
    quoteCutter(num) {
        //Runs parseQuote at least 3 times, or num times, so there are at least 3 quotes to reconstitue.
        let checkNum = num;
        
        if (num < 3) {
            checkNum = 3;
        } else if (num > this.whole.lenght) {
            checkNum = this.whole.length;
        }

        for (let i = 0; i < checkNum; i++) {
            quotes.parseQuote(quotes.chooseQuote(quotes.whole, i));
        }
    }
}

quotes.whole = quotes.parseWhole(allQuotes); //Breaks the large string into an an array of quotes.

quotes.cut = [' for ',  ' are ', ' by ', ' not ', ' who ',' and ', ' but ', ' or ', '! ', ' when ', ' one ', ' don’t ', ' ever ', ' must ', ' most ', ' is a ', ' than ', ' will ']; //the keywords that are used to cut the quotes into two parts.

quotes.quoteCutter(3); //The number of quotes to cut and choose from.

quotes.randParse(quotes.start, quotes.end, quotes.person); //Creates new incorect quotes.

console.log(quotes.variation1[0]); //3 different parts of 3 original quotes.
console.log('...or...');
console.log(quotes.variation2[0]); //3 different parts of the same 3 original quotes.
console.log('...or maybe...');
console.log(quotes.variation3[0]); //The remaining 3 different parts of the same 3 original quotes.



