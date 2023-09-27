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

export function getMovedInput(input: Array<number>) {
  const template: Array<Array<number>> = [[]];
  const col = Math.sqrt(input.length);
  let bias = col;

  let biasUpdated = false;
  let counter = 0;
  for (let i = 0; i < input.length; i++) {
    if (counter === col) {
      counter = 0;
      template.push([]);
      biasUpdated = false;
    }

    if (input[i] !== 0 && !biasUpdated && counter < bias) {
      bias = counter;
    }

    template[template.length - 1].push(input[i]);
    counter++;
  }

  for (let i = 0; i < col; i++) {
    if (template[template.length - 1].some(value => value > 0)) break;

    template.unshift(template.pop()!);
  }

  const result: Array<number> = [];
  for (let i = 0; i < col; i++) {
    for (let j = 0; j < col; j++) {
      result.push(template[i][j + bias] ?? 0);
    }
  }

  return result;
}
