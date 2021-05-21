import {Router} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {ClientDto} from '../dto/client.dto';
import {ClientProfileService} from '../client-profile.service';
import {v4 as uuid} from 'uuid';

@Component({
  selector: 'app-account-create',
  templateUrl: './client-create.component.html',
  styleUrls: ['./client-create.component.css']
})
export class ClientCreateComponent implements OnInit {

  public client: ClientDto = new ClientDto();

  public preferredModeOfContact: Array<any> = ['Email', 'Phone', 'None'];

  public gender: Array<any> = ['Male', 'Female', 'None'];

  constructor(private clientProfileService: ClientProfileService,
              private toaster: ToastrService,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    const id = uuid();
    this.clientProfileService.createClient({id, ...this.client})
      .subscribe(
        (data) => {
          console.log(data);
          this.toaster.success('Client created successfully');
          this.router.navigate(['/client/client-list']);
        },
        error => {
          this.toaster.error('Something went wrong', 'Error Occur', {timeOut: 4000});
        }
      );
  }


}
