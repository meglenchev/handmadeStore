export function toUserDetails(user) {
    return {
        username: user.username,
        email: user.email,
        fullName: user.address[0]?.fullName,
    };
}
