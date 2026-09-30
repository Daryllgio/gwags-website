import { isScholarsApplicationOpen } from '@/lib/featureFlags'
import ScholarsPageClient from './ScholarsPageClient'

export default function ScholarsPage() {
  return <ScholarsPageClient applicationOpen={isScholarsApplicationOpen()} />
}
