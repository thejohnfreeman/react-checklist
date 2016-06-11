function mutate(state, path, f) {
  if (path.length == 0) {
    return f(state)
  }
  var key = path[0]
  var subpath = path.slice(1)
  var newState = (Array.isArray(state))
    ? [...state]
    : {...state}
  newState[key] = mutate(newState[key], subpath, f)
  return newState
}

module.exports = {mutate}
