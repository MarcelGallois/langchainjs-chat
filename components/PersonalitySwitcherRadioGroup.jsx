import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { useToolSwitcher } from "@/app/context/toolSwitcherContext";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export default function PersonalitySwitcherRadioGroup({ defaultValue }) {
  const { selectedPersonality, selectedTemperature, updateToolState } = useToolSwitcher();
  const [tempPersonality, setTempPersonality] = useState(selectedPersonality);
  const [isChanged, setIsChanged] = useState(false);


  const handlePersonalitySwitch = (value) => {
    setTempPersonality(value);
    console.log(tempPersonality)
    setIsChanged(value !== selectedPersonality);
  };



  const saveChanges = () => {
    updateToolState("selectedPersonality", tempPersonality);
    setIsChanged(false);
  };

  useEffect(() => {
    setIsChanged(tempPersonality !== selectedPersonality);
    console.log(selectedPersonality)
    console.log(tempPersonality)
  }, [tempPersonality, selectedPersonality]);

  return (
    <>
      <RadioGroup defaultValue={selectedPersonality} onValueChange={handlePersonalitySwitch} className="pb-3">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="amelia" id="amelia-personality" />
          <Label htmlFor="amelia-personality">Amelia</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="bob" id="bob-personality" />
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Label htmlFor="bob-personality">Bob</Label>
              </TooltipTrigger>
              <TooltipContent>
                <p>Bob is a master planner.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="charlie" id="charlie-personality" />
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Label htmlFor="charlie-personality">Charlie</Label>
              </TooltipTrigger>
              <TooltipContent>
                <p>Charlie is a skilled software developer.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </RadioGroup>
      {isChanged && <Button className="mt-2" onClick={saveChanges}>Save</Button>}
    </>
  );
};

