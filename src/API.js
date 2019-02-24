export default function mainRequest(url) {
  fetch(url)
    .then(result => result.json()) // Dont understand why
    .then(
      res => {
        this.setState({
          isLoaded: false,
          movies: this.state.movies.concat(res.movies),
          loadedPages: this.state.loadedPages + 1,
          hasMore: true
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
