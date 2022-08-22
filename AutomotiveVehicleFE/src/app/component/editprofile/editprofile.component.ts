import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit {

  uploadForm?: FormGroup;

  constructor(private formBuilder: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {
    this.uploadForm = this.formBuilder.group({
      emailid: window.localStorage.getItem('tgt_email'),
      username: '',
      file: ['']
    });
  }

  onFileSelect(event:any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      // this.uploadForm.get('file').setValue(file);
    }
  }

  onSubmit() {
    const formData = new FormData();
    // formData.append('emailid', this.uploadForm.get('emailid').value);
    // formData.append('username', this.uploadForm.get('username').value);
    // formData.append('file', this.uploadForm.get('file').value);
    this.userService.updateUserProfile(formData);
  }

}
