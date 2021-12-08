import { HttpClient,HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
export interface Post{
  userId:number;
  id:number;
  title:string;   
  body:string;
}
@Injectable({
  providedIn: 'root'
})
export class DbService{
  url ="https://jsonplaceholder.typicode.com/posts";

  constructor(private http:HttpClient) { }
  // get all posts
  getPosts():Observable<any>{  
   return this.http.get<any>(this.url).pipe(catchError((error)=>throwError(error)));
  }
  // create

  // update 
  // delete
}
