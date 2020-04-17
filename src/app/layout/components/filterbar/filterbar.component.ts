import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ChartService } from '../../../shared/services/chart.service';
@Component({
  selector: 'app-filterbar',
  templateUrl: './filterbar.component.html',
  styleUrls: ['./filterbar.component.scss']
})
export class FilterbarComponent implements OnInit {
  isActive: boolean;
  collapsed: boolean;
  showMenu: string;
  pushRightClass: string;
  analysisTypeSelectedValue: any='1';
  category:string='';
  region:string='';
  fromDate='';
  toDate='';
  orders = [
      { id: '1', name: 'Custom' },
      { id: '2', name: 'Weekly' },
      { id: '3', name: 'Monthly' }
    ];
  public selectedFromDate:Date;
  public selectedToDate:Date;
  @Output() collapsedEvent = new EventEmitter<boolean>();
   applyFilterEvent = new EventEmitter<Date>();
   vSelectedFromDate;
   getAnalysisType() {
    return [
    //   { id: '0', name: 'Select Form' },
      { id: '1', name: 'Custome' },
      { id: '2', name: 'Weekly' },
      { id: '3', name: 'Monthly' }
    ];
  }
  onSelect(evt:any,calType){
        if(calType==1){
            this.selectedFromDate = new Date(evt.year,evt.month-1,evt.day);
            
        }
        else if(calType==2){
            this.selectedToDate = new Date(evt.year,evt.month-1,evt.day);
            
        }
  }
    constructor(private translate: TranslateService, public router: Router, public chartService: ChartService) {
        this.router.events.subscribe(val => {
            if (
                val instanceof NavigationEnd &&
                window.innerWidth <= 992 &&
                this.isToggled()
            ) {
                this.toggleSidebar();
            }
        });
        //this.getAnalysisType();
      
          // async orders
        //   of(this.getOrders()).subscribe(orders => {
        //     this.orders = orders;
        //     this.form.controls.orders.patchValue(this.orders[0].id);
        //   });
    }
    applyFilter(){
        //orders.value
        //const vAnalysisType=analysisType.value;
        this.vSelectedFromDate=this.selectedFromDate;
        this.applyFilterEvent.emit(this.selectedFromDate);
        //return false;
        //alert('hi');
        this.chartService.getFilterOptions({analysisType:this.analysisTypeSelectedValue, from: this.selectedFromDate, 
            to: this.selectedToDate,category:this.category,region:this.region})
    }
    ngOnInit() {
        this.isActive = false;
        this.collapsed = true;
        this.showMenu = '';
        this.pushRightClass = 'push-right';
        if(this.collapsed)
        {
            this.collapsedEvent.emit(this.collapsed);
        }
       
    }


    eventCalled() {
        this.isActive = !this.isActive;
    }

    addExpandClass(element: any) {
        if (element === this.showMenu) {
            this.showMenu = '0';
        } else {
            this.showMenu = element;
        }
    }

    toggleCollapsed() {
        try{
        this.collapsed = !this.collapsed;
        this.collapsedEvent.emit(this.collapsed);
    }
    catch(error)
    {
        debugger;
    }
    }

    isToggled(): boolean {try{
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }
    catch(error)
    {
        debugger;
    }
    }

    toggleSidebar() {try{
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }
    catch(error)
    {
        debugger;
    }
    }

    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }

    changeLang(language: string) {
        this.translate.use(language);
    }

    onLoggedout() {
        localStorage.removeItem('isLoggedin');
    }
}

