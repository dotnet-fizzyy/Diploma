import { ColumnNames } from '../constants/boardConstants';
import { ISelectedItem } from '../types/storyTypes';

export const getColumnKeyValuePair = (): ISelectedItem[] =>
    Object.entries(ColumnNames).map(
        (item) =>
            ({
                key: item[0],
                value: item[1],
            } as ISelectedItem)
    );

export const getColumnKeys = (): string[] => Object.entries(ColumnNames).map(([key, _]) => key);
