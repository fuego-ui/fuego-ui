import { CommonModule } from "@angular/common";
import { Meta, moduleMetadata, StoryObj } from "@storybook/angular";
import { FueMenuTriggerDirective } from "./menu-trigger.directive";
import { FueButtonDirective } from "../button/button.directive";
import { FueMenuDirective } from "./menu.directive";
import { FueMenuItemDirective } from "./menu-item.directive";
import { FueMenuGroupDirective } from "./menu-group.directive";
import { FueMenuSeparatorComponent } from "./menu-separator.component";
import { FueMenuLabelComponent } from "./menu-label.component";
import { FueMenuShortcutComponent } from "./menu-shortcut.component";
import { FueContextMenuTriggerDirective } from "./menu-ctx-trigger.directive";

const meta: Meta<any> = {
  title: "Menu",
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        FueMenuTriggerDirective,
        FueMenuDirective,
        FueButtonDirective,
        FueMenuItemDirective,
        FueMenuGroupDirective,
        FueMenuSeparatorComponent,
        FueMenuLabelComponent,
        FueMenuShortcutComponent,
        FueContextMenuTriggerDirective,
        // FormsModule,
        // ReactiveFormsModule,
        // FueLabelDirective,
        // FueMenuComponent,
      ],
    }),
  ],
};

export default meta;
type Story = StoryObj<any>;

export const Default: Story = {
  render: () => ({
    props: {},
    template: `
    <button fueBtn
    [fueMenuTriggerFor]="menu"
    align="end"
  >
    Click me!
  </button>

  <ng-template #menu>
    <div class="w-56" fueMenu>
      <button fueMenuItem>Refresh</button>
      <button fueMenuItem>Settings</button>
      <button fueMenuItem>Help</button>
      <button fueMenuItem>Sign out</button>
    </div>
  </ng-template>`,
  }),
};

export const Multilevel: Story = {
  render: () => ({
    props: {},
    template: `
    <button fueBtn
    [fueMenuTriggerFor]="menu"
    align="end"
  >
    Click me!
  </button>

  <ng-template #menu>
  <div fueMenu class="w-56">
  <fue-menu-label>My Account</fue-menu-label>
  <fue-menu-separator />
  <div fueMenuGroup>
    <button fueMenuItem>
      <fue-icon name="radixPerson" fueMenuIcon />
      <span>Profile</span>
      <fue-menu-shortcut>⇧⌘P</fue-menu-shortcut>
    </button>

    <button fueMenuItem>
      <fue-icon name="radixCardStack" fueMenuIcon />
      <span>Billing</span>
      <fue-menu-shortcut>⌘B</fue-menu-shortcut>
    </button>

    <button fueMenuItem>
      <fue-icon name="radixGear" fueMenuIcon />
      <span>Settings</span>
      <fue-menu-shortcut>⌘S</fue-menu-shortcut>
    </button>

    <button fueMenuItem>
      <fue-icon name="radixKeyboard" fueMenuIcon />
      <span>Keyboard Shortcuts</span>
      <fue-menu-shortcut>⌘K</fue-menu-shortcut>
    </button>
  </div>

  <fue-menu-separator />

  <div fueMenuGroup>
    <button fueMenuItem>
      <fue-icon name="radixAvatar" fueMenuIcon />
      <span>Team</span>
      <fue-menu-shortcut>⌘B</fue-menu-shortcut>
    </button>

    <button fueMenuItem [fueMenuTriggerFor]="invite">
      <fue-icon name="radixFace" fueMenuIcon />
      <span>Invite Users</span>
      <fue-menu-item-sub-indicator />
    </button>

    <button fueMenuItem>
      <fue-icon name="radixPlus" fueMenuIcon />
      <span>New Team</span>
      <fue-menu-shortcut>⌘+T</fue-menu-shortcut>
    </button>
  </div>

  <fue-menu-separator />

  <div fueMenuGroup>
    <button fueMenuItem>
      <fue-icon name="radixGithubLogo" fueMenuIcon />
      <span>Github</span>
    </button>

    <button fueMenuItem>
      <fue-icon name="radixQuestionMarkCircled" fueMenuIcon />
      <span>Support</span>
    </button>

    <button fueMenuItem disabled>
      <fue-icon name="radixCode" fueMenuIcon />
      <span>API</span>
    </button>
  </div>

  <fue-menu-separator />

  <button fueMenuItem>
    <fue-icon name="radixExit" fueMenuIcon />
    <span>Logout</span>
    <fue-menu-shortcut>⇧⌘Q</fue-menu-shortcut>
  </button>
</div>
</ng-template>

<ng-template #invite>
<div fueSubMenu>
  <button fueMenuItem>
    <fue-icon name="radixEnvelopeClosed" fueMenuIcon />
    Email
  </button>

  <button fueMenuItem>
    <fue-icon name="radixChatBubble" fueMenuIcon />
    Message
  </button>
  <fue-menu-separator />
  <button fueMenuItem>
    <fue-icon name="radixPlusCircled" fueMenuIcon />
    <span>More</span>
  </button>
</div>
</ng-template>`,
  }),
};

