import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useUserData } from "../context";
import { checkCreatePermission, checkEditPermission } from "../utils";

export function useCheckPermission(action, entity) {
    const role = useUserData().role
    const navigate = useNavigate()

    let hasPermission

    switch (action) {
        case 'create':
            hasPermission = checkCreatePermission(role, entity)
            break;
        case 'edit':
            hasPermission = checkEditPermission(role, entity)
            break;
    }

    useEffect(() => {
        if (!hasPermission) {
            navigate('/', {replace: true})
        }
    }, [hasPermission, navigate])
}