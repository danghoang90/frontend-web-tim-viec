import { Component, OnInit } from '@angular/core';
import axios from "axios";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {finalize, Observable} from "rxjs";
import {AuthService} from "../../../../services/auth.service";

@Component({
  selector: 'app-edit-employer',
  templateUrl: './edit-employer.component.html',
  styleUrls: ['./edit-employer.component.css']
})
export class EditEmployerComponent implements OnInit {
  formEditEployer?: FormGroup
  id: any = this.activatedRoute.snapshot.paramMap.get('id');
  employer:any=[];

  title = "cloudsSorage";
  // @ts-ignore
  selectedFile: File = null;
  fb:any;
  // @ts-ignore
  downloadURL: Observable<string>;
  constructor( private activatedRoute: ActivatedRoute,
               private route: Router,
               private toastr: ToastrService,
               private afs: AngularFirestore,
               private storage: AngularFireStorage,
               private authService: AuthService) { }

  ngOnInit(): void {
    let token = localStorage.getItem('token')
    axios.get(
      'http://localhost:8000/api/employers/update/'+this.id,
      {headers: {Authorization: `Bearer ${token}`}
      }).then(res => {
      this.employer = res.data.data;
      console.log(this.employer)
      localStorage.setItem('userLogin', JSON.stringify(res.data));
      this.formEditEployer = new FormGroup({
        'id': new FormControl(this.employer.id),
        'email': new FormControl(this.employer.email),
        'contact_person_name': new FormControl(this.employer.contact_person_name),
        'phone_number': new FormControl(this.employer.phone_number),
        'name_employer': new FormControl(this.employer.name_employer),
        'address_employer': new FormControl(this.employer.address_employer),
        'city': new FormControl(this.employer.city),
        'status': new FormControl(this.employer.status),
        'personnel_size': new FormControl(this.employer.personnel_size),
        'company_profile': new FormControl(this.employer.company_profile),
        'logo': new FormControl(this.employer.logo),
        'website': new FormControl(this.employer.website),
      });
    })
  }


  onFileSelected(event:any) {
    var n = Date.now();
    const file = event.target.files[0];
    const filePath = `RoomsImages/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`RoomsImages/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              console.log(url)
              this.fb = url;
              this.formEditEployer?.patchValue({
                'logo': this.fb,
              });
              console.log(this.formEditEployer?.value)
            }

          });
        })
      )
      .subscribe(url => {
        if (url) {
          // console.log(url);
        }
      });
  }



  submit(){
    let token = localStorage.getItem('token')
    let data = this.formEditEployer?.value
    axios.post(
      'http://localhost:8000/api/employers/edit/'+this.employer.id,
      data,
      {headers: {Authorization: `Bearer ${token}`}
      }).then(res => {
        console.log(res)
      if (res.data.status == "success") {
        this.toastr.success(res.data.message);
        localStorage.removeItem('userLogin')
        this.route.navigate(['/login-employer']);
      } else {
        this.toastr.error(res.data.message);
      }
    });
  }

}
