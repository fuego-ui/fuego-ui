import {
	ChangeDetectionStrategy,
	Component,
	ContentChild,
	ContentChildren,
	Input,
	OnInit,
	QueryList,
	ViewChild,
	booleanAttribute,
	inject,
} from "@angular/core";
import { ControlValueAccessor, NgControl } from "@angular/forms";
import { FueSelectService } from "./select.service";
import {
	CdkConnectedOverlay,
	ConnectedPosition,
	OverlayModule,
} from "@angular/cdk/overlay";
import { FueOptionComponent } from "./fue-option.component";
import { FueSelectContentComponent } from "./fue-select-content.component";
import { CdkListbox, ListboxValueChangeEvent } from "@angular/cdk/listbox";
import { FueSelectTriggerComponent } from "./select-trigger.component";
import { map } from "rxjs";
import { AsyncPipe, NgIf } from "@angular/common";

@Component({
	selector: "fue-select",
	standalone: true,
	imports: [OverlayModule, NgIf, AsyncPipe],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: "inline-block",
	},
	template: ` <ng-container *ngIf="{ value: selectValue$ | async }" />
		<div
			cdk-overlay-origin
			(click)="toggle()"
			#fallbackOverlayOrigin="cdkOverlayOrigin"
			#trigger
		>
			<ng-content select="fue-select-trigger"></ng-content>
		</div>
		<ng-template
			cdk-connected-overlay
			cdkConnectedOverlayLockPosition
			cdkConnectedOverlayHasBackdrop
			cdkConnectedOverlayBackdropClass="cdk-overlay-transparent-backdrop"
			[cdkConnectedOverlayOrigin]="fallbackOverlayOrigin"
			[cdkConnectedOverlayOpen]="panelOpen"
			[cdkConnectedOverlayPositions]="_positions"
			[cdkConnectedOverlayWidth]="'auto'"
			(backdropClick)="close()"
			(attach)="_onAttached()"
			(detach)="close()"
		>
			<ng-content></ng-content>
		</ng-template>`,
	providers: [FueSelectService, CdkListbox],
})
export class FueSelectComponent implements OnInit, ControlValueAccessor {
	value!: string;

	ngControl = inject(NgControl);

	/** Whether or not the overlay panel is open. */
	private _panelOpen = false;

	@Input() multiple = false;

	/** Whether the select is disabled. */
	@Input({ transform: booleanAttribute })
	disabled: boolean = false;

	@ContentChild(FueSelectTriggerComponent)
	protected selectTrigger!: FueSelectTriggerComponent;

	/** Overlay pane containing the options. */
	@ContentChild(FueSelectContentComponent)
	protected selectContent!: FueSelectContentComponent;

	@ContentChildren(FueOptionComponent, { descendants: true })
	options!: QueryList<FueOptionComponent>;

	/** Overlay pane containing the options. */
	@ViewChild(CdkConnectedOverlay)
	protected _overlayDir!: CdkConnectedOverlay;

	private _selectService = inject(FueSelectService);

	/*
	 * This position config ensures that the top "start" corner of the overlay
	 * is aligned with with the top "start" of the origin by default (overlapping
	 * the trigger completely). If the panel cannot fit below the trigger, it
	 * will fall back to a position above the trigger.
	 */
	_positions: ConnectedPosition[] = [
		{
			originX: "start",
			originY: "bottom",
			overlayX: "start",
			overlayY: "top",
		},
		{
			originX: "end",
			originY: "bottom",
			overlayX: "end",
			overlayY: "top",
		},
		{
			originX: "start",
			originY: "top",
			overlayX: "start",
			overlayY: "bottom",
			panelClass: "mat-mdc-select-panel-above",
		},
		{
			originX: "end",
			originY: "top",
			overlayX: "end",
			overlayY: "bottom",
			panelClass: "mat-mdc-select-panel-above",
		},
	];

	get panelOpen(): boolean {
		return this._panelOpen;
	}

	selectValue$ = this._selectService.valueChanges.pipe(
		map((val: ListboxValueChangeEvent<any>) => {
			if (!this.multiple) {
				this.close();
			}
		})
	);

	constructor() {
		// this._uniqueId = nextId++;
		if (this.ngControl != null) {
			// Setting the value accessor directly (instead of using
			// the providers) to avoid running into a circular import.
			this.ngControl.valueAccessor = this;
		}
	}

	ngOnInit(): void {
		if (this.multiple) {
			this._selectService.multiple.set(true);
		}
	}

	/** Toggles the overlay panel open or closed. */
	toggle(): void {
		this.panelOpen ? this.close() : this.open();
	}

	/** Opens the overlay panel. */
	open(): void {
		if (this._canOpen()) {
			this._panelOpen = true;
			this._highlightCorrectOption();
		}
	}

	/** Closes the overlay panel and focuses the host element. */
	close(): void {
		if (this._panelOpen) {
			this._panelOpen = false;
			this.selectTrigger.focus();
		}
	}

	/** Whether the panel is allowed to open. */
	protected _canOpen(): boolean {
		return !this._panelOpen && !this.disabled && this.options?.length > 0;
	}

	/**
	 * Callback that is invoked when the overlay panel has been attached.
	 */
	_onAttached(): void {
		// Mat-Select Ensures to scroll to active element
		// Should consider implementing
		// this._overlayDir.positionChange.pipe(take(1)).subscribe(() => {
		// 	this._positioningSettled();
		// });
	}

	/**
	 * Highlights the selected item. If no option is selected, it will highlight
	 * the first *enabled* option.
	 */
	private _highlightCorrectOption(): void {
		// let firstEnabledOptionIndex = -1;
		// for (let index = 0; index < this.options.length; index++) {
		// 	const option = this.options.get(index)!;
		// 	if (!option.disabled) {
		// 		firstEnabledOptionIndex = index;
		// 		break;
		// 	}
		// }

		setTimeout(() => this.selectContent.focusList());
	}

	onChange!: (value: any) => void;

	onTouched!: () => void;

	writeValue(value: any): void {
		this.value = value;
	}

	registerOnChange(fn: any): void {
		this.onChange = fn;
	}

	registerOnTouched(fn: any): void {
		this.onTouched = fn;
	}

	setDisabledState?(isDisabled: boolean): void {}
}
