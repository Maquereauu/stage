import Modal from 'react-bootstrap/Modal';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { DeleteRdv_ } from "../../components/AllRdv/Rdv";
export function MoveDeleteAdmin(props){
    return <Modal animation={true} show={props.showModalMoveDelete} onHide={props.handleCloseModalMoveDelete}>
    <Modal.Body>
        <p>Êtes vous sur de vouloir supprimer le mouvement?</p>
        <Button variant="danger" onClick={()=>DeleteRdv_(props.rdvInfo)&props.isPlanning?window.location.replace('/patients'):window.location.replace('/planning')}>Supprimer</Button>
    </Modal.Body>
    </Modal>}
    