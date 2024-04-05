export function getCachedSearchState() {
  try {
    const serializedState = localStorage.getItem('searchState');
    return serializedState ? JSON.parse(serializedState) : {};
  } catch (e) {
    console.error(e);
    return null;
  }
}

export function setCachedSearchState(state) {
  try {
    localStorage.setItem('searchState', JSON.stringify(state));
  } catch (err) {
    console.error(err);
  }
}

export function clearCachedSearchState() {
  try {
    localStorage.removeItem('searchState');
  } catch (err) {
    console.error(err);
  }
}
