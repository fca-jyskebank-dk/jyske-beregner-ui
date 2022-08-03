import { StateOfType } from '@shared/store/common';

export type SendBeregningState = StateOfType<{
  behaviours: {
    loading: boolean;
    error: Error;
  };
  ok: boolean;
}>;
