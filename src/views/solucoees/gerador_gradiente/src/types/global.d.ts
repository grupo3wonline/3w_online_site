// Extend Window interface for gtag
declare global {
    interface Window {
        gtag?: (
            command: string,
            eventName: string | Date,
            params?: Record<string, any>
        ) => void;
        dataLayer?: any[];
    }
}

export { };
