import {useQuery} from 'react-query';
import {client} from './client';

type TaskType = {
  label: string;
  done: boolean;
  color: string;
};

const timeout = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

const getTasks = async () => {
  await timeout(2000);
  const {data} = await client.get('/tasks');
  return data;
};

export function useTasks() {
  return useQuery<TaskType[]>('tasks', getTasks, {
    enabled: false,
  });
}
