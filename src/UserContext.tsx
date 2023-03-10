import React, { useState } from 'react'

export type userType = {
    userName: string;
    accessToken: string;
    refreshToken: string;
};

export type userLoginType = {
    id: string;
    pw: string;
}

export type userContextValueType = {
    state: { user: userType };
    actions: {
        login: ( loginUser: userType ) => void;
        logout: () => void;
    };
};

const UserContext = React.createContext<userContextValueType | null>(null);

type PropsType = {
    children: JSX.Element | JSX.Element[];
};

export const UserProvider = (props: PropsType) => {
    const [user, setUser] = useState<userType>({
        userName: "",
        accessToken: "",
        refreshToken: "",
    });

    const login = ( loginUser: userType) => {
        setUser(loginUser);
        localStorage.setItem("userName", loginUser.userName);
        localStorage.setItem("accessToken", loginUser.accessToken);
        localStorage.setItem("refreshToken", loginUser.refreshToken);
    }

    const logout = () => {
        setUser({
            userName: "",
            accessToken: "",
            refreshToken: "",
        });
        localStorage.removeItem("userName");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
    };

    const values : userContextValueType = {
        state: { user },
        actions: {login, logout},
    };

    return (
        <UserContext.Provider value={values}>
            {props.children}
        </UserContext.Provider>
    );
};

export default UserContext;