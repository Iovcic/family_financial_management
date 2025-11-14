export function getMonthName(monthNumber: number): string {
    // Create a new Date object. The month is zero-indexed, so subtract 1.
    // We use an arbitrary day and year as they don't affect the month name.
    const date = new Date(2000, monthNumber - 1, 1);

    // Use toLocaleString to get the month name in English (en-US locale)
    // with the 'long' format for the full month name.
    return date.toLocaleString("en-US", { month: "long" });
}