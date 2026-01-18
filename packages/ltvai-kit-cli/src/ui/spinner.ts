import * as p from '@clack/prompts';

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
      continue;
    }

    const s = p.spinner();
    s.start(task.title);

    try {
      await task.task((msg) => s.message(msg));
      s.stop(`${task.title} - Done`);
      results.push({
        title: task.title,
        status: 'success',
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      s.stop(`${task.title} - Failed`);
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
