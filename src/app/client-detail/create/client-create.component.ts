import {ActivatedRoute, Router} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {ClientDto} from '../dto/client.dto';
import {ClientProfileService} from '../client-profile.service';
import {v4 as uuid} from 'uuid';
import {DataService} from '../data.service';
import {ViewMode} from '../dto/view-mode';


@Component({
  selector: 'app-account-create',
  templateUrl: './client-create.component.html',
  styleUrls: ['./client-create.component.css']
})
export class ClientCreateComponent implements OnInit {

  public client: ClientDto = new ClientDto();

  public viewMode: ViewMode = ViewMode.CREATE;

  public gender: Array<string> = ['Male', 'Female', 'None'];

  public preferredModeOfContact: Array<string> = ['Email', 'Phone', 'None'];

  constructor(
              private readonly toaster: ToastrService,
              private readonly dataCommunicationService: DataService,
              private readonly clientProfileService: ClientProfileService,
              private readonly routes: Router
  ) {}

  ngOnInit(): void {
    this.dataCommunicationService.currentClient.subscribe(data => {
      if (data.name && data.email) {
        this.viewMode = ViewMode.EDITING;
        this.client = data;
      }
    });
  }

  get ViewMode() {
    return ViewMode;
  }

  onSubmit(): void {
    switch (this.viewMode) {
      case ViewMode.CREATE:
        const id = uuid();
        this.clientProfileService.createClient({id, ...this.client})
          .subscribe(
            () => {
              this.displaySuccessAndNavigate();
            },
            () => {
              this.showErrorOnFailure();
            }
          );
        break;
      case ViewMode.EDITING:
        this.clientProfileService.updateClient(this.client).subscribe(
          () => {
            this.displaySuccessAndNavigate();
          },
          () => {
            this.showErrorOnFailure();
          }
        );
    }
  }

  private displaySuccessAndNavigate() {
    this.toaster.success('Client created successfully');
    this.routes.navigate(['/client/client-list']);
  }

  private showErrorOnFailure() {
    this.toaster.error('Something went wrong', 'Error Occur',
      {timeOut: 4000});
  }


}
