const updateUser = (user) => {
    return {
        type: "UPDATE_USER",
        user
    }
}

const newUser = (bool) => {
    return {
        type: "NEW_USER",
        new: bool
    }
}

const removeUser = () => {
    return {
        type: "REMOVE_USER"
    }
}

const allUser = (userList) => {
    return {
        type: "ALL_USER",
        userList
    }
}

export {
    updateUser,
    newUser,
    removeUser,
    allUser
}