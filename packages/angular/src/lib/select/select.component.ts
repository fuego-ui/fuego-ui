import {
	AfterContentInit,
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
	signal,
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
import { CdkListbox } from "@angular/cdk/listbox";
import { FueSelectTriggerComponent } from "./select-trigger.component";
import { map, tap } from "rxjs";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { FueLabelDirective } from "../label";

let nextId = 0;

@Component({
	selector: "fue-select",
	standalone: true,
	imports: [OverlayModule, FueLabelDirective],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: "inline-block",
	},
	template: ` <!-- Select -->
		@if(!labelProvided() && placeholder) {
		<label class="hidden" [id]="backupLabelId()">{{ placeholder }}</label>
		}
		<ng-content select="fue-label"></ng-content>
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
			[cdkConnectedOverlayOpen]="isExpanded()"
			[cdkConnectedOverlayPositions]="_positions"
			[cdkConnectedOverlayWidth]="'auto'"
			(backdropClick)="close()"
			(detach)="close()"
		>
			<ng-content></ng-content>
		</ng-template>`,
	providers: [FueSelectService, CdkListbox],
})
export class FueSelectComponent
	implements OnInit, ControlValueAccessor, AfterContentInit
{
	value = signal("");

	ngControl = inject(NgControl);

	@Input() multiple = false;

	@Input() placeholder: string = "";

	/** Whether the select is disabled. */
	@Input({ transform: booleanAttribute })
	set disabled(disabled: boolean) {
		this._disabled = disabled;
		this._selectService.state.update((state) => ({ ...state, disabled }));
	}
	_disabled: boolean = false;

	@ContentChild(FueLabelDirective)
	protected selectLabel!: FueLabelDirective;

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

	isExpanded = this._selectService.isExpanded;

	backupLabelId = this._selectService.labelId;

	labelProvided = signal(false);

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

	constructor() {
		this._selectService.state.update((state) => ({
			...state,
			id: `fue-select-${nextId++}`,
		}));
		if (this.ngControl != null) {
			this.ngControl.valueAccessor = this;
		}

		// Watch for Listbox Selection Changes to trigger Collapse
		this._selectService.listBoxValueChangeEvent$
			.pipe(
				tap(() => !this.multiple && this.close()),
				map((listboxEvent) => {
					this.writeValue(listboxEvent.value);
					this.onChange(listboxEvent.value);
				}),
				takeUntilDestroyed()
			)
			.subscribe();
	}

	ngOnInit(): void {
		this._selectService.state.update((state) => ({
			...state,
			multiple: this.multiple,
			placeholder: this.placeholder,
		}));
	}

	ngAfterContentInit(): void {
		// Check if Label Directive Provided and pass to service
		if (this.selectLabel) {
			this.labelProvided.set(true);
			this._selectService.state.update((state) => ({
				...state,
				labelId: this.selectLabel.id,
			}));
		} else if (this.placeholder) {
			this._selectService.state.update((state) => ({
				...state,
				labelId: `${state.id}--label`,
			}));
		}
	}

	/** Toggles the overlay panel open or closed. */
	toggle(): void {
		this.isExpanded() ? this.close() : this.open();
	}

	/** Opens the overlay panel. */
	open(): void {
		if (this._canOpen()) {
			this._selectService.state.update((state) => ({
				...state,
				isExpanded: true,
			}));
			this._moveFocusToCDKList();
		}
	}

	/** Closes the overlay panel and focuses the host element. */
	close(): void {
		if (this.isExpanded()) {
			this.selectTrigger.focus();
			this._selectService.state.update((state) => ({
				...state,
				isExpanded: false,
			}));
			this.onTouched();
		}
	}

	/** Whether the panel is allowed to open. */
	protected _canOpen(): boolean {
		return !this.isExpanded() && !this._disabled && this.options?.length > 0;
	}

	private _moveFocusToCDKList(): void {
		setTimeout(() => this.selectContent.focusList());
	}

	onChange!: (value: any) => void;

	onTouched!: () => void;

	writeValue(value: any): void {
		this.value.set(value);
	}

	registerOnChange(fn: any): void {
		this.onChange = fn;
	}

	registerOnTouched(fn: any): void {
		this.onTouched = fn;
	}
}
