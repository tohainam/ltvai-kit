# Split Strategies

## researcher

| Strategy  | When                  | Inputs Example                                                     |
| --------- | --------------------- | ------------------------------------------------------------------ |
| by_source | Multiple data sources | [1] docs via Context7, [2] news via WebSearch, [3] github releases |
| by_query  | Different angles      | [1] features, [2] performance, [3] migration guide                 |
| by_time   | Historical context    | [1] current version, [2] previous version, [3] roadmap             |

## scouter

| Strategy     | When                 | Inputs Example                                        |
| ------------ | -------------------- | ----------------------------------------------------- |
| by_directory | Large codebase       | [1] src/, [2] lib/, [3] tests/                        |
| by_method    | Comprehensive search | [1] Glob filenames, [2] Grep content, [3] Git history |
| by_pattern   | Multiple keywords    | [1] auth*, [2] login*, [3] session\*                  |

## reviewer

| Strategy    | When               | Inputs Example                                  |
| ----------- | ------------------ | ----------------------------------------------- |
| by_criteria | Thorough review    | [1] security, [2] performance, [3] code quality |
| by_file     | Many files changed | [1] components/, [2] services/, [3] utils/      |
| by_change   | Mixed changes      | [1] new files, [2] modified, [3] deleted        |

## debugger

| Strategy      | When                       | Inputs Example                                                      |
| ------------- | -------------------------- | ------------------------------------------------------------------- |
| by_error_type | Multiple error types       | [1] runtime errors, [2] type errors, [3] logic bugs                 |
| by_location   | Error spans multiple areas | [1] frontend, [2] backend, [3] database                             |
| by_hypothesis | Multiple possible causes   | [1] check data flow, [2] check async issues, [3] check dependencies |

## Template for New Agent

### [new_agent]

| Strategy   | When        | Inputs Example   |
| ---------- | ----------- | ---------------- |
| strategy_1 | [condition] | [example inputs] |
| strategy_2 | [condition] | [example inputs] |
