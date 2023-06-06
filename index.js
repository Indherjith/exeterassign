const fs = require('fs');
const csv = require('csv-parser');

const startTime = new Date().getTime();
  
let text = fs.readFileSync('t8.shakespeare.txt', 'utf8').toString();
text = text.toLowerCase();
let words = fs.readFileSync('find_words.txt', 'utf8').split("\n");
let obj = {};

fs.createReadStream('french_dictionary.csv').pipe(csv()).on('data', function(data){
	let Arr = [];
	for (let key in data) {
	  if (data.hasOwnProperty(key)) {
		Arr.push(data[key]);
	  }
	}
	obj[Arr[0]] = Arr[1];    
}).on('end',function(){
    RAO();
    output();
});

 
 function RAO(){
    fs.unlinkSync("frequency.csv")
     words.forEach(function(Arr){
        if(Arr == "abide"){
            fs.appendFileSync("frequency.csv",`${Arr},'respecter',${counter(text,Arr)}\n`)
            text = text.replace(new RegExp(Arr, "g"), 'respecter');
        }
        else{
        fs.appendFileSync("frequency.csv",`${Arr},${obj[Arr]},${counter(text,Arr)}\n`)
         text = text.replace(new RegExp(Arr, "g"), obj[Arr]);
        }
         fs.writeFileSync('t8.shakespeare.translated.txt', text);
     });
 }

 function counter(text,arr){
    return text.split(arr).length-1;
 }

 function output(){
	const endTime = new Date().getTime();
	const time = endTime - startTime;
    let sec = time/1000;
    const min = Math.floor(sec/60)
    sec = Math.floor(sec-(min*60))
    let memoryUsed = process.memoryUsage().heapUsed / 1024 / 1024;
    let perform = `Time to process: ${min} minutes ${sec} seconds
Memory used: ${memoryUsed} MB`;
    fs.writeFileSync('performance.txt',perform)
	console.log("Process completed! please check the output.txt, performance.txt & frequency.csv for result")
}