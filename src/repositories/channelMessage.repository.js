import pool from "../config/mysql.config.js"

export const MESSAGE_TABLE = {
    NAME: 'MessagesChannel',
    COLUMNS: {
        MEMBER_ID: 'member',
        ID: "_id",
        CHANNEL_ID: "channel",
        CONTENT: "CONTENT",
        CREATED_AT: 'created_at'
    }
}

class ChannelMessageRepository {    
    static async create (content, channel_id, member_id){
        
    }

    static async getAllByChannelId (channel_id){

    }
}

export default ChannelMessageRepository