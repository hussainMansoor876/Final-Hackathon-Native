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

const allUser = (usersList) => {
    return {
        type: "ALL_USER",
        usersList
    }
}

export {
    updateUser,
    newUser,
    removeUser
}