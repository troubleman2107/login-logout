export const setAccessToken = (accessToken) => {
    document.cookie = `token=${accessToken}`;
};

export const setUserInfo = (user) => {
    const {displayName} = user
    console.log(user);
    localStorage.setItem('displayName', JSON.stringify(displayName));
}

export const getCookie = (name) => {
    let cookie = {};
    document.cookie.split(';').forEach(function(el) {
      let [k,v] = el.split('=');
      cookie[k.trim()] = v;
    })
    return cookie[name];
}

export const logOut = () => {
    document.cookie = 'token=';
    localStorage.removeItem("displayName");
};
