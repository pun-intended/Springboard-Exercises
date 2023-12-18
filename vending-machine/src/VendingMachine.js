import AllRoutes from './Routes';

import { BrowserRouter} from 'react-router-dom';

const VendingMachine = () => {
    return (
    <div>
        <BrowserRouter>
            <AllRoutes />
        </BrowserRouter>
    </div>
    )
}

export default VendingMachine