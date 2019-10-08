import { Component } from '@angular/core';
import {FormGroup, FormControl , Validators} from '@angular/forms';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CRUD-Task';
  btn = true;
  siteinfo = new FormGroup ({
  siteName: new FormControl('', Validators.required),
  siteURL : new FormControl ('', Validators.required)
  });

  data: any[] = JSON.parse(localStorage.getItem('bookmarks'));
  myindx: number;

  onSubmit()   {

    if (localStorage.getItem('bookmarks') === null)  {
          const container = [];
          container.push(this.siteinfo.value);
          localStorage.setItem('bookmarks', JSON.stringify(container));
        } else    {
         const container = JSON.parse(localStorage.getItem('bookmarks'));
         container.push(this.siteinfo.value);
         localStorage.setItem('bookmarks', JSON.stringify(container));
        }
    this.data = JSON.parse(localStorage.getItem('bookmarks'));
    this.siteinfo.reset();
      }

      update(site) {
 $('#sname').val(site.siteName);
 $('#surl').val(site.siteURL);
 this.btn = false;
 const container = JSON.parse(localStorage.getItem('bookmarks'));
 this.myindx = container.findIndex(obj => obj.siteName === site.siteName);
      }

  del(site) {
   const container = JSON.parse(localStorage.getItem('bookmarks'));
   const indx = container.findIndex(obj => obj.siteName === site.siteName);
   container.splice(indx, 1);
   localStorage.setItem('bookmarks', JSON.stringify(container));
   this.data = container;
  }

  up() {
    const container = JSON.parse(localStorage.getItem('bookmarks'));
    container[this.myindx].siteName = $('#sname').val();
    container[this.myindx].siteURL = $('#surl').val();
    localStorage.setItem('bookmarks', JSON.stringify(container));
    this.data = container;
    this.btn = true;
    this.siteinfo.reset();

  }
}



