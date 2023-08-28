import { Button } from '@chakra-ui/react';
import { Link,useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const isDashboard = location.pathname === "/";
  
  return (
    <div className="w-screen h-fit bg-blue-500 flex flex-col">
      <div className="">
        <Link to={isDashboard ? "/weather-analysis" : "/"}>
          <Button className="float-right m-2 " size="sm" height={"10"}>
            View <br /> {isDashboard ? "Weather Analysis" : "Summary Dashboard"}
          </Button>
        </Link>
      </div>
      <div>
        {isDashboard ? (
          <p className="text-center text-xl font-bold text-white py-3">
            Summary Dashboard
          </p>
        ) : (
          <p className="text-center text-xl font-bold text-white py-3">
            Interactive Dashboard for weather analysis
          </p>
        )}
      </div>
    </div>
  );
}

export default Header