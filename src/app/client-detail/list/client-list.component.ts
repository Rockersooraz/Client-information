import {ChangeDetectorRef, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {ClientProfileService} from '../client-profile.service';
import {ClientDto, initialClient} from '../dto/client.dto';
import {ToastrService} from 'ngx-toastr';
import {PageEvent} from '@angular/material/paginator';
import {DataService} from '../data.service';

@Component({
  selector: 'app-account-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnInit {

  public clients: ClientDto[];
  public length;
  public pageSize;
  public pageSizeOptions: number[] = [5, 10, 25, 100];
  public pageEvent: PageEvent;

  constructor(private readonly profileService: ClientProfileService,
              private readonly dataService: DataService,
              private readonly router: Router,
              private readonly toaster: ToastrService,
              private readonly changeDetection: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.profileService.getAllClients().subscribe((clientInfo) => {
      this.clients = clientInfo.client;
      this.pageSize = +clientInfo.limit;
      this.length = +clientInfo.totalRecords;
    });
  }

  onSelect(client: ClientDto) {
    this.router.navigate(['client/client-detail', client.id]);
  }

  deleteClient(cl: ClientDto): void {
    if (confirm((`Are you sure you want to delete ${cl.name} Client`))) {
      const finalClients = this.clients.filter(client => client.id !== cl.id);
      this.clients = [...finalClients];
      this.pageSize = finalClients.length;
      this.length = this.length - 1;
      this.changeDetection.detectChanges();
      this.profileService.deleteClient(cl.id).subscribe();
      this.toaster.success('Client deleted successfully', 'success', {timeOut: 4000});
    }
  }

  updateClient(cl: ClientDto) {
    this.dataService.changeClient(cl);
    this.router.navigate(['client/create-client']);
  }

  resetForm() {
    this.dataService.changeClient(initialClient);
  }
}
