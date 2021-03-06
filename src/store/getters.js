const getters = {
    sidebar: state => state.app.sidebar,
    token: state => state.user.token,
    func: state => state.user.func,
    name: state => state.user.name,
    roles: state => state.user.roles,
    routers: state => state.permission.routers,
    addRouters: state => state.permission.addRouters,
    visitedViews: state => state.tagsView.visitedViews,
    cachedViews: state => state.tagsView.cachedViews
}
export default getters