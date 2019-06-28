import {WordArray} from "crypto-js";
import BigNumber from "bignumber.js";

declare module converters {
    export function byteArrayToHexString(bytes: Uint8Array): string;
    export function stringToByteArray(str: string): number[];
    export function hexStringToByteArray(str: string): number[];
    export function stringToHexString(str: string): string;
    export function hexStringToString(str: string): string;
    export function checkBytesToIntInput(bytes: number[], numBytes: number, opt_startIndex: number): number;
    export function byteArrayToSignedShort(bytes: number[], opt_startIndex: number): number
    export function byteArrayToSignedInt32(bytes: number[], opt_startIndex: number): number
    export function byteArrayToBigInteger(bytes: number[]): BigNumber
    export function byteArrayToSignBigInteger(bytesbytes: number[]): BigNumber
    export function wordArrayToByteArrayEx(wordArray: WordArray): Uint8Array;
    export function byteArrayToWordArrayEx(u8arr: Uint8Array): WordArray;
    export function byteArrayToString(bytes: Uint8Array, opt_startIndex?: number, length?: number): string
    export function int32ToBytes(int: number, opt_bigEndian: boolean): number[];
    export function int16ToBytes(int: number, opt_bigEndian: boolean): number[];
}
export default converters;
