interface GameBannerProps {
  title: string
  bannerUrl: string
  adsCount: number
}

export const GameBanner = ({ title, bannerUrl, adsCount }: GameBannerProps) => {
  return (
    <a href="" className="relative rounded-lg overflow-hidden">
      <img src={bannerUrl} alt="" />
      <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute right-0 bottom-0 left-0">
        <strong className="font-bold text-white block">{title}</strong>
        <span className="text-zinc-300 text-sm block">{adsCount} Ad(s)</span>
      </div>
    </a>
  )
}
