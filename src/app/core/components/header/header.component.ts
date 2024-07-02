import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { ComplexFormRoutingModule } from '../../../complex-form/complex-form-routing.module';
import { ReactiveStateRoutingModule } from '../../../reactive-state/reactive-state-routing.module';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbar,ReactiveStateRoutingModule,HttpClientModule, ComplexFormRoutingModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
