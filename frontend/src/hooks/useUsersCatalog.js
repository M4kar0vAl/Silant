import axios from "axios";
import { useEffect, useState } from "react";

import { USERS_URL } from "../constants";

export function useUsersCatalog(roles) {
    const [usersCatalog, setUsers] = useState(null)
    
    let URL = USERS_URL

    if (roles.length !== 0) {
        URL += '?'
        roles.forEach((role, index) => {
            if (index < roles.length - 1) {
                URL += `role=${role}&`
            } else {
                URL += `role=${role}`
            }
        })
    }

    useEffect(() => {
        let ignore = false

        async function fetchData() {
            const resp = await axios.get(URL)

            if (!ignore) {
                setUsers(resp.data)
            }
        }

        fetchData()

        return () => ignore = true
    }, [URL])

    return usersCatalog
}