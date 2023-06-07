import { useForm } from "react-hook-form";
import { UpdateRdv_ } from "../../components/AllRdv/Rdv";
export function RdvUpdate(props) {
    const { register, handleSubmit } = useForm();
    const onSubmitUpdateRdv = async (data) => {
        UpdateRdv_(data)
        window.location.replace('/patients');
    }
    return <form onSubmit={handleSubmit(onSubmitUpdateRdv)} className="align-center flex vertical center" >
        <h1 className="title flex2 center margin-top--">Rdv</h1>
        <div className="flex2 vertical center">
            <h2 className='title top left align-center'>Information</h2>
            <div className="flex2 margin-top--- vertical align-center">
                <div className="flex gap">
                    <input type="hidden" {...register("id")} id="id" defaultValue={props.RdvInfo.id}/>
                    <input className='background my-account- margin-top--- margin-right--' {...register("text")} defaultValue={props.RdvInfo.text} placeholder="text" type="text" id="text" />
                </div>
            </div>
            <div className="flex2 center margin-top--">
                <input type="submit" value="Modifier le Rdv"/>
            </div>
        </div>
    </form>
}