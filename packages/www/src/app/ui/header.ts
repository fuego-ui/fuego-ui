import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";

@Component({
	selector: "fue-header",
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `<div>
		<a href="#"><img src="" alt="" /></a>
		<nav class="flex w-full min-h-[60px] shadow-lg">
			<ul>
				<li><span>Components</span></li>
			</ul>
		</nav>
	</div>`,
})
export class FueHeaderComponent implements OnInit {
	constructor() {}

	ngOnInit() {}
}
