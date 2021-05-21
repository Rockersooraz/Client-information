import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ClientProfileService} from '../client-profile.service';
import {ClientDto} from '../dto/client.dto';

@Component({
  selector: 'app-account-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.css']
})
export class ClientDetailComponent implements OnInit {
  public clientDetail: ClientDto;

  constructor(private route: ActivatedRoute, private clientProfileService: ClientProfileService) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.clientProfileService.getClientByClientId(id).subscribe(
      (data) => {
        this.clientDetail = data;
      }
    );

  }

}
