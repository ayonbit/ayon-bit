import { EducationData } from "@/lib/data";
import { ScrollArea } from "./ui/scroll-area";

const Education = () => {
 
  return (
    <div className="flex flex-col gap-[30px] text-center xl:text-left">
      <h3 className="text-4xl font-bold ">{EducationData.title}</h3>
      <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0 ">
        {EducationData.description}
      </p>
      <ScrollArea className="h-[400px]">
        <ul className="grid grid-cols-1 lg:grid-cols-2 gap-[30px]">
          {EducationData.items.map((item, idx) => {
            return (
              <li
                key={idx}
                className="bg-[#232329] h-[184px] py-6 px-10 rounded-xl flex flex-col justify-center items-center lg:items-center gap-1"
              >
                <span className="text-accent">{item.Duration}</span>
                <h3 className="text-md max-w-[260px] min-h-[40px]">
                  {item.Degree}
                </h3>
                <div className="flex items-center gap-3">
                  <span className="w-[6px] h-[6px] rounded-full bg-accent"></span>
                  <p className="text-white/60">{item.Institute}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </ScrollArea>
    </div>
  );
};

export default Education;
