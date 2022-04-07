import { reducer } from '../utils/reducers';

import { UPDATE_TIMERS } from '../utils/actions';

const initialState = {
  timers: [
    {
      type: 'tree',
      _id: 1,
      isRunning: true,
      startedAtTime: 1,
      timerDuration: 30,
    },
    {
      type: 'juicer',
      _id: 2,
      isRunning: true,
      startedAtTime: 2,
      timerDuration: 60,
    }
  ]
};


test('UPDATE_TIMERS', () => {
  const newState = {}
  newState.timers = reducer(initialState.timers, {
    type: UPDATE_TIMERS,
    payload:
      {
        deltaTime: 5,
      },
  });

  console.log('newState...',newState)
  expect(newState.timers[0].startedAtTime).toBe(6)
});
