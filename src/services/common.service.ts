import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, retry, throwError } from 'rxjs';
// import { AppConfig } from 'src/Class/AppConfig';
import { AuthService } from './auth.service';
import { LoadingController } from '@ionic/angular';
import { DatePipe } from '@angular/common';
import { AppConfig } from 'src/class/AppConfig';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  appconfig =new AppConfig()
  decryptiondata:any

  

  constructor(private http:HttpClient,private authser:AuthService,private loadingCtrl:LoadingController,
    private datePipe:DatePipe,private router:Router) { }
  isLoading:boolean=false
  async presentLoading() {
    this.isLoading = true;
    const loading = await this.loadingCtrl.create({
      cssClass: 'custom-loading', // Optional: Apply custom CSS class for styling
      message: 'Loading...', // Optional: Custom message
      spinner: 'dots', // Optional: Choose a spinner
      // duration: 2000 // Optional: Set a duration after which the loader will automatically dismiss
    });
    await loading.present();

    // Uncomment below line to auto-hide the loader after 2 seconds (duration)
    // setTimeout(() => loading.dismiss(), 2000);
  }

  isUrlOrIp(input: string): boolean {
    // Updated regular expression for URLs, including localhost and optional port numbers
    const urlRegex = /^(https?:\/\/)?((localhost|([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,63})|(\d{1,3}\.){3}\d{1,3})(:\d+)?(\/.*)?$/;

    // Regular expression for IPv4 addresses
    const ipRegex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  
    // Check if the input matches either the updated URL regex or the IP regex
    return urlRegex.test(input) || ipRegex.test(input);
  }

  CheckForUnAuthorised(error:any){
    if(error.status==401)
    {
      // window.location.reload()
      // localStorage.clear()
      
    this.authser.LogOutMethod()
      this.router.navigate(['login'])
    }

  }

  CheckFor404(error:any){
    if(error.status==404)
    {
      // window.location.reload()
      Swal.fire("Oops! The requested resource was not found.",'','error')
      // this.authser.LogOutMethod()
      // this.router.navigate(['login'])
    }

  }

  CheckForSt0(error:any){
    if(error.status==0)
    {
      // window.location.reload()
      Swal.fire("Request failed! The server may be down or unavailable",'','error')
      // this.authser.LogOutMethod()
      // this.router.navigate(['login'])
    }

  }


  async dismissLoading() {
    this.isLoading = false;
    await this.loadingCtrl.dismiss();
  }

  formatDate(date: string): string {
    const transformedDate = this.datePipe.transform(date, 'yyyy-MM-dd');
    return transformedDate ? transformedDate : ''; // Handle null case
  }

  //mob view sibe bar
  private mobsidebarStateSubject = new BehaviorSubject<boolean>(false); // false = collapsed, true = expanded
  mobsidebarState$ = this.mobsidebarStateSubject.asObservable();

  togglemobSidebar() {
    this.mobsidebarStateSubject.next(!this.mobsidebarStateSubject.value);
  }

  setmobSidebarState(state: boolean) {
    this.mobsidebarStateSubject.next(state);
  }

  //desk vieew sidebar
  private sidebarStateSubject = new BehaviorSubject<boolean>(true); // false = collapsed, true = expanded
  sidebarState$ = this.sidebarStateSubject.asObservable();

  toggleSidebar() {
    this.sidebarStateSubject.next(!this.sidebarStateSubject.value);
  }

  setSidebarState(state: boolean) {
    this.sidebarStateSubject.next(state);
  }




  GetDecryptedData(){
    this.decryptiondata= this.authser.DecryptToken()
    }

    calculateAge(dob: string): number {
      const birthDate = new Date(dob);
      // console.log(birthDate);
      
      const today = new Date();
      
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDifference = today.getMonth() - birthDate.getMonth();
  
      if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
          age--;
      }
      // console.log(age);
      
      return age;
    }

    isValidEmail(email: string): boolean {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailPattern.test(email);
    }
    

  LoginCheck(Username:string,password:string) 
  {
  let cred={
      UserName:Username,
      Password:password

    }
    let headers = new HttpHeaders();
    headers.set("Accept", 'application/json');
    headers.set('Content-Type', 'application/json');
    // headers = headers.set('Authorization', 'Bearer ' + this.decryptiondata); 
    let options ={ headers: headers };
    return this.http.post(this.appconfig.url + '/Common/CheckLogin',cred, options)
    .pipe(
        
      catchError((error: any) => {
        // alert(error)
        // Handle the error here or rethrow it as needed
        console.error('Error in LoginCheck:', error);
        return throwError(error); // Rethrow the error
      })
    );
}
GetAllBranches() 
{

  this.GetDecryptedData()
  let headers = new HttpHeaders();
  headers.set("Accept", 'application/json');
  headers.set('Content-Type', 'application/json');
  headers = headers.set('Authorization', 'Bearer ' + this.decryptiondata); 
  let options ={ headers: headers };
  return this.http.get(this.appconfig.url + '/Common/GetAllUserBranches', options)
  .pipe(
    
    catchError((error: any) => {
      this.CheckForUnAuthorised(error)
this.CheckFor404(error)
this.CheckForSt0(error)
      // Handle the error here or rethrow it as needed
      console.error('Error in GetAllUserBranches:', error);
      return throwError(error); // Rethrow the error
    })
  );
}

