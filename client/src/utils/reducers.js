import { UPDATE_TIMERS } from './actions';

export const reducer = (state=[],action) => {
  console.log(state, action);
  switch (action.type) {
    case UPDATE_TIMERS:
      return state.map((timer) => {
        console.log('reducer timer before',timer);
        if (timer.isRunning) {
          timer = { ...timer, startedAtTime: timer.startedAtTime += action.payload.deltaTime }
        }
        console.log('reducer timer after',timer);
        return timer
      })
  }
}
