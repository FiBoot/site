import { Component } from '@angular/core';
import { IBlock } from 'src/models/block.model';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.sass']
})
export class DefaultComponent {
  public blocks: Array<IBlock>;

  constructor() {
    this.blocks = [
      { title: 'test1', description: 'description 1', link: '/test' },
      { title: 'test1', description: 'description 1', link: '/test' },
      { title: 'test1', description: 'description 1', link: '/test' },
      { title: 'test1', description: 'description 1', link: '/test' },
      { title: 'test1', description: 'description 1', link: '/test' }
    ];
  }
}
