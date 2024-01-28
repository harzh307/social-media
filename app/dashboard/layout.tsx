export default function RootLayout({
  children,
  article,
  notifications,
  users,
}: Readonly<{
  children: React.ReactNode;
  article: React.ReactNode;
  notifications: React.ReactNode;
  users: React.ReactNode;
}>) {
  return (
    <section className="h-screen bg-white text-black flex px-10 flex-wrap gap-10  justify-center items-center">
      <div className="gap-6 flex flex-col">
        <div className=" aspect-square overflow-scroll justify-center items-center h-[250px] p-8 shadow-xl rounded-xl shadow-yellow-300">
          {article}
        </div>
        <div className=" aspect-square justify-center overflow-scroll items-center h-[250px] p-8 shadow-xl rounded-xl shadow-green-300">
          {notifications}
        </div>
      </div>
      <div className="gap-6 flex flex-col">
        <div className=" aspect-square justify-center overflow-scroll items-center h-[250px] p-8 shadow-xl rounded-xl shadow-red-300">
          {children}
        </div>
        <div className=" aspect-square justify-center overflow-scroll items-center h-[250px] p-8 shadow-xl rounded-xl shadow-indigo-300">
          {users}
        </div>
      </div>
      {/* <div className="grid grid-flow-col col-span-1 auto-rows-fr">
        <div className="bg-red-900">{article}</div>
        <div className="bg-blue-900">{children}</div>
        <div className="bg-green-900">{notifications}</div>
        <div className="bg-orange-900">{users}</div>
      </div> */}
    </section>
  );
}
