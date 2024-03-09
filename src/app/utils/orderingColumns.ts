import { IColumn, IColumns } from "./types";

export const orderingColumns = (arr: IColumn[]): IColumns => arr.reduce(
  (acc, item, idx) =>
    (acc = {
      ...acc,
      [(idx + 1).toString()]: {
        ...item,
        id: (idx + 1).toString(),
        title: item.title.includes(`column`)
          ? `column ${idx + 1}`
          : item.title,
      },
    }),
  {}
);