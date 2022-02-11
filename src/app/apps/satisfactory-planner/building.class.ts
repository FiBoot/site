import { Coord } from "src/app/classes/coord.class";

let _incrementalId = 1;

export class Building {
    public id: number;
    public size: Coord;

    constructor(public name: string, aSize: Array<number>, public isOffset: boolean = false) {
        this.id = _incrementalId++;
        this.size = new Coord(aSize[0], aSize[1])
    }
}

export const BUILDING_LIST: Array<Building> = [
    new Building('Smelter', [6, 9], true),
    new Building('Constructor', [8, 10]),
    new Building('Assembler', [10, 15]),
    new Building('Spliter', [4, 4]),
    new Building('Merger', [3, 3]),
    new Building('Container', [5, 10], true)
]
