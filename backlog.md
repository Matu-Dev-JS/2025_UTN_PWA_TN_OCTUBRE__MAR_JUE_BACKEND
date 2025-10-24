

## AUTH

/api/auth

    - POST /register
        body: username, email, password

    - POST /login
        body: email, password

    - GET /verify-email
        Debe recibir un token

/api/workspace -> middleware de auth

    - POST /create
        body: name, url_img

    - GET /
        devuelve todos los workspaces
    
    /:workspace_id -> middleware de workspace (donde se checkea que el user sea un miembro)
        - GET /:workspace_id
            devuelve un workspace por id

        - PUT /:workspace_id solo para admins
            Actualizar workspace 
            body: name, url_img 
            
        - DELETE /:workspace_id solo para admins (Opcional)
            Eliminar workspace

        - POST /:workspace_id/members/invite
            body: email

        - PUT /:workspace_id/members/leave (Opcional)
            Sirve para irse del espacio del trabajo 

        - GET /:workspace_id/members (Opcional)
            devuelve todos los miembros de un workspace
        
        - GET /:workspace_id/channels
            devuelve todos los canales de un workspace

        - POST /:workspace_id/channels (solo un admin)
            body: name 
            Crea un channel
    
        Sub ruta: /channels/:channel_id -> middleware de channel (donde se checkea que el channel exista)
            
            - GET /:workspace_id/channels/:channel_id
                devuelve un channel por id
            
            - PUT /:workspace_id/channels/:channel_id (solo un admin)
                Actualizar channel 
                body: name

            - DELETE /:workspace_id/channels/:channel_id (solo un admin)
                Eliminar channel

            - GET /:workspace_id/channels/:channel_id/messages
                devuelve todos los mensajes de un channel

            - POST /:workspace_id/channels/:channel_id/messages
                body: content
                Crea un message

