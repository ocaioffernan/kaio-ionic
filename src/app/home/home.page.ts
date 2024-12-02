import { Component } from '@angular/core';

import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  activities: { name: string; dueDate: string }[] = [];

  constructor(private alertController: AlertController) {
    this.loadActivities();
  }

  // Carregar atividades do localStorage
  loadActivities() {
    const storedActivities = localStorage.getItem('activities');
    if (storedActivities) {
      this.activities = JSON.parse(storedActivities);
    }
  }

  // FUnção de Marcar tarefa concluida - lista tarefasFeitas no localStorage
  markAsDone(index: number) {
    const chave = "contDoneActs"

    this.deleteActivity(index)

    const storedActivities = localStorage.getItem(chave);
    let cont = storedActivities ? parseInt(storedActivities, 10): 0;
    cont++;
    localStorage.setItem(chave, cont.toString())

    }
  
  // Salvar atividades no localStorage
  saveActivities() {
    localStorage.setItem('activities', JSON.stringify(this.activities));
  }

  // Mostrar o alerta para adicionar atividade
  async showAddActivityAlert() {
    const alert = await this.alertController.create({
      header: 'Nova Atividade',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Nome da atividade',
        },
        {
          name: 'dueDate',
          type: 'date',
          placeholder: 'Data de entrega',
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Adicionar',
          handler: (data) => {
            if (data.name && data.dueDate) {
              this.activities.push({ name: data.name, dueDate: data.dueDate });
              this.saveActivities();
            }
          },
        },
      ],
    });

    await alert.present();
  }

  // Deletar uma atividade
  deleteActivity(index: number) {
    this.activities.splice(index, 1);
    this.saveActivities();
  }

  // Editar uma atividade
  async editActivity(index: number) {
    const activity = this.activities[index];

    const alert = await this.alertController.create({
      header: 'Editar Atividade',
      inputs: [
        {
          name: 'name',
          type: 'text',
          value: activity.name,
          placeholder: 'Nome da atividade',
        },
        {
          name: 'dueDate',
          type: 'date',
          value: activity.dueDate,
          placeholder: 'Data de entrega',
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Salvar',
          handler: (data) => {
            if (data.name && data.dueDate) {
              this.activities[index] = { name: data.name, dueDate: data.dueDate };
              this.saveActivities();
            }
          },
        },
      ],
    });

    await alert.present();
  }
}