import { ReactSession } from 'react-client-session';
export function PatientInfo(props) {
    return <div className="box2 margin-top">
        <div className="margin-bottom-- flex space-evenly">
        <div onClick={()=>props.handleShowModalPatientDelete()&props.setPatientInfo(props.patientInfo)}>Supprimer</div>
        <div onClick={()=>props.handleShowModalPatientUpdate()&props.setPatientInfo(props.patientInfo)}>Modifier</div>
        </div>
        <div className="background-color-2-3">
        <div className="margin-bottom--- flex space-evenly">
        <p>Nom: {props.patientInfo.nom}</p>
        <p>Prenom: {props.patientInfo.prenom}</p>
        </div>
        <div className="margin-bottom--- flex space-evenly">
        <p>Adresse: {props.patientInfo.adresse}</p>
        <p>Tel: {props.patientInfo.tel}</p>
        </div>
        <div className="margin-bottom--- flex space-evenly">
        <p>Medecin: {props.patientInfo.medecin}</p>
        <p>Tel proche: {props.patientInfo.tel_proche}</p>
        </div>
        <div className="center">
            <p onClick={()=>props.handleShowModalTraitementList()&props.setPatientInfo(props.patientInfo)}>Traitements {ReactSession.get("patient"+props.patientInfo.id+"traitement")?<img className="notif2" src={"./image/notification.png"} alt="notif" />:<></>}</p>
        </div>
        <div className="center">
            <p onClick={()=>props.handleShowModalPhotosList()&props.setPatientInfo(props.patientInfo)}>Ordonnances {ReactSession.get("patient"+props.patientInfo.id+"photo")?<img className="notif2" src={"./image/notification.png"} alt="notif" />:<></>}</p>
        </div>
        <div className="center">
            <p onClick={()=>props.handleShowModalPlaiesList()&props.setPatientInfo(props.patientInfo)}>Suivi de plaies {ReactSession.get("patient"+props.patientInfo.id+"plaies")?<img className="notif2" src={"./image/notification.png"} alt="notif" />:<></>}</p>
        </div>
        <div className="center">
            <p onClick={()=>props.handleShowModalMedicList()&props.setPatientInfo(props.patientInfo)}>Comptes rendus médicaux {ReactSession.get("patient"+props.patientInfo.id+"medic")?<img className="notif2" src={"./image/notification.png"} alt="notif" />:<></>}</p>
        </div>
        <div className="center">
            <p onClick={()=>props.handleShowModalBilanList()&props.setPatientInfo(props.patientInfo)}>Bilans {ReactSession.get("patient"+props.patientInfo.id+"bilan")?<img className="notif2" src={"./image/notification.png"} alt="notif" />:<></>}</p>
        </div>
        <div className="center">
            <p onClick={()=>props.handleShowModalRdvList()&props.setPatientInfo(props.patientInfo)}>Rdvs {ReactSession.get("patient"+props.patientInfo.id+"rdv")?<img className="notif2" src={"./image/notification.png"} alt="notif" />:<></>}</p>
        </div>
        <div className="center">
            <p onClick={()=>props.handleShowModalTransmissionList()&props.setPatientInfo(props.patientInfo)}>Transmissions {ReactSession.get("patient"+props.patientInfo.id+"transmission")?<img className="notif2" src={"./image/notification.png"} alt="notif" />:<></>}</p>
        </div>
        </div>
    </div>
}