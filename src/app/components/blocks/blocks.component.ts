import { Component, Input } from '@angular/core';
import { IBlock } from 'src/models/block.model';

@Component({
  selector: 'app-blocks',
  templateUrl: './blocks.component.html',
  styleUrls: ['./blocks.component.scss']
})
export class BlocksComponent {
  @Input() blocks: Array<IBlock>;
}
