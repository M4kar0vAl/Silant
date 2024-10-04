import axios from "axios";
import { useEffect, useState } from "react";

import { MACHINE_CATALOG_URL } from "../constants";
import { useAuth } from "../context";

export function useMachinesCatalog() {
    const isAuthenticated = !!useAuth()
    const [machines, setMachines] = useState(null)


    useEffect(() => {
        let ignore = false
        if (isAuthenticated) {
            async function fetchData() {
                const resp = await axios.get(MACHINE_CATALOG_URL)
    
                if (!ignore) {
                    setMachines(resp.data)
                }
            }

            fetchData()
        }

        return () => ignore = true
    }, [isAuthenticated])

    return machines
}