const URL = "https://type.fit/api/quotes";

const quoteText = document.getElementById('quote');
const quoteAuthor = document.getElementById('author');
const btn = document.getElementById('new-quote');
const tweetBtn = document.getElementById('twitter');
const loader = document.getElementById("loader");
const quoteContainer = document.getElementById("quote-container");

let quotes = [];
const loading = () => {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

const complete = () => {
    loader.hidden = true;
    quoteContainer.hidden = false;
}

const initialize = async () => {
    const res = await fetchQuotes(URL); 
    quotes = res;
    randomQuote();
}


const fetchQuotes = async (url) => {
    try{
        loading();
        const response = await fetch(url);
        const quotes = await response.json();
        complete();
        return quotes;
    }catch(err){
        console.log(err);
        complete();
        return err;
    }
    
}

const tweetQuote = () => {
    const twitterURL = `https://twitter.com/intent/tweet?text=${quoteText.textContent} 
    - ${quoteAuthor.textContent}`;
    window.open(twitterURL, '_blank');
}

const randomQuote = () => {
    loading();
    quoteText.classList.remove('longer-quote');
    const randomQuote = quotes[Math.floor(Math.random()*(quotes.length))];
    const { text, author } = randomQuote;
    quoteText.textContent = text;
    quoteAuthor.textContent = author || 'Unknown';

    if(text.length >= 100){
        quoteText.classList.add("longer-quote");
    }
    complete();
}

const getNextQuote = function() {
    randomQuote();
}

btn.addEventListener('click', getNextQuote);
tweetBtn.addEventListener('click', tweetQuote);

initialize();