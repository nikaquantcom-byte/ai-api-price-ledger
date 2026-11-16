# AI API price ledger

Open data on what AI models cost through their APIs, and when models are retired. Updated daily from [AIScoreboard](https://aiscoreboard.app/).

- **Price ledger:** every change to a model's API price that the catalogue recorded, with the old price, the new price, the date and where the price was read (the vendor's own pricing page, or OpenRouter).
- **Price history since 2021:** what OpenAI, Anthropic, Google and DeepSeek listed on their own pricing pages, read from about 150 Internet Archive copies (roughly one a month). Every row links to the archived page it was read from.
- **Retirement calendar:** announced model retirements and scheduled price changes, each with the vendor's own source link and the date it was checked.

<!-- stats:start -->
Data as of **2026-11-16**: 61 recorded changes (32 price rises, 20 price cuts, 9 retirements) across 359 models, first observation 2026-09-08.

**Latest price moves** (USD per 1M tokens, input / output)

| Date | Model | Before | After | Source |
|---|---|---|---|---|
| 2026-11-16 | DeepSeek V4.1 Flash | $0.05 / $0.20 | $0.14 / $0.42 | OpenRouter |
| 2026-11-16 | Gemma 4 26B A4B | $0.07 / $0.23 | $0.09 / $0.30 | OpenRouter |
| 2026-11-16 | GLM 4.5 Air | $0.20 / $1.10 | $0.13 / $0.85 | OpenRouter |
| 2026-11-16 | gpt-oss-20b | $0.03 / $0.13 | $0.07 / $0.30 | OpenRouter |
| 2026-11-16 | Granite 4.2 8B | $0.06 / $0.25 | $0.06 / $0.15 | OpenRouter |
| 2026-11-16 | MiniMax M2.5 | $0.27 / $0.95 | $0.29 / $1.20 | OpenRouter |
| 2026-11-16 | Qwen3.5 397B A17B | $0.60 / $3.60 | $0.45 / $3.00 | OpenRouter |
| 2026-11-16 | Qwen3.5-9B | $0.02 / $0.03 | $0.08 / $0.12 | OpenRouter |
| 2026-11-15 | DeepSeek V3 0324 | $0.25 / $1.00 | $0.29 / $1.14 | OpenRouter |
| 2026-11-15 | DeepSeek V3.2 | $0.27 / $0.40 | $0.26 / $0.38 | OpenRouter |

**Announced dates ahead**

| Date | Model | Event | Suggested replacement | Source |
|---|---|---|---|---|
| 2026-11-30 | Claude Sonnet 4.5 | retires | Claude Sonnet 5.5 | [source](https://platform.claude.com/docs/en/about-claude/pricing) |
| 2026-11-30 | GPT-5.6 Sol | promotion-ends |  | [source](https://developers.openai.com/api/docs/pricing) |
| 2026-12-01 | Gemini 4 Argon | price-change |  | [source](https://aistudio.google.com/docs/pricing) |
| 2026-12-01 | Gemini 4 Carbon | price-change |  | [source](https://aistudio.google.com/docs/pricing) |
| 2026-12-31 | Kimi K2.6 | retires | Kimi K3.1 Pro | [source](https://platform.kimi.ai/docs/pricing/chat) |
| 2026-12-31 | Kimi K2.7 Code | retires | Kimi K3.1 Pro | [source](https://platform.kimi.ai/docs/pricing/chat) |
| 2027-01-19 | Qwen3.5 Plus 2026-04-20 | retires | Qwen3.8 Flash | [source](https://www.alibabacloud.com/help/en/model-studio/model-pricing) |
| 2027-04-30 | Mistral Medium 3.5 | retires | Mistral Large 4 | [source](https://docs.mistral.ai/models) |
<!-- stats:end -->

## Files

| File | What it holds |
|---|---|
| `data/price-changes.csv` | One row per recorded change: date, model, kind (`up`, `down`, `retired`), source, prices before and after |
| `data/prices-over-time.csv` | One row per model and date on which its price, source or status changed |
| `data/price-history.json` | The full ledger as published on the site |
| `data/archive-prices.csv` | Older list prices by vendor and model: first and last archived copy showing each price, with the archive link |
| `data/archive-price-changes.csv` | Price changes found between two archived copies of a vendor's page |
| `data/price-archive.json` | The same archive as JSON |
| `data/retirements.csv` | Announced retirements and scheduled price changes, with source links |
| `data/retirements.json` | The same, as JSON |

Prices are in USD per 1 million tokens (input, output).

## What to know before using it

- The daily ledger started in September 2026 and daily change recording started on 14 November 2026. Prices before that come from the archive files: about one reading a month, so a change there is dated to within about a month, and months with no readable archived copy are missing.
- `source` says where a price was read. `vendor` means the vendor's own pricing page. `openrouter` means the price OpenRouter listed, which is how most open-weights models are tracked and which moves more often.
- A row is added only when something changed. A move from an OpenRouter price to the vendor's page is a better source, not a price change, so it is not listed as one.
- Nothing is estimated. A model with no verified price is left out.
- Found a wrong number? Corrections are logged publicly at [aiscoreboard.app/corrections](https://aiscoreboard.app/corrections/); write to hello@aiscoreboard.app or open an issue here.

## Other ways to get the data

- Browse: [price history since 2021](https://aiscoreboard.app/price-history/) · [price changes](https://aiscoreboard.app/price-changes/) · [Sunset Watch](https://aiscoreboard.app/sunset-watch/) · [weekly brief](https://aiscoreboard.app/reports/)
- Feeds: [price changes (Atom)](https://aiscoreboard.app/price-changes/feed.xml) · [retirements (Atom)](https://aiscoreboard.app/sunset-watch/feed.xml) · [retirements (iCal)](https://aiscoreboard.app/sunset-watch/calendar.ics)
- Free JSON API and MCP server (`https://aiscoreboard.app/mcp`, no key): [developer docs](https://aiscoreboard.app/developers/)
- A weekly email with the changes: sign up on any [weekly brief](https://aiscoreboard.app/reports/) page

## Licence

The data is licensed [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). You may copy, share and adapt it, including commercially, if you credit "AIScoreboard (aiscoreboard.app)" and link to https://aiscoreboard.app/price-changes/ or https://aiscoreboard.app/sunset-watch/.

The script `update.mjs` is released under the MIT licence.

AIScoreboard is published by Tekrune Ltd (England and Wales, company no. 17570261). It sells a cost audit and data plans; nobody can pay to be listed or ranked differently ([commercial policy](https://aiscoreboard.app/commercial-policy/)).
