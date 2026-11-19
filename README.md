# AI API price ledger

Open data on what AI models cost through their APIs, and when models are retired. Updated daily from [AIScoreboard](https://aiscoreboard.app/).

- **Price ledger:** every change to a model's API price that the catalogue recorded, with the old price, the new price, the date and where the price was read (the vendor's own pricing page, or OpenRouter).
- **Price history since 2021:** what OpenAI, Anthropic, Google and DeepSeek listed on their own pricing pages, read from about 150 Internet Archive copies (roughly one a month). Every row links to the archived page it was read from.
- **Retirement calendar:** announced model retirements and scheduled price changes, each with the vendor's own source link and the date it was checked.

<!-- stats:start -->
Data as of **2026-11-19**: 77 recorded changes (39 price rises, 29 price cuts, 9 retirements) across 361 models, first observation 2026-09-08.

**Latest price moves** (USD per 1M tokens, input / output)

| Date | Model | Before | After | Source |
|---|---|---|---|---|
| 2026-11-19 | Beam 1.0 501B A23B | $0.30 / $1.00 | $0.25 / $1.00 | OpenRouter |
| 2026-11-19 | Gemma 3 27B | $0.08 / $0.45 | $0.08 / $0.16 | OpenRouter |
| 2026-11-19 | Qwen3.5-27B | $0.30 / $2.40 | $0.20 / $1.56 | OpenRouter |
| 2026-11-18 | DeepSeek V4.1 Flash | $0.14 / $0.42 | $0.05 / $0.20 | OpenRouter |
| 2026-11-18 | Gemma 3 27B | $0.08 / $0.35 | $0.08 / $0.45 | OpenRouter |
| 2026-11-18 | GLM 5.3 Prime | $2.80 / $8.80 | $1.68 / $5.28 | OpenRouter |
| 2026-11-18 | gpt-oss-20b | $0.07 / $0.30 | $0.02 / $0.09 | OpenRouter |
| 2026-11-18 | MiMo-V2.5-Pro | $0.43 / $0.87 | $0.48 / $1.80 | OpenRouter |
| 2026-11-18 | Mistral Medium 3.1 | $0.40 / $2.00 | $0.44 / $2.20 | OpenRouter |
| 2026-11-18 | Muse Glimmer 30B | $0.30 / $1.20 | $0.35 / $1.50 | OpenRouter |

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
