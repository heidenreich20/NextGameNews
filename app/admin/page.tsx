import { Metadata } from 'next'
import AdminForm from './AdminForm'

export const metadata: Metadata = {
  robots: 'noindex, nofollow',
}

export default function AdminPage() {
  return <AdminForm />
}