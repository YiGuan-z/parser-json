import {Operator} from "./type";

function parserJSON(str: string) {
    let i = 0;
    let max = str.length;
    let map: { key: string; value: string; }[] = [];
    function parseObject() {
        //如果当前token是BOF 就可以跳过BOF再跳过空格
        if (currentToken() === Operator.BOF) {
            nextToken()
            skipWhitespace();
            //如果当前token不是EOF就可以获取内容
            while (currentToken() != Operator.EOF) {
                const key = parseString();
                //跳过空格
                skipWhitespace();
                eatColon();
                const value = parseValue();
                // console.log(`key=${key} value=${value}`);
                map.push({key, value})
                print()
            }
        }
    }
    const isToken = (token: any): token is Operator => {
        return Object.values(Operator).includes(token);
    }
    parseObject();
    //跳过空格
    function skipWhitespace(): void {
        //如果当前token是空格
        const token: string = currentToken();
        if (isToken(token)) {
            switch (token) {
                //跳过:
                case Operator.COLON:
                //跳过"
                case Operator.MARK:
                //跳过空格
                case Operator.SPACE:
                //跳过,
                case Operator.DELIMITER:
                    nextToken();
                    skipWhitespace();
                    break;
            }
        }
    }
    //获取key
    function parseString(): string {
        let key: string = '';
        for (let token: string = ''; token != Operator.MARK; token = nextToken()) {
            //断言当前token是Operator
            if (isToken(token)) {
                nextToken();
            } else {
                key += token;
            }
        }
        return key;
    }
    //获取value
    function parseValue(): string {
        let value: string = '';
        for (let token: string = ''; token != Operator.MARK; token = nextToken()) {
            if (isToken(token)) {
                nextToken();
            } else {
                value += token;
            }
        }
        return value;
    }
    //吃掉冒号
    function eatColon(): void {
        //如果当前token是冒号
        const token: string = currentToken();
        //指针下移，一口吃掉
        if (token === Operator.COLON) {
            currentToken();
        }
    }
    //下一个token
    function nextToken(): string {
        return str[i++];
    }
    //当前token
    function currentToken(): string {
        return str[i];
    }
    function hasNextToken(): boolean {
        return i < max;
    }
    function print(): void  {
        console.log(map)
    }
}
export default parserJSON
