import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { StorageService } from '../services/storage.service';
import { RequestService } from '../services/request.service';
import { BaseChartDirective } from 'ng2-charts';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  participantId =  this.storage.get("participantId");

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  public recordData: ChartData<'line'> = {
    labels: ['2023-12-01'],
    datasets: [
      { label: 'Records Number', data: [1000], tension: 0.5 }
    ],
  };

   public chartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Records of past seven days',
      },
    },
  };
  constructor( private storage:StorageService,
    private request:RequestService) {}
  
  ngOnInit(){
    this.loadData().then(data=>{
      console.log(data);
      this.recordData.labels = data.days;
      this.recordData.datasets[0].data = data.nums;
      
    });
    this.chart?.update;
  }

  async loadData(){
    let data:any = await this.request.getRecordsData(this.participantId);
    return data;
  }
}
