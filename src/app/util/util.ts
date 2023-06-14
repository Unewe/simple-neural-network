export function multiply(values: Array<number>, weights: Array<Array<number>>): Array<number> {
  const result: Array<number> = [];

  for (let w = 0; w < weights[0].length; w++) {

    result[w] = values
      .map((value, index) => value * weights[index][w])
      .reduce((acc, value) => acc + value, 0);
  }

  return result;
}

export function sum(a: Array<number>, b: Array<number>) {
  const targetArr = a.length > b.length ? a : b;
  const tmp = targetArr === a ? b : a;
  return targetArr.map((value, index) => value + (tmp[index] ?? 0));
}

export function diff(a: Array<number>, b: Array<number>): Array<number> {
  const result: Array<number> = [];
  const length = a.length > b.length ? a.length : b.length;

  for (let i = 0; i < length; i++) {
    result.push((a[i] ?? 0) - (b[i] ?? 0));
  }
  return result;
}

export function sigmoid(value: number): number {
  return 1 / (1 + Math.exp(-value));
}

export function sigmoidDerivative(value: number): number {
  return value * (1 - value);
}

export function softmax(values: Array<number>): Array<number> {
  const tmp = values.map(value => Math.exp(value));
  const sum = tmp.reduce((prev, next) => prev + next, 0);

  return tmp.map(value => value / sum);
}
