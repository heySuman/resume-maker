export default function Layout(
    { children }: { children: React.ReactNode }
) {
    return (
        <div className="font-sans grid grid-cols-2 items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 border">
            {children}
        </div>
    )
}