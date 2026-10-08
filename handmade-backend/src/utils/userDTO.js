export function toUserDTO(user) {
    return {
        _id: user._id,
        fullName: user.fullName ?? "",
        username: user.username,
        role: user.role,
        vendorStatus: user.vendorStatus,
    };
}
