function mutate(state, path, f) {
  if (path.length == 0) {
    return f(state)
  }
  var key = path[0]
  var subpath = path.slice(1)
  if (Array.isArray(state)) {
    var newState = [...state]
    newState[key] = mutate(newState[key], subpath, f)
    return newState
  }
  var changes = {}
  changes[key] = mutate(state[key], subpath, f)
  return Object.assign({}, state, changes)
}

module.exports = {mutate}
