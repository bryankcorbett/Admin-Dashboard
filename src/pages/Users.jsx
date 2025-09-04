import DataTable from '../components/admin/DataTable'

export default function Users() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">User Management</h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage user accounts, roles, and permissions across the platform
        </p>
      </div>

      <DataTable
        endpoint="/users"
        title="Users"
        searchable={true}
        sortable={true}
        pagination={true}
        pageSize={20}
      />
    </div>
  )
}
