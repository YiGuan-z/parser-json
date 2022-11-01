import {parserJSON} from "../src/index";
// const str:string='{"address":"12","name":"cheng"}'
// const str:string='{"name":"parten","ver":"1.1.1","age":"32","test":"我这里"}'
const str:string='{"name": "Tom","Grade":"1", "age":"11", "gender": "M"}'
// Assert.
const errStr:string='{"": "Tom","Grade":"1", "age":"11", "gender": "M"}'
parserJSON(str);
// parserJSON(errStr);
