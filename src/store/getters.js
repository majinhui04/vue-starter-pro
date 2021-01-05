const getters = {
    sidebar: state => state.app.sidebar,
    size: state => state.app.size,
    device: state => state.app.device,
    permission_menus: state => state.settings.menus,
    // token: state => state.user.token,
    // avatar: state => state.user.avatar,
    // name: state => state.user.name,
    // roles: state => state.user.roles,
}
export default getters
