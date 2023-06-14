import {Component} from '@angular/core';
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
export class CanvasComponent {
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
      const variants = this.trainGroup[parseInt(digit)];
      if (!variants) this.trainGroup[parseInt(digit)] = [];

      this.trainGroup[parseInt(digit)][parseInt(variant)] = [...canvas];
    }
  }

  public testForm(): void {
    const {num} = this.testFromGroup.value;

    if (num) {
      this.store.dispatch(paste({canvas: data[parseInt(num)][0]}));
      this.results = this.nnService.calculate(data[parseInt(num)][0]);
    }
  }
}
