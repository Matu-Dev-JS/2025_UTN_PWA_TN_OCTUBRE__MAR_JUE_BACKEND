import pool from "../config/mysql.config.js"
import Workspaces from "../models/Workspace.model.js"

export const WORKSPACE_TABLE = {
    NAME: 'Workspaces',
    COLUMNS: {
        ID: '_id',
        NAME: 'name',
        URL_IMAGE: 'url_image',
        ACTIVE: 'active',
        CREATED_AT: 'created_at',
        MODIFIED_AT: 'modified_at'
    }
}

class WorkspacesRepository {

    /* static async createWorkspace(
        name, 
        url_image
    ){
        await Workspaces.insertOne({
            name: name,
            url_image: url_image
        })
        return true
        
    } */
    //Pasar a mysql
    static async getAll() {

        const query = `SELECT * FROM ${WORKSPACE_TABLE.NAME}`
        const [result] = await pool.execute(query)
        return result
    }
    /* static async getAll (){


        const workspaces_get = await Workspaces.find()

        return workspaces_get
    } */

    /*  static async getById (workspaces_id){
         const workspaces_found = await Workspaces.findById(workspaces_id)
         return workspaces_found
     } */

    static async getById(workspace_id) {
        const query = `
            SELECT * FROM ${WORKSPACE_TABLE.NAME} WHERE ${WORKSPACE_TABLE.COLUMNS.ID} = ?
        `;
        const [result] = await pool.execute(query, [workspace_id]);
        const workspace_found = result[0];
        if (!workspace_found) {
            return null;
        }
        return workspace_found;
    }

    /*  static async deleteById(workspaces_id) {
         await Workspaces.findByIdAndDelete(workspaces_id)
         return true
     } */

    static async deleteById(workspace_id) {
        const query = `DELETE FROM ${WORKSPACE_TABLE.NAME} WHERE ${WORKSPACE_TABLE.COLUMNS.ID} = ?`;
        const [result] = await pool.execute(query, [workspace_id]);
        return result.affectedRows > 0;
    }

    /* static async updateById(
        workspaces_id,
        new_values
    ) {
        const workspace_updated = await Workspaces.findByIdAndUpdate(
            workspaces_id,
            new_values,
            {
                new: true
            }
        )
        return workspace_updated
    }
 */

    static async updateById(workspace_id, new_values) {
        const update_fields = Object.keys(new_values);
        const fields_query = update_fields
            .map((field) => `${field} = ?`)
            .join(" , ");
        const values = Object.values(new_values);
        const query = `UPDATE ${WORKSPACE_TABLE.NAME} SET ${fields_query} WHERE ${WORKSPACE_TABLE.COLUMNS.ID} = ? `;
        await pool.execute(query, [...values, workspace_id]);
        const workspace_updated = await this.getById(workspace_id);
        return workspace_updated;
    }
}

export default WorkspacesRepository
