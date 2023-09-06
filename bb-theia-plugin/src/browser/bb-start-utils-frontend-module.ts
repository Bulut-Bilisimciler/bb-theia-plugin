/**
 * Generated using theia-extension-generator
 */
import { FrontendApplicationContribution } from "@theia/core/lib/browser";
import { ContainerModule } from "@theia/core/shared/inversify";
import { CustomTerminalFrontendApplicationContribution } from "./bb-start-utils-terminal-contributions";
import { CommandContribution, MenuContribution } from "@theia/core";
import {
  BbStartUtilsCommandContribution,
  BbStartUtilsMenuContribution,
} from "./bb-start-utils-contribution";
import "../../src/browser/style/branding.css";

export default new ContainerModule((bind) => {
  // add your contribution bindings here

  // prepare bindings
  bind(CustomTerminalFrontendApplicationContribution)
    .toSelf()
    .inSingletonScope();

  // bind all
  bind(FrontendApplicationContribution).toService(
    CustomTerminalFrontendApplicationContribution
  );
  bind(CommandContribution).to(BbStartUtilsCommandContribution);
  bind(MenuContribution).to(BbStartUtilsMenuContribution);
});
