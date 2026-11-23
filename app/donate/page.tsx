import { redirect } from 'next/navigation'

export default function DonatePage() {
  redirect('/get-involved?action=donate')
}
