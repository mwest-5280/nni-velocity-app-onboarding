import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageTypeEnum } from '../core/models/messages';
import { AuthenticationService } from '../core/security';
import { Subscriptions } from '../core/subscriptions';
import { UserPoolIdService } from '../core/security/user-pool-id.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  hidePassword = true;
  hideNewPassword = true;
  loading = false;
  errMsg: string;
  normalMsg: string;
  nextUrl: string;
  loginForm: FormGroup;
  pageTitle: string;
  submitButtonTitle: string;

  forgotPasswordFlow: boolean;
  newPasswordEntry: boolean;
  messageTypes = MessageTypeEnum;
  showPasswordRequirements: boolean;

  specialCharacters = ' ^ $ * . [ ] { } ( ) ? - " ! @ # % & / \\ , > < \' : ; | _ ~ `';
  specialCharactersRegex = /[\^$*.[\]{}()?\-"!@#%&/\\,><':;|_~`]/;

  poolOptions = this.poolIdService.poolOptions;

  private subscriptions = new Subscriptions();

  constructor(
    private route: ActivatedRoute,
    private authService: AuthenticationService,
    private poolIdService: UserPoolIdService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      poolId: [''],
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      newPassword: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(99),
          Validators.pattern(/[0-9]/),
          Validators.pattern(/[a-z]/),
          Validators.pattern(/[A-Z]/),
          Validators.pattern(this.specialCharactersRegex),
        ],
      ],
      verificationCode: ['', [Validators.required]],
    });
    this.forgotPasswordFlow = false;
    this.newPasswordEntry = false;
    this.pageTitle = 'Login';
    this.submitButtonTitle = 'Login';

    // depending on what environment we are in, we will show the different drop down options
    this.loginForm.get('poolId').setValue(this.poolOptions[0].id);
  }

  ngOnInit() {
    this.nextUrl = this.route.snapshot.queryParams.continue || '/borrower';
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  async onSubmit() {
    if (this.forgotPasswordFlow) {
      if (this.newPasswordEntry) {
        this.newPasswordProcess();
      } else {
        this.forgotPasswordProcess();
      }
    } else {
      this.signOnProcess();
    }
  }

  signOnProcess() {
    if (!this.loginForm.controls.username.valid || !this.loginForm.controls.password.valid) {
      return;
    }

    this.errMsg = '';
    this.normalMsg = '';
    this.loading = true;

    const values = this.loginForm.value;
    this.loginForm.disable();

    this.subscriptions.add = this.authService.basicAuthLogic(values.username, values.password, values.poolId).subscribe(
      () => {
        this.loading = false;
        this.router.navigateByUrl(this.nextUrl);
      },
      () => {
        this.errMsg = 'Incorrect username or password';
        this.loginForm.enable();
        this.loading = false;
      }
    );
  }

  forgotPasswordProcess() {
    if (!this.loginForm.controls.username.valid || !this.loginForm.controls.poolId.valid) {
      return;
    }

    this.errMsg = '';
    this.normalMsg = '';
    this.loading = true;
    this.pageTitle = 'Login';
    this.loginForm.disable();
    const { username } = this.loginForm.value;
    const { poolId } = this.loginForm.value;
    this.subscriptions.add = this.authService.resetPassword(username, poolId).subscribe();
    this.loading = false;
    this.normalMsg = 'A verification code has been sent for account recovery.';
    this.newPasswordEntry = true;
    this.submitButtonTitle = 'Submit New Password';
    this.pageTitle = 'Enter Password';
    this.loginForm.enable();
  }

  newPasswordProcess() {
    if (!this.loginForm.controls.newPassword.valid || !this.loginForm.controls.verificationCode.valid) {
      return;
    }

    this.errMsg = '';
    this.normalMsg = '';
    this.loading = true;

    this.loginForm.disable();
    const { username, newPassword, verificationCode, poolId } = this.loginForm.value;
    this.subscriptions.add = this.authService
      .confirmNewPassword(username, newPassword, verificationCode, poolId)
      .subscribe(
        () => {
          this.loading = false;
          this.normalMsg = 'Your password has been updated.';
          this.loginForm.controls.password.setValue(this.loginForm.controls.newPassword.value);
          this.newPasswordEntry = false;
          this.forgotPasswordFlow = false;
          this.loginForm.enable();
          this.pageTitle = 'Login';
          this.submitButtonTitle = 'Login';
        },
        () => {
          this.errMsg = 'There was a problem updating your password.';
          this.loginForm.enable();
          this.loading = false;
        }
      );
  }

  forgotPassword() {
    this.forgotPasswordFlow = true;
    this.pageTitle = 'Forgot Password';
    this.submitButtonTitle = 'Forgot Password';
    this.errMsg = '';
    this.normalMsg = '';
    return;
  }

  toggleShowPasswordReqs() {
    this.showPasswordRequirements = !this.showPasswordRequirements;
  }
}
