import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-indicators',
  templateUrl: './indicators.component.html',
  styleUrls: ['./indicators.component.sass']
})
export class IndicatorsComponent implements OnInit {
  // public colorIndicator: string = 'red';
  public indicators = [
    {
      color: 'red',
      title: 'Perigo !',
      description: 'Já foi gasto mais da metade do budget.',
    },
    {
      color: 'orange',
      title: 'Atenção',
      description: 'Foi gasto metade do budget',
    },
    {
      color: 'blue',
      title: 'Tudo certo',
      description: 'Foi gasto menos da metade do budget',
    },
    {
      color: 'green',
      title: 'Bora gastar',
      description: 'O budget está 100% !',
    },
  ]


  constructor() { }

  ngOnInit(): void {
  }

}
