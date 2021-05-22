import {ClientDto} from './client.dto';

export class PageableDto {
  client: ClientDto[];
  limit: string;
  page: string;
  totalRecords: string;
}
