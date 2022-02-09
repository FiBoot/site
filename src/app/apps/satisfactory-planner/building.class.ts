import { Coord } from "src/app/classes/coord.class";

let increment = 1;

export class Building {
    public id: number;
    public size: Coord;

    constructor(public name: string, aSize: Array<number>) {
        this.id = increment++;
        this.size = new Coord(aSize[0], aSize[1])
    }
}