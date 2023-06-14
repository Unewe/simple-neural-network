import {Injectable} from '@angular/core';
import {NeuralNetwork} from "../../components/model/neural-network";
import {canvasSize} from "../../store/canvas.reducer";

const data: any = [];

@Injectable({
  providedIn: 'root'
})
export class NeuralNetworkService {
  nn: NeuralNetwork;

  constructor() {
    this.nn = new NeuralNetwork([canvasSize * canvasSize, 16, 16, 10], 0.03);
  }

  public calculate(values: Array<number>): Array<number> {
    return this.nn.calculate(values);
  }

  public study(): void {
    this.nn.study();
  }
}
