import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

// Components
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { CriarContaComponent } from './criar-conta/criar-conta.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HPfreelancerComponent } from './hpfreelancer/hpfreelancer.component';
import { HPclienteComponent } from './hpcliente/hpcliente.component';
import { CriarContaEscolhaComponent } from './criar-conta-escolha/criar-conta-escolha.component';

// Dependencias
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { IconsModule } from './icons/icons.module';
import { PerfilFreelancerComponent } from './perfil-freelancer/perfil-freelancer.component';
import { PerfilClientComponent } from './perfil-client/perfil-client.component';
import { ListFreelancersComponent } from './list-freelancers/list-freelancers.component';
import { FooterComponent } from './footer/footer.component';
import { RatingComponent } from './rating/rating.component';
import { AgendarComponent } from './agendar/agendar.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatDialogModule } from '@angular/material/dialog';
import { AgendarDialogComponent } from './agendar/agendar-dialog/agendar-dialog.component';
import { AgendarEnderecoComponent } from './agendar/agendar-dialog/agendar-endereco/agendar-endereco.component';
import { MatSelectModule } from '@angular/material/select';
import { AgendarLimpezaResidencialComponent } from './agendar/agendar-dialog/agendar-limpeza-residencial/agendar-limpeza-residencial.component';
import { AgendarReceberInformacoesComponent } from './agendar/agendar-dialog/agendar-receber-informacoes/agendar-receber-informacoes.component';
import { HorarioFreelancerComponent } from './horario-freelancer/horario-freelancer.component';
import { ServicesFreelancerComponent } from './services-freelancer/services-freelancer.component';
import { ConcelhosFreelancerComponent } from './concelhos-freelancer/concelhos-freelancer.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AgendamentoComponent } from './agendamento/agendamento.component';
import { ListaragendamentosComponent } from './listaragendamentosClient/listaragendamentos.component';
import { AdminComponent } from './admin/admin.component';
import { AdminDistritosConcelhosComponent } from './admin-distritos-concelhos/admin-distritos-concelhos.component';
import { AdminTiposServicosComponent } from './admin-tipos-servicos/admin-tipos-servicos.component';
import { AdminEstatisticasComponent } from './admin-estatisticas/admin-estatisticas.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AdminConcelhosComponent } from './admin-concelhos/admin-concelhos.component';
import { MatsComponent } from './mats/mats.component';
import { ChartModule } from 'primeng/chart';
import { GalleriaModule } from 'primeng/galleria';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    LoginComponent,
    CriarContaComponent,
    NavbarComponent,
    HPfreelancerComponent,
    HPclienteComponent,
    CriarContaEscolhaComponent,
    PerfilFreelancerComponent,
    PerfilClientComponent,
    ListFreelancersComponent,
    FooterComponent,
    RatingComponent,
    AgendarComponent,
    AgendarDialogComponent,
    AgendarEnderecoComponent,
    AgendarLimpezaResidencialComponent,
    AgendarReceberInformacoesComponent,
    HorarioFreelancerComponent,
    ServicesFreelancerComponent,
    ConcelhosFreelancerComponent,
    NotFoundComponent,
    AgendamentoComponent,
    ListaragendamentosComponent,
    AdminComponent,
    AdminDistritosConcelhosComponent,
    AdminTiposServicosComponent,
    AdminEstatisticasComponent,
    AdminUsersComponent,
    AdminConcelhosComponent,
    MatsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    HttpClientModule,
    MatIconModule,
    IconsModule,
    FormsModule,
    MatPaginatorModule,
    MatRadioModule,
    MatDialogModule,
    MatSelectModule,
    MatSnackBarModule,
   ChartModule,
   GalleriaModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
