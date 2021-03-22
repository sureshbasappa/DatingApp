import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFountComponent } from './errors/not-fount/not-fount.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { HomeComponent } from './home/home.component';
import { ListsComponent } from './lists/lists.component';
import { MemberDetailComponent } from './member/member-detail/member-detail.component';
import { MemberEditComponent } from './member/member-edit/member-edit.component';
import { MemberListComponent } from './member/member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';
import { AuthGuard } from './_guards/auth.guard';

const routes: Routes = [
  {path:"", component:HomeComponent},
  {
    path:'',
    runGuardsAndResolvers:'always',
    canActivate:[AuthGuard],
    children:[
      {path: 'members', component: MemberListComponent},
      {path: 'members/edit', component:MemberEditComponent},
      {path: 'members/:username', component: MemberDetailComponent},
      {path: 'lists', component:ListsComponent},
      {path: 'messages', component:MessagesComponent},
    ]
  },
  {path: 'error', component:TestErrorsComponent},
  {path: 'not-found', component:NotFountComponent},
  {path: 'server-error', component:ServerErrorComponent},
    {path:'**', component:NotFountComponent, pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
