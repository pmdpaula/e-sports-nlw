import * as Dialog from "@radix-ui/react-dialog"
import * as Checkbox from "@radix-ui/react-checkbox"
import * as ToggleGroup from "@radix-ui/react-toggle-group"
import * as Select from "@radix-ui/react-select"
import axios from "axios"
import { Check, GameController, CaretDown } from "phosphor-react"
import { FormEvent, useEffect, useState } from "react"
import { Input } from "./Input"

interface Game {
  id: string
  title: string
}

export const CreateAdForm = () => {
  const [games, setGames] = useState<Game[]>([])
  const [weekDays, setWeekDays] = useState<string[]>([])
  const [useVoiceChannel, setUseVoiceChannel] = useState(false)
  const [gamesInput, setGamesInput] = useState("")

  useEffect(() => {
    axios("http://localhost:3333/games").then(response => setGames(response.data))
  }, [])

  async function handleCreateAd(e: FormEvent) {
    e.preventDefault()

    const formData = new FormData(e.target as HTMLFormElement)
    const data = Object.fromEntries(formData)
    console.log(data)

    if (!data.name) {
      return
    }

    try {
      await axios.post(`http://localhost:3333/games/${gamesInput}/ads`, {
        name: data.name,
        yearsPlaying: Number(data.yearsPlaying),
        discord: data.discord,
        weekDays: weekDays.map(Number),
        hourStart: data.hourStart,
        hourEnd: data.hourEnd,
        useVoiceChannel
      })
      alert("Ad Posted Successfully")
    } catch (err) {
      console.log(err)
      alert("Error")
    }
  }

  return (
    <form onSubmit={handleCreateAd} className="mt-8 flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label htmlFor="game" className="font-semibold">
          Game
        </label>
        <Select.Root onValueChange={setGamesInput}>
          <Select.SelectTrigger
            id="game"
            name="game"
            aria-label="Game"
            className={`bg-zinc-900 py-3 px-4 rounded text-small flex justify-between ${
              gamesInput ? "text-white" : "text-zinc-500"
            }`}>
            <Select.SelectValue placeholder="Select a game" />
            <Select.SelectIcon>
              <CaretDown size={24} className="text-zinc-400" />
            </Select.SelectIcon>
          </Select.SelectTrigger>
          <Select.SelectPortal>
            <Select.SelectContent className="bg-zinc-900 rounded overflow-hidden">
              <Select.SelectScrollUpButton>
                <CaretDown size={24} />
              </Select.SelectScrollUpButton>
              <Select.SelectViewport className="py-2 px-1">
                <Select.SelectGroup>
                  {games.map(game => {
                    return (
                      <Select.SelectItem
                        key={game.id}
                        className="flex items-center justify-between py-2 px-3 m-1 bg-zinc-900 text-zinc-500 cursor-pointer rounded hover:bg-zinc-800 hover:text-white"
                        value={game.id}>
                        <Select.SelectItemText>{game.title}</Select.SelectItemText>
                        <Select.SelectItemIndicator>
                          <Check size={24} className="text-emerald-500" />
                        </Select.SelectItemIndicator>
                      </Select.SelectItem>
                    )
                  })}
                </Select.SelectGroup>
              </Select.SelectViewport>
            </Select.SelectContent>
          </Select.SelectPortal>
        </Select.Root>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="name">Your Username</label>
        <Input type="text" id="name" name="name" placeholder="ChopsMan38" />
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="yearsPlaying">Years Playing</label>
          <Input type="number" id="yearsPlaying" name="yearsPlaying" placeholder="2" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="discord">Your Discord</label>
          <Input type="text" id="discord" name="discord" placeholder="username#1234" />
        </div>
      </div>
      <div className="flex gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="weekDays">What days do you play?</label>
          <ToggleGroup.Root
            type="multiple"
            className="grid grid-cols-4 gap-1"
            value={weekDays}
            onValueChange={setWeekDays}>
            <ToggleGroup.Item
              value="0"
              className={`w-10 h-10 rounded ${weekDays.includes("0") ? "bg-violet-500" : "bg-zinc-900"}`}
              title="Sunday">
              S
            </ToggleGroup.Item>
            <ToggleGroup.Item
              value="1"
              className={`w-10 h-10 rounded ${weekDays.includes("1") ? "bg-violet-500" : "bg-zinc-900"}`}
              title="Monday">
              M
            </ToggleGroup.Item>
            <ToggleGroup.Item
              value="2"
              className={`w-10 h-10 rounded ${weekDays.includes("2") ? "bg-violet-500" : "bg-zinc-900"}`}
              title="Tuesday">
              T
            </ToggleGroup.Item>
            <ToggleGroup.Item
              value="3"
              className={`w-10 h-10 rounded ${weekDays.includes("3") ? "bg-violet-500" : "bg-zinc-900"}`}
              title="Wednesday">
              W
            </ToggleGroup.Item>
            <ToggleGroup.Item
              value="4"
              className={`w-10 h-10 rounded ${weekDays.includes("4") ? "bg-violet-500" : "bg-zinc-900"}`}
              title="Thursday">
              T
            </ToggleGroup.Item>
            <ToggleGroup.Item
              value="5"
              className={`w-10 h-10 rounded ${weekDays.includes("5") ? "bg-violet-500" : "bg-zinc-900"}`}
              title="Friday">
              F
            </ToggleGroup.Item>
            <ToggleGroup.Item
              value="6"
              className={`w-10 h-10 rounded ${weekDays.includes("6") ? "bg-violet-500" : "bg-zinc-900"}`}
              title="Saturday">
              S
            </ToggleGroup.Item>
          </ToggleGroup.Root>
        </div>
        <div className="flex flex-col gap-2 flex-1">
          <label htmlFor="hourStart">What time?</label>
          <div className="grid grid-cols-2 gap-2">
            <Input type="time" id="hourStart" name="hourStart" placeholder="From" />
            <Input type="time" id="hourEnd" name="hourEnd" placeholder="Until" />
          </div>
        </div>
      </div>

      <label className="mt-2 flex items-center gap-2 text-sm">
        <Checkbox.Root
          checked={useVoiceChannel}
          className="w-6 h-6 p-1 rounded bg-zinc-900"
          onCheckedChange={checked => {
            if (checked === true) {
              setUseVoiceChannel(true)
            } else {
              setUseVoiceChannel(false)
            }
          }}>
          <Checkbox.Indicator>
            <Check className="w-4 h-4 text-emerald-400" />
          </Checkbox.Indicator>
        </Checkbox.Root>
        I Use Voice Chat
      </label>
      <footer className="mt-4 flex justify-end gap-4">
        <Dialog.Close type="button" className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600">
          Cancel
        </Dialog.Close>
        <button
          type="submit"
          className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600">
          <GameController size={24} /> Find duo
        </button>
      </footer>
    </form>
  )
}
