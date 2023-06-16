import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {CanvasStore} from "../../store/types";
import {map, Observable} from "rxjs";
import {clear, draw, paste} from "../../store/canvas.actions";
import {canvasSize, pixelSize} from "../../store/canvas.reducer";
import {NeuralNetworkService} from "../../services/neural-network/neural-network.service";
import {FormControl, FormGroup} from "@angular/forms";
import {data} from "../../util/learn-data";

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
    const tmpData = JSON.parse(data);
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

    // const imagesData: Array<Array<Array<number>>> = [];
    // const list = JSON.parse(images);
    // let counter = 0;
    // for (const imgName of list) {
    //   const image = document.createElement("img");
    //   const canvas = document.createElement("canvas");
    //
    //   image.setAttribute("src", `./assets/test/${imgName}`);
    //   image.onload = () => {
    //     canvas.width = image.width;
    //     canvas.height = image.height;
    //     canvas.getContext("2d")?.drawImage(image, 0, 0, image.width, image.height);
    //     const data = canvas.getContext('2d')?.getImageData(0, 0, image.width, image.height).data ?? [];
    //     const tmp: Array<number> = [];
    //     for (let i = 0; i < data.length; i += 4) {
    //       tmp.push(Number((data[i] / 255).toFixed(2)));
    //     }
    //     const num = parseInt(imgName.slice(-5, -4));
    //     if (!imagesData[num]) imagesData[num] = [];
    //     imagesData[num].push(tmp);
    //     counter += 1;
    //
    //     if (counter === 10000) {
    //       console.log(JSON.stringify(imagesData));
    //     } else if (counter % 1000 === 0) {
    //       console.log(counter);
    //     }
    //   }
    // }
  }
}
