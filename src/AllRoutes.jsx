import {Route, Routes} from 'react-router-dom';
import Projects from "./pages/Projects/Projects";
import Header from "./pages/Header/Header";
import Employees from "./pages/Employees/Employees";
import ProjectPage from "./pages/Projects/ProjectPage/ProjectPage";
import TeamsDetails from "./pages/Teams/TeamsDetails";
import EmployeePage from "./pages/Employees/EmployeePage";
import Reports from "./pages/Reports/Reports";

const AllRoutes = () => {
    return (
        <div className={"h-100"}>
            <div className={'wrapper'}>
                <div className={"main"}>
                    <Header/>
                    <Routes>
                        <Route path="/projects" element={<Projects/>}/>
                        <Route path="/employees" element={<Employees/>}/>
                        <Route exact path='/project/:id' element={<ProjectPage/>}/>
                        <Route exact path='/employee/:id' element={<EmployeePage/>}/>
                        <Route path="/teams" element={<TeamsDetails/>}/>
                        <Route path="/reports" element={<Reports/>}/>
                    </Routes>
                </div>
            </div>
        </div>
    )
}

export default AllRoutes;
