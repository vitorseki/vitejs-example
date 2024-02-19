interface SessionUserInfoProps {
  name: string
  email: string
  avatarUrl: string
  logout: () => void
}

export function SessionUserInfo({
  name,
  email,
  avatarUrl,
  logout,
}: SessionUserInfoProps) {
  return (
    <div className="mt-10 flex items-center pl-5">
      <div className="">
        <img
          className="rounded-xl"
          width={45}
          src={avatarUrl}
          alt="user-avatar"
        />
      </div>
      <div className="ml-4 text-xs">
        <div className="font-bold">{name}</div>
        <div className="">{email}</div>
        <span className="cursor-pointer" onClick={() => logout()}>
          Sair
        </span>
      </div>
    </div>
  )
}
