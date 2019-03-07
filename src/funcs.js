export default function requestHandle(obj) {
  obj.then(
    res => {
      this.setState(oldState => {
        return {
          isLoaded: false,
          movies: oldState.movies.concat(res.movies),
          loadedPages: oldState.loadedPages + 1,
          hasMore: true
        };
      });
    },
    error => {
      this.setState({
        err: error,
        isLoaded: true,
        hasMore: false
      });
    }
  );
}
