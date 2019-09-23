import { Component } from '@angular/core';
import { IBlock } from 'src/models/block.model';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent {
  public blocks: Array<IBlock>;

  constructor() {
    this.blocks = [
      { title: 'APPS', description: 'Canvas applications', link: 'apps' },
      { title: 'Test', description: 'test', link: 'test' },
    ];
  }
}
