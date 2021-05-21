import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {ClientDto} from './dto/client.dto';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class ClientProfileService {

  private readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

 private readonly apiUrl: string = 'http://localhost:3000/api/v1/client-details/';

  constructor(private readonly http: HttpClient) {}

  getAllClients(): Observable<ClientDto[]> {
    return this.http.get<ClientDto[]>(this.apiUrl)
      .pipe(catchError(this.erroHandler));
  }

  getClientByClientId(clientId: string): Observable<ClientDto> {
    return this.http.get<ClientDto>(`${this.apiUrl}${clientId}`)
      .pipe(catchError(this.erroHandler));
  }

  createClient(clientInfo: ClientDto): Observable<ClientDto> {
    return this.http.post<ClientDto>(this.apiUrl, clientInfo)
      .pipe(catchError(this.erroHandler));
  }

  updateClient(clientInfo: ClientDto): Observable<ClientDto> {
    return this.http.put<ClientDto>(this.apiUrl, clientInfo, this.httpOptions)
      .pipe(catchError(this.erroHandler));
  }

  deleteClient(clientId: string): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}${clientId}`)
      .pipe(catchError(this.erroHandler));
  }

  // tslint:disable-next-line:typedef
  erroHandler(errorResponse: HttpErrorResponse){
    if (errorResponse.error instanceof ErrorEvent) {
      console.error('Client Side Error :', errorResponse.error.message);
    } else {
      console.error('Server Side Error :', errorResponse);
    }
    return  throwError(errorResponse);
  }


}
