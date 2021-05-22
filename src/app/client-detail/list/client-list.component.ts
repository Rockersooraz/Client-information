import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ClientProfileService} from '../client-profile.service';
import {ClientDto} from '../dto/client.dto';
import {ToastrService} from 'ngx-toastr';
import {PageEvent} from '@angular/material/paginator';

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

  constructor(private clientProfileService: ClientProfileService,
              private router: Router,
              private toaster: ToastrService,
              private changeDetection: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.clientProfileService.getAllClients().subscribe((clientInfo) => {
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
      this.clientProfileService.deleteClient(cl.id).subscribe();
      this.toaster.success('Client deleted successfully', 'success', {timeOut: 4000});
    }
  }
}
