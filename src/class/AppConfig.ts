export class AppConfig{
    url:string=''
    // url:string='https://localhost:7102/api'  //dev/
       
    // url:string='http://misv3/api'    //localtest
    // url:string='http://192.168.1.201:900/api'   //mysystem iis

    // url:string='http://ctsrapi.remedihms.com/api'
    // url:string='https://tsijkapi.remedihms.com/api'       //tesla live
    // url:string='https://futureaceapi.remedihms.com/api'
    // url:string='https://fumeraapi.remedihms.com/api'     //cimar live
    
    // url:string='https://api.bharathhospital.co.in/api'

    //   url:string='http://202.88.253.250/api.local/api'

    //   url:string='http://192.168.0.249/api.local/api'
    constructor() {
        const storedUrl = localStorage.getItem('url'); // Retrieve from localStorage
        this.url = storedUrl+'/api.local/api' ; // Default URL if not found
    }
}
