import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import ToolSwitcherRadioGroup from "@/components/toolSwitcherRadioGroup"

const ToolSwitcherDialogue = () => {

  return (

    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Switch tools</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select a tool</DialogTitle>
          <DialogDescription >
            {/* Test if the chatbot has memory if tool is switched */}
            <p className="text-red-600 pb-2 ">Changing this will reset the chatbot.</p>
            This will customize the behavior of the chatbot. By default, the chatbot will assist the user in navigating the application.
          </DialogDescription>
          <div>
            <ToolSwitcherRadioGroup defaultValue="option-one" />
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
};
export default ToolSwitcherDialogue;
