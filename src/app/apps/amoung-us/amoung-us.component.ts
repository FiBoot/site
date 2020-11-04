import { Component, OnInit } from '@angular/core';
import { Utils } from 'src/app/classes/utils/utils.class';
import { Timer } from 'src/app/classes/timer.class';

const MAX_NUMBER = 10;

class Node {
  private state = false;
  constructor(private n: number) {}

  public get number() {
    return this.n;
  }
  public get active() {
    return this.state;
  }
  public activate(): void {
    this.state = true;
  }
  public deactivate(): void {
    this.state = false;
  }
}

@Component({
  selector: 'app-amoung-us',
  templateUrl: './amoung-us.component.html',
  styleUrls: ['./amoung-us.component.scss'],
})
export class AmoungUsComponent {
  private nextNumber: number;
  public nodes: Array<Node>;
  public timer: Timer = new Timer('among-us');
  public running = false;

  public start(): void {
    this.genereNumberOrder();
    this.running = true;
    this.timer.start();
  }

  private finish(): void {
    this.timer.stop();
    this.running = false;
  }

  private genereNumberOrder() {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    this.nodes = new Array<Node>();
    do {
      const n = numbers.splice(Utils.random(numbers.length), 1)[0];
      this.nodes.push(new Node(n));
    } while (numbers.length > 0);
    this.reset();
  }

  private reset(): void {
    this.nodes.forEach((node) => node.deactivate());
    this.nextNumber = 1;
  }

  public clickNode(node: Node, event: Event): void {
    event.preventDefault();
    if (node.active) {
      return;
    }
    if (node.number !== this.nextNumber) {
      return this.reset();
    }
    node.activate();
    if (this.nextNumber === MAX_NUMBER) {
      this.finish();
    }
    this.nextNumber += 1;
  }
}
