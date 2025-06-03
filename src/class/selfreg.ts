export class SelfReg{
    Patient?: string='';
    Address?: string;
    Sex?: string='';
    Dob?: string='';
    Mobile: string='';
    Email?: string;
    NationalityId?: string='';
    PatiTypeId?: string='';
    MaritalStatus?: string|null=null;
    TokenId?: string;
    CounterId?: string;
    AgeYear?: string;
    P_IDCARD_ID?:string=''
    P_CUST_ID?:string=''
    P_IDCARD_NO?:string=''
    P_SALT_ID?:string=''

    PatiBirthDate:string=''

    DeviceId:string | null = null
    TokenSeries:string='R'
}