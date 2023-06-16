import {Injectable} from '@angular/core';
import {NeuralNetwork} from "../../components/model/neural-network";
import {canvasSize} from "../../store/canvas.reducer";
import {data} from "../../util/learn-data";
import {weightsAndBiases} from "../../util/weightsAndBiases";

@Injectable({
  providedIn: 'root'
})
export class NeuralNetworkService {
  nn: NeuralNetwork;

  constructor() {
    const {weights, biases} = JSON.parse(weightsAndBiases);
    this.nn = new NeuralNetwork([canvasSize * canvasSize, 18, 18, 18, 10], 0.003, weights, biases);
  }

  public calculate(values: Array<number>): Array<number> {
    return this.nn.calculate(values);
  }

  public study(): void {
    this.nn.study(JSON.parse(data));
  }
}
