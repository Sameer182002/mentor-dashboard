import { Home } from "../components/pages"
import { Sidebar } from "../components/templates";


export default function HomePage() {
  return (
    <main>
      <Home/>
    </main>
  )
}
HomePage.getLayout = (page) => <Sidebar>{page}</Sidebar>;
