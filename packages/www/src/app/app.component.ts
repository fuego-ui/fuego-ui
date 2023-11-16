import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { FueHeaderComponent } from "./ui/header";

@Component({
	selector: "www-root",
	standalone: true,
	imports: [RouterOutlet, FueHeaderComponent],
	template: `<header><fue-header /></header>
		<main>
			<nav></nav>
			<section></section>
			<router-outlet></router-outlet>
		</main>
		<footer></footer>`,
})
export class AppComponent {}
