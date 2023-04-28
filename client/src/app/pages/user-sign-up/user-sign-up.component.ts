// import { Component, OnInit } from '@angular/core';
// import { Router, ActivatedRoute } from '@angular/router';
// import {UserRoleService} from "../../services/user-role.service";
//
// @Component({
//   selector: 'app-user-sign-up',
//   templateUrl: './user-sign-up.component.html',
//   styleUrls: ['./user-sign-up.component.scss', '../../../styles.scss']
// })
// export class UserSignUpComponent implements OnInit {
//   userRole: string = 'customer' || 'restaurant owner';
//   constructor(private route: ActivatedRoute, private router: Router, private userRoleService: UserRoleService) {
//   }
//
//   ngOnInit() {
//     this.userRoleService.userRoleChanged.subscribe((userRole: string) => {
//       this.userRole = userRole;
//       console.log('user role ------------>', userRole);
//     });
//   }
//
//   returnToHomePage(){
//     this.router.navigate(['/']);
//   }
//
// }
