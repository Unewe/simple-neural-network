import {diff, multiply, sigmoid, sigmoidDerivative, softmax, sum} from "../../util/util";
import {data} from "../../util/learn-data";

export class NeuralNetwork {
  private readonly weights: Array<Array<Array<number>>> = [];
  private readonly biases: Array<Array<number>> = [];
  private readonly nonlinearBuffer: Array<Array<number>> = [];
  private readonly epochs = 1000;

  /**
   *
   * @param layers уровни нейронной сети.
   * @param alpha момент.
   * @param weights веса.
   */
  constructor(private layers: Array<number>, private alpha: number, weights?: Array<Array<Array<number>>>) {
    if (weights) {
      this.weights = weights;
    } else {
      this.layers.forEach((layer, index, array) => {
        if (index === array.length - 1) return;
        const layerWeights = Array.from({ length: layer }, () => {
          return Array.from({ length: array[index + 1] },  () => Math.random() * 2.0 - 1.0);
        });

        this.weights.push(layerWeights);
        this.biases.push(Array.from({ length: array[index + 1] },  () => Math.random() * 2.0 - 1.0));
      });
    }
  }

  public calculate(input: Array<number>, layer: number = 0, answer?: number): Array<number> {
    const linear = sum(multiply(input, this.weights[layer]), this.biases[layer]);

    const nonlinear = linear.map(sigmoid);
    if (layer === 0) this.nonlinearBuffer[0] = input;
    this.nonlinearBuffer[layer + 1] = nonlinear;

    if (layer === this.layers.length - 2) {
      const s = softmax(linear);

      if (answer !== undefined) {
        const answers = Array(10).fill(0);
        answers[answer] = 1;
        const dEdT = NeuralNetwork.getInitGradient(s, answer);

        this.backPropagation(dEdT, layer);
      }

      return s;
    } else {
      return this.calculate(nonlinear, layer + 1, answer);
    }
  }

  private static getInitGradient(result: Array<number>, answer: number): Array<number> {
    const answers = Array(10).fill(0);
    answers[answer] = 1;
    return diff(result, answers);
  }

  public study(): void {
    for(let i = 0; i < this.epochs; i++) {
      const nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].sort( () => .5 - Math.random());
      for (const num of nums) {
        this.calculate(data[num][0], 0, num);
      }
    }
  }

  public backPropagation(dEdT: Array<number>, layer: number): void {
    const layerWeights = this.weights[layer].map(value => value.map(w => w));
    const h = this.nonlinearBuffer[layer];
    const layerBiases = this.biases[layer];

    const dEdW = h.map((hi) => {
      return dEdT.map((weight) => weight * hi);
    });

    // Update
    this.weights[layer] = this.weights[layer]
      .map((w, index) => diff(w, dEdW[index].map(value => value * this.alpha)));
    // Update
    this.biases[layer] = diff(layerBiases, dEdT.map(value => value * this.alpha));

    if (layer > 0) {
      const dEdX = layerWeights
        .map(nWeights => nWeights.map((weight, index) => weight * dEdT[index]).reduce((acc, value) => acc + value, 0));
      const t = this.nonlinearBuffer[layer];

      const previousDEdT = dEdX.map((value, index) => value * sigmoidDerivative(t[index]));
      this.backPropagation(previousDEdT, layer - 1);
    }
  }
}
