"use client"

import { useState } from "react"
import {
  ChevronLeft,
  ChevronRight,
  Users,
  Calendar,
  Building2,
  Heart,
  Compass,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Assignment, Memory, Person, sweetMemories, timelines } from "@/data/timeline"

const timelineData = timelines;

export default function OfficeMemoireApp() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [memories, setMemories] = useState<Memory[]>(sweetMemories)

  const getPersonByPosition = (assignments: Assignment[], pos: string): Person | null => {
    const found = assignments.find((a) => a.position === pos)
    return found ? found.person : null
  }

  const prevTimeline = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const nextTimeline = () => {
    if (currentIndex < timelineData.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const current = timelineData[currentIndex]
  const assignments = current.Assignment;

  const renderDesk = (deskId: string, extraClasses = "") => {
    const person = getPersonByPosition(assignments, deskId)
    const isEmpty = !person

    return (
      <div
        key={deskId}
        className={`
          relative h-28 w-32 rounded-xl border-2 transition-all duration-300 hover:scale-105
          ${isEmpty
            ? "border-gray-200 bg-gray-50 hover:border-gray-300"
            : "border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 hover:border-blue-300 shadow-md"
          }
          ${extraClasses}
        `}
      >
        <div className="absolute -top-2 -right-2">
          <Badge variant="outline" className="text-xs px-2 py-1 bg-white shadow-sm">
            {deskId}
          </Badge>
        </div>
        <div className="flex h-full items-center justify-center p-2">
          {isEmpty ? "❌" : (
            <div className="text-center">
              <Avatar className="h-16 w-16 mx-auto mb-1">
                <img src={`/${person.photo}`} alt={person.name} className="h-full w-full object-cover" />
                <AvatarFallback className="text-xs bg-blue-100 text-blue-700">
                  {person.name
                    .split(" ")
                    .map((n: string) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <a href={person.linkedIn} target="_blank" className="font-bold text-gray-800 leading-tight">{person.name.split(" ")[0]}</a>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">

        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Office Desk Layout */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex flex-col items-center gap-2">
                  <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-3">
                    <Building2 className="h-8 w-8 text-blue-600" />
                    Office Memoire
                  </h1>
                  <img src={"/Nslogo.png"} className="mx-auto" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <div className="grid grid-cols-2 gap-8">
                    {/* Left Column */}
                    <div className="space-y-3">
                      <div className="text-sm font-medium text-gray-600 text-center mb-4">Left Side (East)</div>
                      {[0, 1, 2].map((group) => (
                        <div key={group} className="space-y-3">
                          <div className="space-y-2">
                            {[0, 1].map((row) => (
                              <div key={row} className="flex gap-3 justify-center">
                                {[0, 1].map((col) => {
                                  const deskId = `D${group * 4 + row * 2 + col + 1}`
                                  return renderDesk(deskId)
                                })}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6 flex flex-col">
                      <div className="flex-1">
                        <Card className="mb-8 border-none bg-transparent">
                          <CardHeader className="pb-4">
                            <CardTitle className="flex items-center justify-center gap-2 text-xl">
                              <Calendar className="h-5 w-5 text-blue-600" />
                              Timeline
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div>
                              {
                                current.Events && current.Events.length > 0 ? (
                                  <ul className="mt-4 space-y-2 list-disc list-inside">
                                    {current.Events.map((event, index) => (
                                      <li key={index} className="text-sm text-gray-700">
                                        <span className="font-semibold">{event}</span>
                                      </li>
                                    ))}
                                  </ul>
                                ) : (
                                  <div className="text-sm text-gray-500 text-center mt-4">
                                    No events for this timeline.
                                  </div>
                                )
                              }
                            </div>

                            <div className="flex mt-5 items-center justify-center gap-6">
                              <Button
                                onClick={prevTimeline}
                                disabled={currentIndex === 0}
                                variant="outline"
                                size="sm"
                                className="flex items-center gap-2 hover:bg-blue-50 transition-colors"
                              >
                                <ChevronLeft className="h-4 w-4" />

                              </Button>

                              <Button
                                onClick={nextTimeline}
                                disabled={currentIndex === timelineData.length - 1}
                                variant="outline"
                                size="sm"
                                className="flex items-center gap-2 hover:bg-blue-50 transition-colors"
                              >

                                <ChevronRight className="h-4 w-4" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      {
                        current.DisableRightSide != true && (
                          <>
                            <div className="text-sm font-medium text-gray-600 text-center mb-4">Right Side (West)</div>
                            <div className="space-y-3">
                              <div className="space-y-2">
                                {[0, 1].map((row) => (
                                  <div key={row} className="flex gap-3 justify-center">
                                    {[0, 1].map((col) => {
                                      const deskId = `D${13 + row * 2 + col}`
                                      return renderDesk(deskId)
                                    })}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </>
                        )
                      }
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Memories Section */}
          <div className="space-y-6">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-red-500" />
                    Team Memories
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 overflow-y-auto">
                {memories.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <Heart className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                    <p>No memories shared for this timeline yet.</p>
                    <p className="text-sm">Be the first to share a memory!</p>
                  </div>
                ) : (
                  memories.map((memory) => (
                    <div
                      key={memory.id}
                      className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg p-4 border border-pink-100"
                    >
                      <div className="flex items-start gap-3">
                        <Avatar className="h-8 w-8">
                          <img
                            src={`/${memory.person.photo}`}
                            alt={memory.person.name}
                            className="h-full w-full object-cover rounded-full" />
                          <AvatarFallback className="bg-pink-100 text-pink-700 text-xs">
                            {memory.person.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-sm text-gray-800">{memory.person.name}</span>
                            <span className="text-xs text-gray-500">{memory.timestamp}</span>
                          </div>
                          <p className="text-sm text-gray-700 leading-relaxed">{memory.content}</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
