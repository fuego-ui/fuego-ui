import { Component } from "@angular/core";

import { AnalogWelcomeComponent } from "./analog-welcome.component";

@Component({
	selector: "www-home",
	standalone: true,
	imports: [AnalogWelcomeComponent],
	template: ` <www-analog-welcome /> `,
})
export default class HomeComponent {}
