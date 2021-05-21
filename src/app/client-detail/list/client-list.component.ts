import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ClientProfileService} from '../client-profile.service';
import {ClientDto} from '../dto/client.dto';

@Component({
  selector: 'app-account-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnInit {

  clients: ClientDto[];

  constructor(private clientProfileService: ClientProfileService, private router: Router) { }

  ngOnInit() {
    this.clientProfileService.getAllClients()
    .subscribe(
      (clients => {
        this.clients = clients;
      })
    )
  }

  onSelect(client: ClientDto){
    this.router.navigate(['client/client-detail', client.id]);
  }

}
