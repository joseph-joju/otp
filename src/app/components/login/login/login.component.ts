import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  // otp: FormGroup;
  otpValue: any = [];
  key = '1,2,3,4,5,6';
  checkKey: any;
  otp = new FormGroup({
    one: new FormControl('', Validators.required),
    two: new FormControl('', Validators.required),
    three: new FormControl('', Validators.required),
    four: new FormControl('', Validators.required),
    five: new FormControl('', Validators.required),
    six: new FormControl('', Validators.required),
  });

  constructor(private route: Router) {
    // this.otp = new FormGroup({
    //   one: new FormControl('', Validators.required),
    //   two: new FormControl('', Validators.required),
    //   three: new FormControl('', Validators.required),
    //   four: new FormControl('', Validators.required),
    //   five: new FormControl('', Validators.required),
    //   six: new FormControl('', Validators.required),
    // });
  }

  ngOnInit(): void {
    document.getElementById('one')?.focus();
  }

  goToHomePage() {
    if (this.otp.valid) {
      console.log('otp');
      this.enteredOtp();
      if (this.otpValue.join(',') == this.key) {
        this.route.navigate(['home']);
      }
    }
  }

  enteredOtp() {
    this.otpValue = [
      this.otp.get('one')?.value,
      this.otp.get('two')?.value,
      this.otp.get('three')?.value,
      this.otp.get('four')?.value,
      this.otp.get('five')?.value,
      this.otp.get('six')?.value,
    ];
    return;
  }

  input(event: any) {
    let element;
    let active=document.activeElement?.id
    event.srcElement.selectionStart=event.srcElement.selectionStart=event.srcElement.value.length

    if (event.code !== 'Backspace') {
      console.log(event);

      if (
        ((event.keyCode >= 48 && event.keyCode <= 57) ||
        (event.keyCode >= 96 && event.keyCode <= 105)) && this.checkKey==event.key
      ) {
        element = event.srcElement.nextElementSibling;
      }
    }

    if (event.code === 'Backspace') {
      
      element = event.srcElement.previousElementSibling;
      console.log(event.srcElement.value);
      element.value = null;
    }
    if (element == null) {
      return;
    } else {
      element.focus();
    }
  }
  check(event:any){
    console.log(event.key);
    
    this.checkKey=event.key
  }

  onPaste(e: any) {
    let clipboardData = e.clipboardData || window.Clipboard;
    let pastedText = clipboardData.getData('text');
    let otpId = ['one', 'two', 'three', 'four', 'five', 'six'];
    console.log(pastedText.length);

    let focalLength = pastedText.length;
    console.log(pastedText.length);
    this.otp.patchValue({
      one: pastedText[0],
      two: pastedText[1],
      three: pastedText[2],
      four: pastedText[3],
      five: pastedText[4],
      six: pastedText[5],
    });

    document.getElementById('six')?.focus();

    console.log(this.otpValue);
  }
}
