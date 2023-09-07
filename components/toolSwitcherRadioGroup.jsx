import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { useToolSwitcher } from "@/app/context/toolSwitcherContext";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const ToolSwitcherRadioGroup = ({ defaultValue }) => {
  const { selectedTool, setSelectedTool, githubRepo, setGithubRepo } = useToolSwitcher();
  const [tempTool, setTempTool] = useState(selectedTool);
  const [tempGithubRepo, setTempGithubRepo] = useState(githubRepo);
  const [isChanged, setIsChanged] = useState(false);

  const handleToolSwitch = (value) => {
    setTempTool(value);
    setIsChanged(value !== selectedTool || tempGithubRepo !== githubRepo);
  };

  const handleRepoChange = (e) => {
    setTempGithubRepo(e.target.value);
    setIsChanged(tempTool !== selectedTool || e.target.value !== githubRepo);
  };

  const saveChanges = () => {
    setSelectedTool(tempTool);
    setGithubRepo(tempGithubRepo);
    setIsChanged(false);

  };

  useEffect(() => {
    setIsChanged(tempTool !== selectedTool || tempGithubRepo !== githubRepo);
    console.log(selectedTool)
    console.log(tempTool)
  }, [tempTool, tempGithubRepo, selectedTool, githubRepo]);

  return (
    <>
      <RadioGroup defaultValue={selectedTool} onValueChange={handleToolSwitch}>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option-one" id="option-one" />
          <Label htmlFor="option-one">Default</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option-two" id="option-two" />
          <Label htmlFor="option-two">Chat with GitHub</Label>
        </div>
      </RadioGroup>
      {tempTool === "option-two" && (
        <Input
          type="text"
          placeholder="https://github.com/MarcelGallois/langchainjs-chatbot"
          value={tempGithubRepo}
          onChange={handleRepoChange}
          className="my-2"
        />
      )}
      {isChanged && <Button onClick={saveChanges}>Save</Button>}
    </>
  );
};

export default ToolSwitcherRadioGroup;
