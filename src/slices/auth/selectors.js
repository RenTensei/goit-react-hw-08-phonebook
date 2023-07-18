export const authSelectors = {
  selectUser: state => state.auth.user,
  selectLoginStatus: state => state.auth.isLoggedIn,
  selectRefreshStatus: state => state.auth.isRefreshing,
};
