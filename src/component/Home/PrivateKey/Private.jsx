import React from "react";
import {Button, Image, Modal} from "react-bootstrap";
import "./Private.css"
import hands from "../../../icon/Hands.webp"
import ReactCodeInput from "react-code-input";
const styles = {
    className:"input_style",
    inputStyle: {
        MozAppearance: 'textfield',
        width: '40px',
        fontSize: '25px',
        height: '50px',
        color: 'black',
        border: '1px solid #e0e1e4',
        textAlign:'center',
        outlineColor:'#c0d9ee',
    }
    ,
    inputStyleInvalid: {
        MozAppearance: 'textfield',
        textAlign:'center',
        width: '40px',
        fontSize: '25px',
        height: '50px',
        color: '#785c5c',
        border: '1px solid #eb3d3d',
        outlineColor:'#e96161',
        outlineWidth: 'medium!important'
    }
}

const Private = (props) => {
    const [value, setValue] = React.useState()
 const sendValue = () =>{
     console.log(value)
 }

    return (<div>
        <Modal className={"private_pop"}
               {...props}

               aria-labelledby="contained-modal-title-vcenter"
               centered
        >
            <Modal.Header className={"private_header border-0"} closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <Image width={"35px"} src={hands}/>
                   <strong className={"ml-3"}> Slider Club</strong>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className={"private_body"} >
                <h6>Enter the 6 digits code to unlock presentation</h6>
                  <ReactCodeInput onChange={val => setValue(val) } isValid={true} fields={6} name={"private"} type="text" {...styles}/>
                <Button className={"private_button"} onClick={ sendValue} size="lg" block>Continue</Button>
            </Modal.Body>
        </Modal>
    </div>)
}

export default Private;