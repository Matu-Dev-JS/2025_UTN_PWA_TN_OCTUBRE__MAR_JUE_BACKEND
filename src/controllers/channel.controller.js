import ChannelRepository from "../repositories/channel.repository";

class ChannelController {
    static async create(request, response) {
        try {
            const { name } = request.body;
            const { workspace_id } = request.params
            if (!name || !workspace_id) {
                return response.status(400).json({
                    ok: false,
                    status: 400,
                    message: "Nombre del canal y workspace_id son requeridos",
                });
            }
            const workspaceChannels = await ChannelRepository.getAllByWorkspaceAndName(
                workspace_id
            );

            if (workspaceChannels.length > 0) {
                return response.status(409).json({
                    ok: false,
                    status: 409,
                    message: "Ya existe un canal con este nombre en el workspace",
                });
            }

            const isPrivate = false;
            await ChannelRepository.create(
                name,
                isPrivate,
                workspace_id
            );
            const updatedChannels = await ChannelRepository.getAllByWorkspace(
                workspace_id
            );

            return response.status(201).json({
                ok: true,
                status: 201,
                message: "Canal creado con éxito",
                data: {
                    channels: updatedChannels,
                },
            });
        } catch (error) {
            console.error("Error creating channel:", error);
            return response.status(500).json({
                ok: false,
                status: 500,
                message: "Error interno del servidor al crear el canal",
            });
        }
    }
}

export default ChannelController


/* 
Supabase
RLS: Row level security:
    - Se aplican en cada tabla
    - Solo el usuario fulanito
        Usuarios
            - Lectura
        
        Productos
            - Lectura 
            - Escritura
*/


/* 
            body:
                -name
            
            Checkear que no exista actualmente un canal con el mismo nombre (dentro del workspace)
            Crear un canal con este nombre
            Responder:
            {
                ok,
                status:201,,
                message:'Canal creado con exito',
                data: {
                    channels: [
                        ...lista de canales pertenecientes al workspace + el nuevo canal
                    ]
                }
            }
            */