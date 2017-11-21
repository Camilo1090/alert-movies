export const YEARS: Array<{ value: number, view: string }> = [];

const start = 2017;
const end = 1899;

YEARS.push({value: 0, view: 'All'});

for (let i = start; i > end; i--) {
  YEARS.push({value: i, view: i.toString()});
}
