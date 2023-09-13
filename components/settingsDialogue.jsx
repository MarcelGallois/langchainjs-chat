import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
// import {
//   Tabs,
//   TabsContent,
//   TabsList,
//   TabsTrigger,
// } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import SettingsTabs from "@/components/SettingsTabs";


export default function SettingsDialogue() {

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Settings</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Settings</DialogTitle>
            <DialogDescription >
              These settings customize the behavior and abilities of the chatbot. By default, the chatbot will be a helpful assistant and behave like a normal instance of ChatGPT. You can give the chatbot access to tools for a short period of time, or the duration of the conversation.
            </DialogDescription>
            <SettingsTabs />

          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  )
};