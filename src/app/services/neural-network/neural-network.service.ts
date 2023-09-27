import {Injectable} from '@angular/core';
import {NeuralNetwork} from "../../components/model/neural-network";
import {canvasSize} from "../../store/canvas.reducer";
import {learnData, weightsAndBiases} from "../../constants";

@Injectable({
  providedIn: 'root'
})
export class NeuralNetworkService {
  nn: NeuralNetwork;

  constructor() {
    const {weights, biases} = JSON.parse(weightsAndBiases);
    this.nn = new NeuralNetwork([canvasSize * canvasSize, 128, 64, 32, 10], 0.001, weights, biases);
  }

  public calculate(values: Array<number>): Array<number> {
    return this.nn.calculate(values);
  }

  public study(): void {
    this.nn.study(learnData);
  }
}
