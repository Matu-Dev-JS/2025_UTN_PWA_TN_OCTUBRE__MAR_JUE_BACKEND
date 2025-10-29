class ChannelController {
    static async create(request, response){
        try{

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
            
        }
        catch(error){

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