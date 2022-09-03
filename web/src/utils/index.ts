import { GuidRegexExpression } from '../constants';

export const isEmpty = (value: unknown): boolean =>
    value === undefined ||
    value === null ||
    (typeof value === 'string' && value === '') ||
    (typeof value === 'number' && value === 0) ||
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    (Array.isArray(value) && value.length === 0);

export const isNotEmpty = (value: unknown): boolean => !isEmpty(value);

export const getFirstLetter = (value: string | null | undefined): string => value?.slice(0, 1) ?? '';

export const matchesRegex = (value: string, regex: RegExp): boolean => RegExp(regex).test(value);

export const validateGuid = (value: string): boolean => matchesRegex(value, GuidRegexExpression);
