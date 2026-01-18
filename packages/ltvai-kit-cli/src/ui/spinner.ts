import * as p from '@clack/prompts';
import pc from 'picocolors';

export interface TaskResult {
  title: string;
  status: 'success' | 'error' | 'skipped';
  message?: string;
}

/**
 * Run tasks with spinner
 */
export async function runTasks<T>(
  tasks: Array<{
    title: string;
    task: (message: (msg: string) => void) => Promise<T>;
    enabled?: boolean;
  }>
): Promise<TaskResult[]> {
  const results: TaskResult[] = [];

  for (const task of tasks) {
    if (task.enabled === false) {
      results.push({
        title: task.title,
        status: 'skipped',
        message: 'Skipped',
      });
      p.log.warn(`${pc.dim('○')} ${task.title} ${pc.dim('- Skipped')}`);
      continue;
    }

    const s = p.spinner();
    s.start(task.title);

    try {
      await task.task((msg) => s.message(`${task.title} ${pc.dim(`- ${msg}`)}`));
      s.stop(pc.green(`${task.title}`));
      results.push({
        title: task.title,
        status: 'success',
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      s.stop(pc.red(`${task.title} - Failed`));
      results.push({
        title: task.title,
        status: 'error',
        message: errorMessage,
      });
      throw error;
    }
  }

  return results;
}

/**
 * Create a simple spinner
 */
export function createSpinner() {
  return p.spinner();
}

/**
 * Run a single task with spinner
 */
export async function withSpinner<T>(
  title: string,
  task: (updateMessage: (msg: string) => void) => Promise<T>
): Promise<T> {
  const s = p.spinner();
  s.start(title);

  try {
    const result = await task((msg) => s.message(`${title} ${pc.dim(`- ${msg}`)}`));
    s.stop(pc.green(title));
    return result;
  } catch (error) {
    s.stop(pc.red(`${title} - Failed`));
    throw error;
  }
}
