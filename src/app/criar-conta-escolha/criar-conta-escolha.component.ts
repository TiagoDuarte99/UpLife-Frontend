import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-criar-conta-escolha',
  templateUrl: './criar-conta-escolha.component.html',
  styleUrls: ['./criar-conta-escolha.component.scss']
})
export class CriarContaEscolhaComponent {
  constructor(private router: Router) {}

  navegarParaCriarConta(tipoConta: string) {
    this.router.navigate(['/criarConta', { tipoConta: tipoConta }]);
  }
}
