import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Patientreg } from 'src/class/patient';
import { AuthService } from 'src/services/auth.service';
import { CommonService } from 'src/services/common.service';
import { PatientService } from 'src/services/patient.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
  Salutationlist: any[]=[];
  PatientTypeList: any[]=[];
  NationalityList: any[]=[];
  pr = new Patientreg()
  CustomerList:any[]=[]
  BranchId:string=''
  viewtype:string='form'


  ExiastingPatientData:any[]=[]

  Years:any 
  Month:any
  Days:any
  LocationList: any[]=[];
  LocationMandatory: any;

  constructor(private patser:PatientService,private loader:LoadingController,private comser:CommonService,private authser:AuthService) 
  {
    this.GetSalutation()
    this.GetPatientType()
    this.Getnationality()
    this.getCustomerList()
    this.GetDefaultCampCustAsync()
    this.LookupLocationAsync()
    this.GetLocationMandatorySettingAsync()


    this.GetDefaultPatienttype()
    this.GetDefaultnationality()
   }

  ngOnInit() {
  }

  async submit(){
    const loading = await this.loader.create({
      cssClass: 'custom-loading', // Optional: Apply custom CSS class for styling
      message: 'Submitting Details...', // Optional: Custom message
      spinner: 'dots', // Optional: Choose a spinner
      // duration: 2000 // Optional: Set a duration after which the loader will automatically dismiss
    });


    await loading.present();
    this.patser.insertpatint(this.pr).subscribe((data:any)=>{
      loading.dismiss()
      console.log(data);
      
      if(data.Status==200)
      {
        Swal.fire(data.Message,'','success')
        this.Clear()
      }
      else
      {
        Swal.fire(data.Message,'','warning')
      }
    },(error:any)=>{
      loading.dismiss()
    })
  }


  Clear()
  {
    this.Years=null
    this.Month=null,
    this.Days=null
    this.selectedLOcationName=''
    this.pr= new Patientreg()
    this.GetDefaultPatienttype()
    this.GetDefaultnationality()
    this.GetDefaultCampCustAsync()
    let br = JSON.parse(`${localStorage.getItem('Branch')}`)
    console.log(br);
    let btid = this.authser.Decrypt(br,"cimrhospitalmanagment")
    this.BranchId = btid.BRANCH_ID
    
    this.pr.BranchId = this.BranchId


  }


  SalutationClick(event:any){
    let val = event.target.value
    console.log(event.target.value);
    let dender = this.Salutationlist.filter((x:any)=>x.SalutationId == val)[0].Gender
    this.pr.PatiGender = dender
    

  }

  async GetSalutation(){
    const loading = await this.loader.create({
      cssClass: 'custom-loading', // Optional: Apply custom CSS class for styling
      message: 'Loading...', // Optional: Custom message
      spinner: 'dots', // Optional: Choose a spinner
      // duration: 2000 // Optional: Set a duration after which the loader will automatically dismiss
    });
    await loading.present();

    this.patser.LookupSalutationAsync().subscribe((data:any)=>{
      loading.dismiss()
      if(data)
      {
        console.log(data,'saqlut');
        // this.opdatalist=data
        this.Salutationlist =data
     
        
      }
      else
      {
        // this.opdatalist=[]
        
        this.Salutationlist =[]
      }
    },
  (error:any)=>{
    loading.dismiss()
  })

  }

  async LookupLocationAsync(){
    const loading = await this.loader.create({
      cssClass: 'custom-loading', // Optional: Apply custom CSS class for styling
      message: 'Loading...', // Optional: Custom message
      spinner: 'dots', // Optional: Choose a spinner
      // duration: 2000 // Optional: Set a duration after which the loader will automatically dismiss
    });
    await loading.present();

    this.patser.LookupLocationAsync().subscribe((data:any)=>{
      loading.dismiss()
      if(data)
      {
        console.log(data,'loclist');
        // this.opdatalist=data
        this.LocationList =data
     
        
      }
      else
      {
        // this.opdatalist=[]
        
        this.LocationList =[]
      }
    },
  (error:any)=>{
    loading.dismiss()
  })

  }
  async GetPatientType(){
    const loading = await this.loader.create({
      cssClass: 'custom-loading', // Optional: Apply custom CSS class for styling
      message: 'Loading...', // Optional: Custom message
      spinner: 'dots', // Optional: Choose a spinner
      // duration: 2000 // Optional: Set a duration after which the loader will automatically dismiss
    });
    await loading.present();

    this.patser.LookupPatientTypeAsync().subscribe((data:any)=>{
      loading.dismiss()
      if(data)
      {
        console.log(data,'ptypelist');
        // this.opdatalist=data

        // if(typeof data =='object')
        // {
        //   this.PatientTypeList.push(data)
        // }
        // else
        // {
          
        this.PatientTypeList =data
        // }
     
        
      }
      else
      {
        // this.opdatalist=[]
        
        this.PatientTypeList =[]
      }
    },
  (error:any)=>{
    loading.dismiss()
  })

  }

  async Getnationality(){
    const loading = await this.loader.create({
      cssClass: 'custom-loading', // Optional: Apply custom CSS class for styling
      message: 'Loading...', // Optional: Custom message
      spinner: 'dots', // Optional: Choose a spinner
      // duration: 2000 // Optional: Set a duration after which the loader will automatically dismiss
    });
    await loading.present();

    this.patser.LookupNationalityAsync().subscribe((data:any)=>{
      loading.dismiss()
      if(data)
      {
        console.log(data,'opdatalist');
        // this.opdatalist=data
        this.NationalityList = data
     
        
      }
      else
      {
        // this.opdatalist=[]
        
        this.NationalityList =[]
      }
    },
  (error:any)=>{
    loading.dismiss()
  })

  }
  
  async GetDefaultCampCustAsync(){
    const loading = await this.loader.create({
      cssClass: 'custom-loading', // Optional: Apply custom CSS class for styling
      message: 'Loading...', // Optional: Custom message
      spinner: 'dots', // Optional: Choose a spinner
      // duration: 2000 // Optional: Set a duration after which the loader will automatically dismiss
    });
    await loading.present();

    this.patser.GetDefaultCampCustAsync().subscribe((data:any)=>{
      loading.dismiss()
      if(data)
      {
        console.log(data,'def cust');
        // this.opdatalist=data
        // this.NationalityList = data
        this.pr.PCustId =data[0].CustId
     
        
      }
      else
      {
        // this.opdatalist=[]
        
        // this.NationalityList =[]
      }
    },
  (error:any)=>{
    loading.dismiss()
  })

  }

  async GetDefaultnationality(){
    const loading = await this.loader.create({
      cssClass: 'custom-loading', // Optional: Apply custom CSS class for styling
      message: 'Loading...', // Optional: Custom message
      spinner: 'dots', // Optional: Choose a spinner
      // duration: 2000 // Optional: Set a duration after which the loader will automatically dismiss
    });
    await loading.present();

    this.patser.GetDefaultNationalityAsync().subscribe((data:any)=>{
      loading.dismiss()
      if(data)
      {
        console.log(data,'def national');
        // this.opdatalist=data
        // this.NationalityList = data
        this.pr.PatiPlaceId =data.TerritoryId
     
        
      }
      else
      {
        // this.opdatalist=[]
        
        // this.NationalityList =[]
      }
    },
  (error:any)=>{
    loading.dismiss()
  })

  }

  async GetDefaultPatienttype(){
    const loading = await this.loader.create({
      cssClass: 'custom-loading', // Optional: Apply custom CSS class for styling
      message: 'Loading...', // Optional: Custom message
      spinner: 'dots', // Optional: Choose a spinner
      // duration: 2000 // Optional: Set a duration after which the loader will automatically dismiss
    });
    await loading.present();

    this.patser.GetDefaultPatientTypeAsync().subscribe((data:any)=>{
      loading.dismiss()
      if(data)
      {
        console.log(data,'def ptytype');
        // this.opdatalist=data
        // this.NationalityList = data
        this.pr.PatiTypeId =data.TypeId
     
        
      }
      else
      {
        // this.opdatalist=[]
        
        // this.NationalityList =[]
      }
    },
  (error:any)=>{
    loading.dismiss()
  })

  }


  async GetLocationMandatorySettingAsync(){
    const loading = await this.loader.create({
      cssClass: 'custom-loading', // Optional: Apply custom CSS class for styling
      message: 'Loading...', // Optional: Custom message
      spinner: 'dots', // Optional: Choose a spinner
      // duration: 2000 // Optional: Set a duration after which the loader will automatically dismiss
    });
    await loading.present();

    this.patser.GetLocationMandatorySettingAsync().subscribe((data:any)=>{
      loading.dismiss()
      if(data)
      {
        console.log(data,'opdatalist');
        // this.opdatalist=data
        this.LocationMandatory = data.value
     
        
      }
      else
      {
        // this.opdatalist=[]
        
        this.LocationMandatory =[]
      }
    },
  (error:any)=>{
    loading.dismiss()
  })

  }


  CheckLocationAmndatory(){
    if(this.LocationMandatory=='y')
    {
      if(this.pr.P_LOCATION_ID!="" && this.pr.P_LOCATION_ID!=null)
      {
        return true
      }
      else
      {
        Swal.fire('Select location','','warning')
        return false

      }
    }
    else
    {
      return true
    }
  }

  async VerifyMobilenumber(): Promise<boolean> {
    const loading = await this.loader.create({
      cssClass: 'custom-loading', // Optional: Apply custom CSS class for styling
      message: 'Checking the Mobile Number...', // Optional: Custom message
      spinner: 'dots', // Optional: Choose a spinner
    });
  
    await loading.present();
  
    try {
      const data: any = await this.patser.VerifymobileNumber(this.pr.PatiMobile).toPromise();
      loading.dismiss();
      if(data.length>0)
      {
        this.ExiastingPatientData=data
      }
      else
      {
        this.ExiastingPatientData=[]
      }
      return data.length === 0; // Returns true if the mobile number is not found
    } catch (error) {
      loading.dismiss();
      console.error('Error verifying mobile number:', error);
      return false; // Return false in case of an error
    }
  }
  


  async formvalidation() {
    try {
      // if (this.pr.SaltId !== "" && this.pr.SaltId !== null) {
        // if (this.pr.PatiPayType !== "" && this.pr.PatiPayType !== null) 
        //   {
          if (this.pr.PatiFirstName !== "" && this.pr.PatiFirstName !== null) {
            // if (this.pr.PatiTypeId !== "" && this.pr.PatiTypeId !== null) {
              // if (this.pr.PatiPlaceId !== "" && this.pr.PatiPlaceId !== null) {
                if (this.pr.PatiMobile !== "" && this.pr.PatiMobile !== null) {
                  if (this.pr.PatiGender !== "" && this.pr.PatiGender !== null) {
                    if (this.pr.PatiBirthDate !== "" && this.pr.PatiBirthDate !== null) {
                      if(this.CheckLocationAmndatory())
                      {

                    
                      const isMobileValid = await this.VerifyMobilenumber();
                      // this.ExiastingPatientData = isMobileValid

                      if (isMobileValid) {
                        this.submit(); // Call the submit function if all validations pass
                      } 
                      else {
                        Swal.fire({
                          title: 'Mobile Number Already exist?',
                          text: "Do you want to continue",
                          icon: 'warning',
                          showCancelButton: true,
                          showDenyButton:true,
                          confirmButtonColor: '#3085d6',
                          cancelButtonColor: '#d33',
                          confirmButtonText: 'Yes',
                          denyButtonText:'View Details'
                      }).then((result) => {
                          if (result.isConfirmed) {
                              // Call your delete service here
                              // this.LogOutMethod()
                              this.submit()
                              
                          }
                          else if(result.isDenied)
                          {
                            alert('ssss')
                            this.viewtype='table'
                          }
                      });
                       
                      }
                    }
                    else
                    {

                    }
                    } else {
                      Swal.fire("Please select Date of Birth", '', 'warning');
                    }
                  } else {
                    Swal.fire("Please select Gender", '', 'warning');
                  }
                } else {
                  Swal.fire("Please enter Mobile", '', 'warning');
                }
              // } else {
              //   Swal.fire("Please select Nationality", '', 'warning');
              // }
            // } else {
            //   Swal.fire("Please select Patient Type", '', 'warning');
            // }
          } else {
            Swal.fire("Please enter First Name", '', 'warning');
          }
        // } 
        // else {
        //   Swal.fire("Please select Pay Type", '', 'warning');
        // }
      // } 
      // else {
      //   Swal.fire("Please select Salutation", '', 'warning');
      // }
    } catch (error) {
      console.error("Error during form validation:", error);
      Swal.fire("An error occurred during validation", '', 'error');
    }
  }
  

  async getCustomerList(){
    let br = JSON.parse(`${localStorage.getItem('Branch')}`)
    console.log(br);
    let btid = this.authser.Decrypt(br,"cimrhospitalmanagment")
    this.BranchId = btid.BRANCH_ID
    
    this.pr.BranchId = this.BranchId
    console.log(btid);
    
    // return
    // let brid = this.authser.Decrypt
    const loading = await this.loader.create({
      cssClass: 'custom-loading', // Optional: Apply custom CSS class for styling
      message: 'Loading...', // Optional: Custom message
      spinner: 'dots', // Optional: Choose a spinner
      // duration: 2000 // Optional: Set a duration after which the loader will automatically dismiss
    });
    await loading.present();

    this.patser.LookupCustomerAsync(null,btid.BRANCH_ID).subscribe((data:any)=>{
      loading.dismiss()
      if(data)
      {
        console.log(data,'opdatalist');
        // this.opdatalist=data
        this.CustomerList = data
     
        
      }
      else
      {
        // this.opdatalist=[]
        
        this.CustomerList =[]
      }
    },
  (error:any)=>{
    loading.dismiss()
  })

  }


  AddDob(event:any)
  {
    console.log(event.target.value);
    
    let age = this.calculateAge(event.target.value);
    console.log(age);
    this.Month = age.months
    this.Years =age.years
    this.Days=age.days
    
  }

 calculateAge(dateOfBirth: string): { years: number, months: number, days: number } {
    const dob = new Date(dateOfBirth);
    const today = new Date();
    
    // Calculate the difference in years, months, and days
    let years = today.getFullYear() - dob.getFullYear();
    let months = today.getMonth() - dob.getMonth();
    let days = today.getDate() - dob.getDate();

    // Adjust if the current month is earlier than the birth month or the current day is earlier than the birth day
    if (months < 0) {
        years--;
        months += 12;
    }
    if (days < 0) {
        months--;
        const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        days += lastMonth.getDate();
    }

    return { years, months, days };
}

