import {useMutation} from 'react-query';
import {client} from './client';

type ScoreType = {
  score: number;
};

export function useAddScore() {
  return useMutation((data: ScoreType) => client.post('/sleepScore', data));
}
