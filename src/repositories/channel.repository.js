import pool from "../config/mysql.config.js";
import Channels from "../models/Channel.model.js";
class ChannelRepository {
    /* 
    Mysql
    */
    static async create(name, isPrivate, workspace_id) {
        const query = `
      INSERT INTO Channels(name, private, workspace) VALUES(?, ?, ?)
    `;
        const [result] = await pool.execute(query, [name, isPrivate, workspace_id]);
        const channel_created = await ChannelRepository.getById(result.insertId);
        return channel_created;
    }

    static async getAllByWorkspace(workspace_id) {
        const query = `
      SELECT * FROM Channels WHERE workspace = ?
    `;
        const [result] = await pool.execute(query, [workspace_id]);
        return result;
    }

    static async getAllByWorkspaceAndName(workspace_id, name) {
        const query = `
      SELECT * FROM Channels WHERE workspace = ? AND name = ?
    `;
        const [result] = await pool.execute(query, [workspace_id, name]);
        return result;
    }

    static async getById(channel_id) {
        const query = `
      SELECT * FROM Channels WHERE _id = ?
    `;
        const [result] = await pool.execute(query, [channel_id]);
        const channel_found = result[0];
        if (!channel_found) {
            return null;
        }
        return channel_found;
    }

    static async getByIdAndWorkspaceId(channel_id, workspace_id) {
        const query = `
      SELECT * FROM Channels WHERE _id = ? AND workspace = ?
    `;
        const [result] = await pool.execute(query, [channel_id, workspace_id]);
        const channel_found = result[0];
        if (!channel_found) {
            return null;
        }
        return channel_found;
    }

    /* 
    Mongoose
    static async create(name, private, workspace_id) {
        const new_channel = new Channels({
            name,
            private,
            workspace_id
        });
        await new_channel.save();
        return new_channel;
    }
    static async getAllByWorkspace(workspace_id) {
        return await Channels.find({ workspace_id });
    }
    static async getById(channel_id) {
        return await Channels.findById(channel_id);
    } */
}
export default ChannelRepository;