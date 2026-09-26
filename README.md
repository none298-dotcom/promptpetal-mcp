# @promptpetal/mcp

Your saved [Prompt Petal](https://promptpetal.com/?ref=npm) prompts in any MCP client: Claude Desktop, Claude Code, Cursor, VS Code, Codex, or your own agent.

The server lives inside the Prompt Petal desktop app for Mac and Windows and reads the prompts you keep there, on your computer. This package finds the installed app and runs it, so any AI app that starts servers from npm can use it. It needs the desktop app and Prompt Petal Pro.

## Tools

| Tool | What it does |
|------|--------------|
| `list_prompts` | Lists your prompts by name. |
| `use_prompt` | Returns one prompt's words, with your text filled in. |
| `add_prompt` | Saves a new prompt to Prompt Petal. |
| `improve_prompt` | Rewrites a prompt so an AI follows it better. It never saves by itself. |

Your prompts are also offered as MCP prompts (`prompts/list`, `prompts/get`).

## Set up

1. Install Prompt Petal from [promptpetal.com/download](https://promptpetal.com/download?ref=npm).
2. Add the server to your AI app:

```json
{
  "mcpServers": {
    "prompt-petal": { "command": "npx", "args": ["-y", "@promptpetal/mcp"] }
  }
}
```

On a Mac, the app's own Settings, AI tab, adds itself to Claude Desktop in one click and gives links for Cursor and VS Code.

If the app is installed somewhere unusual, set `PROMPTPETAL_APP` to its MCP server: `Prompt Petal.app/Contents/MacOS/PromptPetalMCP` on a Mac, `Prompt Petal.exe` on Windows.

## Links

- Prompt Petal: [promptpetal.com](https://promptpetal.com/?ref=npm)
- Prompts in AI apps: [promptpetal.com/ai-apps](https://promptpetal.com/ai-apps.html?ref=npm)
