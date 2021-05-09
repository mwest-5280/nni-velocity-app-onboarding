import { OnDestroy, OnInit, Component, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { SubSink } from 'subsink';
import { MessageTypeEnum } from '../models/messages';
import { environment } from '../../environments/environment';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  hidePassword = true;
  hideNewPassword = true;
  loading = false;
  errMsg: string;
  authResponse: any;
  normalMsg: string;
  nextUrl: string;
  loginForm: FormGroup;
  pageTitle: string;
  submitButtonTitle: string;
  envs = environment;
  showPrdList = false;
  showDevList = false;
  showTrainList = false;
  showQAList = false;

  subsink = new SubSink();
  forgotPasswordFlow: boolean;
  newPasswordEntry: boolean;
  messageTypes = MessageTypeEnum;
  showPasswordRequirements: boolean;

  // ^ $ * . [ ] { } ( ) ? - " ! @ # % & / \ , > < ' : ; | _ ~ `
  specialCharacters = ' ^ $ * . [ ] { } ( ) ? - " ! @ # % & / \\ , > < \' : ; | _ ~ `';
  specialCharactersRegex = /[\^$*.[\]{}()?\-"!@#%&/\\,><':;|_~`]/;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthenticationService,
    private router: Router,
    private fb: FormBuilder,
    @Inject(LOCAL_STORAGE) private storage: StorageService
  ) {
    this.loginForm = this.fb.group({
      servicerIds: this.fb.control(''),
      username: this.fb.control('', [Validators.required]),
      password: this.fb.control('', [Validators.required]),
      newPassword: this.fb.control('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(99),
        Validators.pattern(/[0-9]/),
        Validators.pattern(/[a-z]/),
        Validators.pattern(/[A-Z]/),
        Validators.pattern(this.specialCharactersRegex)
      ]),
      verificationCode: this.fb.control('', [Validators.required])
    });
    this.forgotPasswordFlow = false;
    this.newPasswordEntry = false;
    this.pageTitle = 'Onboarding HenchMan';
    this.submitButtonTitle = 'Login';

    // depending on what environment we are in, we will show the different drop down options
    if (this.envs.envName === 'prod') {
      this.loginForm.get('servicerIds').setValue('accessloansprod');
      this.showPrdList = true;
    } else if (this.envs.envName === 'dev') {
      this.loginForm.get('servicerIds').setValue('firstmarkdev');
      this.showDevList = true;
    } else if (this.envs.envName === 'qa') {
      this.loginForm.get('servicerIds').setValue('firstmarkqa');
      this.showQAList = true;
    } else if (this.envs.envName === 'train') {
      this.loginForm.get('servicerIds').setValue('accessloanstrain');
      this.showTrainList = true;
    }
  }

  ngOnInit() {
    this.nextUrl = this.route.snapshot.queryParams.continue || '/dashboard';
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
    this.storage.set('authenticatedUserName', values.servicerIds);
    this.loginForm.disable();
    this.subsink.sink = this.authService.basicAuthLogic(values.username, values.password, values.servicerIds).subscribe(
      data => {
        this.authResponse = data;
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
    if (!this.loginForm.controls.username.valid || !this.loginForm.controls.servicerIds.valid) {
      return;
    }

    this.errMsg = '';
    this.normalMsg = '';
    this.loading = true;
    this.pageTitle = 'Login';
    this.loginForm.disable();
    const { username } = this.loginForm.value;
    const { servicerIds } = this.loginForm.value;
    this.subsink.sink = this.authService.resetPassword(username, servicerIds).subscribe();
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
    const { username, newPassword, verificationCode, servicerIds } = this.loginForm.value;
    this.subsink.sink = this.authService
      .confirmNewPassword(username, newPassword, verificationCode, servicerIds)
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

  ngOnDestroy() {
    this.subsink.unsubscribe();
  }
}
