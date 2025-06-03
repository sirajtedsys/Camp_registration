import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AppConfig } from 'src/class/AppConfig';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  appconfig =new AppConfig()
  decryptiondata:any

  

  constructor(private http:HttpClient,private authser:AuthService,private loadingCtrl:LoadingController,
    private datePipe:DatePipe,private router:Router) { }

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

    GetDecryptedData(){
      this.decryptiondata= this.authser.DecryptToken()
      }



      insertpatint(p:any) 
{

  this.GetDecryptedData()
  let headers = new HttpHeaders();
  headers.set("Accept", 'application/json');
  headers.set('Content-Type', 'application/json');
  headers = headers.set('Authorization', 'Bearer ' + this.decryptiondata); 
  let options ={ headers: headers };
  return this.http.post(this.appconfig.url + '/Patient/InsertCampPatientMasterAsync',p, options)
  .pipe(
    
    catchError((error: any) => {
      this.CheckForUnAuthorised(error)
this.CheckFor404(error)
this.CheckForSt0(error)
      // Handle the error here or rethrow it as needed
      console.error('Error in LookupPatientTypeAsync:', error);
      return throwError(error); // Rethrow the error
    })
  );
}
LookupPatientTypeAsync() 
{

  this.GetDecryptedData()
  let headers = new HttpHeaders();
  headers.set("Accept", 'application/json');
  headers.set('Content-Type', 'application/json');
  headers = headers.set('Authorization', 'Bearer ' + this.decryptiondata); 
  let options ={ headers: headers };
  return this.http.get(this.appconfig.url + '/Patient/LookupPatientTypeAsync', options)
  .pipe(
    
    catchError((error: any) => {
      this.CheckForUnAuthorised(error)
this.CheckFor404(error)
this.CheckForSt0(error)
      // Handle the error here or rethrow it as needed
      console.error('Error in LookupPatientTypeAsync:', error);
      return throwError(error); // Rethrow the error
    })
  );
}

LookupNationalityAsync() 
{

  this.GetDecryptedData()
  let headers = new HttpHeaders();
  headers.set("Accept", 'application/json');
  headers.set('Content-Type', 'application/json');
  headers = headers.set('Authorization', 'Bearer ' + this.decryptiondata); 
  let options ={ headers: headers };
  return this.http.get(this.appconfig.url + '/Patient/LookupNationalityAsync', options)
  .pipe(
    
    catchError((error: any) => {
      this.CheckForUnAuthorised(error)
this.CheckFor404(error)
this.CheckForSt0(error)
      // Handle the error here or rethrow it as needed
      console.error('Error in LookupNationalityAsync:', error);
      return throwError(error); // Rethrow the error
    })
  );
}

GetDefaultPatientTypeAsync() 
{

  this.GetDecryptedData()
  let headers = new HttpHeaders();
  headers.set("Accept", 'application/json');
  headers.set('Content-Type', 'application/json');
  headers = headers.set('Authorization', 'Bearer ' + this.decryptiondata); 
  let options ={ headers: headers };
  return this.http.get(this.appconfig.url + '/Patient/GetDefaultPatientTypeAsync', options)
  .pipe(
    
    catchError((error: any) => {
      this.CheckForUnAuthorised(error)
this.CheckFor404(error)
this.CheckForSt0(error)
      // Handle the error here or rethrow it as needed
      console.error('Error in GetDefaultPatientTypeAsync:', error);
      return throwError(error); // Rethrow the error
    })
  );
}


GetDefaultCampCustAsync() 
{

  this.GetDecryptedData()
  let headers = new HttpHeaders();
  headers.set("Accept", 'application/json');
  headers.set('Content-Type', 'application/json');
  headers = headers.set('Authorization', 'Bearer ' + this.decryptiondata); 
  let options ={ headers: headers };
  return this.http.get(this.appconfig.url + '/Patient/GetDefaultCampCustAsync', options)
  .pipe(
    
    catchError((error: any) => {
      this.CheckForUnAuthorised(error)
this.CheckFor404(error)
this.CheckForSt0(error)
      // Handle the error here or rethrow it as needed
      console.error('Error in GetDefaultCampCustAsync:', error);
      return throwError(error); // Rethrow the error
    })
  );
}
GetDefaultNationalityAsync() 
{

  this.GetDecryptedData()
  let headers = new HttpHeaders();
  headers.set("Accept", 'application/json');
  headers.set('Content-Type', 'application/json');
  headers = headers.set('Authorization', 'Bearer ' + this.decryptiondata); 
  let options ={ headers: headers };
  return this.http.get(this.appconfig.url + '/Patient/GetDefaultNationalityAsync', options)
  .pipe(
    
    catchError((error: any) => {
      this.CheckForUnAuthorised(error)
this.CheckFor404(error)
this.CheckForSt0(error)
      // Handle the error here or rethrow it as needed
      console.error('Error in GetDefaultNationalityAsync:', error);
      return throwError(error); // Rethrow the error
    })
  );
}

