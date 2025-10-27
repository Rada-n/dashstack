import { useCallback, useState } from "react";

 export interface UserData {
    name?: string;
    email?: string;
    password?: string;
    image?: string;
  }

export const useLocalStrorage:React.FC<{key: string, initialValue: {} | [] | 0}> = (key, initialValue) => {
    const [storedValue, setStoredValue] = useState(() => {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue
    })

    const setValue = useCallback((value: UserData | UserData[]) => {
        if (value === null) {
            localStorage.removeItem(key)
            setStoredValue(initialValue)
        } else {
            const newValue = { ...storedValue, ...value}
            setStoredValue(newValue)
            localStorage.setItem(key,
            JSON.stringify(newValue))
        }
    }, [key])

    return {storedValue, setValue}
}