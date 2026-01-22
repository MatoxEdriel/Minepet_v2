import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoaderComponent } from "./shared/components/Loader/Loader.component";
import { ToastComponent } from './shared/components/toast/toast.component';
import { ConnectionStatusComponentComponent } from "./shared/components/ConnectionStatusComponent/ConnectionStatusComponent.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoaderComponent, ToastComponent, ConnectionStatusComponentComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('TechFix');
}
