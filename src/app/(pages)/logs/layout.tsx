import ReduxProvider from '@/redux/provider'

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode
  modal: React.ReactNode
}) {
  return (
    <ReduxProvider>
      {children}
      {modal}
    </ReduxProvider>
  )
}
