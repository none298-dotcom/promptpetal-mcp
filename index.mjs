#!/usr/bin/env node
/**
 * Prompt Petal's MCP server, for AI apps that start servers from npm.
 *
 * The server itself ships inside the Prompt Petal desktop app (Mac, Windows and Linux) (it reads the prompts you keep
 * there, on this computer). This package finds the installed app and runs that server,
 * passing standard input and output straight through, so what an AI app talks to is exactly
 * what the app's own "Add to Claude Desktop" button sets up. Nothing here reads your prompts
 * or touches the network.
 */
import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import os from "node:os";
import path from "node:path";

function candidates() {
  if (process.env.PROMPTPETAL_APP) return [[process.env.PROMPTPETAL_APP, []]];
  if (process.platform === "darwin") {
    const inside = "Contents/MacOS/PromptPetalMCP";
    return [
      [path.join("/Applications/Prompt Petal.app", inside), []],
      [path.join(os.homedir(), "Applications/Prompt Petal.app", inside), []],
    ];
  }
  if (process.platform === "win32") {
    const local = process.env.LOCALAPPDATA || path.join(os.homedir(), "AppData", "Local");
    return [
      [path.join(local, "Prompt Petal", "Prompt Petal.exe"), ["mcp"]],
      [path.join(process.env.ProgramFiles || "C:\\Program Files", "Prompt Petal", "Prompt Petal.exe"), ["mcp"]],
    ];
  }
  // Linux: the .deb and .rpm install to /opt; Flatpak and Snap expose a command.
  return [
    ["/opt/prompt-petal/bin/prompt-petal", ["mcp"]],
    ["/var/lib/flatpak/exports/bin/com.promptpetal.PromptPetal", ["mcp"]],
    [path.join(os.homedir(), ".local/share/flatpak/exports/bin/com.promptpetal.PromptPetal"), ["mcp"]],
    ["/snap/bin/prompt-petal", ["mcp"]],
  ];
}

const found = candidates().find(([file]) => existsSync(file));
if (!found) {
  process.stderr.write(
    "Install Prompt Petal from https://promptpetal.com/download?ref=npm, " +
      "or set PROMPTPETAL_APP to where its MCP server is.\n",
  );
  process.exit(1);
}
const [file, args] = found;
const child = spawn(file, args, { stdio: "inherit" });
child.on("exit", (code) => process.exit(code ?? 0));
child.on("error", (error) => {
  process.stderr.write(`Prompt Petal's MCP server did not start: ${error.message}\n`);
  process.exit(1);
});
