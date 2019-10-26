import { Component, OnInit } from '@angular/core';
import {PicObject, RequestService} from '../service/request.service';
import {ClipboardService} from 'ngx-clipboard';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  productItemList: PicObject[] = [];
  isLoading = true

  constructor(
    private requestService: RequestService,
    private clipboardService: ClipboardService
  ) {
  }

  ngOnInit(): void {
    // let teststr = "Air_Purifier$19.99.jpg"
    // let reg = new RegExp('_', "g")
    // let name  = teststr.replace('.jpg', '')
    //   .replace(reg, ' ')
    //   .match(/.+$/)
    // console.log(name)
    let reg = new RegExp('_', 'g');
    let item = 'Air_Purifier$19.99.jpg';

    let name = item.match(/.+(\$)/)[0].substring(0, item.lastIndexOf('$'))
      .replace('.jpg', '')
      .replace('.png', '')
      .replace('.JPG', '')
      .replace('.PNG', '')
      .replace(reg, ' ');

    let price = item.match(/\$.+/)[0]
      .replace('$', '')
      .replace('.jpg', '')
      .replace('.png', '')
      .replace('.JPG', '')
      .replace('.PNG', '')


    this.requestService.getArticles().subscribe(
      jsonData => {
        this.isLoading = false
        this.productItemList = jsonData
        let reg = new RegExp('_', "g")
        this.productItemList.map( item => {
          item.name = item.name
            .replace('.jpg', '')
            .replace('.png', '')
            .replace('.JPG', '')
            .replace('.PNG','')
            .replace(reg, ' ')
        })
      }
    )
  }

  copyDetail(str: string) {
    this.clipboardService.copyFromContent(str);
  }
}