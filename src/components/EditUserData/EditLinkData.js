import { useContext, useState } from 'react'
import Input from './../controls/Input'
import Button from './../controls/Button'

import UserLoginContext from './../../context/UserLoginContext'

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    link:{
        padding: theme.spacing(2),
        width: '80%'
    },
    linkName:{
        padding: theme.spacing(1),
        width: '100%'

    },
    linkURL: {
        padding: theme.spacing(1),
        width: '100%'
    },
    heading: {
        fontSize: '16px',
        fontWeight: '600',
        padding: theme.spacing(2),
    },
    formButton:{
        padding:theme.spacing(2),
        marginBottom: '50px'
    }
}))

const EditLinkData = () => {

    const classes = useStyles()

    const { userData, setUserData } = useContext(UserLoginContext);

    const [ links, setLinks ] = useState(userData.user.links);

    const [link1, setLink1] = useState(userData.user.links[0])
    const [link2, setLink2] = useState(userData.user.links[1])
    const [link3, setLink3] = useState(userData.user.links[2])
    const [link4, setLink4] = useState(userData.user.links[3])
    const [link5, setLink5] = useState(userData.user.links[4])
    const [link6, setLink6] = useState(userData.user.links[5])

    const [linksArray, setLinksArray] = useState([link1, link2, link3, link4, link5, link6])
    console.log(linksArray)

    const [ didLinksChange, setDidLinksChange ] = useState(userData.user.links);

    const dummyArray = [1, 2, 3, 4, 5, ];

    let dummyArray2 = []

    let length = dummyArray.length - userData.user.links.length

    for(let i = 0; i < length; i++){
        dummyArray2.push(0)
    }

    console.log(dummyArray2);

    const handleSubmit = () => {
        console.log('hi')
    }

    const handleChangeURL = (e, index) => {
        switch(index){
            case 1:
                setLink1({
                    ...link1,
                        linkURL: e.target.value
                })
                setLinksArray([link1, link2, link3, link4, link5])
                break;
            case 2:
                setLink2({
                    ...link2,
                        linkURL: e.target.value
                })
                setLinksArray([link1, link2, link3, link4, link5])
                break;
            case 3:
                setLink3({
                    ...link3,
                        linkURL: e.target.value
                })
                setLinksArray([link1, link2, link3, link4, link5])
                break;
            case 4:
                setLink4({
                    ...link4,
                        linkURL: e.target.value
                })
                setLinksArray([link1, link2, link3, link4, link5])
                break;
            case 5:
                setLink5({
                    ...link5,
                        linkURL: e.target.value
                })
                setLinksArray([link1, link2, link3, link4, link5])
                break;
            default:
                console.log(6)
                break;
        }
        setLinksArray([link1, link2, link3, link4, link5])
    }

    const handleChangeName = (e, index) => {
        switch(index){
            case 1:
                setLink1({
                    ...link1,
                        linkName: e.target.value
                })
                break;
            case 2:
                setLink2({
                    ...link2,
                        linkName: e.target.value
                })
                break;
            case 3:
                setLink3({
                    ...link3,
                        linkName: e.target.value
                })
                break;
            case 4:
                setLink4({
                    ...link4,
                        linkName: e.target.value
                })
                setLinksArray([link1, link2, link3, link4, link5])
            case 5:
                setLink5({
                    ...link5,
                        linkName: e.target.value
                })
                break;
            default:
                console.log(6)
                break;
        }
        setLinksArray([link1, link2, link3, link4, link5])
    }
    return(
        <div className={classes.root}>
            <div className={classes.heading}>
               LINKS
            </div>
            {
                userData.user.links.map((element, index) =>
                    <div key={index} className={classes.link}>
                        <div className={classes.linkName}>
                            <Input
                                label={`Link ${index + 1} Name`}
                                name='name'
                                type='text'
                                value={linksArray[index].name}
                                fullWidth
                                onChange={e => handleChangeName(e, index+1)}
                            />
                        </div>
                        <div className={classes.linkURL}>
                            <Input
                                className={classes.linkURL}
                                label={`Link ${index + 1} URL`}
                                name='name'
                                type='text'
                                value={linksArray[index].linkURL}
                                fullWidth
                                onChange={e => handleChangeURL(e, index+1)}
                            />
                        </div>
                    </div>
                )
            }
            {
                dummyArray2.map((element, index) =>
                    <div key={index} className={classes.link}>
                        <div className={classes.linkName}>
                            <Input
                                label={`Link ${index + userData.user.links.length + 1} Name`}
                                name='name'
                                type='text'
                                value=""
                                fullWidth
                                onChange={e => handleChangeName(e, index+1+userData.user.links.length)}
                            />
                        </div>
                        <div className={classes.linkURL}>
                            <Input
                                className={classes.linkURL}
                                label={`Link ${index + userData.user.links.length + 1} URL`}
                                name='name'
                                type='text'
                                value=""
                                fullWidth
                                onChange={e => handleChangeURL(e, index+1+userData.user.links.length)}
                            />
                        </div>
                    </div>
                )
            }
            <div className={classes.formButton}>
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    type="submit"
                    text="Update Links"
                    onClick={handleSubmit}
                />
            </div>
        </div>
    )
}

export default EditLinkData;
