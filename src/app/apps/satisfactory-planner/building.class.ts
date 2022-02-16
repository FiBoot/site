import { Coord } from 'src/app/classes/coord.class';

export class Building {
	constructor(public name: string, public size: Coord) {}
}

export const BUILDING_LIST: Array<Building> = [
	new Building('Belt', new Coord(2, 2)),
	new Building('Smelter', new Coord(6, 9)),
	new Building('Foundry', new Coord(10, 9)),
	new Building('Constructor', new Coord(8, 10)),
	new Building('Assembler', new Coord(10, 15)),
	new Building('Manufacturer', new Coord(18, 19)),
	new Building('Blender', new Coord(18, 16)),
	new Building('Space Elevator', new Coord(54, 54)),
	new Building('Conveyor Splitter', new Coord(4, 4)),
	new Building('Conveyor Merger', new Coord(4, 4)),
	new Building('Storage Container', new Coord(5, 10)),
];
