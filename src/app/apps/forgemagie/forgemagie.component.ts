import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Equipment } from './models/equipment.model';
import { Statistics } from './models/statistics.model';
import { Debouncer } from 'src/app/classes/debouncer.class';

const DEBOUNCER_TIME = 500;

@Component({
  selector: 'app-forgemagie',
  templateUrl: './forgemagie.component.html',
  styleUrls: ['./forgemagie.component.scss'],
})
export class ForgemagieComponent implements OnInit {
  public loading: boolean;
  public step: number;

  public data: Array<any>;
  public items: Array<any>;

  public itemSelected: any;
  public runeSelected: any;

  private Debouncer: Debouncer = new Debouncer(this.filterItems.bind(this));
  public debouncing: boolean = false;

  constructor(private http: HttpClient) {
    this.Debouncer.loading.subscribe((status) => (this.debouncing = status));
    this.step = 1;
  }

  ngOnInit() {
    this.loading = true;
    Promise.all([
      // this.http
      //   .get('https://fr.dofus.dofapi.fr/equipments')
      //   .toPromise() as Promise<Array<Equipment>>,
      this.http.get('https://fr.dofus.dofapi.fr/weapons').toPromise() as Promise<Array<Equipment>>,
    ]).then((data) => {
      this.loading = false;
      this.data = data.reduce((acc, val) => acc.concat(val), []).sort((a, b) => a.level - b.level);
      this.items = this.data;
    });
  }

  filter(search: string = ''): void {
    this.Debouncer.exec(search);
  }

  private filterItems(search: string = ''): void {
    if (!this.data) {
      return;
    }
    search = search.toLowerCase();
    this.items = this.data.filter((item) => item.name.toLowerCase().search(search) > -1);
  }

  selectItem(item: any): void {
    this.itemSelected = item;
  }

  selectRune(rune: any): void {
    this.runeSelected = rune;
  }

  nextStep(): void {
    this.step += 1;
  }

  prevStep(): void {
    this.step -= 1;
  }

  getStatKey(stat: Statistics): string {
    return Object.entries(stat)[0][0];
  }

  getStatValues(stat: Statistics): string {
    const values = Object.entries(stat)[0][1];
    const [min, max] = Object.values(values);
    return `${min ? `: ${min}${max ? ` | ${max}` : ''}` : ''}`;
  }

  detailStat(stat: Statistics): [string, string] {
    const [property, values] = Object.entries(stat)[0];
    const [min, max] = Object.values(values);
    return [property, `${min}${max ? ` | ${max}` : ''}`];
    // return `${property}${min ? `: ${min}${max ? ` | ${max}` : ''}` : ''}`;
  }
}
