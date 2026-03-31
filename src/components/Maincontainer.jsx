import Buttonslists from "./Buttonslists";
import Videocontainer from "./Videocontainer";

const Maincontainer = () => {
  return (
    <div className="flex-1 min-w-0">
      <Buttonslists />
      <Videocontainer />
    </div>
  );
};

export default Maincontainer;