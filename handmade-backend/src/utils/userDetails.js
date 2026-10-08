export function toUserDetails(user) {
    return {
        username: user.username,
        email: user.email,
        fullName: user.fullName,
    };
}
