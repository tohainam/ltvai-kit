# Agent Registry

## Available Agents

| Agent      | Triggers                                                   | Strategies                                |
| ---------- | ---------------------------------------------------------- | ----------------------------------------- |
| researcher | research, docs, news, latest info, documentation, internet | by_source, by_query, by_time              |
| scouter    | find, search codebase, locate, where is, look for          | by_directory, by_method, by_pattern       |
| reviewer   | review, check code, PR, staged changes, diff               | by_criteria, by_file, by_change           |
| debugger   | debug, error, bug, fix, crash, exception, failing, broken  | by_error_type, by_location, by_hypothesis |

## Template for New Agent

| [new_agent] | [trigger keywords] | [strategy_1, strategy_2] |