GetAppMenuAsync() 
{

  this.GetDecryptedData()
  let headers = new HttpHeaders();
  headers.set("Accept", 'application/json');
  headers.set('Content-Type', 'application/json');
  headers = headers.set('Authorization', 'Bearer ' + this.decryptiondata); 
  let options ={ headers: headers };
  return this.http.get(this.appconfig.url + '/Common/GetAppMenuAsync', options)
  .pipe(
    
    catchError((error: any) => {
      this.CheckForUnAuthorised(error)
this.CheckFor404(error)
this.CheckForSt0(error)
      
      // Handle the error here or rethrow it as needed
      console.error('Error in GetAppMenuAsync:', error);
      return throwError(error); // Rethrow the error
    })
  );
}

CallPurchaseOrderProcedureAsync(fromd:string,tod:string) 
{

  this.GetDecryptedData()
  let headers = new HttpHeaders();
  headers.set("Accept", 'application/json');
  headers.set('Content-Type', 'application/json');
  headers = headers.set('Authorization', 'Bearer ' + this.decryptiondata); 
  let options ={ headers: headers };
  return this.http.get(this.appconfig.url + '/Common/CallPurchaseOrderProcedureAsync?fromd='+fromd+'&tod='+tod, options)
  .pipe(
    
    catchError((error: any) => {
      this.CheckForUnAuthorised(error)
this.CheckFor404(error)
this.CheckForSt0(error)
      // Handle the error here or rethrow it as needed
      console.error('Error in CallPurchaseOrderProcedureAsync:', error);
      return throwError(error); // Rethrow the error
    })
  );
}

SP_DS_APPNMNT_STS(fromd:string,tod:string) 
{

  this.GetDecryptedData()
  let headers = new HttpHeaders();
  headers.set("Accept", 'application/json');
  headers.set('Content-Type', 'application/json');
  headers = headers.set('Authorization', 'Bearer ' + this.decryptiondata); 
  let options ={ headers: headers };
  return this.http.get(this.appconfig.url + '/Common/SP_DS_APPNMNT_STS?fromd='+fromd+'&tod='+tod, options)
  .pipe(
    
    catchError((error: any) => {
      this.CheckForUnAuthorised(error)
this.CheckFor404(error)
this.CheckForSt0(error)
      // Handle the error here or rethrow it as needed
      console.error('Error in SP_DS_APPNMNT_STS:', error);
      return throwError(error); // Rethrow the error
    })
  );
}
sp_ds_op_sts(fromd:string,tod:string) 
{

  this.GetDecryptedData()
  let headers = new HttpHeaders();
  headers.set("Accept", 'application/json');
  headers.set('Content-Type', 'application/json');
  headers = headers.set('Authorization', 'Bearer ' + this.decryptiondata); 
  let options ={ headers: headers };
  return this.http.get(this.appconfig.url + '/Common/sp_ds_op_sts?fromd='+fromd+'&tod='+tod, options)
  .pipe(
    
    catchError((error: any) => {
      this.CheckForUnAuthorised(error)
this.CheckFor404(error)
this.CheckForSt0(error)
      // Handle the error here or rethrow it as needed
      console.error('Error in SP_DS_APPNMNT_STS:', error);
      return throwError(error); // Rethrow the error
    })
  );
}
CallDeptRevProcedureAsync(fromd:string,tod:string) 
{

  this.GetDecryptedData()
  let headers = new HttpHeaders();
  headers.set("Accept", 'application/json');
  headers.set('Content-Type', 'application/json');
  headers = headers.set('Authorization', 'Bearer ' + this.decryptiondata); 
  let options ={ headers: headers };
  return this.http.get(this.appconfig.url + '/Common/CallDeptRevProcedureAsync?fromd='+fromd+'&tod='+tod, options)
  .pipe(
    
    catchError((error: any) => {
      this.CheckForUnAuthorised(error)
this.CheckFor404(error)
this.CheckForSt0(error)
      // Handle the error here or rethrow it as needed
      console.error('Error in CallDeptRevProcedureAsync:', error);
      return throwError(error); // Rethrow the error
    })
  );
}

