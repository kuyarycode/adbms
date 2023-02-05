import Backup from './Backup';

/**
 * Connection definition
 */
type Connection = {
    id: string
    user_id: string
    name: string
    slug: string
    mysqldb_host: string
    mysqldb_port: string
    mysqldb_user: string
    mysqldb_pass?: string
    mysqldb_name: string
    frequency: string
    enabled: boolean
    notifiable: boolean

    backups?: Backup[]
    connected?: {
        message: string
        success: boolean
    }
}

export default Connection
