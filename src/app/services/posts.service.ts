import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import axios from "axios";

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) { }
  posts:any;

  createPost(data: any): Observable<any> {
    let token = localStorage.getItem('token')
    console.log(token)
    axios.get(
      'http://localhost:8000/api/logout',
      {headers: {Authorization: `Bearer ${token}`}
      }).then(res => {
      console.log(res)
    });
    return this.http.post<any>(environment.API_URL + 'create-post', data);
  }

  getAllPost(){
    let token = localStorage.getItem('token')
    console.log(token)
    axios.get(
      'http://localhost:8000/api/list-post',
      {headers: {Authorization: `Bearer ${token}`}
      }).then(res => {
        return this.posts = res.data.data
      console.log(res.data)

    });
    return this.posts
  }
}
