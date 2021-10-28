import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../usuarios/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private _usuario!:Usuario;

  private _token!:string;


  get usuario():Usuario{

    if(this._usuario!=null){
      return this._usuario;
    }else if(this._usuario==null && sessionStorage.getItem('usuario')!=null){
      this._usuario  = JSON.parse(sessionStorage.getItem('usuario')!) as Usuario;
      return this._usuario;
    }


    return new Usuario();



  }

  get token():string{

    if(this._token!=null){
      return this._token;
    }else if(this._token==null && sessionStorage.getItem('token')!=null){
      this._token  =sessionStorage.getItem('token')!;
      return this._token;
    }


    return '';



  }


  private _baseUrl=environment.baseApiUrl;

  constructor(private http:HttpClient) { }


  login(usuario:Usuario):Observable<any>{

    const url= `${this._baseUrl}/oauth/token`

    const credenciales=btoa('angularapp' +':'+ '12345');
    const httpHeaders = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded',
     'Authorization':'Basic '+credenciales });
     let params= new URLSearchParams();
     params.set('grant_type','password');
     params.set('username',usuario.username!);
     params.set('password',usuario.password!);
     console.log(params.toString());
    return this.http.post<any>(url,params.toString(),{headers:httpHeaders});
  }

  guardarUsuario(token:string){
    let payload= this.objetoDatosToken(token);
    this._usuario= new Usuario();
    this._usuario.nombre= payload.nombre;
    this._usuario.apellido= payload.apellido;
    this._usuario.email= payload.email;
    this._usuario.username= payload.user_name;
    this._usuario.roles= payload.authorities;

    sessionStorage.setItem('usuario',JSON.stringify(this._usuario));

  }

  guardarToken(token:string){

    this._token= token;
    sessionStorage.setItem('token',token);
  }


  //Obtener del token la parte del payload con los datos del usuario
  objetoDatosToken(accessToken:string):any{

    if(accessToken!=null && accessToken!=''){
      return JSON.parse(atob(accessToken.split(".")[1]));
    }

    return null;


  }


  isAuthenticated():boolean{

    let payload= this.objetoDatosToken(this.token);

    if(payload!=null && payload.user_name && payload.user_name.length>0){
      return true;
    }

    return false;
  }

  hasRole(roles:string):boolean{

    if(this.usuario.roles.includes(roles)){
      return true;
    }
    return false;

  }

  logout():void{
    console.log('Pasa por el logout');
    this._token='';
    this._usuario=new Usuario();
    //sessionStorage.clear();
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('usuario');

  }


}
