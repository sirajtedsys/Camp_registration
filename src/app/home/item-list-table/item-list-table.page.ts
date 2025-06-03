import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-item-list-table',
  templateUrl: './item-list-table.page.html',
  styleUrls: ['./item-list-table.page.scss'],
})
export class ItemListTablePage implements OnInit {
  @Input() dropdownData: any[] = [];
  @Input() top: string = '0px';
  @Input() left: string = '0px';
  @Input() Field1:string='';
  @Input() Field2:string=''
  @Output() itemSelected = new EventEmitter<any>();
  @Output() WindowClosed = new EventEmitter<any>();


  constructor(private modalcontroller:ModalController){

  }

  query: string = '';
  searchQuery: string = '';
  filteredData:any[]=[]

  ngOnInit(): void {
    this.filteredData = this.dropdownData; // Initialize with all options
  }

  filterDropdown(): void {
    const query = this.searchQuery.toString().toLowerCase();
    console.log(this.dropdownData);
  
    this.filteredData = this.dropdownData.filter((item) => {
      const field1Value = item[this.Field1];
      const field2Value = item[this.Field2];
  
      // Handle undefined, null, or empty values gracefully
      const field1Search = field1Value ? field1Value.toString().toLowerCase().includes(query) : false;
      const field2Search = field2Value ? field2Value.toString().toLowerCase().includes(query) : false;
  
      return field1Search || field2Search;
    });
  }
  
  

  selectItem(item: any) {
    this.itemSelected.emit(item);
  }
  clearSearch() {
    this.searchQuery = '';
    this.filterDropdown(); // Optional: Refresh the dropdown data
  }
  
  closeDropdown(m:boolean=false) {
    // Logic to hide the dropdown
    let Modal  = m
    this.WindowClosed.emit(Modal); // Replace with your actual visibility control
  }

 async OpenItemPage(){
    // async openModal() {
      // const modal = await this.modalcontroller.create({
      //   component: ModalPagePage,
      //   cssClass:'custom-modal',
      //   componentProps: {
      //     Appname: 'app-item',
      //     PageName:'Item',
      //   },
      // });
      // await modal.present();
  
      // // Handle data returned from the modal (if any)
      // const { data } = await modal.onDidDismiss();
      // // console.log('Data from modal:', data);
      // if(data)
      // {
        
      // }
    // }
  }
  
}