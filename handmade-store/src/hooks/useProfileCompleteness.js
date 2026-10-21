export function useProfileCompleteness(fullName, addresses) {
    const missingName = !fullName?.trim();
    const missingAddress = Array.isArray(addresses) && addresses.length === 0;

    return { missingName, missingAddress };
}
