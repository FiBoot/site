import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { Building } from './building.class';
import { SatisfactoryPlanner, BUILDING_LIST } from './satisfactory-planner.class';

@Component({
  selector: 'satisfactory-planner',
  templateUrl: './satisfactory-planner.component.html',
  styleUrls: ['./satisfactory-planner.component.scss'],
})
export class SatisfactoryPlannerComponent implements AfterViewInit, OnDestroy {
  @ViewChild('satisfactoryPlannerWrapper') wrapper: ElementRef;
  public app: SatisfactoryPlanner;

  public buildingList: Array<Building> = BUILDING_LIST;
  public selectedBuildingId: number | null = null;

  ngAfterViewInit(): void {
    this.app = new SatisfactoryPlanner(this.wrapper.nativeElement);
  }

  ngOnDestroy(): void {
    this.app.destroy();
  }

  selectBuilding(): void {
    if (this.selectedBuildingId) {
      this.app.selectBuilding(this.selectedBuildingId);
    }
  }

}
