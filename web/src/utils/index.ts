import { BaseRegexExpression } from '../constants';

export const matchAlphaNumericSymbols = (str: string): boolean => new RegExp(BaseRegexExpression).test(str);
