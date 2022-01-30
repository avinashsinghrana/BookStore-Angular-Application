import {Injectable} from '@angular/core';
import {HttpService} from '../http.service';
import {BaseURLFile} from '../../base_url_file';

@Injectable({
  providedIn: 'root'
})
export class OrderconfirmationService {

  constructor(private httpService: HttpService) {
  }

  fetchOrderId() {
    return this.httpService.getOrderId(BaseURLFile.ACTIVE_SERVER + 'user/orderId');
  }
}
