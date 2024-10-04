import { Outlet } from "react-router-dom"
import { Footer, Header } from "../../components"

const BasicLayout = () => {
    return (
        <>
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    )
}

export default BasicLayout