import { useDispatch } from "react-redux"
import { createMember } from "../../store/member"
import { deleteServer, getAllCurrentUserServers } from "../../store/servers"

const MessageConfirmation = ({ user, serverId, setShowConfirm, errors }) => {
    const dispatch = useDispatch()
    console.log("server id in modal", serverId.id)


    const confirm = (e) => {
        e.preventDefault()
        dispatch(createMember({
            serverId: serverId.id, userId: user.id
        }))
        dispatch(getAllCurrentUserServers())
        setShowConfirm(false)
    }

    const cancel = (e) => {
        e.preventDefault()
        dispatch(deleteServer(serverId))
        // dispatch(getAllCurrentUserServers())
        setShowConfirm(false)
    }

    return (
        <div className="form-container">
            <div className="form-card">
                <fieldset id='form'>

                    <div className="text">
                        <h2>Ready to Chat?</h2>
                    </div>
                    {!!errors ?

                        <div className="errors-div">{errors}</div>

                        :
                        <>
                            <h3>Are you Sure you want to Message this user</h3>
                            <button onClick={confirm}>Yes</button>
                            <button onClick={cancel}>No</button>
                        </>
                    }

                </fieldset>
            </div>
        </div>
    )
}


export default MessageConfirmation