DsDoctRevProcedureAsync(fromd:string,tod:string) 
{

  this.GetDecryptedData()
  let headers = new HttpHeaders();
  headers.set("Accept", 'application/json');
  headers.set('Content-Type', 'application/json');
  headers = headers.set('Authorization', 'Bearer ' + this.decryptiondata); 
  let options ={ headers: headers };
  return this.http.get(this.appconfig.url + '/Common/DsDoctRevProcedureAsync?fromd='+fromd+'&tod='+tod, options)
  .pipe(
    
    catchError((error: any) => {
      this.CheckForUnAuthorised(error)
this.CheckFor404(error)
this.CheckForSt0(error)
      // Handle the error here or rethrow it as needed
      console.error('Error in DsDoctRevProcedureAsync:', error);
      return throwError(error); // Rethrow the error
    })
  );
}

spInsRevProcedureAsync(fromd:string,tod:string) 
{

  this.GetDecryptedData()
  let headers = new HttpHeaders();
  headers.set("Accept", 'application/json');
  headers.set('Content-Type', 'application/json');
  headers = headers.set('Authorization', 'Bearer ' + this.decryptiondata); 
  let options ={ headers: headers };
  return this.http.get(this.appconfig.url + '/Common/spInsRevProcedureAsync?fromd='+fromd+'&tod='+tod, options)
  .pipe(
    
    catchError((error: any) => {
      this.CheckForUnAuthorised(error)
this.CheckFor404(error)
this.CheckForSt0(error)
      // Handle the error here or rethrow it as needed
      console.error('Error in spInsRevProcedureAsync:', error);
      return throwError(error); // Rethrow the error
    })
  );
}

DsIpRevProcedureAsync(fromd:string,tod:string) 
{

  this.GetDecryptedData()
  let headers = new HttpHeaders();
  headers.set("Accept", 'application/json');
  headers.set('Content-Type', 'application/json');
  headers = headers.set('Authorization', 'Bearer ' + this.decryptiondata); 
  let options ={ headers: headers };
  return this.http.get(this.appconfig.url + '/Common/DsIpRevProcedureAsync?fromd='+fromd+'&tod='+tod, options)
  .pipe(
    
    catchError((error: any) => {
      this.CheckForUnAuthorised(error)
this.CheckFor404(error)
this.CheckForSt0(error)
      // Handle the error here or rethrow it as needed
      console.error('Error in DsIpRevProcedureAsync:', error);
      return throwError(error); // Rethrow the error
    })
  );
}
DsProcCategoryProcedureAsync(fromd:string,tod:string) 
{

  this.GetDecryptedData()
  let headers = new HttpHeaders();
  headers.set("Accept", 'application/json');
  headers.set('Content-Type', 'application/json');
  headers = headers.set('Authorization', 'Bearer ' + this.decryptiondata); 
  let options ={ headers: headers };
  return this.http.get(this.appconfig.url + '/Common/DsProcCategoryProcedureAsync?fromd='+fromd+'&tod='+tod, options)
  .pipe(
    
    catchError((error: any) => {
      this.CheckForUnAuthorised(error)
this.CheckFor404(error)
this.CheckForSt0(error)
      // Handle the error here or rethrow it as needed
      console.error('Error in DsProcCategoryProcedureAsync:', error);
      return throwError(error); // Rethrow the error
    })
  );
}
DsProcGroupProcedureAsync(fromd:string,tod:string) 
{

  this.GetDecryptedData()
  let headers = new HttpHeaders();
  headers.set("Accept", 'application/json');
  headers.set('Content-Type', 'application/json');
  headers = headers.set('Authorization', 'Bearer ' + this.decryptiondata); 
  let options ={ headers: headers };
  return this.http.get(this.appconfig.url + '/Common/DsProcGroupProcedureAsync?fromd='+fromd+'&tod='+tod, options)
  .pipe(
    
    catchError((error: any) => {
      this.CheckForUnAuthorised(error)
this.CheckFor404(error)
this.CheckForSt0(error)
      // Handle the error here or rethrow it as needed
      console.error('Error in DsProcGroupProcedureAsync:', error);
      return throwError(error); // Rethrow the error
    })
  );
}
DsProcedureProcedureAsync(fromd:string,tod:string) 
{

  this.GetDecryptedData()
  let headers = new HttpHeaders();
  headers.set("Accept", 'application/json');
  headers.set('Content-Type', 'application/json');
  headers = headers.set('Authorization', 'Bearer ' + this.decryptiondata); 
  let options ={ headers: headers };
  return this.http.get(this.appconfig.url + '/Common/DsProcedureProcedureAsync?fromd='+fromd+'&tod='+tod, options)
  .pipe(
    
    catchError((error: any) => {
      this.CheckForUnAuthorised(error)
this.CheckFor404(error)
this.CheckForSt0(error)
      // Handle the error here or rethrow it as needed
      console.error('Error in DsProcedureProcedureAsync:', error);
      return throwError(error); // Rethrow the error
    })
  );
}
DsPurchaseProcedureAsync(fromd:string,tod:string) 
{

  this.GetDecryptedData()
  let headers = new HttpHeaders();
  headers.set("Accept", 'application/json');
  headers.set('Content-Type', 'application/json');
  headers = headers.set('Authorization', 'Bearer ' + this.decryptiondata); 
  let options ={ headers: headers };
  return this.http.get(this.appconfig.url + '/Common/DsPurchaseProcedureAsync?fromd='+fromd+'&tod='+tod, options)
  .pipe(
    
    catchError((error: any) => {
      this.CheckForUnAuthorised(error)
this.CheckFor404(error)
this.CheckForSt0(error)
      // Handle the error here or rethrow it as needed
      console.error('Error in DsPurchaseProcedureAsync:', error);
      return throwError(error); // Rethrow the error
    })
  );
}

