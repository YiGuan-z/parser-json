import {Operator, ParseObject, Token} from "./type";
import { isToken, ParseTokenError } from "./utils";

export function parserJSON(str: string): any {
    let i: number = 0;
    const max: number = str.length;
    function parseObject(): any {
        const result:ParseObject = {};
        //如果当前token是BOF 就可以跳过BOF再跳过空格，这里是梦开始的地方
        if (currentToken() === Operator.BOF) {
            nextToken();
            skipWhitespace();
            //如果当前token不是EOF就可以获取内容
            while (currentToken() != Operator.EOF) {
                //拿到key
                const key: Token = parseKey();
                if (key == null) {
                    //错误提示
                    const index: number = str.indexOf(currentToken());
                    const subStr: string = str.substring(index - 3, index + 10);
                    throw new ParseTokenError(`key Error ${subStr}`);
                }
                //吃掉空格
                skipWhitespace();
                //吃掉冒号
                eatColon();
                //拿到value
                const value: Token = parseValue();
                if (value == null) {
                    //错误提示
                    const index: number = str.indexOf(currentToken());
                    const subStr: string = str.substring(index - 3, index + 10);
                    throw new ParseTokenError(`value Error ${subStr}`);
                }
                //写入数据
                result[key] = value;
                //吃掉逗号
                // eatDelmiter()
                //打印过程
                console.log(result)
            }
            //解析完成返回数据
            return result;
        } else {
            throw new ParseTokenError('不是一个标准的JSON结构');
        }
    }
    function run(): any {
        if (currentToken() === Operator.BOF) {
            parseObject()
        }

    }
    /**
     * 吃掉空格
     */
    function skipWhitespace(): void {
        //如果当前token是空格
        const token: string = currentToken();
        if (isToken(token)) {
            switch (token) {
                //就一口吃掉
                case Operator.SPACE:
                    nextToken();
                    skipWhitespace();
                    break;
            }
        }
    }
    /**
     * 获取String<br/>
     * {"name": "Tom","Grade":"1", "age":"11", "gender": "M"}<br/>
     * 一个正确的json结构是从{开始，在前面吃掉空格和逗号 剩下的数据 为"name": "Tom","Grade":"1", "age":"11", "gender": "M"}<br/>
     * 其中，key是由两个""包裹起来的，所以需要使用j来记录当前的冒号,如果找到了第二个冒号就代表这个key查找成功<br/>
     */
    function parseString(): string {
        let str: string = '';
        let j: number = 0;
        for (let token: string = ''; ; token = nextToken()) {
            if (isToken(token)) {
                switch (token) {
                    case Operator.MARK:
                        j++;
                        if (j === 2) return str;
                        break;
                    default:
                        break
                }
            } else {
                str += token;
            }
        }
    }
    function parseKey(): Token {
        const key:string = parseString();
        return key.trim().length > 0 ? key : null;
    }
    /**
     * 获取value
     * 原理同上
     */
    function parseValue(): Token {
        const value:string = parseString();
        return value.trim().length > 0 ? value : null;
    }
    /**
     * 吃掉冒号
     */
    function eatColon(): void {
        //如果当前token是冒号
        const token: string = currentToken();
        //指针下移，一口吃掉
        if (token === Operator.COLON) {
            nextToken();
        } else {
            const errMsg: string = `预期为:当前为${token}`
            throw new ParseTokenError(errMsg);
        }
    }
    /**
     * 吃掉 ，
     */
    function eatDelmiter() {
        const token = currentToken();
        if (token == Operator.DELIMITER) {
            nextToken()
        } else {
            const errMsg: string = `预期为,当前为${token}`
            throw new ParseTokenError(errMsg);
        }
    }
    /**
     * 获取下一个token
     */
    function nextToken(): string {
        if (hasNextToken()) {
            return str[i++]
        }
        throw new ParseTokenError("索引越界")
    }
    //当前token
    function currentToken(): string {
        return str[i];
    }
    function hasNextToken(): boolean {
        return i < max;
    }
    return parseObject();
}
const str:string='{"name": "Tom","Grade":"1", "age":"11", "gender": "M"}'
parserJSON(str)
