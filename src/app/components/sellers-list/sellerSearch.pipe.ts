import {PipeTransform, Pipe} from '@angular/core';
import {Seller} from 'src/app/model/seller.model';

@Pipe({
  name: 'sellerFilter'
})
export class SellerSearchPipe implements PipeTransform {
  transform(sellerList: Seller[], searchTerm: string): Seller[] {
      if (!sellerList || !searchTerm) {
        return sellerList;
      }


      return sellerList.filter(seller =>
        seller.sellerName.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
        seller.sellerId.toString().indexOf(searchTerm.toString()) !== -1);
    }


}
