import { CatalogCreate, MachineCreate, MaintenanceCreate, ReclamationCreate } from '../../components'
import { useCheckPermission } from '../../hooks'

import './CreatePage.css'

const CreatePage = ({ entity }) => {
    useCheckPermission('create', entity)

    let content
    switch (entity) {
        case 'machine':
            content = <MachineCreate />
            break;
        case 'maintenance':
            content = <MaintenanceCreate />
            break;
        case 'reclamation':
            content = <ReclamationCreate />
            break;
        case 'catalog':
            content = <CatalogCreate />
            break;
    }

    return (
        <div className='create-page-container'>
            {content}
        </div>
    )
}



export default CreatePage