CallCollectionSctProcedureAsync(fromd:string,tod:string,branchid:string) 
{

  this.GetDecryptedData()
  let headers = new HttpHeaders();
  headers.set("Accept", 'application/json');
  headers.set('Content-Type', 'application/json');
  headers = headers.set('Authorization', 'Bearer ' + this.decryptiondata); 
  let options ={ headers: headers };
  return this.http.get(this.appconfig.url + '/Common/CallCollectionSctProcedureAsync?fromd='+fromd+'&tod='+tod+'&branchid='+branchid, options)
  .pipe(
    
    catchError((error: any) => {
      this.CheckForUnAuthorised(error)
this.CheckFor404(error)
this.CheckForSt0(error)
      // Handle the error here or rethrow it as needed
      console.error('Error in CallCollectionSctProcedureAsync:', error);
      return throwError(error); // Rethrow the error
    })
  );
}
CallCollectionProcedureAsync(fromd:string,tod:string,branchid:string) 
{

  this.GetDecryptedData()
  let headers = new HttpHeaders();
  headers.set("Accept", 'application/json');
  headers.set('Content-Type', 'application/json');
  headers = headers.set('Authorization', 'Bearer ' + this.decryptiondata); 
  let options ={ headers: headers };
  return this.http.get(this.appconfig.url + '/Common/CallCollectionProcedureAsync?fromd='+fromd+'&tod='+tod+'&branchid='+branchid, options)
  .pipe(
    
    catchError((error: any) => {
      this.CheckForUnAuthorised(error)
this.CheckFor404(error)
this.CheckForSt0(error)
      // Handle the error here or rethrow it as needed
      console.error('Error in CallCollectionProcedureAsync:', error);
      return throwError(error); // Rethrow the error
    })
  );
}
CallPackageProcedureAsync(fromd:string,tod:string) 
{

  this.GetDecryptedData()
  let headers = new HttpHeaders();
  headers.set("Accept", 'application/json');
  headers.set('Content-Type', 'application/json');
  headers = headers.set('Authorization', 'Bearer ' + this.decryptiondata); 
  let options ={ headers: headers };
  return this.http.get(this.appconfig.url + '/Common/CallPackageProcedureAsync?fromd='+fromd+'&tod='+tod, options)
  .pipe(
    
    catchError((error: any) => {
      // this.CheckForUnAuthorised(error)
this.CheckFor404(error)
this.CheckForSt0(error)
      this.CheckForUnAuthorised(error)
this.CheckFor404(error)
this.CheckForSt0(error)
      // Handle the error here or rethrow it as needed
      console.error('Error in CallPackageProcedureAsync:', error);
      return throwError(error); // Rethrow the error
    })
  );
}

// CallReferalReportProcedureAsync
CallReferalReportProcedureAsync(fromd:string,tod:string) 
{

  this.GetDecryptedData()
  let headers = new HttpHeaders();
  headers.set("Accept", 'application/json');
  headers.set('Content-Type', 'application/json');
  headers = headers.set('Authorization', 'Bearer ' + this.decryptiondata); 
  let options ={ headers: headers };
  return this.http.get(this.appconfig.url + '/Common/CallReferalReportProcedureAsync?fromd='+fromd+'&tod='+tod, options)
  .pipe(
    
    catchError((error: any) => {
      this.CheckForUnAuthorised(error)
this.CheckFor404(error)
this.CheckForSt0(error)
      // Handle the error here or rethrow it as needed
      console.error('Error in CallReferalReportProcedureAsync:', error);
      return throwError(error); // Rethrow the error
    })
  );
}


