import { Card } from "./ui/card";
import { motion } from "motion/react";
import { LucideIcon } from "lucide-react";

interface ModuleCardProps {
  name: string;
  icon: LucideIcon;
  onClick: () => void;
}

export default function ModuleCard({ name, icon: Icon, onClick }: ModuleCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -5 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      <Card 
        className="p-8 cursor-pointer bg-gradient-to-br from-white to-gray-50 border-2 border-gray-800 hover:border-blue-500 hover:shadow-2xl transition-all duration-300"
        onClick={onClick}
      >
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl flex items-center justify-center shadow-lg">
            <Icon className="w-8 h-8 text-blue-400" />
          </div>
          <h3 className="text-gray-900 text-center">{name}</h3>
        </div>
      </Card>
    </motion.div>
  );
}
