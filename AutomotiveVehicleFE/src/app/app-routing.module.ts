import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './component/cart/cart.component';
import { EditprofileComponent } from './component/editprofile/editprofile.component';
import { LoginComponent } from './component/login/login.component';
import { SignupComponent } from './component/signup/signup.component';
import { VehiclesComponent } from './component/vehicles/vehicles.component';

const routes: Routes = [

  {path:'', redirectTo: 'vehicles',pathMatch:'full'},
  {path:'vehicles', component: VehiclesComponent},
  {path:'signup', component: SignupComponent},
  {path:'login', component: LoginComponent},
  {path:'cart', component: CartComponent },
  {path:'editprofile', component: EditprofileComponent },
 
  // {path:'searchAllUsers', component: SearchComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
