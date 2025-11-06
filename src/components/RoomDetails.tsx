import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Badge } from "./ui/badge";
import { Clock, User, BookOpen, GraduationCap, Plus, Trash2 } from "lucide-react";
import { Button } from "./ui/button";

export interface RoomData {
  id: string;
  code: string;
  className?: string;
  schedule: { day: string; startTime: string; endTime: string }[];
  professor?: string;
  coordinator: string;
  isAvailable: boolean;
}

interface RoomDetailsProps {
  room: RoomData | null;
  open: boolean;
  onClose: () => void;
  onAddClass?: () => void;
  onRemoveClass?: () => void;
}

export default function RoomDetails({ room, open, onClose, onAddClass, onRemoveClass }: RoomDetailsProps) {
  if (!room) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-[500px] bg-white border-2 border-gray-800 shadow-2xl">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-gray-900">Aula {room.code}</DialogTitle>
            <Badge 
              className={room.isAvailable 
                ? "bg-cyan-500 hover:bg-cyan-600 text-white" 
                : "bg-rose-600 hover:bg-rose-700 text-white"
              }
            >
              {room.isAvailable ? "Disponible" : "Ocupada"}
            </Badge>
          </div>
          <DialogDescription className="text-gray-600">
            Información detallada del aula
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-6">
          {room.isAvailable ? (
            <>
              <div className="bg-cyan-50 border-2 border-cyan-400 rounded-lg p-4">
                <p className="text-cyan-900">
                  Esta aula está disponible. Puedes agregar una clase.
                </p>
              </div>
              {onAddClass && (
                <Button
                  onClick={onAddClass}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Agregar Clase
                </Button>
              )}
            </>
          ) : (
            <>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-600">
                  <BookOpen className="w-5 h-5 text-blue-500" />
                  <span>Clase:</span>
                </div>
                <p className="text-gray-900 ml-7">{room.className}</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-600">
                  <User className="w-5 h-5 text-blue-500" />
                  <span>Docente:</span>
                </div>
                <p className="text-gray-900 ml-7">{room.professor}</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-600">
                  <GraduationCap className="w-5 h-5 text-blue-500" />
                  <span>Coordinador:</span>
                </div>
                <p className="text-gray-900 ml-7">{room.coordinator}</p>
              </div>

              {onRemoveClass && (
                <Button
                  onClick={onRemoveClass}
                  variant="outline"
                  className="w-full text-red-600 border-red-300 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Remover Clase
                </Button>
              )}
            </>
          )}

          <div className="space-y-3">
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="w-5 h-5 text-blue-500" />
              <span>Horario:</span>
            </div>
            <div className="ml-7 space-y-2">
              {room.schedule.length > 0 ? (
                room.schedule.map((slot, index) => (
                  <div 
                    key={index} 
                    className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border border-gray-300"
                  >
                    <span className="text-gray-700">{slot.day}</span>
                    <span className="text-gray-900">
                      {slot.startTime} - {slot.endTime}
                    </span>
                  </div>
                ))
              ) : (
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-300 text-gray-500 text-center">
                  No hay horarios asignados
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <Button 
            onClick={onClose}
            variant="outline"
            className="border-gray-800 text-gray-900 hover:bg-gray-800 hover:text-white"
          >
            Cerrar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}