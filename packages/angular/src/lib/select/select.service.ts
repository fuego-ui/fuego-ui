import { ListboxValueChangeEvent } from "@angular/cdk/listbox";
import { Injectable, signal, computed } from "@angular/core";
import { Subject } from "rxjs";
import { connect } from "ngxtension/connect";

@Injectable()
export class FueSelectService {
	state = signal<{
		id: string;
		labelId: string;
		panelId: string;
		placeholder: string;
		isExpanded: boolean;
		multiple: boolean;
		value: any;
	}>({
		id: "",
		labelId: "",
		panelId: "",
		placeholder: "",
		isExpanded: false,
		multiple: false,
		value: "",
	});

	readonly id = computed(() => this.state().id);
	readonly labelId = computed(() => this.state().labelId);
	readonly panelId = computed(() => this.state().panelId);
	readonly placeholder = computed(() => this.state().placeholder);
	readonly isExpanded = computed(() => this.state().isExpanded);
	readonly multiple = computed(() => this.state().multiple);
	readonly value = computed(() => this.state().value);

	listBoxValueChangeEvent$ = new Subject<ListboxValueChangeEvent<any>>();

	constructor() {
		connect(
			this.state,
			this.listBoxValueChangeEvent$,
			(prev, listBoxChange) => ({ ...prev, value: listBoxChange.value })
		);
	}
}