LookupSalutationAsync() 
{

  this.GetDecryptedData()
  let headers = new HttpHeaders();
  headers.set("Accept", 'application/json');
  headers.set('Content-Type', 'application/json');
  headers = headers.set('Authorization', 'Bearer ' + this.decryptiondata); 
  let options ={ headers: headers };
  return this.http.get(this.appconfig.url + '/Patient/LookupSalutationAsync', options)
  .pipe(
    
    catchError((error: any) => {
      this.CheckForUnAuthorised(error)
this.CheckFor404(error)
this.CheckForSt0(error)
      // Handle the error here or rethrow it as needed
      console.error('Error in LookupSalutationAsync:', error);
      return throwError(error); // Rethrow the error
    })
  );
}

LookupCustomerAsync(pid:any,brid:string) 
{

  this.GetDecryptedData()
  let headers = new HttpHeaders();
  headers.set("Accept", 'application/json');
  headers.set('Content-Type', 'application/json');
  headers = headers.set('Authorization', 'Bearer ' + this.decryptiondata); 
  let options ={ headers: headers };
  return this.http.get(this.appconfig.url + '/Patient/LookupCustomerAsync?pId='+pid+'&branchCode='+brid, options)
  .pipe(
    
    catchError((error: any) => {
      this.CheckForUnAuthorised(error)
this.CheckFor404(error)
this.CheckForSt0(error)
      // Handle the error here or rethrow it as needed
      console.error('Error in LookupCustomerAsync:', error);
      return throwError(error); // Rethrow the error
    })
  );
}


LookupLocationAsync() 
{

  this.GetDecryptedData()
  let headers = new HttpHeaders();
  headers.set("Accept", 'application/json');
  headers.set('Content-Type', 'application/json');
  headers = headers.set('Authorization', 'Bearer ' + this.decryptiondata); 
  let options ={ headers: headers };
  return this.http.get(this.appconfig.url + '/Patient/LookupLocationAsync', options)
  .pipe(
    
    catchError((error: any) => {
      this.CheckForUnAuthorised(error)
this.CheckFor404(error)
this.CheckForSt0(error)
      // Handle the error here or rethrow it as needed
      console.error('Error in LookupLocationAsync:', error);
      return throwError(error); // Rethrow the error
    })
  );
}

GetLocationMandatorySettingAsync() 
{

  this.GetDecryptedData()
  let headers = new HttpHeaders();
  headers.set("Accept", 'application/json');
  headers.set('Content-Type', 'application/json');
  headers = headers.set('Authorization', 'Bearer ' + this.decryptiondata); 
  let options ={ headers: headers };
  return this.http.get(this.appconfig.url + '/Patient/GetLocationMandatorySettingAsync', options)
  .pipe(
    
    catchError((error: any) => {
      this.CheckForUnAuthorised(error)
this.CheckFor404(error)
this.CheckForSt0(error)
      // Handle the error here or rethrow it as needed
      console.error('Error in GetLocationMandatorySettingAsync:', error);
      return throwError(error); // Rethrow the error
    })
  );
}

VerifymobileNumber(mob:string) 
{

  this.GetDecryptedData()
  let headers = new HttpHeaders();
  headers.set("Accept", 'application/json');
  headers.set('Content-Type', 'application/json');
  headers = headers.set('Authorization', 'Bearer ' + this.decryptiondata); 
  let options ={ headers: headers };
  return this.http.get(this.appconfig.url + '/Patient/VerifyMobileNumber?mob='+mob, options)
  .pipe(
    
    catchError((error: any) => {
      this.CheckForUnAuthorised(error)
this.CheckFor404(error)
this.CheckForSt0(error)
      // Handle the error here or rethrow it as needed
      console.error('Error in VerifyMobileNumber:', error);
      return throwError(error); // Rethrow the error
    })
  );
}


  // LookupPatientTypeAsync


  // UpdateDailyTokenDetails
 
  
  UpdateDailyTokenDetails(p:any) 
  {
  
    this.GetDecryptedData()
    let headers = new HttpHeaders();
    headers.set("Accept", 'application/json');
    headers.set('Content-Type', 'application/json');
    headers = headers.set('Authorization', 'Bearer ' + this.decryptiondata); 
    let options ={ headers: headers };
    return this.http.post(this.appconfig.url + '/Patient/UpdateDailyTokenDetails',p, options)
    .pipe(
      
      catchError((error: any) => {
        this.CheckForUnAuthorised(error)
this.CheckFor404(error)
this.CheckForSt0(error)
        // Handle the error here or rethrow it as needed
        console.error('Error in UpdateDailyTokenDetails:', error);
        return throwError(error); // Rethrow the error
      })
    );
  }
  GetIdentityCards() 
{

  this.GetDecryptedData()
  let headers = new HttpHeaders();
  headers.set("Accept", 'application/json');
  headers.set('Content-Type', 'application/json');
  headers = headers.set('Authorization', 'Bearer ' + this.decryptiondata); 
  let options ={ headers: headers };
  return this.http.get(this.appconfig.url + '/Patient/GetIdentityCards', options)
  .pipe(
    
    catchError((error: any) => {
      this.CheckForUnAuthorised(error)
this.CheckFor404(error)
this.CheckForSt0(error)
      // Handle the error here or rethrow it as needed
      console.error('Error in GetIdentityCards:', error);
      return throwError(error); // Rethrow the error
    })
  );
}
}
