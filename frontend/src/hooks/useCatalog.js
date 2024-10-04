import axios from "axios";
import { useEffect, useState } from "react";

import { CATALOG_URL } from "../constants";

export function useCatalog(entities) {
    const [catalog, setCatalog] = useState(null)
    
    let URL = CATALOG_URL
    if (entities.length !== 0) {
        URL += '?'
        entities.forEach((entity, index) => {
            if (index < entities.length - 1) {
                URL += `entity=${entity}&`
            } else {
                URL += `entity=${entity}`
            }
        })
    }

    useEffect(() => {
        let ignore = false

        async function fetchData() {
            const resp = await axios.get(URL)
            if (!ignore) {
                setCatalog(resp.data)
            }
        }

        fetchData()

        return () => ignore = true
    }, [URL])

    return catalog
}