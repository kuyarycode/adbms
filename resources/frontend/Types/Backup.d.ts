import Connection from './Connection';

/**
 * Backup definition
 */
type Backup = {
    id: string
    connection_id: string
    storage_path: string
    message: string
    status: boolean
    connection: Connection
    created_at: string
}

export default Backup
