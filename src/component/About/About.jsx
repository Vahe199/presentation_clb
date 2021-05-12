import React, {useState} from "react";
import "./About.css"
import Pop from "../../icon/pop.png"
import CreatePresentation from "./CreatePres/CreatePresentation";
import lock from "../../icon/lock.png"
import {Button, Image, Spinner, Table} from "react-bootstrap";
import {useSelector, useDispatch} from 'react-redux'
import SharePresentation from "./Share/SharePresentation";
import {getPresentation} from "../../redux/store/action_creator/presentationAC";

const About = (props) => {
    const {Presentation, error, loading} = useSelector((state) => state.presentation);
    const [popupActive, setPopupActive] = useState(false);
    const [modalShow, setModalShow] = React.useState(false);
    const [modalShare, setModalShare] = React.useState(false);
    const dispatch = useDispatch();



    React.useEffect(() => {
        console.log(process.env)
        dispatch(getPresentation())
    }, []);

    if (loading) {
        return <div className={"error_load"}>
            <p>please wait...</p>
            <Spinner className={"spr"} animation="border" variant="warning"/>
        </div>


    }
    if (error) {
        return <div className={"error_load"}>
            <p>{error}</p>
            <Spinner className={"spr"} animation="border" variant="warning"/>
        </div>
    }

    return (<div>

        <main role="main" className="container">
            <h5 className={"mt-5"}>All Presentations</h5>
            <div className="my-3 p-3 bg-light rounded box-shadow">
                <Table hover responsive="xl">
                    <thead>
                    <tr>
                        <th></th>
                        <td>NAME</td>
                        <td className={"w-25"}>OPENED</td>
                        <td className={"w-25"}>SIZE</td>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        Presentation.map((e, i) => {
                            return (
                                <tr key={e.id}>
                                    <th>
                                        <Image className="mr-2 rounded" width="32px" height="32px"
                                               src={`${process.env.REACT_APP_UNSPLASH_URL}${e.presentation_file[0].path}`}/>
                                    </th>
                                    <td>{e.title}
                                        {e.is_private ?
                                            <Image width={"40px"} src={lock}/> : ""
                                        }
                                        <div><small>  {e.presentation_file[0].mime}</small></div>
                                    </td>
                                    <td>{e.createdAt}</td>
                                    <td className={"d-flex"}>
                                        {Math.round(e.presentation_file[0].size/1000)+''+ 'KB'}
                                        {e.is_private ?
                                            <> <Button className={"ml-5 h-25 pt-1 pb-1  mr-2"}
                                                       variant="outline-dark">View</Button>
                                                <Button className={"pt-1 pb-1  h-25"} variant="outline-dark"
                                                        onClick={() => setModalShare(true)}>Share</Button></> : ""
                                        }
                                    </td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </Table>
            </div>
            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    <li className="page-item">
                        <a className="page-link" href="#" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                            <span className="sr-only">Previous</span>
                        </a>
                    </li>
                    <li className="page-item"><a className="page-link " href="#">1</a></li>
                    <li className="page-item"><a className="page-link" href="#">2</a></li>
                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                    <li className="page-item">
                        <a className="page-link" href="#" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                            <span className="sr-only">Next</span>
                        </a>
                    </li>
                </ul>
            </nav>
            <div className="popbtn">
                <Button variant="primary" onClick={() => setModalShow(true)}>
                    <Image src={Pop} width={"50px"}/>
                </Button>
            </div>

        </main>
        <CreatePresentation
            show={modalShow}
            onHide={() => setModalShow(false)}/>
        <SharePresentation
            show={modalShare}
            onHide={() => setModalShare(false)}/>

    </div>)
}
export default About;
