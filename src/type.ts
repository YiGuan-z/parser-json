export enum Operator {
    // {
    BOF = '{',
    // }
    EOF = '}',
    // 空格 space
    SPACE = ' ',
    // :
    COLON = ':',
    // "
    MARK = '"',
    // ,
    DELIMITER = ',',
    // [
    ARRAYBOF = '[',
    // ]
    ARRAYEOF = ']',
}
export type Token = string | null;
export type ParseObject={
    [index:string]:any
}
