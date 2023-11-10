import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

@Component({
	selector: "www-root",
	standalone: true,
	imports: [RouterOutlet],
	template: ` <router-outlet></router-outlet> `,
})
export class AppComponent {}
