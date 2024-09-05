import NewVisitorModal from '@/components/visitors/new-visitor-modal'
import VisitorsTable from '@/components/visitors/visitors-table'

export default async function Visitors() {
  return (
    <div className="flex-1">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold tracking-tight">Visitors</h2>
        <NewVisitorModal />
      </div>

      <VisitorsTable />
    </div>
  )
}
