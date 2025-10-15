const express = require('express');
const fs = require('fs');
const path = require('path');
const server = express();
const port = 3000;

//Load public folder statically
server.use(express.static('public'));

function updateHitCounter(){
    const filePath = 'hits.txt';
    let hits = 0;
    if(fs.existsSync(filePath)){
        const data = fs.readFileSync(filePath, 'utf-8');
        hits = parseInt(data);
    }

    hits++;
    fs.writeFileSync(filePath, hits.toString());
    return hits;
}
function getRandomWord(){
    //Read the file
    const filePath = 'allwords.txt';
     if(fs.existsSync(filePath)){
        const data = fs.readFileSync(filePath, 'utf-8');
        //Break up the lines
        const lines = data.split('\n');
        //get a random word 
        const randomLine= lines[Math.floor(Math.random() * lines.length)];
        //separate the parts
        const [word, part, defn,] = randomLine.split('\t');
        return {word: word, part: part, definition: defn};
    }
}
server.get('/wordRequest', (req, res)=> {
    //function
    const wordInfo = getRandomWord();
    //response
    res.json(wordInfo);
});
//Api endpoint that returns info on how many visits there have been
server.get('/hits', (req, res)=>{
    const hits = updateHitCounter();
    res.json({hitCount:hits});
});

server.listen(port, function() {
    console.log(`Listening at http://localhost:${port}`);
});

server.get('/goodbye', function(req, res) {
    res.send('See ya later boss!')
});

server.get('/hello', function(req, res){
    res.send('<h1>Hello World!</h1>');
});

