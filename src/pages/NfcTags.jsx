import DataTable from '../components/admin/DataTable'

export default function NfcTags() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">NFC Tags Management</h1>
        <p className="text-sm text-gray-500 mt-1">
          Create and manage NFC tags, track usage, and monitor performance
        </p>
      </div>

      <DataTable
        endpoint="/nfc-tags"
        title="NFC Tags"
        searchable={true}
        sortable={true}
        pagination={true}
        pageSize={20}
      />
    </div>
  )
}
