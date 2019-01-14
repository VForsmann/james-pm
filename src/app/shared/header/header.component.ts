import { Component, OnInit, Input } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() title: string;
  @Input() add: Component;
  @Input() showContent: boolean;
  @Input() payload;

  plus = faPlus;

  constructor() { }

  ngOnInit() {
  }

  hasButton(): boolean {
    let result = false;
    if (this.add || this.showContent) {
      result = true;
    }
    return result;
  }

}
