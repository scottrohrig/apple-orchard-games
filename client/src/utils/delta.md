```js
// actions.js
  export const UPDATE = 'UPDATE'

  // Tree.js
  export const update = (deltaTime) => { // deltaTime or dt is the duration in ms between each setInverval callback
    return {
      type: UPDATE,
      payload: { deltaTime }
    }
  }

  // timer method
  var time = 0
  var lastUpdate = Date.now()

  setInterval(() => {
    var now = Date.now()
    var dt = now - lastUpdate
    time += dt
    lastUpdate = now
    console.log(count, dt, time)
  }, 1000)

  // reducers.js
  const timerReducer = (state=[],action) => {
    switch (action.type) {
      case UPDATE:
        return state.map((timer) => {
          if (timer.isRunning) {
            timer = { ...timer, time: timer.time += action.payload.deltaTime }
          }
          return timer
        })
    }
  }

  // Import the update action for use
  import { update } from './actions'
  ...

  const store = createStore(reducers);

  let lastUpdateTime = Date.now()
  setInterval(() => {
    const now = Date.now()
    const deltaTime = now - lastUpdateTime
    lastUpdateTime = now
    store.dispatch(update(deltaTime))
  }, 50)

  
```
