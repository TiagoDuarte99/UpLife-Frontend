import { Component } from '@angular/core';
import { FreelancerService } from '../services/freelancer.service';
import { PageEvent } from '@angular/material/paginator';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserDetailsService } from '../services/userAngular.service';

@Component({
  selector: 'app-list-freelancers',
  templateUrl: './list-freelancers.component.html',
  styleUrls: ['./list-freelancers.component.scss']
})
export class ListFreelancersComponent {
  images: any[] | undefined;
    
    responsiveOptions: any[] | undefined;

    constructor() {}

    ngOnInit() {
      this.images = [
        { itemImageSrc: 'https://img.freepik.com/fotos-gratis/closeup-de-garconete-desinfetando-mesas-no-cafe-ao-ar-livre_637285-7996.jpg?w=996&t=st=1707074168~exp=1707074768~hmac=dae172d8a09db6a8466623cec7243ad9eaa8a02e6eb0343f2ff87b347e646ee0', thumbnailImageSrc: 'https://img.freepik.com/fotos-gratis/closeup-de-garconete-desinfetando-mesas-no-cafe-ao-ar-livre_637285-7996.jpg?w=996&t=st=1707074168~exp=1707074768~hmac=dae172d8a09db6a8466623cec7243ad9eaa8a02e6eb0343f2ff87b347e646ee0', title: 'Título 1', description: 'Descrição 1' },
        { itemImageSrc: 'https://img.freepik.com/fotos-gratis/pessoa-de-servico-de-limpeza-profissional-usando-aspirador-de-po-no-escritorio_23-2150520594.jpg?w=996&t=st=1707074220~exp=1707074820~hmac=27d5f0fcead9c90e8343e57cd3081bcc7fe39c0e2278e77b95c5e8313829a51e', thumbnailImageSrc: 'https://img.freepik.com/fotos-gratis/pessoa-de-servico-de-limpeza-profissional-usando-aspirador-de-po-no-escritorio_23-2150520594.jpg?w=996&t=st=1707074220~exp=1707074820~hmac=27d5f0fcead9c90e8343e57cd3081bcc7fe39c0e2278e77b95c5e8313829a51e', title: 'Título 2', description: 'Descrição 2' },
        { itemImageSrc: 'https://img.freepik.com/fotos-gratis/homens-de-tiro-completo-cinco-no-escritorio_23-2149345549.jpg?w=996&t=st=1707074546~exp=1707075146~hmac=8bd71d36e330e8ece05f49adbe97ebdb0639f04988b644e3d6ffcb22c05bb131', thumbnailImageSrc: 'https://img.freepik.com/fotos-gratis/homens-de-tiro-completo-cinco-no-escritorio_23-2149345549.jpg?w=996&t=st=1707074546~exp=1707075146~hmac=8bd71d36e330e8ece05f49adbe97ebdb0639f04988b644e3d6ffcb22c05bb131', title: 'Título 2', description: 'Descrição 2' },
        { itemImageSrc: 'https://img.freepik.com/fotos-gratis/homens-de-tiro-completo-limpando-o-escritorio_23-2149345516.jpg?w=996&t=st=1707074651~exp=1707075251~hmac=0a08806b56abaed67c52a2030f4fc89fba99175d36fbc06cb99895add3ac5b4a', thumbnailImageSrc: 'https://img.freepik.com/fotos-gratis/homens-de-tiro-completo-limpando-o-escritorio_23-2149345516.jpg?w=996&t=st=1707074651~exp=1707075251~hmac=0a08806b56abaed67c52a2030f4fc89fba99175d36fbc06cb99895add3ac5b4a', title: 'Título 2', description: 'Descrição 2' },
        { itemImageSrc: 'https://img.freepik.com/fotos-gratis/empregada-vestindo-camiseta-branca-e-luvas-protetoras-amarelas-limpando-vidro-com-pano-vista-da-dona-de-casa-morena-limpando-grande-janela-suja-conceito-de-servico-domestico-e-servico-de-apartamento_132075-11716.jpg?w=996&t=st=1707074709~exp=1707075309~hmac=68e4ecc6ae3a265524445c5ec3b4dbdaa630aa2437a76420505652c7da1e5429', thumbnailImageSrc: 'https://img.freepik.com/fotos-gratis/empregada-vestindo-camiseta-branca-e-luvas-protetoras-amarelas-limpando-vidro-com-pano-vista-da-dona-de-casa-morena-limpando-grande-janela-suja-conceito-de-servico-domestico-e-servico-de-apartamento_132075-11716.jpg?w=996&t=st=1707074709~exp=1707075309~hmac=68e4ecc6ae3a265524445c5ec3b4dbdaa630aa2437a76420505652c7da1e5429', title: 'Título 2', description: 'Descrição 2' },
        { itemImageSrc: 'https://img.freepik.com/fotos-gratis/mulher-acariciando-dela-bebe-mentindo-ligado-carruagem-bebe_23-2147923123.jpg?w=996&t=st=1707074754~exp=1707075354~hmac=97c38a2802f122c2d07ce9b4ab53e645a033db127e9a0e0a34f671c7cd071100', thumbnailImageSrc: 'https://img.freepik.com/fotos-gratis/mulher-acariciando-dela-bebe-mentindo-ligado-carruagem-bebe_23-2147923123.jpg?w=996&t=st=1707074754~exp=1707075354~hmac=97c38a2802f122c2d07ce9b4ab53e645a033db127e9a0e0a34f671c7cd071100', title: 'Título 2', description: 'Descrição 2' },
        { itemImageSrc: 'https://img.freepik.com/fotos-gratis/medico-cuidando-de-mulher-idosa-em-casa_23-2148962373.jpg?w=996&t=st=1707074804~exp=1707075404~hmac=d21c5a709bb6292c930d315551356376a1d1cfde460ec46536722e821e449259', thumbnailImageSrc: 'https://img.freepik.com/fotos-gratis/medico-cuidando-de-mulher-idosa-em-casa_23-2148962373.jpg?w=996&t=st=1707074804~exp=1707075404~hmac=d21c5a709bb6292c930d315551356376a1d1cfde460ec46536722e821e449259', title: 'Título 2', description: 'Descrição 2' },
        { itemImageSrc: 'https://img.freepik.com/fotos-gratis/feche-os-donos-dando-agua-para-cachorro_23-2149027336.jpg?w=996&t=st=1707074871~exp=1707075471~hmac=24bb7f8922052cad951e396c1082e0ad1f73753857e9a9f7ad83b1a989adc0e0', thumbnailImageSrc: 'https://img.freepik.com/fotos-gratis/feche-os-donos-dando-agua-para-cachorro_23-2149027336.jpg?w=996&t=st=1707074871~exp=1707075471~hmac=24bb7f8922052cad951e396c1082e0ad1f73753857e9a9f7ad83b1a989adc0e0', title: 'Título 2', description: 'Descrição 2' },
      
      
      ]
        this.responsiveOptions = [
            {
                breakpoint: '1024px',
                numVisible: 5
            },
            {
                breakpoint: '768px',
                numVisible: 3
            },
            {
                breakpoint: '560px',
                numVisible: 1
            }
        ];
    }
}