calculateDOB() {
  const today = new Date();
  let birthDate = new Date();

  this.Years =this.Years==""?0:this.Years==undefined?0:this.Years
  this.Month =this.Month==""?0:this.Month==undefined?0:this.Month
  this.Days =this.Days==""?0:this.Days==undefined?0:this.Days
  console.log(this.Years,this.Month,this.Days);
  
  // Subtract years, months, and days from today's date to get the DOB
  birthDate.setFullYear(today.getFullYear() - this.Years);
  birthDate.setMonth(today.getMonth() - this.Month);
  birthDate.setDate(today.getDate() - this.Days);
  
  this.Years =this.Years==""?null:this.Years==undefined?null:this.Years
  this.Month =this.Month==""?null:this.Month==undefined?null:this.Month
  this.Days =this.Days==""?null:this.Days==undefined?null:this.Days
  // Ensure DOB is valid (e.g., if the month and day subtractions go negative, adjust)
  this.pr.PatiBirthDate = birthDate.toISOString().split('T')[0]; // Format to 'YYYY-MM-DD'
}


  //#region Vendor Dropdown

  selectedLOcationName:string=''
  isLocationDropdownVisible=false
  
  dropdownPosition = { top: '0px', left: '0px' };

  showLocationDropdown(event: FocusEvent) {
    // this.SelectedIndex = index
    const target = event.target as HTMLElement;
    const rect = target.getBoundingClientRect();
    // console.log(rect);
    
  
    // Get the dropdown position
    this.dropdownPosition = {
      top: `${rect.bottom }px`,
      left: `${rect.left}px`,
    };
  
    this.isLocationDropdownVisible = true;
  }
  onLocationSelected(selected: any) {
    console.log(selected);
    
    // this.purchase.VendorId =selected.Id
    // this.purchase.Address=selected.Addresses[0].Address1  + selected.Addresses[0].Address2 + selected.Addresses[0].Address3
    // this.purchase.CreditLimit= selected.CreditLimit
    this.pr.P_LOCATION_ID = selected.TrdId

    this.selectedLOcationName = selected.Place
    this.isLocationDropdownVisible =false
  }

  OnLOcationdropClose(event:any){
    console.log(event);
    if(event)
    {
      // this.GetAllVendors(0)
    }
    
    this.isLocationDropdownVisible = false;
  }
  //#endregion Vendor dropdown



}
