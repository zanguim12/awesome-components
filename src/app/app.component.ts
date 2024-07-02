import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { MatToolbar } from '@angular/material/toolbar';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    CoreModule,
    SharedModule,
    MatToolbar,
    HttpClientModule,
    RouterModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
}
