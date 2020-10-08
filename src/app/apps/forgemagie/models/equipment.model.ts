export interface Equipment {
  _id: number;
  ankamaId: number;
  name: string;
  level: number;
  type: string;
  imgUrl: string;
  url: string;
  description: string;
  statistics: [{}];
  conditions: [string];
  recipe: [{}];
  setId: number;
}
