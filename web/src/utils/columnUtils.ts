import { ColumnNames } from '../constants/boardConstants';
import { ISelectedItem } from '../types/storyTypes';

export function getColumnKeyValuePair(): ISelectedItem[] {
    return Object.entries(ColumnNames).map((item) => {
        return {
            key: item[0],
            value: item[1],
        } as ISelectedItem;
    });
}

export function getColumnKeys(): string[] {
    return Object.entries(ColumnNames).map(([key, value]) => key);
}
