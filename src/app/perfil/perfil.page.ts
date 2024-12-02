import { Component, OnInit } from '@angular/core';
import { IonRouterOutlet } from '@ionic/angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage {
  tarefasFeitas: number = 0
  constructor(private routerOutlet: IonRouterOutlet) {}

  ionViewDidEnter() {
    this.loadTarefasFeitas()
  }

  loadTarefasFeitas() {
    const tarefas = localStorage.getItem('contDoneActs');
    console.log(tarefas)
    this.tarefasFeitas = tarefas ? parseInt(tarefas, 10) : 0;

  }
}
