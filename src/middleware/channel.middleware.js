import ChannelRepository from "../repositories/channel.repository.js";
import { ServerError } from "../utils/customError.utils.js";

async function channelMiddleware (request, response, next) {
    try{
        /* 
        Cual es la responsabilidad de este middleware??
        Verificar que el canal pertenezca al workspace seleccionado
        */
        const {channel_id, workspace_id} = request.params;
        const channel_selected = await ChannelRepository.getByIdAndWorkspaceId(channel_id, workspace_id)
        if(!channel_selected){
            throw new ServerError(404, 'Canal no encontrado')
        }
        request.channel_selected = channel_selected
        next()
    }
    catch (error){
        console.log(error)
        if (error instanceof ServerError) {
            return response.status(error.status).json({
                ok: false,
                status: error.status,
                message: error.message,
            });
        }
        return response.status(500).json({
            ok: false,
            status: 500,
            message: "Error interno del servidor al listar los canales",
        });
    }
}

export default channelMiddleware