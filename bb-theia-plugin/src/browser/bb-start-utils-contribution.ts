import { injectable, inject } from "@theia/core/shared/inversify";
import {
  Command,
  CommandContribution,
  CommandRegistry,
  MenuContribution,
  MenuModelRegistry,
  MessageService,
} from "@theia/core/lib/common";
import { CommonMenus } from "@theia/core/lib/browser";

export const BbStartUtilsCommand: Command = {
  id: "BbStartUtils.command",
  label: "Bulut Bilisimciler",
};

@injectable()
export class BbStartUtilsCommandContribution implements CommandContribution {
  constructor(
    @inject(MessageService) private readonly messageService: MessageService
  ) {}

  registerCommands(registry: CommandRegistry): void {
    registry.registerCommand(BbStartUtilsCommand, {
      execute: () => this.messageService.info("Bulut Bilisimciler!"),
    });
  }
}

@injectable()
export class BbStartUtilsMenuContribution implements MenuContribution {
  registerMenus(menus: MenuModelRegistry): void {
    menus.registerMenuAction(CommonMenus.EDIT_FIND, {
      commandId: BbStartUtilsCommand.id,
      label: BbStartUtilsCommand.label,
    });
  }
}
