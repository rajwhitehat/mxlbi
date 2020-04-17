import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-indiamapchart',
  templateUrl: './indiamapchart.component.html',
  styleUrls: ['./indiamapchart.component.scss']
})
export class IndiamapchartComponent implements OnInit {
  dataSourceMap: Object;
  constructor() { }

  ngOnInit() {
    this.dataSourceMap = {
      chart: {
        caption: '',
        subcaption: '',
        numbersuffix: '%',
        includevalueinlabels: '1',
        labelsepchar: ': ',
        entityFillHoverColor: '#FFF9C4',
        theme: 'fusion'
      },
      // Aesthetics; ranges synced with the slider
      colorrange: {
        minvalue: '0',
        code: '#FFE0B2',
        gradient: '1',
        color: [
          {
            minvalue: '0.5',
            maxvalue: '1.0',
            color: '#FFD74D'
          },
          {
            minvalue: '1.0',
            maxvalue: '2.0',
            color: '#FB8C00'
          },
          {
            minvalue: '2.0',
            maxvalue: '3.0',
            color: '#E65100'
          }
        ]
      },
      // Source data as JSON --> id represents countries of world.
      data: [
        {id: 'AN', value: '.82', showLabel: '1'},
        {id: 'AP', value: '2.00', showLabel: '1'},
        {id: 'AR', value: '1.78', showLabel: '1'},
        {id: 'AS', value: '.40', showLabel: '1'},
         {id: 'BI', value: '2.00', showLabel: '1'}
        , {id: 'CH', value: '1.30', showLabel: '1'}
        , {id: 'CA', value: '1.30', showLabel: '1'}
        , {id: 'DN', value: '1.30', showLabel: '1'}
        , {id: 'DD', value: '1.30', showLabel: '1'}
        , {id: 'DE', value: '1.30', showLabel: '1'}
        , {id: 'GO', value: '1.30', showLabel: '1'}
        , {id: 'GU', value: '1.30', showLabel: '1'}
        , {id: 'HA', value: '1.30', showLabel: '1'}
        , {id: 'HP', value: '1.30', showLabel: '1'}
        , {id: 'JK', value: '1.30', showLabel: '1'}
        , {id: 'JH', value: '2.00', showLabel: '1'}
        , {id: 'KA', value: '1.30', showLabel: '1'}
        , {id: 'KE', value: '1.30', showLabel: '1'}
        , {id: 'LA', value: '1.30', showLabel: '1'}
        , {id: 'MP', value: '1.30', showLabel: '1'}
        , {id: 'MA', value: '1.30', showLabel: '1'}
        , {id: 'MN', value: '1.30', showLabel: '1'}
        , {id: 'ME', value: '1.30', showLabel: '1'}
        , {id: 'MI', value: '1.30', showLabel: '1'}
        , {id: 'NA', value: '1.30', showLabel: '1'}
        , {id: 'OR', value: '3.30', showLabel: '1'}
        , {id: 'PO', value: '1.30', showLabel: '1'}
        , {id: 'PU', value: '1.30', showLabel: '1'}
        , {id: 'RA', value: '1.30', showLabel: '1'}
        , {id: 'SI', value: '1.30', showLabel: '1'}
        , {id: 'TN', value: '1.30', showLabel: '1'}
        , {id: 'TL', value: '1.30', showLabel: '1'}
        , {id: 'TR', value: '1.30', showLabel: '1'}
        , {id: 'UP', value: '1.30', showLabel: '1'}
        , {id: 'UT', value: '1.30', showLabel: '1'}
        , {id: 'WB', value: '2.00', showLabel: '1'}
      ]
    };
  }

}
