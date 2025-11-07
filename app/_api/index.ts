export interface FetchOptions extends RequestInit {
    params?: Record<string, string | number | boolean | undefined>;
}

export async function fetchData<T = any>(
    url: string,
    options: FetchOptions = {}
): Promise<T> {
    try {
        const { params, headers, ...rest } = options;

        // Build query string if params exist
        const queryString = params
            ? "?" +
            Object.entries(params)
                .filter(([, value]) => value !== undefined)
                .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
                .join("&")
            : "";

        const response = await fetch(`${process.env.API_HOST || "http://localhost:5000/api"}${url}${queryString}`, {
            headers: {
                "Content-Type": "application/json",
                ...(headers || {}),
            },
            cache: "no-store", // good default for fresh data in Next.js
            ...rest,
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP ${response.status}: ${errorText}`);
        }

        // Try parsing as JSON (fallback to text)
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            const res = await response.json();
            return res.data as T;
        } else {
            const res = await response.text();
            return res as T;
        }
    } catch (error) {
        console.error("fetchData error:", error);
        throw error;
    }
}