import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {CanvasStore} from "../../store/types";
import {map, Observable} from "rxjs";
import {clear, draw, paste} from "../../store/canvas.actions";
import {canvasSize, pixelSize} from "../../store/canvas.reducer";
import {NeuralNetworkService} from "../../services/neural-network/neural-network.service";
import {FormControl, FormGroup} from "@angular/forms";

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

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements OnInit {
  canvas$: Observable<Array<number>>;
  size = pixelSize + "px";
  active = false;
  results: Array<number> = [];

  trainGroup: Array<Array<Array<number>>> = [];

  formGroup = new FormGroup({
    digit: new FormControl(''),
    variant: new FormControl(''),
  });

  testFromGroup = new FormGroup({
    num: new FormControl(''),
  });

  constructor(private store: Store<{ canvas: CanvasStore }>, private nnService: NeuralNetworkService) {
    this.canvas$ = store.select("canvas").pipe(map(value => value.canvas));
  }

  public draw(index: number) {
    this.store.dispatch(draw({index}));
  }

  public ngOnInit(): void {
    // localStorage.clear();
    console.log(localStorage.getItem("weights"));
  }

  public getCanvasMarkup(): string {
    return `repeat(${canvasSize}, ${pixelSize}px)`;
  }

  public getPixelSize(): string {
    return `${pixelSize}px`;
  }

  public clear() {
    this.store.dispatch(clear());
    this.results = [];
  }

  public calculate(canvas: Array<number>) {
    this.results = this.nnService.calculate(canvas);
  }

  public log(canvas: Array<number>) {
    console.log(JSON.stringify(this.trainGroup));
  }

  public getColor(pixel: number): string {
    const value = 255 - 255 * pixel;
    return `rgb(${value}, ${value}, ${value})`;
  }

  public study() {
    this.nnService.study();
  }

  public formSubmit(canvas: Array<number>) {
    const {digit, variant} = this.formGroup.value;

    if (digit && variant) {
      this.store.dispatch(paste({canvas: tmpData[parseInt(digit)][parseInt(variant)]}));
    }
  }

  public testForm(): void {
    // const {num} = this.testFromGroup.value;
    //
    // if (num) {
    //   this.store.dispatch(paste({canvas: data[parseInt(num)][0]}));
    //   this.results = this.nnService.calculate(data[parseInt(num)][0]);
    // }

    // const imagesData: Array<Array<number>> = [];
    //
    // let counter = 0;
    //
    //
    // const i = 9;
    // const count = 5949;
    // for (let j = 1; j <= count; j++) {
    //   const image = document.createElement("img");
    //   const canvas = document.createElement("canvas");
    //   image.setAttribute("src", `./assets/${i}/file-${j}.png`);
    //   image.onload = () => {
    //     canvas.width = image.width;
    //     canvas.height = image.height;
    //     canvas.getContext("2d")?.drawImage(image, 0, 0, image.width, image.height);
    //     const data = canvas.getContext('2d')?.getImageData(0, 0, image.width, image.height).data ?? [];
    //     const tmp: Array<number> = [];
    //     for (let i = 0; i < data.length; i += 4) {
    //       tmp.push(Number((data[i] / 255).toFixed(2)));
    //     }
    //
    //     imagesData.push(tmp);
    //     counter += 1;
    //
    //     if (counter === count) {
    //       const tmp = JSON.stringify(imagesData);
    //       console.log(tmp);
    //     } else if (counter % 1000 === 0) {
    //       console.log(counter);
    //     }
    //   }
    // }
  }
}
