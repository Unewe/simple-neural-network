import {Injectable} from '@angular/core';
import {NeuralNetwork} from "../../components/model/neural-network";
import {canvasSize} from "../../store/canvas.reducer";
import {weightsAndBiases} from "../../util/weightsAndBiases";

import {data as data0} from "../../util/learn-0";
import {data as data1} from "../../util/learn-1";
import {data as data2} from "../../util/learn-2";
import {data as data3} from "../../util/learn-3";
import {data as data4} from "../../util/learn-4";
import {data as data5} from "../../util/learn-5";
import {data as data6} from "../../util/learn-6";
import {data as data7} from "../../util/learn-7";
import {data as data8} from "../../util/learn-8";
import {data as data9} from "../../util/learn-9";

const tmpData = [JSON.parse(data0), JSON.parse(data1), JSON.parse(data2), JSON.parse(data3), JSON.parse(data4),
  JSON.parse(data5), JSON.parse(data6), JSON.parse(data7), JSON.parse(data8), JSON.parse(data9)];

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
    this.nn.study(tmpData);
  }
}
