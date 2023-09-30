import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {CanvasStore} from "../../store/types";
import {map, Observable} from "rxjs";
import {clear, draw} from "../../store/canvas.actions";
import {canvasSize, pixelSize} from "../../store/canvas.reducer";
import {NeuralNetworkService} from "../../services/neural-network/neural-network.service";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CanvasComponent implements OnInit {
  canvas$: Observable<Array<number>>;
  size = pixelSize + "px";
  active = false;
  results: Array<number> = [];
  eraser = false;

  formGroup = new FormGroup({
    digit: new FormControl(''),
    variant: new FormControl(''),
  });

  constructor(private store: Store<{ canvas: CanvasStore }>, public nnService: NeuralNetworkService) {
    this.canvas$ = store.select("canvas").pipe(map(value => value.canvas));
  }

  public draw(index: number) {

    this.store.dispatch(draw({index, erase: this.eraser}));
  }

  public ngOnInit(): void {
    this.canvas$.subscribe(value => this.calculate(value));
  }

  public getCanvasMarkup(): string {
    return `repeat(${canvasSize}, ${pixelSize})`;
  }

  public getPixelSize(): string {
    return pixelSize;
  }

  public clear() {
    this.store.dispatch(clear());
  }

  public calculate(canvas: Array<number>) {
    this.results = this.nnService.calculate(canvas);
  }

  public getColor(pixel: number): string {
    const value = 255 - 255 * pixel;
    return `rgb(${value}, ${value}, ${value})`;
  }

  public study() {
    this.nnService.study();
  }

  public setPencil() {
    this.eraser = false;
  }

  public setEraser() {
    this.eraser = true;
  }
}
