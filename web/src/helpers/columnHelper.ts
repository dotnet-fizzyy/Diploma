import { ColumnNames } from "../constants/boardConstants";
import { ISelectedItem } from "../types";

export function getColumnKeyValuePair(): ISelectedItem[] {
  return Object.entries(ColumnNames).map((item) => {
    return {
      key: item[0],
      value: item[1],
    } as ISelectedItem;
  });
}