export const ContextMenuSimple: Story = {
  render: () => ({
    props: {},
    template: `
    <div [fueCtxMenuTriggerFor]='menu'
    class='border-border flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm'>
  Right click here
  </div>

  <ng-template #menu>
    <div class="w-56" fueMenu>
      <button fueMenuItem>Refresh</button>
      <button fueMenuItem>Settings</button>
      <button fueMenuItem>Help</button>
      <button fueMenuItem>Sign out</button>
    </div>
  </ng-template>`,
  }),
};

export const contextMenu: Story = {
  render: () => ({
    props: {},
    template: `<div [fueCtxMenuTriggerFor]='menu'
  class='border-border flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm'>
Right click here
</div>

<ng-template #menu>
  <div fueMenu class="w-56">
  <fue-menu-label>My Account</fue-menu-label>
  <fue-menu-separator />
  <div fueMenuGroup>
    <button fueMenuItem>
      <fue-icon name="radixPerson" fueMenuIcon />
      <span>Profile</span>
      <fue-menu-shortcut>⇧⌘P</fue-menu-shortcut>
    </button>

    <button fueMenuItem>
      <fue-icon name="radixCardStack" fueMenuIcon />
      <span>Billing</span>
      <fue-menu-shortcut>⌘B</fue-menu-shortcut>
    </button>

    <button fueMenuItem>
      <fue-icon name="radixGear" fueMenuIcon />
      <span>Settings</span>
      <fue-menu-shortcut>⌘S</fue-menu-shortcut>
    </button>

    <button fueMenuItem>
      <fue-icon name="radixKeyboard" fueMenuIcon />
      <span>Keyboard Shortcuts</span>
      <fue-menu-shortcut>⌘K</fue-menu-shortcut>
    </button>
  </div>

  <fue-menu-separator />

  <div fueMenuGroup>
    <button fueMenuItem>
      <fue-icon name="radixAvatar" fueMenuIcon />
      <span>Team</span>
      <fue-menu-shortcut>⌘B</fue-menu-shortcut>
    </button>

    <button fueMenuItem [fueMenuTriggerFor]="invite">
      <fue-icon name="radixFace" fueMenuIcon />
      <span>Invite Users</span>
      <fue-menu-item-sub-indicator />
    </button>

    <button fueMenuItem>
      <fue-icon name="radixPlus" fueMenuIcon />
      <span>New Team</span>
      <fue-menu-shortcut>⌘+T</fue-menu-shortcut>
    </button>
  </div>

  <fue-menu-separator />

  <div fueMenuGroup>
    <button fueMenuItem>
      <fue-icon name="radixGithubLogo" fueMenuIcon />
      <span>Github</span>
    </button>

    <button fueMenuItem>
      <fue-icon name="radixQuestionMarkCircled" fueMenuIcon />
      <span>Support</span>
    </button>

    <button fueMenuItem disabled>
      <fue-icon name="radixCode" fueMenuIcon />
      <span>API</span>
    </button>
  </div>

  <fue-menu-separator />

  <button fueMenuItem>
    <fue-icon name="radixExit" fueMenuIcon />
    <span>Logout</span>
    <fue-menu-shortcut>⇧⌘Q</fue-menu-shortcut>
  </button>
</div>
</ng-template>

<ng-template #invite>
<div fueSubMenu>
  <button fueMenuItem>
    <fue-icon name="radixEnvelopeClosed" fueMenuIcon />
    Email
  </button>

  <button fueMenuItem>
    <fue-icon name="radixChatBubble" fueMenuIcon />
    Message
  </button>
  <fue-menu-separator />
  <button fueMenuItem>
    <fue-icon name="radixPlusCircled" fueMenuIcon />
    <span>More</span>
  </button>
</div>
</ng-template>`,
  }),
};
