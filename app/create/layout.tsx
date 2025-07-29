export default function Layout(
    { children }: { children: React.ReactNode }
) {
    return (
        <div className="font-sans grid grid-cols-1 xl:grid-cols-2 min-h-screen">
            {children}
        </div>
    )
}