import { injectable, inject } from "@theia/core/shared/inversify";
import { FrontendApplicationContribution } from "@theia/core/lib/browser";
import { TerminalService } from "@theia/terminal/lib/browser/base/terminal-service";
import { FileNavigatorContribution } from "@theia/navigator/lib/browser/navigator-contribution";

@injectable()
export class CustomTerminalFrontendApplicationContribution
  implements FrontendApplicationContribution
{
  @inject(FileNavigatorContribution)
  protected readonly navigatorService: FileNavigatorContribution;
  @inject(TerminalService) private readonly terminalService: TerminalService;
  async initializeLayout(): Promise<void> {
    // Open a terminal in the bottom panel
    const terminal = await this.terminalService.newTerminal({});
    terminal.start();

    this.terminalService.open(terminal, { widgetOptions: { area: "bottom" } });

    // open file explorer in the left panel
    const widget = await this.navigatorService.openView({
      activate: true,
    });
    console.log("🔥🔥🔥 widget.isAttached", widget.isAttached);
  }
}
