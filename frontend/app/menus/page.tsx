import { MenuContent } from "../component/main-content"

export default function Systems() {
    return (
  <div className="flex h-screen bg-background">
        {/* <Sidebar /> */}
        <main className="flex-1 h-full overflow-auto">
          <MenuContent />
        </main>
      </div>
    )
  }