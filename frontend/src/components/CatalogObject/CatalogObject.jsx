import { Link } from 'react-router-dom'
import { ENTITY_CHOICES } from '../../constants'

import './CatalogObject.css'

const CatalogObject = ({ catalogObj }) => {
    return (
        <Link to={`/catalog/${catalogObj.id}`} state={{ catalog: catalogObj }}>
            <div className='catalog-obj'>
                <div className='catalog-obj-header'>
                    <p>{catalogObj.name}</p>
                    <p>{ENTITY_CHOICES[catalogObj.entity]}</p>
                </div>
            </div>
        </Link>
    )
}

export default CatalogObject