GetBillDiscountsAsync(fromd:string,tod:string) 
{
  this.GetDecryptedData()
  let headers = new HttpHeaders();
  headers.set("Accept", 'application/json');
  headers.set('Content-Type', 'application/json');
  headers = headers.set('Authorization', 'Bearer ' + this.decryptiondata); 
  let options ={ headers: headers };
  return this.http.get(this.appconfig.url + '/Common/GetBillDiscountsAsync?fromd='+fromd+'&tod='+tod, options)
  .pipe(    
    catchError((error: any) => {
      this.CheckForUnAuthorised(error)
this.CheckFor404(error)
this.CheckForSt0(error)
      // Handle the error here or rethrow it as needed
      console.error('Error in GetBillDiscountsAsync:', error);
      return throwError(error); // Rethrow the error
    })
  );
}



GetLabDiscountApprovalsAsync(fromd:string,tod:string) 
{
  this.GetDecryptedData()
  let headers = new HttpHeaders();
  headers.set("Accept", 'application/json');
  headers.set('Content-Type', 'application/json');
  headers = headers.set('Authorization', 'Bearer ' + this.decryptiondata); 
  let options ={ headers: headers };
  return this.http.get(this.appconfig.url + '/Common/GetLabDiscountApprovalsAsync?fromd='+fromd+'&tod='+tod, options)
  .pipe(    
    catchError((error: any) => {
      this.CheckForUnAuthorised(error)
this.CheckFor404(error)
this.CheckForSt0(error)
      // Handle the error here or rethrow it as needed
      console.error('Error in GetLabDiscountApprovalsAsync:', error);
      return throwError(error); // Rethrow the error
    })
  );
}



//op discount approval
// int requestId, decimal discountAmount, string remarks, decimal discountPercentage
UpdateOpDiscountAppAsync(du:any) 
{
  this.GetDecryptedData()
  let headers = new HttpHeaders();
  headers.set("Accept", 'application/json');
  headers.set('Content-Type', 'application/json');
  headers = headers.set('Authorization', 'Bearer ' + this.decryptiondata); 
  let options ={ headers: headers };
  return this.http.post(this.appconfig.url + '/Common/UpdateOpDiscountAppAsync?',du, options)
  .pipe(    
    catchError((error: any) => {
      this.CheckForUnAuthorised(error)
this.CheckFor404(error)
this.CheckForSt0(error)
      // Handle the error here or rethrow it as needed
      console.error('Error in UpdateOpDiscountAppAsync:', error);
      return throwError(error); // Rethrow the error
    })
  );
}

 //op discoutn rejection
//  int requestId, string approvalRemarks
 RejectOPDiscountAsync(du:any) 
{
  this.GetDecryptedData()
  let headers = new HttpHeaders();
  headers.set("Accept", 'application/json');
  headers.set('Content-Type', 'application/json');
  headers = headers.set('Authorization', 'Bearer ' + this.decryptiondata); 
  let options ={ headers: headers };
  return this.http.post(this.appconfig.url + '/Common/RejectOPDiscountAsync?',du, options)
  .pipe(    
    catchError((error: any) => {
      this.CheckForUnAuthorised(error)
this.CheckFor404(error)
this.CheckForSt0(error)
      // Handle the error here or rethrow it as needed
      console.error('Error in RejectOPDiscountAsync:', error);
      return throwError(error); // Rethrow the error
    })
  );
}

// UpdateLbmRequestAsync


//Update Biill procedure
UpdateLbmRequestAsync(du:any) 
{
  this.GetDecryptedData()
  let headers = new HttpHeaders();
  headers.set("Accept", 'application/json');
  headers.set('Content-Type', 'application/json');
  headers = headers.set('Authorization', 'Bearer ' + this.decryptiondata); 
  let options ={ headers: headers };
  return this.http.post(this.appconfig.url + '/Common/UpdateLbmRequestAsync',du, options)
  .pipe(    
    catchError((error: any) => {
      this.CheckForUnAuthorised(error)
this.CheckFor404(error)
this.CheckForSt0(error)
      // Handle the error here or rethrow it as needed
      console.error('Error in UpdateLbmRequestAsync:', error);
      return throwError(error); // Rethrow the error
    })
  );
}
}
