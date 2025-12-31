import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import { UtilityService } from '../../../services/utility-service/utility.service';

@Component({
  selector: 'app-from-event',
  standalone: true,
  imports: [],
  templateUrl: './from-event.component.html',
  styleUrl: './from-event.component.scss'
})
export class FromEventComponent implements OnInit, AfterViewInit {

  @ViewChild('addBtn', { static: true }) addBtn !: ElementRef<HTMLButtonElement>;

  constructor(private utilityService: UtilityService) { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    let count = 1;
    fromEvent(this.addBtn.nativeElement, 'click').subscribe(res => {
      let countValue = 'Video ' + count++;
      this.utilityService.print('container', countValue);
      this.utilityService.print('container1', countValue);
    });
  }



}
