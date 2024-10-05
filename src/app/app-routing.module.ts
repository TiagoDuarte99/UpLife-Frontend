import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { CriarContaComponent } from './criar-conta/criar-conta.component';
import { CriarContaEscolhaComponent } from './criar-conta-escolha/criar-conta-escolha.component';
import { HPfreelancerComponent } from './hpfreelancer/hpfreelancer.component';
import { HPclienteComponent } from './hpcliente/hpcliente.component';
import { PerfilFreelancerComponent } from './perfil-freelancer/perfil-freelancer.component';
import { PerfilClientComponent } from './perfil-client/perfil-client.component';
import { ListFreelancersComponent } from './list-freelancers/list-freelancers.component';
import { AgendarComponent } from './agendar/agendar.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AgendamentoComponent } from './agendamento/agendamento.component';
import { agendamentoResolver } from './resolve/agendamento.resolver';
import { AdminComponent } from './admin/admin.component';
import { MatsComponent } from './mats/mats.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'criarContaEscolha', component: CriarContaEscolhaComponent },
  { path: 'criarConta', component: CriarContaComponent },
  { path: 'freelancerHp', component: HPfreelancerComponent },
  { path: 'freelancerPerfil', component: PerfilFreelancerComponent },
  { path: 'clientHp', component: HPclienteComponent },
  { path: 'clientPerfil', component: PerfilClientComponent },
  { path: 'freelancerlistFreelancers', component: ListFreelancersComponent },
  { path: 'clientAgendar', component: AgendarComponent },
  { path: 'admin', component: AdminComponent },
  {
    path: 'clientAgendamento/:id',
    component: AgendamentoComponent,
    resolve: { schedule: agendamentoResolver },
  },
  {
    path: 'mats',
    component: MatsComponent,
  },
  { path: 'notFound', component: NotFoundComponent },
  { path: '**', redirectTo: 'notFound' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
