import { useLocation } from "react-router-dom"

import { CatalogDetails, MachineDetails, MaintenanceDetails, ReclamationDetails } from "../../components"

import './DetailPage.css'

const DetailPage = ({ entity }) => {
    const location = useLocation()
    let {
        machine = undefined,
        maintenance = undefined,
        reclamation = undefined,
        catalog = undefined
    } = location.state
    
    let content
    switch (entity) {
        case 'machine':
            content = <MachineDetails machine={machine} />
            break;
        case 'maintenance':
            content = <MaintenanceDetails maintenance={maintenance} />
            break;
        case 'reclamation':
            content = <ReclamationDetails reclamation={reclamation} />
            break;
        case 'catalog':
            content = <CatalogDetails catalog={catalog} />
            break;
    }

    return (
        <div className="detail-page-container">
            {content}
        </div>
    )
}

export default DetailPage