const fs = require('fs');

const allQuotes = fs.readFileSync('quotes.txt', 'utf-8')

const quotes = {
    whole: [],
    start: [],
    end: [],
    person: [],
    cut: [],
    variation1: [],
    variation2: [],
    variation3: [],
    parseWhole(str) {return str.split('\n')},
    parseQuote(str) { // .indexOf(cut)?
        let cutIndex = 0
        let endIndex = 0
        const endTerm = '" -'
        let started = ''
        let ended = ''
        let personed = ''
        console.log(str);
        for (let i = 0; i < this.cut.length; i++) {
            //console.log(str);
            if (str.includes(this.cut[i])) {
                //console.log(this.cut[i]);
                console.log(str.indexOf(this.cut[i]))
                cutIndex = str.indexOf(this.cut[i]) + this.cut[i].length;
                started = str.slice(0, cutIndex);
                //console.log(started)
                break;
            } else if (i === this.cut.length - 1) {
                console.log(1111)
                cutIndex = str.indexOf(' ', Math.floor(str.length / 2) - 10) + 1;
                started = str.slice(0, cutIndex)
                break; 
            }
        }
        if (str.includes(endTerm, cutIndex)) {
            endIndex = str.indexOf(endTerm, cutIndex);
            ended = str.slice(cutIndex, endIndex);
            personed = str.slice(endIndex, str.length);
        } else {
            //if there is formatting or parsing error
        }
        this.start.push(started);
        this.end.push(ended);
        this.person.push(personed);
    },
    randQuote(arr) {
        const randIndex = Math.floor(Math.random() * arr.length);
        return arr.splice(randIndex, 1)[0]/*single quote. .splice() this.whole?*/},
    randParse(arr1, arr2, arr3) {/*newquote. needs to know not to select parts of the same quote*/
        let startNum = Math.floor(Math.random() * arr1.length);
        let endNum = Math.floor(Math.random() * arr2.length);
        let personNum = Math.floor(Math.random() * arr3.length);

        if (startNum < (arr1.length - 1)) {
            if (startNum === endNum) {
                endNum++
            }
            if (startNum === personNum) {
                personNum++
            }
        } else {
            if (startNum === endNum) {
                endNum--
            }
            if (startNum === personNum) {
                personNum--
            }
        }
        if (endNum < (arr2.length - 2)) {
            if (endNum === personNum) {
            personNum++
            }
            if (personNum === startNum) {
            personNum++
            }
        } else {
            if (endNum === personNum) {
                personNum--
            }
            if (personNum === startNum) {
                personNum--
            }
            if (personNum < 0) {
                personNum = arr3.length - 1
            }
        }
        console.log(startNum + ' ' + endNum + ' ' + personNum)
        this.variation1.push(arr1[startNum] + arr2[endNum] + arr3[personNum]);
        this.variation2.push(arr1[endNum] + arr2[personNum] + arr3[startNum]);
        this.variation3.push(arr1[personNum] + arr2[startNum] + arr3[endNum]);
        return arr1[startNum] + arr2[endNum] + arr3[personNum];
    }

}






quotes.whole = quotes.parseWhole(allQuotes);
quotes.cut = [' for ',  ' are ', ' by ', ' not ', ' who ',' and ', ' but ', ' or ', '! ', ' when ', ' one ', ' don’t ', ' ever ', ' must ', ' most ', ' is a ', ' than ', ' will '];
//console.log(quotes.whole[2]);
//let firstLength = quotes.whole.length - 3
/*for (let i = 0; i < firstLength; i++) {
    console.log(quotes.randQuote(quotes.whole))
}*/
//console.log("BREAK");
//console.log(quotes.whole);
quotes.parseQuote(quotes.randQuote(quotes.whole))
quotes.parseQuote(quotes.randQuote(quotes.whole))
quotes.parseQuote(quotes.randQuote(quotes.whole))
//quotes.parseQuote(quotes.randQuote(quotes.whole))
//quotes.parseQuote(quotes.randQuote(quotes.whole))
//quotes.parseQuote(quotes.randQuote(quotes.whole))
console.log(quotes.start);
console.log(quotes.end);
console.log(quotes.person);
console.log(quotes.randParse(quotes.start, quotes.end, quotes.person))
console.log(quotes.variation2[0])
console.log(quotes.variation3[0])

