export function toUserDTO(user) {
    return {
        _id: user._id,
        username: user.username,
        role: user.role,
        vendorStatus: user.vendorStatus,
    };
}
