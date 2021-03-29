import { useContext, useState } from 'react'

import ViewerLoginContext from './../../context/ViewerLoginContext'

import EditViewerData from './../EditViewerData/EditViewerData'
import ViewerLogin from './../LoginForm/ViewerLogin'
import ViewerRegister from './../RegisterForm/ViewerRegister'

const ViewerProfile = () => {

    const { viewerData, setViewerData } = useContext(ViewerLoginContext)
    const [page, setPage] = useState('0')

    return(
        <div>
            {
                viewerData.viewer ? (
                    <EditViewerData  />
                ) : (
                    page === '0' ? (
                        <ViewerLogin setPage={setPage}/>
                    ) : (
                        <ViewerRegister setPage={setPage}/>
                    )

                )
            }
        </div>
    )
}


export default ViewerProfile;
