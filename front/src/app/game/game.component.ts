import {Component, OnInit} from '@angular/core';
import {ApiService} from "../services/api.service";
import {Data} from "../model/data";

declare let $: any;

@Component({
  moduleId: module.id,
  templateUrl: 'game.component.html',
  styleUrls: ['./game.component.css']
})

export class GameComponent implements OnInit{

  private data : Array<Data>;
  public selectedItem: Number;
  public gender: string;
  public isActivate: boolean;

  constructor(private apiService: ApiService) {}


  ngOnInit(): void {
      this.apiService.getData('param').subscribe((d: Data[])  => {
          this.data = d;
          this.selectedItem = 5;
          this.gender = "f";
          this.isActivate = false;
      });
  }

  itemChanged(val) {
      console.log(val);
  }


}
