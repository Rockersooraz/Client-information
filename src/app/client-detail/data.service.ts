import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {ClientDto, initialClient} from './dto/client.dto';

@Injectable({providedIn: 'root'})
export class DataService {

  public clientSource = new BehaviorSubject(initialClient);
  currentClient = this.clientSource.asObservable();

  constructor() { }

  changeClient(client: ClientDto) {
    this.clientSource.next(client);
  }

}
