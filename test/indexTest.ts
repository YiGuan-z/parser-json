import parserJSON from "../src";
// const str:string='{"address":"12","name":"cheng"}'
const str:string='{"name":"parten","ver":"1.1.1","age":"32"}'
const json = parserJSON(str);
console.log(json)
