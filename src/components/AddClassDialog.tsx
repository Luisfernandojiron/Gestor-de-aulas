import { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Input } from "./ui/input";
import { BookOpen, User, GraduationCap, CalendarDays, Plus, Trash2 } from "lucide-react";

interface AddClassDialogProps {
  open: boolean;
  onClose: () => void;
  roomCode: string;
  onAddClass: (classData: {
    className: string;
    professor: string;
    coordinator: string;
    schedule: { day: string; startTime: string; endTime: string }[];
  }) => void;
}

const daysOfWeek = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

export default function AddClassDialog({ open, onClose, roomCode, onAddClass }: AddClassDialogProps) {
  const [className, setClassName] = useState("");
  const [professor, setProfessor] = useState("");
  const [coordinator, setCoordinator] = useState("");
  const [schedule, setSchedule] = useState<{ day: string; startTime: string; endTime: string }[]>([
    { day: "Lunes", startTime: "", endTime: "" }
  ]);

  const addScheduleSlot = () => {
    setSchedule([...schedule, { day: "Lunes", startTime: "", endTime: "" }]);
  };

  const removeScheduleSlot = (index: number) => {
    if (schedule.length > 1) {
      setSchedule(schedule.filter((_, i) => i !== index));
    }
  };

  const updateScheduleSlot = (index: number, field: string, value: string) => {
    const updatedSchedule = [...schedule];
    updatedSchedule[index] = { ...updatedSchedule[index], [field]: value };
    setSchedule(updatedSchedule);
  };

  const handleSubmit = () => {
    const isFormValid = 
      className.trim() && 
      professor.trim() && 
      coordinator.trim() &&
      schedule.every(slot => 
        slot.day && 
        slot.startTime && 
        slot.endTime && 
        slot.startTime < slot.endTime
      );

    if (isFormValid) {
      onAddClass({
        className,
        professor,
        coordinator,
        schedule
      });
      
      // Reset form
      setClassName("");
      setProfessor("");
      setCoordinator("");
      setSchedule([{ day: "Lunes", startTime: "", endTime: "" }]);
      onClose();
    }
  };

  const isFormValid = 
    className.trim() && 
    professor.trim() && 
    coordinator.trim() &&
    schedule.every(slot => 
      slot.day && 
      slot.startTime && 
      slot.endTime && 
      slot.startTime < slot.endTime
    );

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent 
        className="bg-white border-2 border-gray-800 shadow-2xl p-0"
        style={{ 
          maxWidth: '600px', 
          width: '90vw',
          maxHeight: '85vh',
          height: 'auto',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Header fijo */}
        <div className="px-6 pt-6 pb-4 border-b border-gray-200">
          <DialogTitle className="text-gray-900 text-lg font-semibold">
            Agregar Clase - Aula {roomCode}
          </DialogTitle>
          <DialogDescription className="text-gray-600 text-sm mt-2">
            Completa todos los campos para agregar una nueva clase
          </DialogDescription>
        </div>

        {/* Contenido scrolleable */}
        <div 
          className="px-6 py-4 space-y-4"
          style={{
            overflowY: 'auto',
            flex: '1 1 auto',
            minHeight: '0'
          }}
        >
          {/* Nombre de la Clase */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-gray-700">
              <BookOpen className="w-4 h-4 text-blue-500" />
              Nombre de la Clase *
            </Label>
            <Input
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              placeholder="Ej: Cálculo Diferencial"
              className="border-2 border-gray-300 focus:border-blue-500"
            />
          </div>

          {/* Docente */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-gray-700">
              <User className="w-4 h-4 text-blue-500" />
              Docente *
            </Label>
            <Input
              value={professor}
              onChange={(e) => setProfessor(e.target.value)}
              placeholder="Ej: Prof. Luis Hernández"
              className="border-2 border-gray-300 focus:border-blue-500"
            />
          </div>

          {/* Coordinador */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-gray-700">
              <GraduationCap className="w-4 h-4 text-blue-500" />
              Coordinador *
            </Label>
            <Input
              value={coordinator}
              onChange={(e) => setCoordinator(e.target.value)}
              placeholder="Ej: Dr. Juan Pérez"
              className="border-2 border-gray-300 focus:border-blue-500"
            />
          </div>

          {/* Horarios */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="flex items-center gap-2 text-gray-700">
                <CalendarDays className="w-4 h-4 text-blue-500" />
                Horarios *
              </Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addScheduleSlot}
                className="flex items-center gap-1"
              >
                <Plus className="w-4 h-4" />
                Agregar Horario
              </Button>
            </div>

            <div className="space-y-3">
              {schedule.map((slot, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg border-2 border-gray-200">
                  <div className="grid grid-cols-12 gap-2 items-end">
                    <div className="col-span-4 space-y-2">
                      <Label className="text-gray-600 text-sm">Día</Label>
                      <Select 
                        value={slot.day} 
                        onValueChange={(value) => updateScheduleSlot(index, "day", value)}
                      >
                        <SelectTrigger className="border-2 border-gray-300 focus:border-blue-500">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {daysOfWeek.map((day) => (
                            <SelectItem key={day} value={day}>
                              {day}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="col-span-3 space-y-2">
                      <Label className="text-gray-600 text-sm">Inicio</Label>
                      <Input
                        type="time"
                        value={slot.startTime}
                        onChange={(e) => updateScheduleSlot(index, "startTime", e.target.value)}
                        className="border-2 border-gray-300 focus:border-blue-500"
                      />
                    </div>

                    <div className="col-span-3 space-y-2">
                      <Label className="text-gray-600 text-sm">Fin</Label>
                      <Input
                        type="time"
                        value={slot.endTime}
                        onChange={(e) => updateScheduleSlot(index, "endTime", e.target.value)}
                        className="border-2 border-gray-300 focus:border-blue-500"
                      />
                    </div>

                    <div className="col-span-2">
                      {schedule.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeScheduleSlot(index)}
                          className="text-red-500 border-red-300 hover:bg-red-50 w-full"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer fijo con botones */}
        <div 
          className="px-6 py-4 border-t border-gray-200 bg-gray-50"
          style={{
            flexShrink: 0
          }}
        >
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="border-gray-800 text-gray-900 hover:bg-gray-100"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!isFormValid}
              className="bg-gray-800 hover:bg-gray-900 text-white disabled:opacity-50"
            >
              Agregar Clase
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}